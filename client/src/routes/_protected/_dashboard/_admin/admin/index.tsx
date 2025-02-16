import { createFileRoute } from "@tanstack/react-router";
import Announcements from "@/components/Announcements";
import AttendanceChart from "@/components/AttendanceChart";
import CountChart from "@/components/CountChart";
import { MonthlyAttendanceChart } from "@/components/MonthlyAttendanceChart";
import UserCard from "@/components/UserCard";
import EventCalendarContainer from "@/components/EventCalendarContainer";

export const Route = createFileRoute("/_protected/_dashboard/_admin/admin/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AdminPage />;
}

const AdminPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-5">
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="admin" />
          <UserCard type="teacher" />
          <UserCard type="student" />
        </div>

        <div className="flex gap-4 flex-col lg:flex-row">
          <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart />
          </div>

          <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart />
          </div>
        </div>

        <div className="w-full h-[500px]">
          <MonthlyAttendanceChart />
        </div>
      </div>

      <div className="w-full lg:w-1/3 flex flex-col gap-5">
        <EventCalendarContainer searchParams={Route.useSearch()} />
        <Announcements />
      </div>
    </div>
  );
};

export default AdminPage;
