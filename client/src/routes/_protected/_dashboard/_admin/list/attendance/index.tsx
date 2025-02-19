import { createFileRoute } from "@tanstack/react-router";

import { useState } from "react";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";
import { Check, X, Calendar as CalendarIcon } from "lucide-react";

export interface AttendanceRecord {
  id: string;
  date: Date;
  present: boolean;
  student: {
    id: string;
    name: string;
  };
  Lesson: {
    id: string;
    name: string;
    subject: {
      name: string;
    };
    teacher: {
      name: string;
    };
    class: {
      name: string;
    };
  };
}

export interface GetAttendanceParams {
  startDate?: Date;
  endDate?: Date;
}

export const Route = createFileRoute(
  "/_protected/_dashboard/_admin/list/attendance/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <AttendanceViewPage />;
}

export default function AttendanceViewPage() {
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const { data, isLoading } = useQuery({
    queryKey: [
      "attendance",
      {
        startDate: dateRange?.from,
        endDate: dateRange?.to,
      },
    ],
    queryFn: async() => {
      const response = await apiActions.attendance.getAttendanceDetails({
        startDate: dateRange.from,
        endDate: dateRange.to,
      });
      if (!response.data) {
        throw new Error("Failed to update announcement");
      }
      return response.data.data;
    }
  });

  return (
    <div className="p-4">
      <h1 className="hidden md:block text-lg font-semibold">Attendance</h1>
      <div className="my-4 flex flex-wrap gap-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[300px] justify-start text-left font-normal"
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {dateRange.from ? (
                dateRange.to ? (
                  <>
                    {format(dateRange.from, "LLL dd, y")} -{" "}
                    {format(dateRange.to, "LLL dd, y")}
                  </>
                ) : (
                  format(dateRange.from, "LLL dd, y")
                )
              ) : (
                <span>Pick a date range</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={{ from: dateRange.from, to: dateRange.to }}
              onSelect={(range: any) => setDateRange(range)}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Student</TableHead>
              <TableHead>Class</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Teacher</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.records?.map((record: AttendanceRecord) => (
              <TableRow key={record.id}>
                <TableCell>{format(new Date(record.date), "PPP")}</TableCell>
                <TableCell>{record.student.name}</TableCell>
                <TableCell>{record.Lesson.class.name}</TableCell>
                <TableCell>{record.Lesson.subject.name}</TableCell>
                <TableCell>{record.Lesson.teacher.name}</TableCell>
                <TableCell>
                  {record.present ? (
                    <span className="flex items-center text-green-600">
                      <Check className="mr-1 h-4 w-4" /> Present
                    </span>
                  ) : (
                    <span className="flex items-center text-red-600">
                      <X className="mr-1 h-4 w-4" /> Absent
                    </span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
