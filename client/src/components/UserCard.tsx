import { apiActions } from "@/api";
import { MoreHorizontalIcon } from "lucide-react";
import { useState } from "react";

const UserCard = ({ type }: { type: "student" | "teacher" | "admin" }) => {
  const modelMap: Record<typeof type, any> = {
    student: apiActions.user.count.student,
    teacher: apiActions.user.count.teacher,
    admin: apiActions.user.count.admin,
  };

  const [count, setCount] = useState(0);

  const getData = async () => {
    const response = await modelMap[type].get();

    if (!response.data) {
      throw new Error("Failed to get count");
    }

    setCount(response.data.count);
  };
  getData();

  return (
    <div className="rounded-2xl odd:bg-lamaPurple even:bg-lamaYellow p-4 flex-1 min-w-[130px]">
      <div className="flex justify-between items-center">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
          2024/25
        </span>
        <MoreHorizontalIcon className="w-5 h-5" />
      </div>
      <h1 className="text-2xl font-semibold my-4">{count}</h1>

      <h2 className="capitalize text-sm font-medium text-gray-500">{type}s</h2>
    </div>
  );
};

export default UserCard;
