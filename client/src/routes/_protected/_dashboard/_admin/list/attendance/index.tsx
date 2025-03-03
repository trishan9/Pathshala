import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { format, isValid } from "date-fns";
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
import { Check, X, CalendarIcon, Loader2, RefreshCw } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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
  date?: Date;
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
  const [filterType, setFilterType] = useState<"single" | "range">("single");
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const getQueryParams = () => {
    if (filterType === "single" && date) {
      return { date };
    } else if (filterType === "range" && dateRange.from) {
      return {
        startDate: dateRange.from,
        endDate: dateRange.to || dateRange.from,
      };
    }
    return {};
  };

  const resetFilters = () => {
    setDate(undefined);
    setDateRange({ from: undefined, to: undefined });
  };

  const { data, isLoading, error } = useQuery({
    queryKey: ["attendance", getQueryParams()],
    queryFn: async () => {
      const params = getQueryParams();

      if (Object.keys(params).length === 0) {
        return { records: [] };
      }

      const response = await apiActions.attendance.getAttendanceDetails(params);
      if (!response.data) {
        throw new Error("Failed to fetch attendance data");
      }
      return response.data.data;
    },
    enabled: filterType === "single" ? !!date : !!dateRange.from,
  });

  return (
    <div className="p-4">
      <h1 className="hidden md:block text-lg font-semibold mb-6">Attendance</h1>

      <div className="my-4 space-y-4">
        <div className="flex flex-wrap gap-4 items-center">
          <Select
            value={filterType}
            onValueChange={(value) =>
              setFilterType(value as "single" | "range")
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="single">Single Date</SelectItem>
              <SelectItem value="range">Date Range</SelectItem>
            </SelectContent>
          </Select>

          {filterType === "single" ? (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[240px] justify-start text-left font-normal",
                    !date && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date && isValid(date) ? format(date, "PPP") : "Select date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-[300px] justify-start text-left font-normal",
                    !dateRange.from && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "PPP")} -{" "}
                        {format(dateRange.to, "PPP")}
                      </>
                    ) : (
                      format(dateRange.from, "PPP")
                    )
                  ) : (
                    <span>Select date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={setDateRange}
                  initialFocus
                  numberOfMonths={2}
                />
              </PopoverContent>
            </Popover>
          )}

          <Button
            variant="outline"
            size="icon"
            onClick={resetFilters}
            title="Reset filters"
          >
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-md bg-red-50 p-4 my-4 border border-red-200">
          <p className="text-red-700">
            Error loading attendance data. Please try again.
          </p>
        </div>
      ) : null}

      <div className="rounded-md border bg-white">
        {isLoading ? (
          <div className="flex justify-center items-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : !data?.records?.length ? (
          <div className="p-8 text-center text-muted-foreground">
            {(filterType === "single" && date) ||
            (filterType === "range" && dateRange.from)
              ? "No attendance records found for the selected date(s)."
              : "Select a date filter to view attendance records."}
          </div>
        ) : (
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
        )}
      </div>
    </div>
  );
}
