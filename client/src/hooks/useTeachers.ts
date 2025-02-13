import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetTeachersProps {
  page?: number | null;
  classId?: number | null;
  search?: string | null;
}

export const useGetTeachers = ({
  page,
  classId,
  search,
}: useGetTeachersProps) => {
  const query = useQuery({
    queryKey: ["teachers", page, classId, search],
    queryFn: async () => {
      const response = await apiActions.teacher.getAll({
        page: page ?? undefined,
        classId: classId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get teachers");
      }

      return response.data;
    },
  });

  return query;
};
