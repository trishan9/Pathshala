import { createFileRoute, Link } from "@tanstack/react-router";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { useGetTeachers } from "@/hooks/useTeachers";
import { z } from "zod";
import { PageLoader } from "@/components/PageLoader";
import { useGetRole } from "@/hooks/useGetRole";
import FormContainer from "@/components/forms/FormContainer";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const getAllTeachersQuerySchema = z.object({
  page: z.number().optional(),
  classId: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute(
  "/_protected/_dashboard/_staff/list/teachers/",
)({
  component: RouteComponent,
  validateSearch: getAllTeachersQuerySchema,
});

function RouteComponent() {
  return <TeacherListPage />;
}

export type Teacher = {
  id: string;
  username: string;
  name: string;
  email?: string;
  img: string;
  phone: string;
  subjects: Subject[];
  classes: Class[];
  address: string;
};

type Subject = {
  id: string;
  name: string;
};

type Class = {
  id: number;
  name: string;
};

const TeacherListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetTeachers({
    page: params.page,
    classId: params.classId,
    search: params.search,
  });
  const role = useGetRole();

  const columns = [
    {
      header: "Info",
      accessor: "info",
    },
    {
      header: "Teacher ID",
      accessor: "teacherId",
      className: "hidden lg:table-cell",
    },
    {
      header: "Subjects",
      accessor: "subjects",
      className: "hidden md:table-cell",
    },
    {
      header: "Classes",
      accessor: "classes",
      className: "hidden md:table-cell",
    },
    {
      header: "Phone",
      accessor: "phone",
      className: "hidden lg:table-cell",
    },
    {
      header: "Address",
      accessor: "address",
      className: "hidden lg:table-cell",
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

  const renderRow = (item: Teacher) => (
    <tr
      key={item.id}
      className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
    >
      <td className="flex items-center gap-4 p-4">
        <img
          src={item.img || `https://ui-avatars.com/api/?name=${item?.name}`}
          alt=""
          width={40}
          height={40}
          className="md:hidden xl:block w-10 h-10 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <h3 className="font-semibold">{item.name}</h3>
          <p className="text-xs text-gray-500">{item?.email}</p>
        </div>
      </td>
      <td className="hidden lg:table-cell">{item.username}</td>
      <td className="hidden md:table-cell">
        {item.subjects.map((subject) => subject.name).join(", ")}
      </td>
      <td className="hidden md:table-cell">
        {item.classes.map((classItem) => classItem.name).join(", ")}
      </td>
      <td className="hidden lg:table-cell">{item.phone}</td>
      <td className="hidden lg:table-cell">{item.address}</td>
      <td>
        <div className="flex items-center gap-2">
          <Link to={`/list/teachers/${item.id}`}>
            <Button variant="outline" size="icon">
              <Eye className="h-4 w-4" />
            </Button>
          </Link>

          {role === "admin" && (
            <>
              <FormContainer table="teacher" type="update" data={item} />
              <FormContainer table="teacher" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Teachers</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && (
              <FormContainer table="teacher" type="create" />
            )}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          <Table
            columns={columns}
            renderRow={renderRow}
            data={data?.teachers}
          />
          <Pagination page={params.page || 1} count={data?.teachersCount} />
        </>
      )}
    </div>
  );
};

export default TeacherListPage;
