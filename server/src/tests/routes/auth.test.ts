import request from "supertest";
import express from "express";
import mockPrisma from "@/__mocks__/prismaClient";
import { authRouter } from "@/routes/auth.routes"; // Import your auth routes

jest.mock("@/db", () => mockPrisma);
jest.mock("@/middlewares/isAuthenicated", () => ({
  isAuthenticated: (req, res, next) => {
    res.locals.user = {
      id: "1",
      username: "existingUser",
      email: "test@example.com",
      password: "hashedPassword",
    }; // Mock user
    next();
  },
}));
jest.mock("bcrypt", () => ({
  ...jest.requireActual("bcrypt"),
  compare: jest.fn().mockResolvedValue(true), // Always return true for valid credentials
}));

const app = express();
app.use(express.json());
app.use("/auth", authRouter);

describe("Auth Routes", () => {
  it("should register a user", async () => {
    const newUser = {
      username: "testuser",
      email: "test@example.com",
      name: "Test User",
      password: "password123",
    };

    const res = await request(app).post("/auth/register").send(newUser);

    expect(res.status).toBe(201);
    expect(res.body.data.username).toBe(newUser.username);
  });

  it("should log in a user", async () => {
    const loginData = {
      username: "existingUser",
      password: "password123",
    };

    const res = await request(app).post("/auth/login").send(loginData);

    expect(res.status).toBe(200);
    expect(res.body.accessToken).toBeDefined();
  });
});
