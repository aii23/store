import { CollectionInfo, NftInfo } from "@silvana-one/api";
import { createTRPCRouter, publicProcedure } from "../trpc";

import { searchClient } from "@algolia/client-search";
import { version } from "os";
import { z } from "zod";
import { NFT } from "../../../lib/types/nftTypes";

const { NFT_ALGOLIA_PROJECT, NFT_ALGOLIA_KEY } = process.env;
if (NFT_ALGOLIA_PROJECT === undefined)
  throw new Error("NFT_ALGOLIA_PROJECT is undefined");
if (NFT_ALGOLIA_KEY === undefined)
  throw new Error("NFT_ALGOLIA_KEY is undefined");

const client = searchClient(NFT_ALGOLIA_PROJECT, NFT_ALGOLIA_KEY);

interface ISourceData {
  name: string;
  indexName: string;
  version: number;
}

export interface INftParam {
  key: string;
  value: string;
}

export interface INft {
  id: number;
  imageType: string; // ipfs
  image: string; // link to ipfs
  owner: string | undefined;
  isMinted: boolean;
  price: number;
  params: INftParam[];
}

const indexes: ISourceData[] = [
  // {
  //   name: "mainnetV2",
  //   indexName: "mainnet",
  //   version: 2,
  // },
  // {
  //   name: "zekoV3",
  //   indexName: "standard-zeko",
  //   version: 3,
  // },
  {
    name: "devnetV3",
    indexName: "standard-devnet",
    version: 3,
  },
];

interface ICollection {
  name: string;
  count: number;
  source: ISourceData;
}

export interface AlgoliaCollectionList {
  hits: CollectionInfo[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: { nbHits: boolean; typo: boolean };
  processingTimeMS: number;
}

export interface AlgoliaNftList {
  hits: NftInfo[];
  nbHits: number;
  page: number;
  nbPages: number;
  hitsPerPage: number;
  exhaustiveNbHits: boolean;
  exhaustiveTypo: boolean;
  exhaustive: { nbHits: boolean; typo: boolean };
  processingTimeMS: number;
}

const getV2Collections = async (
  source: ISourceData
): Promise<ICollection[]> => {
  const result = await client.searchForFacetValues({
    indexName: source.indexName,
    facetName: "collection",
  });

  if (!result) return [];

  return result.facetHits.map((hit) => {
    return {
      name: hit.value,
      count: hit.count,
      source,
    };
  });
};

const getV3Collections = async (
  source: ISourceData
): Promise<ICollection[]> => {
  const result = await client.searchSingleIndex({
    indexName: source.indexName,
    searchParams: {
      query: "",
      hitsPerPage: 1000,
      page: 0,
      facetFilters: ["status:created", "contractType:collection"],
    },
  });

  if (!result) return [];

  const tokenList = result?.hits
    ? (result as unknown as AlgoliaCollectionList)
    : undefined;

  return tokenList!.hits.map((hit) => {
    return {
      name: hit.collectionName,
      count: 1,
      source,
    };
  });
};

export const nftRouter = createTRPCRouter({
  getCollections: publicProcedure.query(async () => {
    const result = [];

    for (const source of indexes) {
      let collections: ICollection[] = [];

      if (source.version === 2) {
        collections = await getV2Collections(source);
      } else if (source.version === 3) {
        collections = await getV3Collections(source);
      }

      result.push(...collections);
    }

    return result;
  }),
  getCollectionsNFTV2: publicProcedure
    .input(
      z.object({
        indexName: z.string(),
        collectionAddress: z.string(),
      })
    )
    .query(async ({ input }) => {
      //#TODO add filter for failed transactions
      const result = await client.searchSingleIndex({
        indexName: input.indexName,
        searchParams: {
          query: "",
          hitsPerPage: 1000,
          facetFilters: [
            "contractType:nft",
            `collectionAddress:${input.collectionAddress}`,
          ],
        },
      });

      if (!result) return [];

      const tokenList = result?.hits
        ? (result as unknown as AlgoliaNftList)
        : undefined;

      // export interface INftParam {
      //   name: string;
      //   value: string;
      // }

      // export interface INft {
      //   id: number;
      //   imageType: string; // ipfs
      //   image: string; // link to ipfs
      //   owner: string | undefined;
      //   isMinted: boolean;
      //   price: number;
      //   params: INftParam[];
      // }

      const nfts = tokenList?.hits.map((hit) => {
        return {
          id: hit.tokenId,
          imageType: hit.collectionBaseURL,
          image: hit.image,
          owner: hit.owner,
          isMinted: true, // All NFT-s from algolia are minted
          price: 0,
          params: hit.metadata["traits"],
          collection: hit.collectionName,
          raw: hit,
        } as NFT;
      });

      return nfts;
    }),
});
