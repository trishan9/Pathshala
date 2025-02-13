import { createFileRoute } from "@tanstack/react-router";
import FormModal from "@/components/forms/FormModal";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { role } from "@/lib/data";
import { Subject } from "../subjects";
import { Class } from "../classes";
import { Teacher } from "../teachers";
import { z } from "zod";
import { useGetLessons } from "@/hooks/useLessons";
import { PageLoader } from "@/components/PageLoader";

const getAllLessonsQuerySchema = z.object({
  page: z.number().optional(),
  teacherId: z.string().optional(),
  classId: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/_protected/_dashboard/list/lessons/")({
  component: RouteComponent,
  validateSearch: getAllLessonsQuerySchema,
});

function RouteComponent() {
  return <LessonListPage />;
}

export type Lesson = {
  id: number;
  name: string;
  day: string;
  subject: Subject;
  class: Class;
  teacher: Teacher;
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Lesson) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.subject.name}</td>
    <td>{item.class.name}</td>
    <td className="hidden md:table-cell">{item.teacher.name}</td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="lesson" type="update" data={item} />
            <FormModal table="lesson" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const LessonListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetLessons({
    page: params.page,
    teacherId: params.teacherId,
    classId: params.classId,
    search: params.search,
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Lessons</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="lesson" type="create" />}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          {/* LIST */}
          <Table columns={columns} renderRow={renderRow} data={data?.lessons} />
          {/* PAGINATION */}
          <Pagination page={params.page || 1} count={data?.lessonsCount} />
        </>
      )}
    </div>
  );
};

export default LessonListPage;
