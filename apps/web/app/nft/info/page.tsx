import Image from "next/image";
import Link from "next/link";
import frogWarriorIMG from "@/public/image/nft/frog-warrior.svg";
import dragonKingIMG from "@/public/image/nft/dragon-king.svg";
import frogWarriorHatIMG from "@/public/image/nft/frog-warrior-hat.svg";
import frogWizardIMG from "@/public/image/nft/frog-wizard.svg";

export default function InfoPage() {
  const nftLength = 112;
  const nftTotalPrice = 11340;
  const nftMintedAmount = 54;
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
            <Link
              href={"/nft/info"}
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
            </Link>
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
      <section
        className={
          "mx-auto w-[62.5vw] lg:!mt-[2.604vw] lg:!mb-[7.813vw] flex flex-col lg:!gap-[0.781vw]"
        }
      >
        <div className={"flex flex-row lg:!gap-[0.781vw]"}>
          <div
            className={
              "w-full bg-[#252525] rounded-[0.26vw] flex flex-col p-[0.781vw]"
            }
          >
            <span
              className={
                "text-[1.667vw] font-medium font-museo text-foreground"
              }
            >
              Suitability Rating
            </span>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Gold
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The most valuable NFTs are gold, they differ in that the
                reptiles in them have the rarest characteristics of appearance
                and expertise
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Silver
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The silver NFT consist of reptiles who have one rarest
                characteristics or expertise.
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Bronze
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The bronze NFT consist of the less rarest characteristics but as
                cute as another classes above.
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
          </div>
          <div
            className={
              "w-full bg-[#252525] rounded-[0.26vw] flex flex-col p-[0.781vw]"
            }
          >
            <span
              className={
                "text-[1.667vw] font-medium font-museo text-foreground"
              }
            >
              Race
            </span>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Dragon
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The dragon is a mythical creature endowed with great power and
                magical properties. Dragons are always protecting something
                important and valuable.
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Frog
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The frog is a freshwater reptile devoid of a tail, but capable
                of jumping incredible distances.
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
            <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
              <span
                className={
                  "font-plexsans font-medium leading-[110%] text-foreground text-[1.042vw]"
                }
              >
                Lizard
              </span>
              <span
                className={
                  "font-plexsans leading-[110%] text-foreground text-[0.833vw]"
                }
              >
                The lizard is a fast and agile reptile endowed with the ability
                to regrow new body parts for itself.
              </span>
              <div className={"flex flex-row gap-[0.521vw] items-center"}>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Rarity: 10%
                </span>
                <span
                  className={
                    "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                  }
                >
                  Quantity: 10
                </span>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "w-full bg-[#252525] rounded-[0.26vw] flex flex-col p-[0.781vw]"
          }
        >
          <span
            className={"text-[1.667vw] font-medium font-museo text-foreground"}
          >
            Skin
          </span>
          <span
            className={
              "font-plexsans my-[0.521vw] leading-[110%] text-foreground text-[0.833vw] max-w-[50%]"
            }
          >
            Skin of the ZkNoid reptiles have a different colors, some colors you
            may meet more often and some less. The rarity of the creature
            depends on it.
          </span>
          <div className={"flex flex-row gap-[0.781vw] items-center"}>
            <div className={"flex flex-col gap-[0.26vw] items-center"}>
              <div
                className={
                  "w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#FF5B23] rounded-full"
                }
              />
              <span
                className={
                  "text-[0.833vw] font-plexsans leading-[110%] font-semibold"
                }
              >
                Red
              </span>
              <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
                34%
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw] items-center"}>
              <div
                className={
                  "w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#D6C1FF] rounded-full"
                }
              />
              <span
                className={
                  "text-[0.833vw] font-plexsans leading-[110%] font-semibold"
                }
              >
                Purple
              </span>
              <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
                15%
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw] items-center"}>
              <div
                className={
                  "w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#D2FF00] rounded-full"
                }
              />
              <span
                className={
                  "text-[0.833vw] font-plexsans leading-[110%] font-semibold"
                }
              >
                Yellow
              </span>
              <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
                46%
              </span>
            </div>
            <div className={"flex flex-col gap-[0.26vw] items-center"}>
              <div
                className={
                  "w-[3.125vw] h-[3.125vw] mb-[0.26vw] bg-[#121212] rounded-full"
                }
              />
              <span
                className={
                  "text-[0.833vw] font-plexsans leading-[110%] font-semibold"
                }
              >
                Black
              </span>
              <span className={"text-[0.833vw] font-plexsans leading-[110%]"}>
                12%
              </span>
            </div>
          </div>
        </div>
        <div
          className={
            "w-full bg-[#252525] rounded-[0.26vw] flex flex-col p-[0.781vw]"
          }
        >
          <span
            className={
              "text-[1.667vw] font-medium font-museo text-foreground mb-[0.781vw]"
            }
          >
            Expertise
          </span>
          <div className={"grid grid-cols-2 gap-[1.042vw]"}>
            <div className={"flex flex-row gap-[0.781vw]"}>
              <div
                className={
                  "h-full w-fit flex flex-col justify-start items-start"
                }
              >
                <div
                  className={
                    "w-[4.583vw] h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]"
                  }
                >
                  <Image
                    src={frogWarriorIMG}
                    alt={"Frog warrior"}
                    className={"object-bottom object-contain w-full h-full"}
                  />
                </div>
              </div>
              <div className={"flex flex-col gap-[0.26vw]"}>
                <span
                  className={
                    "text-[1.042vw] font-medium font-plexsans text-foreground leading-[11%] my-[0.26vw]"
                  }
                >
                  Warrior
                </span>
                <span
                  className={
                    "font-plexsans mb-[0.26vw] leading-[110%] text-foreground text-[0.833vw]"
                  }
                >
                  A strong and loyal character, a true defender and warrior who
                  keeps calm in the world of reptiles.
                </span>
                <div className={"flex flex-row gap-[0.521vw] items-center"}>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Rarity: 10%
                  </span>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Quantity: 10
                  </span>
                </div>
              </div>
            </div>
            <div className={"flex flex-row gap-[0.781vw]"}>
              <div
                className={
                  "h-full w-fit flex flex-col justify-start items-start"
                }
              >
                <div
                  className={
                    "w-[4.583vw] h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]"
                  }
                >
                  <Image
                    src={dragonKingIMG}
                    alt={"Dragon King"}
                    className={"object-bottom object-contain w-full h-full"}
                  />
                </div>
              </div>
              <div className={"flex flex-col gap-[0.26vw]"}>
                <span
                  className={
                    "text-[1.042vw] font-medium font-plexsans text-foreground leading-[11%] my-[0.26vw]"
                  }
                >
                  King
                </span>
                <span
                  className={
                    "font-plexsans mb-[0.26vw] leading-[110%] text-foreground text-[0.833vw]"
                  }
                >
                  The true master of all reptiles!
                </span>
                <div className={"flex flex-row gap-[0.521vw] items-center"}>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Rarity: 10%
                  </span>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Quantity: 10
                  </span>
                </div>
              </div>
            </div>
            <div className={"flex flex-row gap-[0.781vw]"}>
              <div
                className={
                  "h-full w-fit flex flex-col justify-start items-start"
                }
              >
                <div
                  className={
                    "w-[4.583vw] h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]"
                  }
                >
                  <Image
                    src={frogWizardIMG}
                    alt={"Frog wizard"}
                    className={"object-bottom object-contain w-full h-full"}
                  />
                </div>
              </div>
              <div className={"flex flex-col gap-[0.26vw]"}>
                <span
                  className={
                    "text-[1.042vw] font-medium font-plexsans text-foreground leading-[11%] my-[0.26vw]"
                  }
                >
                  Wizard
                </span>
                <span
                  className={
                    "font-plexsans mb-[0.26vw] leading-[110%] text-foreground text-[0.833vw]"
                  }
                >
                  A magical creature that provides comfort to the world of
                  reptiles and takes care of the inhabitants, making their lives
                  better with the help of magic.
                </span>
                <div className={"flex flex-row gap-[0.521vw] items-center"}>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Rarity: 10%
                  </span>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Quantity: 10
                  </span>
                </div>
              </div>
            </div>
            <div className={"flex flex-row gap-[0.781vw]"}>
              <div
                className={
                  "h-full w-fit flex flex-col justify-start items-start"
                }
              >
                <div
                  className={
                    "w-[4.583vw] h-[4.583vw] rounded-full overflow-hidden flex justify-center items-center bg-[#121212]"
                  }
                >
                  <Image
                    src={frogWarriorHatIMG}
                    alt={"Frog warrior hat"}
                    className={"object-bottom object-contain w-full h-full"}
                  />
                </div>
              </div>
              <div className={"flex flex-col gap-[0.26vw]"}>
                <span
                  className={
                    "text-[1.042vw] font-medium font-plexsans text-foreground leading-[11%] my-[0.26vw]"
                  }
                >
                  Villagers
                </span>
                <span
                  className={
                    "font-plexsans mb-[0.26vw] leading-[110%] text-foreground text-[0.833vw]"
                  }
                >
                  An ordinary inhabitant of the reptilian world, among them
                  there are peasants, artisans and other lovers of a quiet life.
                </span>
                <div className={"flex flex-row gap-[0.521vw] items-center"}>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Rarity: 10%
                  </span>
                  <span
                    className={
                      "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212] text-[0.833vw]"
                    }
                  >
                    Quantity: 10
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div
          className={
            "w-full bg-[#252525] rounded-[0.26vw] flex flex-col p-[0.781vw]"
          }
        >
          <span
            className={"text-[1.667vw] font-medium font-museo text-foreground"}
          >
            Edition
          </span>
          <div className={"flex flex-col gap-[0.521vw] my-[0.521vw]"}>
            <span
              className={
                "font-plexsans leading-[110%] text-foreground text-[0.833vw] max-w-[50%]"
              }
            >
              The first ZkNoid NFT Avatars collection consist of 100 items
            </span>
            <div className={"flex flex-row gap-[0.521vw] items-center"}>
              <span
                className={
                  "py-[0.26vw] px-[0.521vw] rounded-[0.26vw] bg-[#121212]"
                }
              >
                Quantity: 100
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
