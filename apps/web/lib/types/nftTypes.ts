export enum NFTCollectionIDList {
  Zknoid = "zknoid",
}

export enum NFTExpertise {
  King = "king",
  Wizard = "wizard",
  Warrior = "warrior",
  Villager = "villager",
}

export enum NFTRace {
  Dragon = "dragon",
  Lizard = "lizard",
  Frog = "frog",
}

export enum NFTRating {
  Gold = "gold",
  Bronze = "bronze",
  Silver = "silver",
}

export enum NFTSkin {
  Green = "green",
  Black = "black",
  Purple = "purple",
  Red = "red",
}

export enum NFTEdition {
  First = "first",
}

export interface NFT {
  id: number;
  imageID: string;
  collectionID: NFTCollectionIDList;
  owner: string | undefined;
  isMinted: boolean;
  price: number;
  expertise: NFTExpertise;
  race: NFTRace;
  rating: NFTRating;
  skin: NFTSkin;
  edition: NFTEdition;
}

export interface Collection {
  id: NFTCollectionIDList;
  items: NFT[];
  mintedAmount: number;
  totalPrice: number;
}
