import dayjs from "dayjs";
import { useState } from "react";

export default function useManagement() {
  const [haircutId, setHaircutId] = useState();
  const [selectedScheduleDate, setScheduleDate] = useState({
    start: dayjs(),
    end: dayjs(),
  });
  const [date, setDate] = useState(new Date());
  return {
    haircutId,
    setHaircutId,
    date,
    setDate,
    selectedScheduleDate,
    setScheduleDate,
  };
}
