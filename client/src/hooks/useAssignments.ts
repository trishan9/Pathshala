import { apiActions } from "@/api";
import { useQuery } from "@tanstack/react-query";

export interface useGetAssignmentsProps {
  page?: number | null;
  classId?: number | null;
  teacherId?: string | null;
  search?: string | null;
}

export const useGetAssignments = ({
  page,
  classId,
  teacherId,
  search,
}: useGetAssignmentsProps) => {
  const query = useQuery({
    queryKey: ["assignments", page, classId, teacherId, search],
    queryFn: async () => {
      const response = await apiActions.assignment.getAll({
        page: page ?? undefined,
        classId: classId ?? undefined,
        teacherId: teacherId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get assignments");
      }

      return response.data;
    },
  });

  return query;
};
