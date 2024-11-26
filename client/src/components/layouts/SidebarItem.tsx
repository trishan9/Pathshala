import { Link, useLocation } from "@tanstack/react-router";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ISidebarItemProps {
  icon: LucideIcon;
  href: string;
  label: string;
}

const SidebarItem = ({ icon: Icon, href, label }: ISidebarItemProps) => {
  const location = useLocation();

  const isActive =
    (location.pathname === "/" && href === "/") ||
    location.pathname === href ||
    location.pathname?.startsWith(`${href}/`);

  return (
    <Link
      to={href}
      className={cn(
        "flex items-center gap-x-2 text-sm font-medium pl-6 transition-all text-slate-500 hover:text-slate-600 hover:bg-slate-300/20",
        isActive &&
          "bg-sky-100 text-[#087E8B] hover:bg-[#BFD7EA/20] hover:text-[#087E8B] border-r-4 border-[#087E8B]",
      )}
    >
      <button>
        <div className="flex items-center py-4 gap-x-3">
          <Icon size={22} />

          <p className="font-semibold">{label}</p>
        </div>
      </button>
    </Link>
  );
};

export default SidebarItem;
