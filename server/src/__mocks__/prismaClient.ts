const mockPrisma = {
  $transaction: jest.fn(async (queries) => {
    return Promise.all(queries);
  }),
  user: {
    findUnique: jest.fn().mockImplementation((query) => {
      if (query.where?.username === "existingUser") {
        return Promise.resolve({
          id: "1",
          username: "existingUser",
          email: "test@example.com",
          password: "hashedPassword",
        });
      }
      return Promise.resolve(null);
    }),
    findFirst: jest.fn().mockImplementation((query) => {
      if (query.where?.username === "existingUser") {
        return Promise.resolve({
          id: "1",
          username: "existingUser",
          email: "test@example.com",
          hashedPassword: "hashedPassword",
        });
      }
      return Promise.resolve(null);
    }),
    create: jest.fn().mockResolvedValue({
      id: "2",
      username: "testuser",
      email: "test@example.com",
      name: "Test User",
      password: "hashedPassword",
    }),
  },
  announcement: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Test Announcement",
        description: "Test Desc",
        date: new Date(),
      },
    ]),
    findFirst: jest
      .fn()
      .mockResolvedValue({ title: "Test Announcement", date: new Date() }),
    create: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: "2", ...data.data })),
    update: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ id: data.where.id, ...data.data }),
      ),
    delete: jest.fn().mockResolvedValue({ id: "1" }),
    count: jest.fn().mockResolvedValue(1),
  },
  assignment: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Test Assignment",
        question: "Test Desc",
        startDate: new Date(),
        endDate: new Date(),
        lessonId: "1",
      },
    ]),
    findFirst: jest.fn().mockResolvedValue({
      id: "1",
      title: "Test Assignment",
      question: "Test Desc",
      startDate: new Date(),
      endDate: new Date(),
      lessonId: "1",
    }),
    count: jest.fn().mockResolvedValue(1),
    create: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: "2", ...data.data })),
    update: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ id: data.where.id, ...data.data }),
      ),
    delete: jest.fn().mockResolvedValue({ id: "1" }),
  },
  exam: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: "1",
        title: "Test Exam",
        instruction: "Test Exam Instruction",
        startTime: new Date(),
        endTime: new Date(),
        lessonId: "1",
      },
    ]),
    findFirst: jest.fn().mockResolvedValue({
      id: "1",
      title: "Test Exam",
      instruction: "Test Exam Instruction",
      startTime: new Date(),
      endTime: new Date(),
      lessonId: "1",
    }),
    count: jest.fn().mockResolvedValue(1),
    create: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: "2", ...data.data })),
    update: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ id: data.where.id, ...data.data }),
      ),
    delete: jest.fn().mockResolvedValue({ id: "1" }),
  },
  class: {
    findMany: jest.fn().mockResolvedValue([
      {
        id: 6,
        name: "6B",
        capacity: 20,
      },
    ]),
    findFirst: jest.fn().mockResolvedValue({
      id: 6,
      name: "6B",
      capacity: 20,
    }),
    count: jest.fn().mockResolvedValue(1),
    create: jest
      .fn()
      .mockImplementation((data) => Promise.resolve({ id: 2, ...data.data })),
    update: jest
      .fn()
      .mockImplementation((data) =>
        Promise.resolve({ id: data.where.id, ...data.data }),
      ),
    delete: jest.fn().mockResolvedValue({ id: 1 }),
  },
};

export default mockPrisma;
