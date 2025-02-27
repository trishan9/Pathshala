import mockPrisma from "@/__mocks__/prismaClient";
jest.mock("@/db", () => mockPrisma);

import * as classServices from "@/services/class.services";

describe("Class Services", () => {
    it("should fetch all classes", async () => {
        const params = { page: 1, classId: 1 };

        const result = await classServices.getAllClasses(params);

        expect(result.classes).toHaveLength(1);
        expect(result.classes[0].name).toBe("6B");
        expect(mockPrisma.class.findMany).toHaveBeenCalled();
    });

    it("should create a class", async () => {
        const newClass = {
            name: "12A",
            capacity: 20,
            gradeId: "12",
        };

        const result = await classServices.createClass(newClass);

        expect(result.name).toBe(newClass.name);
        expect(mockPrisma.class.create).toHaveBeenCalledWith({
            data: newClass,
        });
    });

    it("should update an existing class", async () => {
        const updatedClass = { name: "6C" };

        const result = await classServices.updateClass(1, updatedClass);

        expect(result.name).toBe(updatedClass.name);
        expect(mockPrisma.class.update).toHaveBeenCalled();
    });

    it("should delete a class", async () => {
        const result = await classServices.deleteClass(1);

        expect(result.id).toBe(1);
        expect(mockPrisma.class.delete).toHaveBeenCalled();
    });
});
