import dayjs from "dayjs";

export default function formatTime(time) {
  const parsedTime = dayjs.isDayjs(time) ? time : dayjs(time);

  return parsedTime.format('hh:mm A')
}
