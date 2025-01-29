import { DateTime, DurationObjectUnits, Interval } from "luxon";
import { useEffect, useState } from "react";

export enum ZkNoidEventType {
  PAST_EVENTS = "Past events",
  CURRENT_EVENTS = "Current events",
  UPCOMING_EVENTS = "Upcoming events",
}

export const ALL_GAME_EVENT_TYPES = [
  ZkNoidEventType.PAST_EVENTS,
  ZkNoidEventType.CURRENT_EVENTS,
  ZkNoidEventType.UPCOMING_EVENTS,
];

export type ZkNoidEvent = {
  eventStarts: number;
  eventEnds: number;
  link?: string;
  imageID: string;
  priority: number;
};

export const getEventType = (event: ZkNoidEvent): ZkNoidEventType => {
  const now = Date.now();

  if (event.eventStarts > now) return ZkNoidEventType.UPCOMING_EVENTS;

  if (event.eventEnds > now) return ZkNoidEventType.CURRENT_EVENTS;

  return ZkNoidEventType.PAST_EVENTS;
};

const getEventTime = (event: ZkNoidEvent) => {
  const now = DateTime.now();
  let comparedTime;

  if (event.eventStarts > now.toMillis()) {
    comparedTime = event.eventStarts;
  } else if (event.eventEnds > now.toMillis()) {
    comparedTime = event.eventEnds;
  } else {
    comparedTime = event.eventEnds;
  }

  return Interval.fromDateTimes(now, DateTime.fromMillis(comparedTime))
    .toDuration(["days", "hours", "minutes", "seconds"])
    .toObject();
};

export const useEventTimer = (event: ZkNoidEvent) => {
  const [type, setType] = useState<ZkNoidEventType>();
  const [startsIn, setStartsIn] = useState<DurationObjectUnits>();

  useEffect(() => {
    const newType = getEventType(event);
    const newTime = getEventTime(event);

    setType(newType);
    setStartsIn(newTime);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newType = getEventType(event);
      const newTime = getEventTime(event);

      setType(newType);
      setStartsIn(newTime);
    }, 1000);
    return () => clearInterval(interval);
  }, [event]);

  return { type, startsIn };
};
