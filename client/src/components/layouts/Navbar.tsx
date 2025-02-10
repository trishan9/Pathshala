import { MegaphoneIcon, MessageCircle } from "lucide-react";
import MobileSidebar from "./MobileSidebar";
import { UserButton } from "./UserButton";

const NavBar = () => {
  return (
    <div className="flex items-center justify-between p-4 h-full bg-white border-b">
      <MobileSidebar />

      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2">
        <img src="/search.png" alt="" width={14} height={14} />
        <input
          type="text"
          placeholder="Search..."
          className="w-[200px] p-2 bg-transparent outline-none"
        />
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
