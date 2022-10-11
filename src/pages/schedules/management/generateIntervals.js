import dayjs from "dayjs";
import { useMemo } from "react";
dayjs.extend(require("dayjs/plugin/isBetween"));

const timeToUnix = (time) => {
  const hours = parseInt(time.substring(0, 3));
  const minutes = parseInt(time.substring(3, 6));
  const seconds = parseInt(time.substring(6, 8));

  const date = new Date();
  date.setHours(hours);
  date.setMinutes(minutes);
  date.setSeconds(seconds);

  const unixTime = date.getTime();

  return unixTime;
};

const schedules = [
  {
    start: "00:00:00",
    end: "05:30:00",
    type: "non-work",
  },
  {
    start: "09:00:00",
    end: "10:00:00",
    type: "non-avaible",
  },
  {
    start: "12:00:00",
    end: "14:00:00",
    type: "non-work",
  },
  {
    start: "23:00:00",
    end: "23:59:00",
    type: "non-work",
  },
];

const duration = "00:50:00";

const isChoken = ({ time, duration, startTime, endTime }) => {
  const durationInMinutes = dayjs(timeToUnix(duration)).get("minutes");
  const durationInHours = dayjs(timeToUnix(duration)).get("hours");

  const timeWithDurationAdded = dayjs(timeToUnix(time))
    .add(durationInMinutes, "minutes")
    .add(durationInHours, "hours");

  if (
    dayjs(timeToUnix(time)).isBetween(
      timeToUnix(startTime),
      timeToUnix(endTime),
      "time",
      "()"
    ) ||
    timeWithDurationAdded.isBetween(
      timeToUnix(startTime),
      timeToUnix(endTime),
      "time",
      "()"
    )
  ) {
    return true;
  } else {
    const isBeforeOrSameTheStart =
      dayjs(timeToUnix(time)).isBefore(timeToUnix(startTime)) ||
      dayjs(timeToUnix(time)).isSame(timeToUnix(startTime));

    const isAfterOrSameTheEnd =
      timeWithDurationAdded.isAfter(timeToUnix(endTime)) ||
      timeWithDurationAdded.isSame(timeToUnix(endTime));

    if (isBeforeOrSameTheStart && isAfterOrSameTheEnd) {
      return true;
    }
  }
  return false;
};

// console.log(
//   "Showing result: ",
//   isChoken({
//     time: "08:00:00",
//     duration: "02:00:00",
//     startTime: "09:00:00",
//     endTime: "10:00:00",
//   })
// );

const generateIntervals = (time) => {
  const minutes =
    dayjs(timeToUnix(time)).get("minutes") +
    dayjs(timeToUnix(time)).get("hours") * 60;

  const totalMinutes24 = 24 * 60;
  const arr = [];
  for (let i = 0; i < totalMinutes24; i += minutes) {
    const item = {
      start: dayjs(timeToUnix("00:00:00")).add(i, "minutes"),
      end: dayjs(timeToUnix("00:00:00")).add(i + minutes, "minutes"),
    };
    if (item.end.get("hours") === 0 || item.start.get("hours") === 0) {
      continue;
    }
    arr.push(item);
  }
  return arr;
};

export function useGenerateAvailableScheduleDates({
  duration,
  unAvaibleSchedules,
}) {
  const response = useMemo(() => {
    console.log('input":', {
      duration,
      unAvaibleSchedules,
    });
    const to = generateIntervals(duration).filter(({ start }) => {
      const some = unAvaibleSchedules.some((schedule) =>
        isChoken({
          duration,
          time: start.format("HH:mm:ss"),
          endTime: schedule.end,
          startTime: schedule.start,
        })
      );

      return !some;
    });
    console.log("output:", to);
    return to;
  }, [duration, unAvaibleSchedules]);

  return response;
}
// console.log(
//   egnerateAvailableScheduleDates({
//     duration,
//     unAvaibleSchedules: schedules,
//   }).map(
//     ({ start, end }) => `${start.format("HH:mm")} - ${end.format("HH:mm")}`
//   )
// );
// console.log(
//   generateIntervals(duration).filter(({ start }) => {
//     const some = schedules.some((schedule) =>
//       isChoken({
//         duration,
//         time: start.format("HH:mm:ss"),
//         endTime: schedule.end,
//         startTime: schedule.start,
//       })
//     );

//     return !some;
//   })
//   // .map(([start, end]) => `${start.format("HH:mm")} - ${end.format("HH:mm")}`)
// );
