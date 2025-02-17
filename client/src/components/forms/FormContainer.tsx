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
  type: "create" | "update" | "delete";
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

  if (type !== "delete") {
    switch (table) {
      case "teacher":
        relatedData = { subjects: teacherSubjects };
        break;
      case "student":
        relatedData = { classes: studentClasses, grades: studentGrades };
        break;
      default:
        break;
    }
  }

  return (
    <div className="">
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
