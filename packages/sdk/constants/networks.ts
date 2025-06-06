export interface Network {
  networkID: string;
  palladNetworkID: string;
  name: string;
  isMainnet: boolean;
  graphql: string;
  archive: string;
  blockberryEndpoint: string;
  minscanUrl: string;
}

export const NetworkIds = {
  ZEKO_TESTNET: "zeko:testnet",
  MINA_DEVNET: "mina:devnet",
  MINA_MAINNET: "mina:mainnet",
};

export const PalladNetworkIds = {
  ZEKO_TESTNET: "69420",
  MINA_DEVNET:
    "29936104443aaf264a7f0192ac64b1c7173198c1ed404c1bcff5e562e05eb7f6",
  MINA_MAINNET: "",
};

export const PALLAD_TO_AURO_NETWORK_IDS = {
  [PalladNetworkIds.MINA_MAINNET]: NetworkIds.MINA_MAINNET,
  [PalladNetworkIds.MINA_DEVNET]: NetworkIds.MINA_DEVNET,
  [PalladNetworkIds.ZEKO_TESTNET]: NetworkIds.ZEKO_TESTNET,
};

export const NETWORKS: { readonly [networkId: string]: Network } = {
  [NetworkIds.MINA_MAINNET]: {
    networkID: NetworkIds.MINA_MAINNET,
    palladNetworkID: PalladNetworkIds.MINA_MAINNET,
    name: "Mainnet",
    isMainnet: true,
    graphql: "https://api.minascan.io/node/mainnet/v1/graphql",
    archive: "https://api.minascan.io/archive/mainnet/v1/graphql",
    blockberryEndpoint: "https://api.blockberry.one/mina-mainnet/v1",
    minscanUrl: "https://minascan.io/mainnet",
  },
  [NetworkIds.MINA_DEVNET]: {
    networkID: NetworkIds.MINA_DEVNET,
    palladNetworkID: PalladNetworkIds.MINA_DEVNET,
    name: "Devnet",
    isMainnet: false,
    graphql: "https://proxy.zknoid.io/mina-node/devnet-main-node",
    archive: "https://proxy.zknoid.io/mina-node/devnet-archive-node",
    blockberryEndpoint: "https://api.blockberry.one/mina-devnet/v1",
    minscanUrl: "https://minascan.io/devnet",
  },
  [NetworkIds.ZEKO_TESTNET]: {
    networkID: NetworkIds.ZEKO_TESTNET,
    palladNetworkID: PalladNetworkIds.ZEKO_TESTNET,
    name: "Zeko",
    isMainnet: false,
    graphql: "https://devnet.zeko.io/graphql",
    archive: "",
    blockberryEndpoint: "",
    minscanUrl: "",
  },
};

export const ALL_NETWORKS = [
  NETWORKS[NetworkIds.MINA_MAINNET],
  NETWORKS[NetworkIds.MINA_DEVNET],
  NETWORKS[NetworkIds.ZEKO_TESTNET],
];
