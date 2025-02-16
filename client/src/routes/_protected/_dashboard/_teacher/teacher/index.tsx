import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/_protected/_dashboard/_teacher/teacher/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <TeacherPage />;
}

const TeacherPage = () => {
  return (
    <div className="p-4 flex-1 flex gap-4 flex-col xl:flex-row h-full">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white border p-4 rounded-md pb-7">
          <h1 className="text-xl font-semibold">Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
        <Announcements />
      </div>
    </div>
  );
};

export default TeacherPage;
