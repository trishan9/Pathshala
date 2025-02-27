import request from "supertest";
import express from "express";
import mockPrisma from "@/__mocks__/prismaClient";
import { assignmentRouter } from "@/routes/assignment.routes";

jest.mock("@/db", () => mockPrisma);
jest.mock("@/middlewares/isAuthenicated", () => ({
    isAuthenticated: (req, res, next) => {
        res.locals.user = { id: "123", role: "teacher" };
        next();
    },
}));

const app = express();
app.use(express.json());
app.use("/assignments", assignmentRouter);

describe("Assignment Routes", () => {
    it("should get all assignments for a class", async () => {
        const res = await request(app).get("/assignments?class=1");

        expect(res.status).toBe(200);
        expect(res.body.assignments).toHaveLength(1);
    });

    it("should create an assignment", async () => {
        const newAssignment = {
            title: "New Assignment",
            description: "Assignment Description",
            dueDate: new Date(),
            classId: 1,
        };

        const res = await request(app).post("/assignments").send(newAssignment);

        expect(res.status).toBe(201);
        expect(res.body.assignment.title).toBe("New Assignment");
    });

    it("should update an assignment", async () => {
        const updatedAssignment = {
            title: "Updated Title",
            description: "Updated Desc",
            dueDate: new Date(),
        };

        const res = await request(app).patch("/assignments/1").send(updatedAssignment);

        expect(res.status).toBe(200);
        expect(res.body.assignment.title).toBe("Updated Title");
    });

    it("should delete an assignment", async () => {
        const res = await request(app).delete("/assignments/1");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Assignment deleted successfully");
    });
});
