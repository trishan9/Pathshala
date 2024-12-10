import {
  BarChart,
  BookOpenText,
  CalendarRange,
  ClipboardMinus,
  Layout,
  List,
  Megaphone,
  NotebookPen,
  NotebookText,
  Settings,
} from "lucide-react";
import SidebarItem, { ISidebarItemProps } from "./SidebarItem";
import { useLocation } from "@tanstack/react-router";

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/",
  },
  {
    icon: Megaphone,
    label: "Announcements",
    href: "/announcements",
  },
  {
    icon: BookOpenText,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: CalendarRange,
    label: "Attendance",
    href: "/attendance",
  },
  {
    icon: NotebookPen,
    label: "Exams",
    href: "/exams",
  },
  {
    icon: ClipboardMinus,
    label: "Results",
    href: "/results",
  },
  {
    icon: NotebookText,
    label: "Assignments",
    href: "/assignments",
  },

  {
    icon: Settings,
    label: "Settings",
    href: "/settings",
  },
];

const instructorRoutes = [
  {
    icon: List,
    label: "Courses",
    href: "/instructor/courses",
  },
  {
    icon: BarChart,
    label: "Analytics",
    href: "/instructor/analytics",
  },
];

const SidebarRoutes = () => {
  const { pathname } = useLocation();

  const routes = pathname?.startsWith("/instructor")
    ? instructorRoutes
    : studentRoutes;

  return (
    <div className="flex flex-col w-full">
      {routes.map((route: ISidebarItemProps) => (
        <SidebarItem
          key={route.href}
          href={route.href}
          icon={route.icon}
          label={route.label}
        />
      ))}
    </div>
  );
};

export default SidebarRoutes;
