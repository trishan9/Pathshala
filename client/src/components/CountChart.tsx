import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { MoreHorizontalIcon } from "lucide-react";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Total",
    count: 113,
    fill: "white",
  },
  {
    name: "Girls",
    count: 63,
    fill: "#FAE27C",
  },
  {
    name: "Boys",
    count: 50,
    fill: "#C3EBFA",
  },
];

const CountChart = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["boys-girls"],
    queryFn: async () => {
      const response = await apiActions.user.analytics.student.get();

      if (!response.data) {
        throw new Error("Failed to get student analytics");
      }

      return response.data;
    },
  });

  const chartData = [
    {
      name: "Total",
      count: data?.boys + data?.girls,
      fill: "white",
    },
    {
      name: "Girls",
      count: data?.girls,
      fill: "#FAE27C",
    },
    {
      name: "Boys",
      count: data?.boys,
      fill: "#C3EBFA",
    },
  ];

  return (
    <div className="bg-white border rounded-xl w-full h-full p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-lg font-semibold">Students</h1>
        <MoreHorizontalIcon className="w-5 h-5" />
      </div>

      <div className="relative w-full h-[75%]">
        <ResponsiveContainer>
          <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={chartData}
          >
            <RadialBar background dataKey="count" />
          </RadialBarChart>
        </ResponsiveContainer>
        <img
          src="/maleFemale.png"
          alt=""
          width={50}
          height={50}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
      </div>

      {/* BOTTOM */}
      <div className="flex justify-center gap-16">
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaSky rounded-full" />
          <h1 className="font-bold">{data?.boys}</h1>
          <h2 className="text-xs text-gray-500">
            Boys ({Math.round((data?.boys / (data?.boys + data?.girls)) * 100)}
            %)
          </h2>
        </div>
        <div className="flex flex-col gap-1">
          <div className="w-5 h-5 bg-lamaYellow rounded-full" />
          <h1 className="font-bold">{data?.girls}</h1>
          <h2 className="text-xs text-gray-500">
            Girls (
            {Math.round((data?.girls / (data?.boys + data?.girls)) * 100)}%)
          </h2>
        </div>
      </div>
    </div>
  );
};

export default CountChart;
