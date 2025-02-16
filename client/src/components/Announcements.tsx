import { useGetAnnouncements } from "@/hooks/useAnnouncements";
import { Link } from "@tanstack/react-router";

const Announcements = () => {
  const { data: resData } = useGetAnnouncements({});
  const data = resData?.announcements;

  return (
    <div className="bg-white p-4 rounded-md border">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Recent Announcements</h1>
        <Link to="/list/announcements" className="text-xs text-gray-600">
          View All
        </Link>
      </div>
      <div className="flex flex-col gap-4 mt-4">
        {data?.[0] && (
          <div className="bg-lamaSkyLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{data[0].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-1.5 py-1">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(data[0].date),
                )}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{data[0].description}</p>
          </div>
        )}
        {data?.[1] && (
          <div className="bg-lamaPurpleLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{data[1].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-1.5 py-1">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(data[1].date),
                )}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{data[1].description}</p>
          </div>
        )}
        {data?.[2] && (
          <div className="bg-lamaYellowLight rounded-md p-4">
            <div className="flex items-center justify-between">
              <h2 className="font-medium">{data[2].title}</h2>
              <span className="text-xs text-gray-500 bg-white rounded-md px-1.5 py-1">
                {new Intl.DateTimeFormat("en-US").format(
                  new Date(data[2].date),
                )}
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-1">{data[2].description}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Announcements;
