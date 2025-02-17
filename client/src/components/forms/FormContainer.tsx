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

  if (type !== "delete") {
    switch (table) {
      case "teacher":
        relatedData = { subjects: teacherSubjects };
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
