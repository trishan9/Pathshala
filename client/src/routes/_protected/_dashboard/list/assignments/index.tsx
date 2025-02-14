import { createFileRoute } from "@tanstack/react-router";
import FormModal from "@/components/forms/FormModal";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { role } from "@/lib/data";
import { z } from "zod";
import { Lesson } from "../lessons";
import { useGetAssignments } from "@/hooks/useAssignments";
import { PageLoader } from "@/components/PageLoader";

const getAllAssignmentsQuerySchema = z.object({
  page: z.number().optional(),
  classId: z.number().optional(),
  teacherId: z.string().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute(
  "/_protected/_dashboard/list/assignments/",
)({
  component: RouteComponent,
  validateSearch: getAllAssignmentsQuerySchema,
});

function RouteComponent() {
  return <AssignmentListPage />;
}

type Assignment = {
  id: number;
  dueDate: Date;
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
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Assignment) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.lesson.subject.name}</td>
    <td>{item.lesson.class.name}</td>
    <td className="hidden md:table-cell">{item.lesson.teacher.name}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.dueDate))}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {(role === "admin" || role === "teacher") && (
          <>
            <FormModal table="assignment" type="update" data={item} />
            <FormModal table="assignment" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const AssignmentListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetAssignments({
    page: params.page,
    classId: params.classId,
    teacherId: params.teacherId,
    search: params.search,
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          All Assignments
        </h1>
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
              <FormModal table="assignment" type="create" />
            )}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          {/* LIST */}
          <Table
            columns={columns}
            renderRow={renderRow}
            data={data?.assignments}
          />
          {/* PAGINATION */}
          <Pagination page={params?.page || 1} count={data?.assignmentsCount} />
        </>
      )}
    </div>
  );
};

export default AssignmentListPage;
