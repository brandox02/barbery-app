import dayjs from "dayjs";

export const unixToTime = (unix) => dayjs(unix).format('HH:mm:ss')
