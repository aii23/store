import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

import { ALL_NETWORKS } from "../../constants/networks";

export interface ComputedTransactionJSON {
  argsFields: string[];
  argsJSON: string[];
  methodId: string;
  nonce: string;
  sender: string;
  signature: {
    r: string;
    s: string;
  };
}

export interface ComputedBlockJSON {
  txs?: {
    status: boolean;
    statusMessage?: string;
    tx: ComputedTransactionJSON;
  }[];
}

export interface ChainState {
  loading: boolean;
  block?: {
    height: bigint;
    slotSinceGenesis: bigint;
  } & ComputedBlockJSON;
  loadBlock: (networkID: string) => Promise<void>;
}

export interface BlockQueryResponse {
  data: {
    bestChain: {
      protocolState: {
        consensusState: {
          blockHeight: string;
          slotSinceGenesis: string;
        };
      };
    }[];
    block: ComputedBlockJSON;
  };
}

export const useChainStore = create<ChainState, [["zustand/immer", never]]>(
  immer((set) => ({
    loading: Boolean(false),
    async loadBlock(networkID: string) {
      if (networkID == undefined) return;

      set((state) => {
        state.loading = true;
      });

      const response = await fetch(
        ALL_NETWORKS.find((x) => x.networkID == networkID)?.graphql!,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: `
            query {
              bestChain(maxLength:1) {
                protocolState {
                  consensusState {
                    blockHeight,
                    slotSinceGenesis
                  }
                }
              }
            }
          `,
          }),
        }
      );

      const { data } = (await response.json()) as BlockQueryResponse;
      if (!data) {
        return;
      }
      const height = data.bestChain[0].protocolState.consensusState.blockHeight;
      const slotSinceGenesis =
        data.bestChain[0].protocolState.consensusState.slotSinceGenesis;

      set((state) => {
        state.loading = false;
        state.block = {
          height: BigInt(height),
          slotSinceGenesis: BigInt(slotSinceGenesis),
          ...data.block,
        };
      });
    },
  }))
);
