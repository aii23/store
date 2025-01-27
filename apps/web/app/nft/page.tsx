"use client";

import NFTStorefront from "../../sections/NFTStorefront";
import Image from "next/image";
import { useEffect, useState } from "react";
import { algoliasearch, Hit } from "algoliasearch";
import { NFT, NFTCollectionIDList } from "../../lib/types/nftTypes";

const algoliaClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_PROJECT || "",
  process.env.NEXT_PUBLIC_ALGOLIA_KEY || "",
);

export default function Page() {
  const nftLength = 112;
  const nftTotalPrice = 11340;
  const nftMintedAmount = 54;

  const [collectionID, setCollectionID] = useState<NFTCollectionIDList>(
    NFTCollectionIDList.Zknoid,
  );
  const [collectionItems, setCollectionItems] = useState<NFT[]>([]);
  const [collectionItemsToRender, setCollectionItemsToRender] = useState<NFT[]>(
    [],
  );
  const [gridMode, setGridMode] = useState<1 | 4 | 6>(4);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    algoliaClient
      .searchSingleIndex({
        indexName: "dev_NFT",
        searchParams: {
          facetFilters: ["collection:-zknoid"],
        },
      })
      .then((resp) => {
        setCollectionItems(
          resp.hits.map(
            (value: Hit) =>
              ({
                id: value.id,
                imageID: value.imageID,
                collectionID: value.collectionID,
                owner: value.owner,
                isMinted: value.isMinted,
                price: value.price,
                expertise: value.expertise,
                race: value.race,
                rating: value.rating,
                skin: value.skin,
                edition: value.edition,
              }) as unknown as NFT,
          ),
        );
      })
      .catch((error) => {
        console.log("Algolia error", error);
      });
  }, [collectionID]);

  useEffect(() => {
    const itemsPerPage = gridMode == 4 ? 8 : 12;

    setCollectionItemsToRender(
      collectionItems.sort((a, b) => a.id - b.id).slice(0, itemsPerPage),
    );
  }, [collectionItems, gridMode, page]);

  return (
    <div className={"w-full"}>
      <div className={"relative w-full h-[117.647vw] lg:!h-[20.833vw]"}>
        <Image
          src={
            "https://res.cloudinary.com/dw4kivbv0/image/upload/w_3000,f_auto,fl_progressive:semi,q_auto:best/v1/store/nft/xnhhauzu6mliclwhb0ja"
          }
          alt={"NFTStorefront"}
          width={2000}
          height={800}
          className={
            "absolue left-0 top-0 w-full h-full object-center object-cover"
          }
        />
        <div
          className={
            "absolute left-0 top-0 flex flex-col w-full h-full px-[4.706vw] lg:!px-[2.604vw] py-[4.706vw] lg:!py-[1.563vw]"
          }
        >
          <div className={"flex items-start justify-end h-full w-full"}>
            <div
              className={
                "flex flex-row items-center lg:!gap-[0.521vw] lg:!p-[0.521vw] lg:!rounded-[0.521vw] backdrop-blur-[20px] bg-foreground/10"
              }
            >
              <span
                className={
                  "lg:!text-[1.667vw] font-plexsans font-bold leading-[100%] text-foreground"
                }
              >
                Traits Info
              </span>
              <svg
                width="27"
                height="28"
                viewBox="0 0 27 28"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={"lg:!w-[1.406vw] lg:!h-[1.406vw]"}
              >
                <circle cx="13.5" cy="14" r="13.5" fill="#F9F8F4" />
                <path
                  d="M14.508 19.344H12.42L12.252 7.056H14.652L14.508 19.344ZM14.676 24H12.276V21.648H14.676V24Z"
                  fill="#252525"
                />
              </svg>
            </div>
          </div>
          <div
            className={"w-full h-full flex flex-row justify-between items-end"}
          >
            <div className={"flex flex-col lg:!gap-[0.781vw]"}>
              <span
                className={
                  "text-foreground lg:!text-[1.667vw] font-bold font-plexsans leading-[100%]"
                }
              >
                ZkNoid Avatars Collection
              </span>
              <span
                className={
                  "text-foreground lg:!text-[0.833vw] font-plexsans leading-[110%] lg:!max-w-[20.313vw]"
                }
              >
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
                nunc enim, venenatis quis eleifend eget, accumsan id libero.
              </span>
            </div>
            <div className={"flex flex-row lg:!gap-[3.073vw]"}>
              <div
                className={
                  "lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 lg:!rounded-[0.521vw] flex flex-col lg:!gap-[0.521vw]"
                }
              >
                <span
                  className={
                    "text-foreground lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]"
                  }
                >
                  {nftLength}
                </span>
                <span
                  className={
                    "text-foreground lg:!text-[0.833vw] font-plexsans leading-[110%]"
                  }
                >
                  Total Volume
                </span>
              </div>
              <div
                className={
                  "lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 lg:!rounded-[0.521vw] flex flex-col lg:!gap-[0.521vw]"
                }
              >
                <span
                  className={
                    "text-foreground lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]"
                  }
                >
                  {nftTotalPrice} MINA
                </span>
                <span
                  className={
                    "text-foreground lg:!text-[0.833vw] font-plexsans leading-[110%]"
                  }
                >
                  Total price
                </span>
              </div>
              <div
                className={
                  "lg:!p-[0.521vw] backdrop-blur-[20px] bg-foreground/10 lg:!rounded-[0.521vw] flex flex-col lg:!gap-[0.521vw]"
                }
              >
                <span
                  className={
                    "text-foreground lg:!text-[1.667vw] font-plexsans font-bold leading-[100%]"
                  }
                >
                  {nftMintedAmount}
                </span>
                <span
                  className={
                    "text-foreground lg:!text-[0.833vw] font-plexsans leading-[110%]"
                  }
                >
                  Already Minted
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NFTStorefront
        collectionID={collectionID}
        setCollectionID={(value) => setCollectionID(value)}
        collectionItemsToRender={collectionItemsToRender}
        gridMode={gridMode}
        setGridMode={(value) => setGridMode(value)}
        page={page}
        setPage={setPage}
      />
    </div>
  );
}
