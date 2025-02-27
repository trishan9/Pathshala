import {
  BarChart,
  Book,
  BookOpenText,
  CalendarCheck,
  CalendarRange,
  ClipboardMinus,
  GraduationCap,
  Layout,
  List,
  Megaphone,
  NotebookPen,
  NotebookText,
  Sparkles,
  University,
  Users,
} from "lucide-react";
import SidebarItem, { ISidebarItemProps } from "./SidebarItem";
import { useAuthStore } from "@/stores/authStore";
import { PageLoader } from "../PageLoader";

const studentRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/student",
  },
  {
    icon: BookOpenText,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: NotebookPen,
    label: "Exams",
    href: "/list/exams",
  },
  {
    icon: NotebookText,
    label: "Assignments",
    href: "/list/assignments",
  },
  {
    icon: ClipboardMinus,
    label: "Results",
    href: "/list/results",
  },
  {
    icon: CalendarRange,
    label: "Events",
    href: "/list/events",
  },
  {
    icon: Megaphone,
    label: "Announcements",
    href: "/list/announcements",
  },
];

const teacherRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/teacher",
  },
  {
    icon: BookOpenText,
    label: "Courses",
    href: "/courses",
  },
  {
    icon: CalendarCheck,
    label: "Attendance",
    href: "/list/attendance/mark",
  },
  {
    icon: NotebookText,
    label: "Assignments",
    href: "/list/assignments",
  },
  {
    icon: NotebookPen,
    label: "Exams",
    href: "/list/exams",
  },
  {
    icon: ClipboardMinus,
    label: "Results",
    href: "/list/results",
  },
  {
    icon: University,
    label: "Classes",
    href: "/list/classes",
  },
  {
    icon: Book,
    label: "Lessons",
    href: "/list/lessons",
  },
  {
    icon: GraduationCap,
    label: "Teachers",
    href: "/list/teachers",
  },
  {
    icon: Users,
    label: "Students",
    href: "/list/students",
  },
  {
    icon: CalendarRange,
    label: "Events",
    href: "/list/events",
  },
  {
    icon: Megaphone,
    label: "Announcements",
    href: "/list/announcements",
  },
  {
    icon: Sparkles,
    label: "EvaluateAI",
    href: "/evaluate-performance",
  },
];

const adminRoutes = [
  {
    icon: Layout,
    label: "Dashboard",
    href: "/admin",
  },
  {
    icon: GraduationCap,
    label: "Teachers",
    href: "/list/teachers",
  },
  {
    icon: Users,
    label: "Students",
    href: "/list/students",
  },
  {
    icon: List,
    label: "Subjects",
    href: "/list/subjects",
  },
  {
    icon: University,
    label: "Classes",
    href: "/list/classes",
  },
  {
    icon: Book,
    label: "Lessons",
    href: "/list/lessons",
  },
  {
    icon: NotebookPen,
    label: "Exams",
    href: "/list/exams",
  },
  {
    icon: NotebookText,
    label: "Assignments",
    href: "/list/assignments",
  },
  {
    icon: ClipboardMinus,
    label: "Results",
    href: "/list/results",
  },
  {
    icon: CalendarCheck,
    label: "Attendance",
    href: "/list/attendance",
  },
  {
    icon: CalendarRange,
    label: "Events",
    href: "/list/events",
  },
  {
    icon: Megaphone,
    label: "Announcements",
    href: "/list/announcements",
  },
  {
    icon: Sparkles,
    label: "EvaluateAI",
    href: "/evaluate-performance",
  },
];

const SidebarRoutes = () => {
  const currUser = useAuthStore((state) => state.user);

  if (!currUser) {
    <PageLoader />;
  }

  const routes =
    currUser?.role === "admin"
      ? adminRoutes
      : currUser?.role === "student"
        ? studentRoutes
        : teacherRoutes;

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
