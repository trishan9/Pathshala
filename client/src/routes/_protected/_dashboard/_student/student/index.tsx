import { createFileRoute } from "@tanstack/react-router";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import EventCalendarContainer from "@/components/EventCalendarContainer";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";
import { PageLoader } from "@/components/PageLoader";

export const Route = createFileRoute(
  "/_protected/_dashboard/_student/student/",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <StudentPage />;
}

const StudentPage = () => {
  const searchParams = Route.useSearch();
  const { data, isLoading } = useQuery({
    queryKey: ["class"],
    queryFn: async () => {
      const response = await apiActions.class.getByStudentId();

      if (!response.data) {
        throw new Error("Failed to get class");
      }

      return response.data?.data;
    },
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row min-h-screen">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        <div className="h-full bg-white border p-4 rounded-md">
          <h1 className="text-xl font-semibold">Schedule ({data?.name})</h1>
          <BigCalendar type="classId" id={data?.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-5">
        <EventCalendarContainer searchParams={searchParams} />
        <Announcements />
      </div>
    </div>
  );
};

export default StudentPage;
