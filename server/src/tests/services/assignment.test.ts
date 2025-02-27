import mockPrisma from "@/__mocks__/prismaClient";
jest.mock("@/db", () => mockPrisma);

import * as assignmentServices from "@/services/assignment.services";
import { Role } from "@prisma/client";

describe("Assignment Services", () => {
    it("should fetch all assignments for a class", async () => {
        const params = { page: 1, classId: 1 };
        const currUser = { id: "123", role: Role.teacher };

        const result = await assignmentServices.getAllAssignments(params, currUser);

        expect(result.assignments).toHaveLength(1);
        expect(result.assignments[0].title).toBe("Test Assignment");
        expect(mockPrisma.assignment.findMany).toHaveBeenCalled();
    });

    it("should create an assignment", async () => {
        const newAssignment = {
            title: "New Assignment",
            question: "Assignment Question",
            startDate: new Date(),
            dueDate: new Date(),
            lessonId: "1",
        };

        const result = await assignmentServices.createAssignment(newAssignment);

        expect(result.title).toBe(newAssignment.title);
        expect(mockPrisma.assignment.create).toHaveBeenCalledWith({
            data: newAssignment,
        });
    });

    it("should update an existing assignment", async () => {
        const updatedAssignment = { title: "Updated Title" };

        const result = await assignmentServices.updateAssignment("1", updatedAssignment);

        expect(result.title).toBe(updatedAssignment.title);
        expect(mockPrisma.assignment.update).toHaveBeenCalled();
    });

    it("should delete an assignment", async () => {
        const result = await assignmentServices.deleteAssignment("1");

        expect(result.id).toBe("1");
        expect(mockPrisma.assignment.delete).toHaveBeenCalled();
    });
});
