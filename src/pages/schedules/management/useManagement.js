import { useState } from "react";

export default function useManagement() {
  const [haircutId, setHaircutId] = useState();
  const [date, setDate] = useState(new Date());
  return { haircutId, setHaircutId, date, setDate };
}
