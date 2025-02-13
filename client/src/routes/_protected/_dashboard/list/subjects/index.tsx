import { createFileRoute } from "@tanstack/react-router";
import FormModal from "@/components/forms/FormModal";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { role } from "@/lib/data";
import { useGetSubjects } from "@/hooks/useSubjects";
import { z } from "zod";
import { PageLoader } from "@/components/PageLoader";
import { Teacher } from "../teachers";

const getAllSubjectsQuerySchema = z.object({
  page: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/_protected/_dashboard/list/subjects/")({
  component: RouteComponent,
  validateSearch: getAllSubjectsQuerySchema,
});

function RouteComponent() {
  return <SubjectListPage />;
}

export type Subject = {
  id: string;
  name: string;
  teachers: Teacher[];
};

const columns = [
  {
    header: "Subject Name",
    accessor: "name",
  },
  {
    header: "Teachers",
    accessor: "teachers",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Subject) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.name}</td>
    <td className="hidden md:table-cell">
      {item.teachers.map((teacher) => teacher.name).join(", ")}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="subject" type="update" data={item} />
            <FormModal table="subject" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const SubjectListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetSubjects({
    page: params.page,
    search: params.search,
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Subjects</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="teacher" type="create" />}
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
            data={data?.subjects}
          />
          {/* PAGINATION */}
          <Pagination page={params.page || 1} count={data?.subjectsCount} />
        </>
      )}
    </div>
  );
};

export default SubjectListPage;
