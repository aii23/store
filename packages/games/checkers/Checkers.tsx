"use client";

import { useContext, useEffect, useState } from "react";
import { GameView } from "./components/GameView";
import { PublicKey, UInt64 } from "o1js";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";
import {
  useObserveCheckersMatchQueue,
  useCheckersMatchQueueStore,
} from "./stores/matchQueue";
import { walletInstalled } from "@zknoid/sdk/lib/helpers";
import { useStore } from "zustand";
import { useSessionKeyStore } from "@zknoid/sdk/lib/stores/sessionKeyStorage";
import { ClientAppChain, PENDING_BLOCKS_NUM_CONST } from "zknoid-chain-dev";
import { checkersConfig } from "./config";
import ZkNoidGameContext from "@zknoid/sdk/lib/contexts/ZkNoidGameContext";
import { useProtokitChainStore } from "@zknoid/sdk/lib/stores/protokitChain";
import { MOVE_TIMEOUT_IN_BLOCKS } from "zknoid-chain-dev";
import {
  MainButtonState,
  PvPGameView,
} from "@zknoid/sdk/components/framework/GamePage/PvPGameView";
import CheckersCoverSVG from "./assets/game-cover.svg";
import CheckersCoverMobileSVG from "./assets/game-cover-mobile.svg";
import { getRandomEmoji } from "@zknoid/sdk/lib/emoji";
import { formatUnits } from "@zknoid/sdk/lib/unit";
import { Currency } from "@zknoid/sdk/constants/currency";
import { GameState } from "./lib/gameState";
import { useStartGame } from "./features/useStartGame";
import { useOnMoveChosen } from "./features/useOnMoveChosen";
import {
  useLobbiesStore,
  useObserveLobbiesStore,
} from "@zknoid/sdk/lib/stores/lobbiesStore";
import GamePage from "@zknoid/sdk/components/framework/GamePage";
import { useNotificationStore } from "@zknoid/sdk/components/shared/Notification/lib/notificationStore";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useRateGameStore } from "@zknoid/sdk/lib/stores/rateGameStore";

export default function RandzuPage({
  params,
}: {
  params: { competitionId: string };
}) {
  const [gameState, setGameState] = useState(GameState.NotStarted);
  const [loading, setLoading] = useState(true);
  const [loadingElement, setLoadingElement] = useState<
    { x: number; y: number } | undefined
  >({ x: 0, y: 0 });

  const { client } = useContext(ZkNoidGameContext);

  if (!client) {
    throw Error("Context app chain client is not set");
  }

  const networkStore = useNetworkStore();
  const matchQueue = useCheckersMatchQueueStore();
  const notificationStore = useNotificationStore();
  const rateGameStore = useRateGameStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  useObserveCheckersMatchQueue();
  const protokitChain = useProtokitChainStore();
  const sessionPrivateKey = useStore(useSessionKeyStore, (state) =>
    state.getSessionKey(),
  );

  const client_ = client as ClientAppChain<
    typeof checkersConfig.runtimeModules,
    any,
    any,
    any
  >;

  const query = networkStore.protokitClientStarted
    ? client_.query.runtime.CheckersLogic
    : undefined;

  useObserveLobbiesStore(query);
  const lobbiesStore = useLobbiesStore();

  console.log("Active lobby", lobbiesStore.activeLobby);

  const startGame = useStartGame(setGameState);
  const onMoveChosen = useOnMoveChosen(
    matchQueue,
    setLoading,
    setLoadingElement,
  );

  const restart = () => {
    matchQueue.resetLastGameState();
    setGameState(GameState.NotStarted);
  };

  // nonSSR
  const collectPending = async () => {
    const logic = client.runtime.resolve("CheckersLogic");
    const tx = await client.transaction(
      sessionPrivateKey.toPublicKey(),
      async () => {
        logic.collectPendingBalance();
      },
    );

    console.log("Collect tx", tx);

    tx.transaction = tx.transaction?.sign(sessionPrivateKey);

    console.log("Sending tx", tx);

    await tx.send();

    console.log("Tx sent", tx);
  };

  // nonSSR
  const proveOpponentTimeout = async () => {
    const randzuLogic = client.runtime.resolve("CheckersLogic");
    const tx = await client.transaction(
      PublicKey.fromBase58(networkStore.address!),
      async () => {
        randzuLogic.proveOpponentTimeout(
          UInt64.from(matchQueue.gameInfo!.gameId),
        );
      },
    );

    await tx.sign();
    await tx.send();
  };

  useEffect(() => {
    setLoading(false);
    setLoadingElement(undefined);
  }, [matchQueue.gameInfo?.isCurrentUserMove]);

  useEffect(() => {
    if (matchQueue.pendingBalance && !matchQueue.inQueue) {
      console.log("Collecting pending balance", matchQueue.pendingBalance);
      collectPending();
    }
    if (!walletInstalled()) {
      setGameState(GameState.WalletNotInstalled);
    } else if (!networkStore.address) {
      setGameState(GameState.WalletNotConnected);
    } else if (matchQueue.inQueue && !matchQueue.activeGameId) {
      setGameState(GameState.Matchmaking);
    } else if (
      matchQueue.activeGameId &&
      matchQueue.gameInfo?.isCurrentUserMove
    ) {
      setGameState(GameState.CurrentPlayerTurn);
    } else if (
      matchQueue.gameInfo &&
      !matchQueue.gameInfo?.isCurrentUserMove &&
      BigInt(protokitChain?.block?.height || "0") -
        matchQueue.gameInfo?.lastMoveBlockHeight >
        MOVE_TIMEOUT_IN_BLOCKS
    ) {
      setGameState(GameState.OpponentTimeout);
    } else if (
      matchQueue.activeGameId &&
      !matchQueue.gameInfo?.isCurrentUserMove
    ) {
      setGameState(GameState.OpponentTurn);
    } else {
      if (matchQueue.lastGameState == "win") setGameState(GameState.Won);
      else if (matchQueue.lastGameState == "lost") setGameState(GameState.Lost);
      else setGameState(GameState.NotStarted);
    }
  }, [
    matchQueue.activeGameId,
    matchQueue.gameInfo,
    matchQueue.inQueue,
    matchQueue.lastGameState,
    networkStore.address,
  ]);

  const mainButtonState = loading
    ? MainButtonState.TransactionExecution
    : (
        {
          [GameState.CurrentPlayerTurn]: MainButtonState.YourTurn,
          [GameState.OpponentTurn]: MainButtonState.OpponentsTurn,
          [GameState.OpponentTimeout]: MainButtonState.OpponentTimeOut,
          [GameState.NotStarted]: MainButtonState.NotStarted,
          [GameState.WalletNotInstalled]: MainButtonState.WalletNotInstalled,
          [GameState.WalletNotConnected]: MainButtonState.WalletNotConnected,
        } as Record<GameState, MainButtonState>
      )[gameState] || MainButtonState.None;

  const statuses = {
    [GameState.WalletNotInstalled]: "WALLET NOT INSTALLED",
    [GameState.WalletNotConnected]: "WALLET NOT CONNECTED",
    [GameState.NotStarted]: "NOT STARTED",
    [GameState.MatchRegistration]: "MATCH REGISTRATION",
    [GameState.Matchmaking]: `MATCHMAKING ${
      (protokitChain.block?.height ?? 0) % PENDING_BLOCKS_NUM_CONST
    }  / ${PENDING_BLOCKS_NUM_CONST} 🔍`,
    [GameState.CurrentPlayerTurn]: `YOUR TURN`,
    [GameState.OpponentTurn]: `OPPONENT TURN`,
    [GameState.OpponentTimeout]: `OPPONENT TIMEOUT ${
      Number(protokitChain?.block?.height) -
      Number(matchQueue.gameInfo?.lastMoveBlockHeight)
    }`,
    [GameState.Won]: "YOU WON",
    [GameState.Lost]: "YOU LOST",
  } as Record<GameState, string>;

  const bottomButtonState = {
    [GameState.OpponentTimeout]: {
      text: "PROVE OPPONENT'S TIMEOUT",
      handler: () => {
        proveOpponentTimeout();
      },
    },
    [GameState.Lost]: {
      text: "RESTART",
      handler: () => {
        restart();
      },
    },
    [GameState.Won]: {
      text: "RESTART",
      handler: () => {
        restart();
      },
    },
  } as Record<GameState, { text: string; handler: () => void }>;

  const mainText = {
    [GameState.CurrentPlayerTurn]: "Make your move",
    [GameState.OpponentTimeout]: "Opponent timed out. Prove it to get turn",
    [GameState.OpponentTurn]: "Wait for opponent to make a turn",
    [GameState.Won]: `${getRandomEmoji("happy")}You won! Congratulations!`,
    [GameState.Lost]: `${getRandomEmoji("sad")} You've lost...`,
  } as Record<GameState, string>;

  useEffect(() => {
    if (gameState == GameState.Won) {
      notificationStore.create({
        type: "success",
        message: `You are won! Winnings: ${formatUnits(matchQueue.pendingBalance)} ${Currency.ZNAKES}`,
      });
    }

    if (
      !rateGameStore.ratedGames.find(
        (game) => game.gameId === checkersConfig.id,
      )
    ) {
      if (
        (gameState == GameState.Lost || gameState == GameState.Won) &&
        searchParams.get("rating") !== "forceModal"
      ) {
        setTimeout(() => {
          router.push(pathname + "?rating=forceModal");
        }, 10000);
      }
    }
  }, [gameState]);

  return (
    <GamePage gameConfig={checkersConfig} gameTitleImage={CheckersCoverSVG}>
      <PvPGameView
        gameId={checkersConfig.id}
        competitionId={params.competitionId}
        status={statuses[gameState]}
        opponent={matchQueue.gameInfo?.opponent!}
        startPrice={lobbiesStore.lobbies?.[0]?.fee || 0n}
        mainButtonState={mainButtonState}
        startGame={() => startGame()}
        queueSize={matchQueue.getQueueLength()}
        gameAuthor={"zkNoid team"}
        mainText={mainText[gameState]}
        bottomButtonText={bottomButtonState[gameState]?.text}
        bottomButtonHandler={bottomButtonState[gameState]?.handler}
        competitionName={lobbiesStore.activeLobby?.name || "Unknown"}
        gameName={"Checkers"}
        gameRules={`Checkers is a two-player game played on an 8x8 board. Players take turns moving their pieces diagonally forward, capturing opponent's pieces by jumping over them. A piece reaching the opponent's back row becomes a king and can move backward. 
        
        The game is won by capturing all of the opponent's pieces or by blocking them from moving
        `}
        competitionFunds={(lobbiesStore.activeLobby?.reward || 0n) / 2n}
      >
        <GameView
          gameInfo={matchQueue.gameInfo}
          onMoveChosen={onMoveChosen}
          loadingElement={loadingElement}
          loading={loading}
        />
      </PvPGameView>
    </GamePage>
  );
}
