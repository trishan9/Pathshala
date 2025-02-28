import { apiActions } from "@/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { z } from "zod";

export interface useGetLessonsProps {
  page?: number | null;
  teacherId?: string | null;
  classId?: number | null;
  search?: string | null;
}

export const useGetLessons = ({
  page,
  teacherId,
  classId,
  search,
}: useGetLessonsProps) => {
  const query = useQuery({
    queryKey: ["lessons", page, teacherId, classId, search],
    queryFn: async () => {
      const response = await apiActions.lesson.getAll({
        page: page ?? undefined,
        teacherId: teacherId ?? undefined,
        classId: classId ?? undefined,
        search: search ?? undefined,
      });

      if (!response.data) {
        throw new Error("Failed to get lessons");
      }

      return response.data;
    },
  });

  return query;
};

export const lessonSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Lesson name is required!" }),
  day: z.string().optional(),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  subjectId: z.coerce.string({ message: "Subject is required!" }),
  classId: z.coerce.number({ message: "Class is required!" }),
  teacherId: z.coerce.string({ message: "Teacher is required!" }),
});

export type LessonSchema = z.infer<typeof lessonSchema>;

export const useCreateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LessonSchema) => {
      const response = await apiActions.lesson.create(data);
      if (!response.data) {
        throw new Error("Failed to create lesson");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};

export const useUpdateLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: string;
      data: Partial<LessonSchema>;
    }) => {
      const response = await apiActions.lesson.update(id, data);
      if (!response.data) {
        throw new Error("Failed to update lesson");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};

export const useDeleteLesson = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const response = await apiActions.lesson.delete(id);
      if (!response.data) {
        throw new Error("Failed to delete lesson");
      }
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lessons"] });
    },
  });
};
