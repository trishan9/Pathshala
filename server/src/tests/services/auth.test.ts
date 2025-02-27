import mockPrisma from "@/__mocks__/prismaClient";
jest.mock("@/db", () => mockPrisma);

jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: jest.fn().mockResolvedValue(true), // Always return true for valid credentials
}));

import * as authServices from "@/services/auth.services";

describe("Auth Services", () => {
  it("should register a user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    };

    const result = await authServices.register(newUser);

    expect(result.username).toBe(newUser.username);
    expect(mockPrisma.user.create).toHaveBeenCalledWith({
      data: expect.objectContaining({ username: newUser.username }),
    });
  });

  it("should log in a user", async () => {
    const loginData = { username: "testuser", password: "password123" };

    // Mock the Prisma findUnique response
    mockPrisma.user.findUnique.mockResolvedValue({
      id: "1",
      username: "existingUser",
      password: "hashedPassword",
    });

    const result = await authServices.login(loginData);

    expect(result.accessToken).toBeDefined();
    expect(result.refreshToken).toBeDefined();
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { username: loginData.username },
    });
  });

  it("should fetch the current user data", async () => {
    const userId = "1";

    const result = await authServices.getMe(userId);

    expect(result.id).toBe(userId);
    expect(result.username).toBe("existingUser"); // Mocked data
    expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
  });
});
