import request from "supertest";
import express from "express";
import mockPrisma from "@/__mocks__/prismaClient";
import { classRouter } from "@/routes/class.routes";

jest.mock("@/db", () => mockPrisma);
jest.mock("@/middlewares/isAuthenicated", () => ({
  isAuthenticated: (req, res, next) => {
    res.locals.user = { id: "123", role: "teacher" };
    next();
  },
}));

const app = express();
app.use(express.json());
app.use("/classes", classRouter);

describe("Class Routes", () => {
  it("should get all classes", async () => {
    const res = await request(app).get("/classes");

    expect(res.status).toBe(200);
    expect(res.body.classes).toHaveLength(1);
  });

  it("should create a class", async () => {
    const newClass = {
      name: "12C",
      gradeId: "12",
      capacity: 20,
    };

    const res = await request(app).post("/classes").send(newClass);

    expect(res.status).toBe(201);
    expect(res.body.class.name).toBe("12C");
  });

  it("should update class", async () => {
    const updatedClass = {
      name: "12D",
    };

    const res = await request(app).patch("/classes/1").send(updatedClass);

    expect(res.status).toBe(200);
    expect(res.body.class.name).toBe("12D");
  });

  it("should delete a class", async () => {
    const res = await request(app).delete("/classes/1");

    expect(res.status).toBe(200);
    expect(res.body.message).toBe("Class deleted successfully");
  });
});
