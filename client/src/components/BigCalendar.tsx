import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
import { Lesson } from "@/routes/_protected/_dashboard/_staff/list/lessons";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";

const localizer = momentLocalizer(moment);

const BigCalendar = ({
  type,
  id,
}: {
  type: "teacherId" | "classId";
  id: string | number;
}) => {
  const { data: dataRes } = useQuery({
    queryKey: ["schedule", type, id],
    queryFn: async () => {
      const response = await apiActions.lesson.getSchedule({
        ...(type === "teacherId"
          ? { teacherId: id as string }
          : { classId: id as number }),
      });

      if (!response.data) {
        throw new Error("Failed to get schedule");
      }

      return response?.data?.data?.lessons;
    },
  });

  const data = dataRes?.map((lesson: Lesson) => ({
    title: lesson.name,
    start: new Date(lesson.startTime),
    end: new Date(lesson.endTime),
  }));

  console.log(data);

  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  return (
    <Calendar
      localizer={localizer}
      events={data}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "97%" }}
      onView={handleOnChangeView}
      min={new Date(2025, 1, 8, 7, 0, 0)}
      max={new Date(2025, 1, 18, 16, 0, 0)}
    />
  );
};

export default BigCalendar;
