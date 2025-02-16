import { createFileRoute } from "@tanstack/react-router";
import FormModal from "@/components/forms/FormModal";
import Pagination from "@/components/tables/Pagination";
import Table from "@/components/tables/Table";
import TableSearch from "@/components/tables/TableSearch";
import { role } from "@/lib/data";
import { z } from "zod";
import { Class } from "../../_staff/list/classes";
import { useGetEvents } from "@/hooks/useEvents";
import { PageLoader } from "@/components/PageLoader";

const getAllEventsQuerySchema = z.object({
  page: z.number().optional(),
  search: z.string().optional(),
});

export const Route = createFileRoute("/_protected/_dashboard/list/events/")({
  component: RouteComponent,
  validateSearch: getAllEventsQuerySchema,
});

function RouteComponent() {
  return <EventListPage />;
}

type Event = {
  id: number;
  title: string;
  description: string;
  class: Class;
  startTime: Date;
  endTime: Date;
};

const columns = [
  {
    header: "Title",
    accessor: "title",
  },
  {
    header: "Class",
    accessor: "class",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell",
  },
  {
    header: "Start Time",
    accessor: "startTime",
    className: "hidden md:table-cell",
  },
  {
    header: "End Time",
    accessor: "endTime",
    className: "hidden md:table-cell",
  },
  {
    header: "Actions",
    accessor: "action",
  },
];

const renderRow = (item: Event) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-lamaPurpleLight"
  >
    <td className="flex items-center gap-4 p-4">{item.title}</td>
    <td>{item.class.name || "-"}</td>
    <td className="hidden md:table-cell">
      {new Intl.DateTimeFormat("en-US").format(new Date(item.startTime))}
    </td>
    <td className="hidden md:table-cell">
      {new Date(item.startTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </td>
    <td className="hidden md:table-cell">
      {new Date(item.endTime).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })}
    </td>
    <td>
      <div className="flex items-center gap-2">
        {role === "admin" && (
          <>
            <FormModal table="event" type="update" data={item} />
            <FormModal table="event" type="delete" id={item.id} />
          </>
        )}
      </div>
    </td>
  </tr>
);

const EventListPage = () => {
  const params = Route.useSearch();
  const { data, isLoading } = useGetEvents({
    page: params.page,
    search: params.search,
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 border">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">All Events</h1>
        <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
          <TableSearch />
          <div className="flex items-center gap-4 self-end">
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/filter.png" alt="" width={14} height={14} />
            </button>
            <button className="w-8 h-8 flex items-center justify-center rounded-full bg-lamaYellow">
              <img src="/sort.png" alt="" width={14} height={14} />
            </button>
            {role === "admin" && <FormModal table="event" type="create" />}
          </div>
        </div>
      </div>

      {isLoading && <PageLoader />}

      {data && (
        <>
          {/* LIST */}
          <Table columns={columns} renderRow={renderRow} data={data?.events} />
          {/* PAGINATION */}
          <Pagination page={params?.page || 1} count={data?.eventsCount} />
        </>
      )}
    </div>
  );
};

export default EventListPage;
