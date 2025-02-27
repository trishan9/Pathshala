import mockPrisma from "@/__mocks__/prismaClient";
jest.mock("@/db", () => mockPrisma);

import * as announcementServices from "@/services/announcement.services";
import { Role } from "@prisma/client";

describe("Announcement Services", () => {
  it("should fetch all announcements", async () => {
    const params = { page: 1 };
    const currUser = { id: "123", role: Role.teacher};

    const result = await announcementServices.getAllAnnouncements(params, currUser);

    expect(result.announcements).toHaveLength(1);
    expect(result.announcements[0].title).toBe("Test Announcement");
    expect(mockPrisma.announcement.findMany).toHaveBeenCalled();
  });

  it("should create an announcement", async () => {
    const newAnnouncement = {
      title: "New Announcement",
      description: "Description",
      date: new Date(),
      classId: 1,
    };

    const result = await announcementServices.createAnnouncement(newAnnouncement);

    expect(result.title).toBe(newAnnouncement.title);
    expect(mockPrisma.announcement.create).toHaveBeenCalledWith({
      data: newAnnouncement,
    });
  });

  it("should update an existing announcement", async () => {
    const updatedAnnouncement = { title: "Updated Title", description: "Updated Desc", date: new Date() };

    const result = await announcementServices.updateAnnouncement("1", updatedAnnouncement);

    expect(result.title).toBe(updatedAnnouncement.title);
    expect(mockPrisma.announcement.update).toHaveBeenCalled();
  });

  it("should delete an announcement", async () => {
    const result = await announcementServices.deleteAnnouncement("1");

    expect(result.id).toBe("1");
    expect(mockPrisma.announcement.delete).toHaveBeenCalled();
  });
});
