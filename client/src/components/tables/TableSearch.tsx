import { useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";

const TableSearch = () => {
  const navigate = useNavigate({ from: "/list/teachers" });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const query = (e.currentTarget[0] as HTMLInputElement).value;
    navigate({ search: (prev) => ({ ...prev, search: query }) });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full md:w-auto flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2"
    >
      <Search className="w-4 h-4" />

      <input
        type="text"
        placeholder="Search..."
        className="w-[200px] p-2 bg-transparent outline-none"
      />
    </form>
  );
};

export default TableSearch;
