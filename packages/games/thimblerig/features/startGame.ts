import { getEnvContext } from "@zknoid/sdk/lib/envContext";
import { PublicKey, UInt64 } from "o1js";
import { GameState } from "../lib/gameState";
import { useStore } from "zustand";
import { useSessionKeyStore } from "@zknoid/sdk/lib/stores/sessionKeyStorage";
import { useMinaBridge } from "@zknoid/sdk/lib/hooks/observe-protokit-balance";
import { client } from "zknoid-chain-dev";
// import { api } from "@zknoid/sdk/trpc/react";
import { useNetworkStore } from "@zknoid/sdk/lib/stores/network";

export const useStartGame = (setGameState: (state: GameState) => void) => {
  const sessionPublicKey = useStore(useSessionKeyStore, (state) =>
    state.getSessionKey()
  ).toPublicKey();
  const bridge = useMinaBridge();
  const networkStore = useNetworkStore();
  // const gameStartedMutation = api.logging.logGameStarted.useMutation();

  return async () => {
    // gameStartedMutation.mutate({
    //   gameId: "thimblerig",
    //   userAddress: networkStore.address ?? "",
    //   envContext: getEnvContext(),
    // });

    const thimblerigLogic = client.runtime.resolve("ThimblerigLogic");

    const tx = await client.transaction(
      PublicKey.fromBase58(networkStore.address!),
      async () => {
        thimblerigLogic.register(
          sessionPublicKey,
          UInt64.from(Math.round(Date.now() / 1000))
        );
      }
    );

    await tx.sign();
    await tx.send();

    setGameState(GameState.MatchRegistration);
  };
};
