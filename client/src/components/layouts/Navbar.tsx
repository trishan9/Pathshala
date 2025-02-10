import { Search } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { UserButton } from "./UserButton";
import { Input } from "@/components/ui/input";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 h-full bg-white border-b">
      <MobileSidebar />

      <div className="relative items-center hidden sm:flex">
        <Input
          type="search"
          placeholder="Search..."
          className="w-[350px] h-10 outline-none focus:border-blue-400 pl-9"
        />
        <Search className="text-neutral-300 w-5 h-5 absolute left-2" />
      </div>

      <UserButton />
    </div>
  );
};

export default NavBar;
