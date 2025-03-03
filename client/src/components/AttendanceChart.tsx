import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const AttendanceChart = () => {
  const { data: resData } = useQuery({
    queryKey: ["daily-attendance-analytics"],
    queryFn: async () => {
      const response = await apiActions.attendance.analytics.getDaily();

      if (!response.data) {
        throw new Error("Failed to get attendance analytics");
      }

      return response.data.data;
    },
  });

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  const attendanceMap: { [key: string]: { present: number; absent: number } } =
    {
      Mon: { present: 0, absent: 0 },
      Tue: { present: 0, absent: 0 },
      Wed: { present: 0, absent: 0 },
      Thu: { present: 0, absent: 0 },
      Fri: { present: 0, absent: 0 },
    };

  resData?.forEach((item) => {
    const itemDate = new Date(item.date);
    const dayOfWeek = itemDate.getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
      const dayName = daysOfWeek[dayOfWeek - 1];

      if (item.present) {
        attendanceMap[dayName].present += 1;
      } else {
        attendanceMap[dayName].absent += 1;
      }
    }
  });

  const data = daysOfWeek.map((day) => ({
    name: day,
    Present: attendanceMap[day].present,
    Absent: attendanceMap[day].absent,
  }));

  return (
    <div className="bg-white border rounded-lg p-4 h-full">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Daily Attendance</h1>
        <MoreHorizontalIcon className="w-5 h-5" />
      </div>

      <ResponsiveContainer width="100%" height="90%">
        <BarChart width={500} height={300} data={data} barSize={35}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ddd" />
          <XAxis
            dataKey="name"
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: "14px" }}
            tickLine={false}
          />
          <YAxis
            axisLine={false}
            tick={{ fill: "#9ca3af", fontSize: "14px" }}
            tickLine={false}
          />
          <Tooltip
            contentStyle={{ borderRadius: "10px", borderColor: "lightgray" }}
          />
          <Legend
            align="left"
            verticalAlign="top"
            wrapperStyle={{
              paddingTop: "20px",
              paddingBottom: "40px",
            }}
          />
          <Bar dataKey="Present" fill="#2A9D90" legendType="line" />

          <Bar dataKey="Absent" fill="#E76E50" legendType="line" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AttendanceChart;
