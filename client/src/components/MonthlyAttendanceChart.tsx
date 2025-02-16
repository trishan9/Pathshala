import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type AttendanceEntry = {
  date: string;
  present: boolean;
};

type AttendanceData = {
  data: AttendanceEntry[];
  message: string;
};

type MonthlyAttendance = {
  month: string;
  present: number;
  absent: number;
};

function convertAttendanceData(
  attendanceData: AttendanceData,
): MonthlyAttendance[] {
  const monthMap: { [key: string]: string } = {
    "01": "Jan",
    "02": "Feb",
    "03": "Mar",
    "04": "Apr",
    "05": "May",
    "06": "Jun",
    "07": "Jul",
    "08": "Aug",
    "09": "Sep",
    "10": "Oct",
    "11": "Nov",
    "12": "Dec",
  };

  const monthlyAttendance: Record<string, MonthlyAttendance> =
    Object.fromEntries(
      Object.values(monthMap).map((month) => [
        month,
        { month, present: 0, absent: 0 },
      ]),
    );

  attendanceData.data.forEach((entry) => {
    const date = new Date(entry.date);
    const monthKey = date.toISOString().split("-")[1]; // Extract "MM"
    const month = monthMap[monthKey];

    if (month) {
      if (entry.present) {
        monthlyAttendance[month].present += 1;
      } else {
        monthlyAttendance[month].absent += 1;
      }
    }
  });

  return Object.values(monthlyAttendance);
}

export const MonthlyAttendanceChart = () => {
  const {
    data: resData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["attendance-chart2"],
    queryFn: async () => {
      const response = await apiActions.attendance.analytics.get();

      if (!response.data) {
        throw new Error("Failed to get attendance analytics");
      }

      return response.data;
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!resData || !resData.data) return <p>No attendance data found</p>;

  const data = convertAttendanceData(resData);

  return (
    <div className="bg-white border rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Monthly Attendance</h1>
        <MoreHorizontalIcon className="w-5 h-5" />
      </div>
      <ResponsiveContainer width="100%" height="90%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#ddd" />
          <XAxis
            dataKey="month"
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: "14px" }}
            tickLine={false}
            tickMargin={10}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: "14px" }}
            tickLine={false}
            tickMargin={20}
          />
          <Tooltip />
          <Legend
            align="center"
            verticalAlign="top"
            wrapperStyle={{ paddingTop: "10px", paddingBottom: "30px" }}
          />
          <Line
            type="monotone"
            dataKey="absent"
            name="Absent"
            stroke="#E76E50"
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="present"
            name="Present"
            stroke="#2A9D90"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
