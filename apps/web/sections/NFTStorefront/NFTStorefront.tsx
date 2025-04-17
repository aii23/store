'use client';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerChevron,
  SelectTriggerPick,
  SelectValue,
} from '../../../../packages/sdk/components/shared/Select/Select';
import { cn } from '@zknoid/sdk/lib/helpers';
import { NFT, NFTCollectionIDList } from '../../lib/types/nftTypes';
import NFTDetailsModal from '../../widgets/NFTDetailsModal';
import { useState, useEffect } from 'react';
import NFTItem from '../../entities/NFTItem';
import { api } from '../../trpc/react';
import { InfinityScroll } from '../../features/InfinityScroll';
import { motion } from 'framer-motion';
import Search from './Search';
import { useSearchParams } from 'next/navigation';

const mockedCollectionsQuery = {
  ZkNoid_test: {
    version: 'v3',
    indexName: 'standard-devnet',
    collectionAddress: 'B62qpqH2ae7wrAzvBH31sacj9yTeCvMhz5Hx8obfm9onQrBwBeTkKVE',
  },
  Tileville: {
    version: 'v2',
    indexName: 'mainnet',
    collectionName: 'Tileville',
  },
};

enum PriceFilter {
  LowToHigh = 'low-to-high',
  HighToLow = 'high-to-low',
}

function LoadingComponent({ gridMode }: { gridMode: 1 | 4 | 6 }) {
  return (
    <div
      className={cn(
        'relative w-[1.563vw] h-[1.563vw] mx-auto mt-[1.563vw]',
        gridMode === 1 ? 'col-span-1' : gridMode === 4 ? 'col-span-4' : 'col-span-6'
      )}
    >
      <motion.span
        className={
          'w-[1.563vw] h-[1.563vw] absolute left-0 top-0 box-border block rounded-[50%] border-[0.365vw] border-solid border-t-left-accent border-[#252525]'
        }
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          ease: 'easeInOut',
          duration: 1,
        }}
      />
    </div>
  );
}

const NFTStorefront = ({
  collectionID,
  setCollectionID,
  gridMode,
  setGridMode,
}: {
  collectionID: NFTCollectionIDList;
  setCollectionID: (value: NFTCollectionIDList) => void;
  gridMode: 1 | 4 | 6;
  setGridMode: (value: 1 | 4 | 6) => void;
}) => {
  const params = useSearchParams();
  const [page, setPage] = useState<number>(1);
  const [choosenNFTID, setChoosenNFTID] = useState<string | undefined>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [collectionItems, setCollectionItems] = useState<NFT[] | undefined>(undefined);
  const [searchedItems, setSearchedItems] = useState<NFT[] | undefined>(undefined);
  const [searchedMeta, setSearchedMeta] = useState<
    { page: number; totalPages: number } | undefined
  >(undefined);
  const [searchStatus, setSearchStatus] = useState<'idle' | 'loading' | 'stalled' | 'error'>(
    'idle'
  );
  const collectionName = params.get('collection');

  const { data: collectionItemsData, isLoading } = api.http.nft.getCollectionsNFT.useQuery({
    ...(collectionID == NFTCollectionIDList.Zknoid
      ? mockedCollectionsQuery.ZkNoid_test
      : mockedCollectionsQuery.Tileville),
    page: page,
    hitsPerPage: 20,
  });

  useEffect(() => {
    if (collectionName) {
      setCollectionID(collectionName as NFTCollectionIDList);
    }
  }, [collectionName]);

  useEffect(() => {
    setCollectionItems([]);
    setPage(1);
    setHasMore(false);
  }, [collectionID]);

  // For initial data
  useEffect(() => {
    // if (searchedItems && searchedItems.length != 0) return;

    if (isLoading) return;
    if (!collectionItemsData || !('meta' in collectionItemsData)) return;

    if (collectionItemsData.meta.totalPages) {
      setHasMore(collectionItemsData.meta.totalPages > page);
    }
  }, [collectionItemsData, isLoading, page]);

  useEffect(() => {
    // if (searchedItems && searchedItems.length != 0) return;

    if (!collectionItemsData || !('nfts' in collectionItemsData)) return;

    if (page === 1) {
      setCollectionItems(collectionItemsData.nfts);
    } else {
      setCollectionItems((prev) => [...(prev || []), ...collectionItemsData.nfts]);
    }
  }, [collectionItemsData, page]);

  // TODO: Implement search pagination

  // For search
  // useEffect(() => {
  //   if (!searchedItems || searchedItems.length == 0 || !searchedMeta) return;

  //   if (searchStatus === 'loading') return;
  //   if (searchedMeta.totalPages) {
  //     setHasMore(searchedMeta.totalPages > page);
  //   }
  // }, [searchedItems, searchedMeta, page, searchStatus]);

  // useEffect(() => {
  //   if (!searchedItems || searchedItems.length === 0 || !searchedMeta) return;

  //   if (page === 1) {
  //     setCollectionItems(searchedItems);
  //   } else {
  //     setCollectionItems((prev) => [...(prev || []), ...searchedItems]);
  //   }
  // }, [searchedItems, searchedMeta, page]);

  return (
    <section
      className={
        'mx-[4.706vw] lg:!mx-auto lg:!w-[62.5vw] mt-[8.235vw] lg:!mt-[2.604vw] mb-[35.294vw] lg:!mb-[7.813vw] flex flex-col gap-[4.706vw] lg:!gap-[0.781vw]'
      }
    >
      <div
        className={
          'grid grid-rows-2 lg:!grid-rows-1 gap-[4.706vw] lg:!gap-[0.781vw] lg:!grid-cols-[repeat(16,minmax(0,1fr))] grid-cols-2'
        }
      >
        <Select
          value={collectionID}
          onValueChange={(value) => setCollectionID(value as NFTCollectionIDList)}
        >
          <SelectTriggerPick className="lg:!col-span-4">
            <span>Collection: </span>
            <SelectValue />
          </SelectTriggerPick>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={NFTCollectionIDList.Zknoid}>ZkNoid</SelectItem>
              <SelectItem value={NFTCollectionIDList.Tileville}>Tileville</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Search
          collection={
            collectionID === NFTCollectionIDList.Zknoid
              ? mockedCollectionsQuery.ZkNoid_test
              : mockedCollectionsQuery.Tileville
          }
          setSearchedItems={setSearchedItems}
          setSearchedMeta={setSearchedMeta}
          setSearchStatus={setSearchStatus}
          page={page}
        />
        <Select defaultValue={PriceFilter.LowToHigh}>
          <SelectTriggerChevron className="lg:!col-span-3">
            <span>Price: </span>
            <SelectValue />
          </SelectTriggerChevron>
          <SelectContent>
            <SelectGroup>
              <SelectItem value={PriceFilter.LowToHigh}>Low to High</SelectItem>
              <SelectItem value={PriceFilter.HighToLow}>High to Low</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <div
          className={
            'hidden col-span-2 bg-bg-grey lg:!rounded-[0.521vw] lg:!p-[0.21vw] lg:!flex flex-row items-center justify-center gap-0 w-full'
          }
        >
          <button
            className={
              'flex flex-col items-center justify-center lg:!p-[0.417vw] hover:bg-[#373737] lg:!rounded-[0.26vw]'
            }
            onClick={() => setGridMode(4)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={'lg:!w-[1.25vw] lg:!h-[1.25vw]'}
            >
              <path
                d="M12 3V21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 12H21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={
              'flex flex-col items-center justify-center lg:!p-[0.417vw] hover:bg-[#373737] lg:!rounded-[0.26vw]'
            }
            onClick={() => setGridMode(6)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={'lg:!w-[1.25vw] lg:!h-[1.25vw]'}
            >
              <path
                d="M19 3H5C3.89543 3 3 3.89543 3 5V19C3 20.1046 3.89543 21 5 21H19C20.1046 21 21 20.1046 21 19V5C21 3.89543 20.1046 3 19 3Z"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 9H21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M3 15H21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M9 3V21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M15 3V21"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className={
              'flex flex-col items-center justify-center lg:!p-[0.417vw] hover:bg-[#373737] lg:!rounded-[0.26vw]'
            }
            onClick={() => setGridMode(1)}
          >
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={'lg:!w-[1.25vw] lg:!h-[1.25vw]'}
            >
              <path
                d="M2.875 12H2.885"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.875 18H2.885"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.875 6H2.885"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66406 12H20.1224"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66406 18H20.1224"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M7.66406 6H20.1224"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-[4.706vw] lg:!gap-[0.781vw]">
        {gridMode == 1 && (
          <div className={'hidden lg:!grid grid-cols-10 border-b border-[#373737] py-[0.521vw]'}>
            <span
              className={
                'col-start-2 col-span-3 font-plexsans leading-[110%] text-[0.833vw] text-foreground'
              }
            >
              Item
            </span>
            <span
              className={'col-span-2 font-plexsans leading-[110%] text-[0.833vw] text-foreground'}
            >
              Price
            </span>
            <span
              className={'col-span-2 font-plexsans leading-[110%] text-[0.833vw] text-foreground'}
            >
              Owner
            </span>
          </div>
        )}
        {(collectionItems || searchedItems) && (
          <InfinityScroll
            items={
              searchedItems && searchedItems.length > 0 ? searchedItems : collectionItems || []
            }
            page={page}
            setPage={setPage}
            loading={isLoading}
            hasMore={hasMore}
            renderItem={(item: NFT) => (
              <NFTItem gridMode={gridMode} nft={item} setChoosenID={setChoosenNFTID} />
            )}
            loadingComponent={<LoadingComponent gridMode={gridMode} />}
            className={cn(
              'grid gap-[4.706vw] lg:!gap-[0.781vw] grid-cols-2',
              gridMode == 1
                ? 'lg:!grid-cols-1'
                : gridMode == 4
                  ? 'lg:!grid-cols-4'
                  : 'lg:!grid-cols-6'
            )}
          />
        )}
      </div>

      {(collectionItems || searchedItems) && (
        <NFTDetailsModal
          nft={
            searchedItems && searchedItems.length != 0
              ? searchedItems.find((item) => item.raw.address === choosenNFTID)
              : collectionItems && collectionItems.find((item) => item.raw.address === choosenNFTID)
          }
          isOpen={choosenNFTID != undefined}
          onClose={() => setChoosenNFTID(undefined)}
        />
      )}
    </section>
  );
};

export default NFTStorefront;
