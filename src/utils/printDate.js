import dayjs from "dayjs";

export const printDate = (date) => {
  const instance = dayjs.isDayjs(date) ? date : dayjs(date);
  console.log(instance.format("DD/MM/YYYY hh:mm:ssA"));
};
