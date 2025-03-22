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
import { useState } from 'react';
import NFTItem from '../../entities/NFTItem';

enum PriceFilter {
  LowToHigh = 'low-to-high',
  HighToLow = 'high-to-low',
}

export default function NFTStorefront({
  collectionID,
  setCollectionID,
  collectionItems,
  gridMode,
  setGridMode,
  page,
  setPage,
}: {
  collectionID: NFTCollectionIDList;
  setCollectionID: (collectionID: NFTCollectionIDList) => void;
  collectionItems: NFT[];
  gridMode: 1 | 4 | 6;
  setGridMode: (gridMode: 1 | 4 | 6) => void;
  page: number;
  setPage: (page: number) => void;
}) {
  const [choosenNFTID, setChoosenNFTID] = useState<string | undefined>(undefined);
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
            </SelectGroup>
          </SelectContent>
        </Select>
        <div
          className={
            'lg:!col-span-7 col-span-2 row-start-1 bg-bg-grey rounded-[2.353vw] lg:!rounded-[0.521vw] p-[4.706vw] lg:!p-[0.781vw] flex flex-row justify-between items-center gap-[2.353vw] lg:!gap-[0.521vw]'
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={'w-[5.647vw] lg:!w-[1.25vw] h-[5.647vw] lg:!h-[1.25vw]'}
          >
            <g opacity="0.5">
              <path
                d="M11 19C15.4183 19 19 15.4183 19 11C19 6.58172 15.4183 3 11 3C6.58172 3 3 6.58172 3 11C3 15.4183 6.58172 19 11 19Z"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M21.0031 21.0002L16.7031 16.7002"
                stroke="#F9F8F4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </svg>
          <input
            className={
              'w-full placeholder:font-plexsans placeholder:text-[3.765vw] placeholder:lg:!text-[0.833vw] placeholder:text-foreground/50 placeholder:leading-[110%] font-plexsans text-[3.765vw] lg:!text-[0.833vw] text-foreground leading-[110%] bg-transparent outline-none'
            }
            placeholder={'Search...'}
          />
        </div>
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
      <div
        className={cn(
          'grid gap-[4.706vw] lg:!gap-[0.781vw] grid-cols-2',
          gridMode == 1 ? 'lg:!grid-cols-1' : gridMode == 4 ? 'lg:!grid-cols-4' : 'lg:!grid-cols-6'
        )}
      >
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
        {collectionItems.map((item, index) => (
          <NFTItem key={index} gridMode={gridMode} nft={item} setChoosenID={setChoosenNFTID} />
        ))}
      </div>
      <NFTDetailsModal
        nft={collectionItems.find((item) => item.id === choosenNFTID) || collectionItems[0]}
        isOpen={choosenNFTID != undefined}
        onClose={() => setChoosenNFTID(undefined)}
      />
    </section>
  );
}
