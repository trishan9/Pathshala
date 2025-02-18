import { createFileRoute } from "@tanstack/react-router";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { useGetExams } from "@/hooks/useExams";
import { z } from "zod";
import { PageLoader } from "@/components/PageLoader";
import { Lesson } from "../../_staff/list/lessons";
import { useGetRole } from "@/hooks/useGetRole";
import FormContainer from "@/components/forms/FormContainer";

const getAllExamsQuerySchema = z.object({
  page: z.number().optional(),
  classId: z.number().optional(),
  teacherId: z.string().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/_protected/_dashboard/list/exams/")({
  component: RouteComponent,
  validateSearch: getAllExamsQuerySchema,
});

function RouteComponent() {
  return <ExamListPage />;
}

type Exam = {
  id: number;
  startTime: Date;
  lesson: Lesson;
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
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const ExamListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetExams({
    page: params.page,
    classId: params.classId,
    teacherId: params.teacherId,
    search: params.search,
  });
  const role = useGetRole();

  const renderRow = (item: Exam) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        {item.lesson.subject.name}
      </td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
      <td className="hidden md:table-cell">
        {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
      </td>
      <td>
        <div className="flex items-center gap-2">
          {(role === "admin" || role === "teacher") && (
            <>
              <FormContainer table="exam" type="update" data={item} />
              <FormContainer table="exam" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Exams</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {(role === "admin" || role === "teacher") && (
              <FormContainer table="exam" type="create" />
            )}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          <Table columns={columns} renderRow={renderRow} data={data?.exams} />
          <Pagination page={params.page || 1} count={data?.examsCount} />
        </>
      )}
    </div>
  );
};

export default ExamListPage;
