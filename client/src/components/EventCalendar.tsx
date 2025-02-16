import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

const EventCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  const navigate = useNavigate();

  useEffect(() => {
    if (value instanceof Date) {
      navigate({ to: `?date=${value.toLocaleDateString("en-US")}` });
    }
  }, [value, navigate]);

  return <Calendar onChange={onChange} value={value} />;
};

export default EventCalendar;
