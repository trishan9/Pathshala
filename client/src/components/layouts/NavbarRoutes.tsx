import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useLogout } from "@/hooks/useAuth";

const NavBarRoutes = () => {
  const logout = useLogout();

  const handleLogout = () => {
    logout.mutate();
  };

  return (
    <div className="flex gap-2 ml-auto w-full items-center justify-center">
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-600 w-full"
          >
            <LogOut className="w-4 mr-2" />
            Logout
          </Button>
        </AlertDialogTrigger>

        <AlertDialogContent>
          <AlertDialogTitle>Logout Confirmation</AlertDialogTitle>

          <AlertDialogDescription>
            Are you sure you want to logout?
          </AlertDialogDescription>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <Button variant="destructive" onClick={handleLogout}>
              Logout
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default NavBarRoutes;
