import client from "@/db";
import { Prisma, User } from "@prisma/client";

export const getAttendanceAnalytics = async (isWeekly: boolean) => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  return await client.attendance.findMany({
    where: {
      ...(isWeekly && {
        date: {
          gte: lastMonday,
        },
      })
    },
    select: {
      date: true,
      present: true,
    },
  });
};

export const getLessons = async (teacherId: string) => {
  return await client.lesson.findMany({
    where: {
      teacherId,
    },
    select: {
      id: true,
      name: true,
      day: true,
      class: { select: { id: true } },
      startTime: true,
      endTime: true,
    },
  });
};

export const getClassStudents = async (lessonId: string) => {
  return client.student.findMany({
    where: {
      class: {
        lessons: { some: { id: lessonId } },
      },
    },
    select: {
      id: true,
      name: true,
      attendances: {
        where: {
          date: new Date(),
        },
      },
    },
  });
};

export const recordAttendance = async (
  lessonId: string,
  attendanceRecords: { studentId: string; present: boolean }[],
) => {
  const today = new Date();
  return client.$transaction(async (tx) => {
    await tx.attendance.deleteMany({
      where: {
        lessonId,
        date: today,
      },
    });

    const records = attendanceRecords.map((record) =>
      tx.attendance.create({
        data: {
          lessonId,
          studentId: record.studentId,
          present: record.present,
          date: today,
        },
      }),
    );
    return Promise.all(records);
  });
};

export interface AttendanceRecord {
  id: string;
  date: Date;
  present: boolean;
  student: {
    id: string;
    name: string;
  };
  lesson: {
    id: string;
    name: string;
    subject: {
      name: string;
    };
    teacher: {
      name: string;
    };
    class: {
      name: string;
    };
  };
}

export interface GetAttendanceParams {
  page?: number;
  startDate?: Date;
  endDate?: Date;
  classId?: string;
  teacherId?: string;
  lessonId?: string;
  search?: string;
}

export const getAttendanceDetails = async (
  params: GetAttendanceParams,
) => {
  const {
    startDate,
    endDate,
  } = params;

  const whereClause: Prisma.AttendanceWhereInput = {
    ...(startDate &&
      endDate && {
      date: {
        gte: new Date(startDate),
        lte: new Date(endDate),
      },
    }),
  };

  const [records, totalCount] = await client.$transaction([
    client.attendance.findMany({
      where: whereClause,
      include: {
        student: {
          select: {
            id: true,
            name: true,
          },
        },
        Lesson: {
          select: {
            id: true,
            name: true,
            subject: { select: { name: true } },
            teacher: { select: { name: true } },
            class: { select: { name: true } },
          },
        },
      },
      orderBy: {
        date: "desc",
      },
    }),
    client.attendance.count({ where: whereClause }),
  ]);

  return { records, totalCount };
};
