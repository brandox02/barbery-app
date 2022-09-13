import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-native";

export default function useScheduleList() {
  const [visible, setVisible] = useState(false);
  const [datesSelected, setDatesSelected] = useState([
    dayjs().format("YYYY-MM-DD"),
  ]);

  const navigate = useNavigate();

  const goToManagement = () => navigate("/schedules/management");
  const onSelectDate = (dateEvent) => {
    const date = dateEvent.dateString;

    if (datesSelected.find((x) => x === date)) {
      setDatesSelected((datesSelected) =>
        datesSelected.filter((x) => x !== date)
      );
    } else {
      setDatesSelected((datesSelected) => [...datesSelected, date]);
    }
  };

  return {
    visible,
    setVisible,
    datesSelected,
    onSelectDate,
    goToManagement,
  };
}
