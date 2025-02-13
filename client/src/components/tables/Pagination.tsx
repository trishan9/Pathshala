import { useNavigate } from "@tanstack/react-router";

const Pagination = ({ page, count }: { page: number; count: number }) => {
  const hasPrev = 10 * (page - 1) > 0;
  const hasNext = 10 * (page - 1) + 10 < count;

  const navigate = useNavigate({ from: "/list/teachers" });

  const changePage = (newPage: number) => {
    navigate({ search: (prev) => ({ ...prev, page: newPage }) });
  };

  return (
    <div className="p-4 flex items-center justify-between text-gray-500">
      <button
        disabled={!hasPrev}
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={() => {
          changePage(page - 1);
        }}
      >
        Prev
      </button>
      <div className="flex items-center gap-2 text-sm">
        {Array.from({ length: Math.ceil(count / 10) }, (_, index) => {
          const pageIndex = index + 1;
          return (
            <button
              key={pageIndex}
              className={`px-2 rounded-sm ${
                page === pageIndex ? "bg-lamaSky" : ""
              }`}
              onClick={() => {
                changePage(pageIndex);
              }}
            >
              {pageIndex}
            </button>
          );
        })}
      </div>
      <button
        className="py-2 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!hasNext}
        onClick={() => {
          changePage(page + 1);
        }}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
