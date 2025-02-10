import { MegaphoneIcon, MessageCircle, Search } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { UserButton } from "./UserButton";
import { Input } from "../ui/input";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 h-full bg-white border-b">
      <MobileSidebar />

      <div className="relative flex items-center">
        <Input
          type="search"
          placeholder="Search..."
          className="w-[350px] h-10 outline-none focus:border-blue-400 pl-9"
        />
        <Search className="text-neutral-300 w-5 h-5 absolute left-2" />
      </div>

      <div className="flex items-center gap-6 justify-end w-full">
        <MessageCircle className="w-5 h-5 text-gray-400" />
        <div className="bg-white rounded-full flex items-center justify-center cursor-pointer relative">
          <MegaphoneIcon className="w-5 h-5 text-gray-400" />
          <div className="absolute -top-3 -right-3 w-5 h-5 flex items-center justify-center bg-purple-500 text-white rounded-full text-xs">
            1
          </div>
        </div>
        <UserButton />
      </div>
    </div>
  );
};

export default NavBar;
