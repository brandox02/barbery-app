import dayjs from "dayjs";
import { timeToUnix } from "./timeToUnix";

export default function addTime({ time, date }) {
  const durationInMinutes = dayjs(timeToUnix(time)).get("minutes");
  const durationInHours = dayjs(timeToUnix(time)).get("hours");

  const added = dayjs.isDayjs(date)
    ? date
    : dayjs(date)
        .add(durationInMinutes, "minutes")
        .add(durationInHours, "hours");

  return added;
}
