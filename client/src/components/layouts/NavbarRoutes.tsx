import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";

const NavBarRoutes = () => {
  return (
    <div className="flex gap-2 ml-auto">
      <Link to="/login">
        <Button variant="ghost" size="sm">
          <LogOut className="w-4 mr-2" />
          Logout
        </Button>
      </Link>
    </div>
  );
};

export default NavBarRoutes;
