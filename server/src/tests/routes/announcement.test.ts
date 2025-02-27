import request from "supertest";
import express from "express";
import mockPrisma from "@/__mocks__/prismaClient";
import { announcementRouter } from "@/routes/announcement.routes";

jest.mock("@/db", () => mockPrisma);
jest.mock("@/middlewares/isAuthenicated", () => ({
    isAuthenticated: (req, res, next) => {
        res.locals.user = { id: "123", role: "teacher" };
        next();
    },
}));

const app = express();
app.use(express.json());
app.use("/announcements", announcementRouter);

describe("Announcement Routes", () => {
    it("should get all announcements", async () => {
        const res = await request(app).get("/announcements");

        expect(res.status).toBe(200);
        expect(res.body.announcements).toHaveLength(1);
    });

    it("should create an announcement", async () => {
        const newAnnouncement = {
            title: "New Announcement",
            description: "Description",
            date: new Date(),
            classId: 1,
        };

        const res = await request(app).post("/announcements").send(newAnnouncement);

        expect(res.status).toBe(201);
        expect(res.body.announcement.title).toBe("New Announcement");
    });

    it("should update an announcement", async () => {
        const res = await request(app).patch("/announcements/1").send({
            title: "Updated Announcement",
            description: "Updated Description",
        });

        expect(res.status).toBe(200);
        expect(res.body.announcement.title).toBe("Updated Announcement");
    });

    it("should delete an announcement", async () => {
        const res = await request(app).delete("/announcements/1");

        expect(res.status).toBe(200);
        expect(res.body.message).toBe("Announcement deleted successfully");
    });
});
