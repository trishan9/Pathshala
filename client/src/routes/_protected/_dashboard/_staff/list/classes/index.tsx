import { createFileRoute } from "@tanstack/react-router";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { PageLoader } from "@/components/PageLoader";
import { z } from "zod";
import { useGetClasses } from "@/hooks/useClasses";
import { Teacher } from "../teachers";
import { useGetRole } from "@/hooks/useGetRole";
import FormContainer from "@/components/forms/FormContainer";

const getAllClassesQuerySchema = z.object({
  page: z.number().optional(),
  supervisorId: z.string().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute(
  "/_protected/_dashboard/_staff/list/classes/",
)({
  component: RouteComponent,
  validateSearch: getAllClassesQuerySchema,
});

function RouteComponent() {
  return <ClassListPage />;
}

export type Class = {
  id: number;
  name: string;
  capacity: number;
  grade: number;
  supervisor: Teacher;
};

const ClassListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetClasses({
    page: params.page,
    supervisorId: params.supervisorId,
    search: params.search,
  });
  const role = useGetRole();

  const columns = [
    {
      header: "Class Name",
      accessor: "name",
    },
    {
      header: "Capacity",
      accessor: "capacity",
      className: "hidden md:table-cell",
    },
    {
      header: "Grade",
      accessor: "grade",
      className: "hidden md:table-cell",
    },
    {
      header: "Supervisor",
      accessor: "supervisor",
      className: "hidden md:table-cell",
    },
    ...(role === "admin"
      ? [
          {
            header: "Actions",
            accessor: "action",
          },
        ]
      : []),
  ];

  const renderRow = (item: Class) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">{item.name}</td>
      <td className="hidden md:table-cell">{item.capacity}</td>
      <td className="hidden md:table-cell">{item.name[0]}</td>
      <td className="hidden md:table-cell">{item.supervisor.name}</td>
      <td>
        <div className="flex items-center gap-2">
          {role === "admin" && (
            <>
              <FormContainer table="class" type="update" data={item} />
              <FormContainer table="class" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Classes</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormContainer table="class" type="create" />}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          <Table columns={columns} renderRow={renderRow} data={data?.classes} />
          <Pagination page={params.page || 1} count={data?.classesCount} />
        </>
      )}
    </div>
  );
};

export default ClassListPage;
