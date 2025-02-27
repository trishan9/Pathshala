import mockPrisma from "@/__mocks__/prismaClient";
jest.mock("@/db", () => mockPrisma);

import * as examServices from "@/services/exam.services";
import { Role } from "@prisma/client";

describe("Exam Services", () => {
    it("should fetch all exams for a lesson", async () => {
        const params = { page: 1, classId: 1 };
        const currUser = { id: "123", role: Role.teacher };

        const result = await examServices.getAllExams(params, currUser);

        expect(result.exams).toHaveLength(1);
        expect(result.exams[0].title).toBe("Test Exam");
        expect(mockPrisma.exam.findMany).toHaveBeenCalled();
    });

    it("should create an assignment", async () => {
        const newExam = {
            title: "New Assignment",
            instruction: "Exam Instruction",
            startTime: new Date(),
            endTime: new Date(),
            lessonId: "1",
        };

        const result = await examServices.createExam(newExam);

        expect(result.title).toBe(newExam.title);
        expect(mockPrisma.exam.create).toHaveBeenCalledWith({
            data: newExam,
        });
    });

    it("should update an existing exam", async () => {
        const updatedExam = { title: "Updated Title" };

        const result = await examServices.updateExam("1", updatedExam);

        expect(result.title).toBe(updatedExam.title);
        expect(mockPrisma.exam.update).toHaveBeenCalled();
    });

    it("should delete an assignment", async () => {
        const result = await examServices.deleteExam("1");

        expect(result.id).toBe("1");
        expect(mockPrisma.exam.delete).toHaveBeenCalled();
    });
});
