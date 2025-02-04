import { CONTACTS } from "@/constants/contacts";
import Link from "next/link";
import Image from "next/image";
import FaqAccordion from "../../features/FaqAccordion";
import { useEffect, useState } from "react";
import { IStrapiData, IStrapiResponse } from "../../lib/strapi/types";
import { strapiRequest } from "../../lib/strapi/strapiRequest";

interface IFaqItemData extends IStrapiData {
  title: string;
  content: string;
}

interface IFaqItemsResponse extends IStrapiResponse {
  data: IFaqItemData[];
}

export default function Faq() {
  const [openAccordionIdx, setOpenAccordionIdx] = useState<number | undefined>(
    undefined,
  );
  const [faqItems, setFaqItems] = useState<IFaqItemData[]>([]);

  useEffect(() => {
    strapiRequest({
      pluralApi: "faqs",
      fetchConfig: { revalidate: 600 },
    })
      .then((response: IFaqItemsResponse) => setFaqItems(response.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div id={"faq"} className={"flex w-full flex-col"}>
      <span className={"font-museo text-[1.667vw] font-bold text-foreground"}>
        Technical support
      </span>
      <span
        className={
          "mt-[0.781vw] w-1/2 font-plexsans text-[0.833vw] text-foreground"
        }
      >
        If you have any questions or notice any issues with the operation of our
        application, please do not hesitate to contact us. We will be more than
        happy to answer any questions you may have and try our best to solve any
        problems as soon as possible.
      </span>
      <div className={"mt-[2.083vw] flex flex-col gap-[0.781vw]"}>
        <span
          className={"font-museo text-[1.25vw] font-medium text-foreground"}
        >
          Contacts
        </span>
        <div className={"flex flex-row gap-[0.781vw]"}>
          {CONTACTS.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className={
                "group flex flex-row items-center justify-center gap-[0.521vw] rounded-[0.521vw] bg-[#252525] p-[1.563vw] shadow-2xl"
              }
            >
              <Image
                src={item.image}
                alt={"ZkNoid contacts"}
                className={"h-[1.25vw] w-[1.25vw]"}
              />
              <span
                className={
                  "font-plexsans text-[0.833vw] font-medium text-foreground group-hover:text-left-accent"
                }
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </div>
      <div className={"mt-[3.125vw] flex flex-col gap-[1.042vw]"}>
        <span className={"text-[1.667vw] font-bold font-museo text-foreground"}>
          FAQ
        </span>
        <div className={"grid grid-cols-2 gap-x-[0.781vw] gap-y-[1.042vw]"}>
          {faqItems.map((item, index) => (
            <FaqAccordion
              key={index}
              isOpen={index == openAccordionIdx}
              toggleOpen={() => {
                index != openAccordionIdx
                  ? setOpenAccordionIdx(index)
                  : setOpenAccordionIdx(undefined);
              }}
              content={item.content}
              title={item.title}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
