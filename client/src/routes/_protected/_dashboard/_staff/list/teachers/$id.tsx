import { createFileRoute, Link } from "@tanstack/react-router";
import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/charts/Performance";
import { useQuery } from "@tanstack/react-query";
import { apiActions } from "@/api";
import { PageLoader } from "@/components/PageLoader";
import { useGetRole } from "@/hooks/useGetRole";
import FormContainer from "@/components/forms/FormContainer";

export const Route = createFileRoute(
  "/_protected/_dashboard/_staff/list/teachers/$id",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return <SingleTeacherPage />;
}

const SingleTeacherPage = () => {
  const role = useGetRole();

  const { id } = Route.useParams();
  const { data, isLoading } = useQuery({
    queryKey: ["teacher", id],
    queryFn: async () => {
      const response = await apiActions.teacher.getById(id);

      if (!response.data) {
        throw new Error("Failed to get teacher");
      }

      return response.data.teacher;
    },
  });

  if (isLoading) return <PageLoader />;

  return (
    <div className="flex-1 p-4 flex flex-col gap-4 xl:flex-row">
      {/* LEFT */}
      <div className="w-full xl:w-2/3">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* USER INFO CARD */}
          <div className="bg-lamaSky py-6 px-4 rounded-md flex-1 flex gap-4">
            <div className="w-1/3">
              <img
                src={
                  data?.img || `https://ui-avatars.com/api/?name=${data?.name}`
                }
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4">
              <div className="flex items-center gap-4">
                <h1 className="text-xl font-semibold">{data?.name}</h1>
                {role === "admin" && (
                  <FormContainer table="teacher" type="update" data={data} />
                )}
              </div>
              <p className="text-sm text-gray-500">
                A passionate educator committed to fostering a positive learning environment and inspiring students to reach their full potential.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <img src="/blood.png" alt="" width={14} height={14} />
                  <span>{data?.bloodType}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <img src="/date.png" alt="" width={14} height={14} />
                  <span>
                    {new Intl.DateTimeFormat("en-GB").format(
                      new Date(data?.birthday),
                    )}
                  </span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <img src="/mail.png" alt="" width={14} height={14} />
                  <span>{data?.email}</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <img src="/phone.png" alt="" width={14} height={14} />
                  <span>{data?.phone}</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMALL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/* CARD */}
            <div className="bg-white border p-4 rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <img
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">90%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 border rounded-md flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <img
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {data?._count.subjects}
                </h1>
                <span className="text-sm text-gray-400">Branches</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md border flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <img
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {data?._count.lessons}
                </h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>
            {/* CARD */}
            <div className="bg-white p-4 rounded-md border flex gap-4 w-full md:w-[48%] xl:w-[45%] 2xl:w-[48%]">
              <img
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6"
              />
              <div className="">
                <h1 className="text-xl font-semibold">
                  {data?._count.classes}
                </h1>
                <span className="text-sm text-gray-400">Classes</span>
              </div>
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="mt-4 bg-white rounded-md p-4 h-[800px] border">
          <h1 className="text-xl font-semibold">Teacher&apos;s Schedule</h1>
          <BigCalendar type="teacherId" id={data?.id} />
        </div>
      </div>
      {/* RIGHT */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white p-4 rounded-md border">
          <h1 className="text-xl font-semibold">Shortcuts</h1>
          <div className="mt-4 flex gap-4 flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/classes?supervisorId=${data?.id}`}
            >
              Teacher&apos;s Classes
            </Link>

            <Link
              className="p-3 rounded-md bg-lamaPurpleLight"
              href={`/list/students?teacherId=${data?.id}`}
            >
              Teacher&apos;s Students
            </Link>

            <Link
              className="p-3 rounded-md bg-lamaYellowLight"
              href={`/list/lessons?teacherId=${data?.id}`}
            >
              Teacher&apos;s Lessons
            </Link>

            <Link
              className="p-3 rounded-md bg-pink-50"
              href={`/list/exams?teacherId=${data?.id}`}
            >
              Teacher&apos;s Exams
            </Link>

            <Link
              className="p-3 rounded-md bg-lamaSkyLight"
              href={`/list/assignments?teacherId=${data?.id}`}
            >
              Teacher&apos;s Assignments
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleTeacherPage;
