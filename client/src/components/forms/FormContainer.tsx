import { useQuery } from "@tanstack/react-query";
import FormModal from "./FormModal";
import { apiActions } from "@/api";

export type FormContainerProps = {
  table:
  | "teacher"
  | "student"
  | "parent"
  | "subject"
  | "class"
  | "lesson"
  | "exam"
  | "assignment"
  | "result"
  | "attendance"
  | "event"
  | "announcement";
  type: "create" | "update" | "delete" | "view";
  data?: any;
  id?: number | string;
};

const FormContainer = ({ table, type, data, id }: FormContainerProps) => {
  let relatedData = {};
  const { data: teacherSubjects } = useQuery({
    queryKey: ["teacherSubjects"],
    queryFn: async () => {
      const response = await apiActions.subject.getTeacherSubjects();

      if (!response.data) {
        throw new Error("Failed to get teacher subjects");
      }

      return response.data.teacherSubjects;
    },
  });

  const { data: studentGrades } = useQuery({
    queryKey: ["studentGrades"],
    queryFn: async () => {
      const response = await apiActions.class.getStudentGrades();

      if (!response.data) {
        throw new Error("Failed to get student grades");
      }

      return response.data.studentGrades;
    },
  });

  const { data: studentClasses } = useQuery({
    queryKey: ["studentClasses"],
    queryFn: async () => {
      const response = await apiActions.class.getStudentClasses();

      if (!response.data) {
        throw new Error("Failed to get student classes");
      }

      return response.data.studentClasses;
    },
  });

  const { data: classGrades } = useQuery({
    queryKey: ["classGrades"],
    queryFn: async () => {
      const response = await apiActions.class.getClassGrades();

      if (!response.data) {
        throw new Error("Failed to get class grades");
      }

      return response.data.classGrades;
    },
  });

  const { data: classTeachers } = useQuery({
    queryKey: ["classTeachers"],
    queryFn: async () => {
      const response = await apiActions.teacher.getClassTeachers();

      if (!response.data) {
        throw new Error("Failed to get class teachers");
      }

      return response.data.classTeachers;
    },
  });

  const { data: examLessons } = useQuery({
    queryKey: ["examLessons"],
    queryFn: async () => {
      const response = await apiActions.lesson.getExamLessons();

      if (!response.data) {
        throw new Error("Failed to get exam lessons");
      }

      return response.data.examLessons;
    },
  });

  const { data: studentsList } = useQuery({
    queryKey: ["studentsList"],
    queryFn: async () => {
      const response = await apiActions.result.getStudentsList();

      if (!response.data) {
        throw new Error("Failed to get students");
      }

      return response.data.studentsList;
    },
  });

  const { data: examsList } = useQuery({
    queryKey: ["examsList"],
    queryFn: async () => {
      const response = await apiActions.result.getExamsList();

      if (!response.data) {
        throw new Error("Failed to get exams");
      }

      return response.data.examsList;
    },
  });

  const { data: assignmentsList } = useQuery({
    queryKey: ["assignmentsList"],
    queryFn: async () => {
      const response = await apiActions.result.getAssignmentsList();

      if (!response.data) {
        throw new Error("Failed to get assignments");
      }

      return response.data.assignmentsList;
    },
  });

  if (type !== "delete") {
    switch (table) {
      case "teacher":
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      case "class":
        relatedData = { teachers: classTeachers, grades: classGrades };
        break;
      case "announcement":
        relatedData = { classes: studentClasses };
        break;
      case "event":
        relatedData = { classes: studentClasses };
        break;
      case "exam":
        relatedData = { lessons: examLessons };
        break;
      case "assignment":
        relatedData = { lessons: examLessons };
        break;
      case "result":
        relatedData = { students: studentsList, exams: examsList, assignments: assignmentsList };
        break;
      case "lesson":
        relatedData = { classes: studentClasses, teachers: classTeachers, subjects: teacherSubjects };
        break;
      default:
        break;
    }
  }

  return (
    <div>
      <FormModal
        table={table}
        type={type}
        data={data}
        id={id}
        relatedData={relatedData}
      />
    </div>
  );
};

export default FormContainer;
