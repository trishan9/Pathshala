import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

const EventList = ({ dateParam }: { dateParam: string | undefined }) => {
  const { data } = useQuery({
    queryKey: ["events-list", dateParam],
    queryFn: async () => {
      const response = await apiActions.event.getCalendar({
        dateParam: dateParam || "",
      });

      if (!response.data) {
        throw new Error("Failed to get events");
      }

      console.log(response.data);
      return response.data.data;
    },
  });

  if (data?.length) {
    return data?.map((event) => (
      <div
        className="p-5 rounded-md border-2 border-gray-100 border-t-4 odd:border-t-lamaSky even:border-t-lamaPurple"
        key={event.id}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-600">{event.title}</h1>
          <span className="text-gray-500 text-xs">
            {new Date(event.startTime).toLocaleTimeString("en-UK", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
        <p className="mt-2 text-gray-500 text-sm">{event.description}</p>
      </div>
    ));
  }

  return <p className="text-sm text-gray-500">No any events to show.</p>;
};

export default EventList;
