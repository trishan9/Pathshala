import request from "supertest";
import express from "express";
import mockPrisma from "@/__mocks__/prismaClient";
import { examRouter } from "@/routes/exam.routes";

jest.mock("@/db", () => mockPrisma);
jest.mock("@/middlewares/isAuthenicated", () => ({
    isAuthenticated: (req, res, next) => {
        res.locals.user = { id: "123", role: "teacher" };
        next();
    },
}));

const app = express();
app.use(express.json());
app.use("/exams", examRouter);

describe("Exam Routes", () => {
    it("should get all exams for a class", async () => {
        const res = await request(app).get("/exams?class=1");

        expect(res.status).toBe(200);
        expect(res.body.exams).toHaveLength(1);
    });

    it("should create an exam", async () => {
        const newexam = {
            title: "New exam",
            instruction: "Exam Instruction",
            endTime: new Date(),
            classId: 1,
        };

        const res = await request(app).post("/exams").send(newexam);

        expect(res.status).toBe(201);
        expect(res.body.exam.title).toBe("New exam");
    });

    it("should update an exam", async () => {
        const updatedexam = {
            title: "Updated Title",
        };

        const res = await request(app).patch("/exams/1").send(updatedexam);

        expect(res.status).toBe(200);
        expect(res.body.exam.title).toBe("Updated Title");
    });

    it("should delete an exam", async () => {
        const res = await request(app).delete("/exams/1");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Exam deleted successfully");
    });
});
