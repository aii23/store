"use client";

import {
  ALL_GAME_EVENT_TYPES,
  getEventType,
  useEventTimer,
  ZkNoidEvent,
  ZkNoidEventType,
} from "@zknoid/sdk/lib/platform/game_events";
import Lottie from "react-lottie";
import SnakeNoEvents from "../../lib/assets/ZKNoid_Snake_Intro_03_05.json";
import { cn } from "@zknoid/sdk/lib/helpers";
import Link from "next/link";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "framer-motion";
import {
  IStrapiData,
  IStrapiImage,
  IStrapiResponse,
} from "../../lib/strapi/types";
import { strapiRequest } from "../../lib/strapi/strapiRequest";

interface IEventData extends IStrapiData {
  eventStarts: string;
  eventEnds: string;
  link?: string;
  image: IStrapiImage;
  priority: number;
}

interface IEventsResponse extends IStrapiResponse {
  data: IEventData[];
}

export const EventFilter = ({
  eventType,
  selected,
  typesSelected,
  setTypesSelected,
}: {
  eventType: ZkNoidEventType;
  typesSelected: ZkNoidEventType[];
  setTypesSelected: (types: ZkNoidEventType[]) => void;
  selected?: boolean;
}) => {
  return (
    <button
      className={cn(
        "rounded-[0.26vw] border border-foreground px-[0.521vw] py-[0.26vw] text-center font-plexsans text-[0.833vw] text-foreground",

        selected
          ? "border-left-accent bg-left-accent text-bg-dark"
          : "cursor-pointer hover:border-left-accent hover:text-left-accent",
      )}
      onClick={() => setTypesSelected([eventType])}
    >
      {eventType}
    </button>
  );
};

export const EventItem = ({ event }: { event: ZkNoidEvent }) => {
  const eventCounter = useEventTimer(event);
  const time = eventCounter.startsIn
    ? `${eventCounter.startsIn.days}d ${
        eventCounter.startsIn.hours
      }:${eventCounter.startsIn.minutes}:${Math.trunc(
        eventCounter.startsIn.seconds!,
      )}`
    : "";

  return (
    <div
      className={
        "flex flex-col group relative border ml-[0.781vw] border-left-accent rounded-[0.26vw] min-w-0 flex-[0_0_49.5%]"
      }
    >
      <div
        className={
          "h-full flex flex-col p-[1.042vw] gap-[0.521vw] absolute left-0 top-0"
        }
      >
        {time.length > 0 && (
          <span className={cn("text-[1.563vw] font-museo font-medium mt-auto")}>
            {eventCounter.type == ZkNoidEventType.UPCOMING_EVENTS && (
              <>START IN {time}</>
            )}
            {eventCounter.type == ZkNoidEventType.CURRENT_EVENTS && (
              <>END IN {time}</>
            )}
          </span>
        )}
      </div>
      <div className={"w-full h-full overflow-hidden rounded-[0.13vw]"}>
        <Image
          src={`https://res.cloudinary.com/dw4kivbv0/image/upload/w_1600,f_auto,fl_progressive:semi,q_auto:best/v1738156358/${event.imageID}`}
          width={700}
          height={700}
          alt={"Event image"}
          className={"w-full h-full object-center object-cover"}
        />
      </div>
      <div
        className={
          "absolute -bottom-[1px] z-[1] -right-[1px] flex flex-col justify-end items-end pt-[0.375vw] pl-[0.375vw] rounded-tl-[0.26vw] border-t border-l border-left-accent bg-bg-grey"
        }
      >
        <div
          className={
            "group-hover:bg-left-accent bg-bg-grey py-[0.781vw] px-[1.25vw] rounded-[0.26vw] flex flex-col justify-center items-center border border-left-accent"
          }
        >
          <svg
            width="27"
            height="45"
            viewBox="0 0 27 45"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={"w-[1.042vw] h-[2.083vw]"}
          >
            <path
              d="M2.86182 2.73242L22.6674 22.5658L2.86182 42.3991"
              stroke="#D2FF00"
              strokeWidth="5.66667"
              className={"group-hover:stroke-bg-grey"}
            />
          </svg>
        </div>
      </div>
      {event.link && (
        <Link
          href={event.link}
          className={"absolute left-0 top-0 w-full h-full"}
        />
      )}
    </div>
  );
};

export default function Events({
  eventTypesSelected,
  setEventTypesSelected,
}: {
  eventTypesSelected: ZkNoidEventType[];
  setEventTypesSelected: (eventTypes: ZkNoidEventType[]) => void;
}) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    startIndex: 0,
    align: "start",
    containScroll: false,
    slidesToScroll: 1,
    skipSnaps: true,
    loop: true,
  });

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [gameEvents, setGameEvents] = useState<ZkNoidEvent[]>([]);

  const onSelect = useCallback((emblaApi: any) => {
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, []);

  useEffect(() => {
    strapiRequest({
      pluralApi: "events",
      populate: true,
      fetchConfig: { revalidate: 600 },
    })
      .then((response: IEventsResponse) =>
        setGameEvents(
          response.data.map((item) => {
            return {
              eventStarts: new Date(item.eventStarts).getTime(),
              eventEnds: new Date(item.eventEnds).getTime(),
              link: item.link,
              imageID: item.image.provider_metadata.public_id,
              priority: item.priority,
            };
          }),
        ),
      )
      .catch((err) => console.error("Fetch error: ", err));
  }, []);

  const filteredEvents = gameEvents
    .filter(
      (x) =>
        eventTypesSelected.includes(getEventType(x)) ||
        eventTypesSelected.length == 0,
    )
    .sort((a, b) => b.priority - a.priority);

  useEffect(() => {
    const isCurrentEvent =
      gameEvents.filter(
        (item) => item.eventStarts < Date.now() && item.eventEnds > Date.now(),
      ).length != 0;
    const isUpcomingEvent =
      gameEvents.filter((item) => item.eventStarts > Date.now()).length != 0;

    setEventTypesSelected(
      isCurrentEvent
        ? [ZkNoidEventType.CURRENT_EVENTS]
        : isUpcomingEvent
          ? [ZkNoidEventType.UPCOMING_EVENTS]
          : [ZkNoidEventType.PAST_EVENTS],
    );
  }, [gameEvents]);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);

    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div id={"events"} className="flex flex-col gap-[0.833vw]">
      <span className={"font-museo text-[1.667vw] font-bold text-foreground"}>
        Events & Competitions
      </span>
      <div className={"flex flex-row gap-[0.781vw]"}>
        {ALL_GAME_EVENT_TYPES.map((eventType) => (
          <EventFilter
            key={eventType}
            eventType={eventType}
            typesSelected={eventTypesSelected}
            setTypesSelected={setEventTypesSelected}
            selected={eventTypesSelected.includes(eventType)}
          />
        ))}
      </div>
      {filteredEvents.length == 0 && (
        <div className="h-[352px] w-fit">
          <Lottie
            options={{
              animationData: SnakeNoEvents,
              rendererSettings: {
                className: "z-0 h-full",
              },
            }}
          ></Lottie>
        </div>
      )}
      {filteredEvents.length > 0 && (
        <div className="w-full overflow-hidden" ref={emblaRef}>
          <div className={"flex flex-row w-full"}>
            {filteredEvents.map((event, index) => (
              <EventItem key={index} event={event} />
            ))}
          </div>
        </div>
      )}
      <div className={"flex flex-row gap-[0.182vw] mx-auto mt-[0.781vw]"}>
        {[...Array(filteredEvents.length)].map((_, index) => (
          <motion.div
            key={index}
            className={"h-[0.313vw] rounded-full border-left-accent border"}
            animate={
              index == selectedIndex
                ? { backgroundColor: "#D2FF00", width: "0.938vw" }
                : { width: "0.313vw" }
            }
          />
        ))}
      </div>
    </div>
  );
}
