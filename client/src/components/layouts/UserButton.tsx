import { Loader2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetMe } from "@/hooks/useAuth";
import { Separator } from "@/components/ui/separator";
import NavBarRoutes from "./NavbarRoutes";

export const UserButton = () => {
  const { data: user, isLoading } = useGetMe();

  if (isLoading) {
    return (
      <div className="size-10 rounded-full flex items-center justify-center bg-neutral-200 border border-neutral-300">
        <Loader2 className="size-4 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!user) return null;

  const { name, email, role } = user.data.data;
  const avatarFallback = name
    ? name.charAt(0).toUpperCase()
    : (email.charAt(0).toUpperCase() ?? "U");

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger className="outline-none relative">
        <Avatar className="size-8 hover:opacity-75 transition border">
          <AvatarFallback className="bg-[#087E8B] font-medium text-white flex items-center justify-center">
            {avatarFallback}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        side="bottom"
        className="w-60"
        sideOffset={10}
      >
        <div className="flex flex-col items-center justify-center gap-2 px-2.5 py-4">
          <Avatar className="size-[52px] border">
            <AvatarFallback className="bg-[#087E8B] text-xl font-medium text-white flex items-center justify-center">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-center justify-center">
            <p className="text-sm font-medium text-neutral-900">
              {name || "User"}
            </p>

            <p className="text-xs mb-1 capitalize text-neutral-500 font-semibold">
              {role}
            </p>

            <p className="text-xs text-neutral-500">{email}</p>
          </div>
        </div>

        <Separator className="mb-1" />

        <NavBarRoutes />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
