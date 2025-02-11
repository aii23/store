import { AnyNFTItem } from "../../lib/types/nftTypes";
import { cn, formatAddress } from "@zknoid/sdk/lib/helpers";
import Image from "next/image";

export default function NFTItem({
  gridMode,
  nft,
  setChoosenID,
}: {
  gridMode: number;
  nft: AnyNFTItem;
  setChoosenID: (id: number) => void;
}) {
  return (
    <div
      className={cn(
        "bg-bg-grey lg:!rounded-[0.521vw] overflow-hidden",
        gridMode == 1
          ? "w-full h-[2.865vw] grid grid-cols-10 pl-[0.26vw] py-[0.26vw] items-center pr-[0.625vw]"
          : gridMode == 4
            ? "lg:!w-[15.208vw] lg:!h-[22vw] flex flex-col"
            : "lg:!w-[9.896vw] lg:!h-[16.6vw] flex flex-col",
      )}
    >
      <button
        onClick={() => setChoosenID(nft.id)}
        className={cn(
          "hover:opacity-80 overflow-hidden rounded-[0.26vw]",
          gridMode == 1 ? "w-[2.344vw] h-[2.344vw]" : "w-full h-full",
        )}
      >
        <Image
          src={`https://res.cloudinary.com/dw4kivbv0/image/upload/w_1000,f_auto,q_auto:best/v1/${nft.imageID}`}
          alt={`${nft.collectionID} + ${nft} NFT`}
          className={"w-full h-full object-contain object-center"}
          width={1000}
          height={1000}
        />
      </button>
      {gridMode == 1 ? (
        <>
          <span
            className={
              "col-span-3 font-museo text-foreground font-bold leading-[100%] text-[0.833vw]"
            }
          >
            {nft.collectionID.charAt(0).toUpperCase() +
              nft.collectionID.slice(1)}{" "}
            {nft.id < 100 ? "00" + nft.id : "0" + nft.id}
          </span>
          <span
            className={
              "col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans"
            }
          >
            {nft.price} MINA
          </span>
          {nft.owner ? (
            <span
              className={
                "col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans"
              }
            >
              {formatAddress(nft.owner)}
            </span>
          ) : (
            <span
              className={
                "col-span-2 text-foreground text-[0.833vw] leading-[110%] font-plexsans"
              }
            >
              Available for Mint
            </span>
          )}
          {nft.isMinted ? (
            <span
              className={
                "col-span-2 text-end text-left-accent text-[0.833vw] leading-[110%] font-plexsans"
              }
            >
              Already Minted
            </span>
          ) : (
            <div
              className={
                "col-span-2 bg-left-accent cursor-pointer hover:opacity-80 py-[0.313vw] rounded-[0.26vw] flex flex-col items-center justify-center w-full"
              }
            >
              <span
                className={
                  "font-museo text-bg-grey font-medium text-[0.833vw] leading-[100%]"
                }
              >
                Buy
              </span>
            </div>
          )}
        </>
      ) : (
        <div className={"p-[0.521vw] flex flex-col gap-[0.521vw]"}>
          <span
            className={cn(
              "font-museo text-foreground font-bold leading-[100%]",
              gridMode == 4 ? "text-[1.25vw]" : "text-[0.833vw]",
            )}
          >
            {nft.collectionID.charAt(0).toUpperCase() +
              nft.collectionID.slice(1)}{" "}
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
          {nft.isMinted ? (
            <div
              className={
                "py-[0.417vw] flex flex-col items-start justify-center w-full"
              }
            >
              <span
                className={
                  "lg:!text-[0.833vw] font-plexsans leading-[110%] text-left-accent"
                }
              >
                Already Minted
              </span>
            </div>
          ) : (
            <div
              className={
                "bg-left-accent cursor-pointer hover:opacity-80 py-[0.417vw] rounded-[0.26vw] flex flex-col items-center justify-center w-full"
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
          )}
        </div>
      )}
    </div>
  );
}
