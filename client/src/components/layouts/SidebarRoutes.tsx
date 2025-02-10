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
import { useLocation } from "@tanstack/react-router";
import SidebarItem, { ISidebarItemProps } from "./SidebarItem";

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

const adminRoutes = [
  {
    icon: Layout,
    label: "Admin Dashboard",
    href: "/admin",
  },
  {
    icon: Megaphone,
    label: "Announcements",
    href: "/admin/announcements",
  },
  {
    icon: BookOpenText,
    label: "Courses",
    href: "/admin/courses",
  },
  {
    icon: CalendarRange,
    label: "Attendance",
    href: "/admin/attendance",
  },
  {
    icon: NotebookPen,
    label: "Exams",
    href: "/admin/exams",
  },
  {
    icon: ClipboardMinus,
    label: "Results",
    href: "/admin/results",
  },
  {
    icon: NotebookText,
    label: "Assignments",
    href: "/admin/assignments",
  },

  {
    icon: Settings,
    label: "Admin Settings",
    href: "/admin/settings",
  },
];

const SidebarRoutes = () => {
  const { pathname } = useLocation();

  const routes = pathname?.startsWith("/instructor")
    ? instructorRoutes
    : pathname?.startsWith("/admin")
      ? adminRoutes
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
