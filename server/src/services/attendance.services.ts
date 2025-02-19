import client from "@/db";

export const getAttendanceAnalytics = async () => {
  const today = new Date();
  const dayOfWeek = today.getDay();
  const daysSinceMonday = dayOfWeek === 0 ? 6 : dayOfWeek - 1;

  const lastMonday = new Date(today);
  lastMonday.setDate(today.getDate() - daysSinceMonday);

  return await client.attendance.findMany({
    where: {
      date: {
        gte: lastMonday,
      },
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
      class: {select: {id: true}},
      startTime: true,
      endTime: true,
    },
  });
};

export const getClassStudents = async (lessonId: string) => {
  return client.student.findMany({
    where: {
      class: {
        lessons: {some: {id: lessonId}}
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
}

export const recordAttendance = async(lessonId: string, attendanceRecords: { studentId: string; present: boolean }[]) => {
  const today = new Date();
  return client.$transaction(async (tx) => {
    await tx.attendance.deleteMany({
      where: {
        lessonId,
        date: today
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
      })
    );
    return Promise.all(records);
  });
}
