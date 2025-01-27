"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTriggerChevron,
  SelectTriggerPick,
  SelectValue,
} from "../../../../packages/sdk/components/shared/Select/Select";
import { cn } from "@zknoid/sdk/lib/helpers";
import Image from "next/image";
import { NFT, NFTCollectionIDList } from "../../lib/types/nftTypes";

enum PriceFilter {
  LowToHigh = "low-to-high",
  HighToLow = "high-to-low",
}

const NFTItem = ({ gridMode, nft }: { gridMode: number; nft: NFT }) => {
  return (
    <div
      className={cn(
        "bg-bg-grey lg:!rounded-[0.521vw] flex flex-col overflow-hidden",
        gridMode == 1
          ? "w-full h-[2.865vw]"
          : gridMode == 4
            ? "lg:!w-[15.208vw] lg:!h-[22vw]"
            : "lg:!w-[9.896vw] lg:!h-[16.6vw]",
      )}
    >
      <Image
        src={`https://res.cloudinary.com/dw4kivbv0/image/upload/w_1000,f_auto,q_auto:best/v1/${nft.imageID}`}
        alt={`${nft.collectionID} + ${nft} NFT`}
        className={"w-full h-full object-contain object-center"}
        width={1000}
        height={1000}
      />
      <div className={"p-[0.521vw] flex flex-col gap-[0.521vw]"}>
        <span
          className={cn(
            "font-museo text-foreground font-bold leading-[100%]",
            gridMode == 4 ? "text-[1.25vw]" : "text-[0.833vw]",
          )}
        >
          {nft.collectionID.charAt(0).toUpperCase() + nft.collectionID.slice(1)}{" "}
          {nft.id < 100 ? "00" + nft.id : "0" + nft.id}
        </span>
        <span
          className={cn(
            "text-foreground",
            gridMode == 4
              ? "text-[1.042vw] leading-[100%] font-museo font-medium"
              : gridMode == 6
                ? "text-[0.729vw] leading-[100%] font-museo font-medium"
                : "text-[0.833vw] leading-[110%] font-plexsans",
          )}
        >
          {nft.price} MINA
        </span>
        <div
          className={
            "bg-left-accent py-[0.417vw] rounded-[0.26vw] flex flex-col items-center justify-center w-full"
          }
        >
          <span
            className={
              "font-museo text-bg-grey font-medium text-[1.042vw] leading-[100%]"
            }
          >
            Buy
          </span>
        </div>
      </div>
    </div>
  );
};

export default function NFTStorefront({
  collectionID,
  setCollectionID,
  collectionItemsToRender,
  gridMode,
  setGridMode,
  page,
  setPage,
}: {
  collectionID: NFTCollectionIDList;
  setCollectionID: (collectionID: NFTCollectionIDList) => void;
  collectionItemsToRender: NFT[];
  gridMode: 1 | 4 | 6;
  setGridMode: (gridMode: 1 | 4 | 6) => void;
  page: number;
  setPage: (page: number) => void;
}) {
  return (
    <section
      className={
        "mx-auto w-[62.5vw] lg:!mt-[2.604vw] lg:!mb-[7.813vw] flex flex-col lg:!gap-[0.781vw]"
      }
    >
      <div className={"grid grid-cols-12 grid-rows-1 gap-[0.781vw]"}>
        <Select
          value={collectionID}
          onValueChange={(value) =>
            setCollectionID(value as NFTCollectionIDList)
          }
        >
          <SelectTriggerPick className="col-span-3">
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
            "col-span-5 bg-bg-grey lg:!rounded-[0.521vw] lg:!p-[0.781vw] flex flex-row justify-between items-center lg:!gap-[0.521vw]"
          }
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"lg:!w-[1.25vw] lg:!h-[1.25vw]"}
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
              "w-full placeholder:font-plexsans placeholder:lg:!text-[0.833vw] placeholder:text-foreground/50 placeholder:leading-[110%] font-plexsans lg:!text-[0.833vw] text-foreground leading-[110%] bg-transparent outline-none"
            }
            placeholder={"Search..."}
          />
        </div>
        <Select defaultValue={PriceFilter.LowToHigh}>
          <SelectTriggerChevron className="col-span-2">
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
            "col-span-2 bg-bg-grey lg:!rounded-[0.521vw] lg:!p-[0.21vw] flex flex-row items-center justify-between lg:!gap-[0.26vw] w-full"
          }
        >
          <button
            className={
              "flex flex-col items-center justify-center lg:!p-[0.521vw] hover:bg-[#373737] lg:!rounded-[0.26vw]"
            }
            onClick={() => setGridMode(4)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"lg:!w-[1.563vw] lg:!h-[1.563vw]"}
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
              "flex flex-col items-center justify-center lg:!p-[0.521vw] hover:bg-[#373737] lg:!rounded-[0.26vw]"
            }
            onClick={() => setGridMode(6)}
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"lg:!w-[1.563vw] lg:!h-[1.563vw]"}
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
              "flex flex-col items-center justify-center lg:!p-[0.521vw] hover:bg-[#373737] lg:!rounded-[0.26vw]"
            }
            onClick={() => setGridMode(1)}
          >
            <svg
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className={"lg:!w-[1.563vw] lg:!h-[1.563vw]"}
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
          "grid lg:!gap-[0.781vw]",
          gridMode == 1
            ? "grid-cols-1"
            : gridMode == 4
              ? "grid-cols-4"
              : "grid-cols-6",
        )}
      >
        {collectionItemsToRender.map((item, index) => (
          <NFTItem key={index} gridMode={gridMode} nft={item} />
        ))}
      </div>
    </section>
  );
}
