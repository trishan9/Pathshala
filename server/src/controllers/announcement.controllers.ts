import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as announcementServices from "@/services/announcement.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllAnnouncements = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const currUser = res.locals.user;

    const { announcements, announcementsCount } =
      await announcementServices.getAllAnnouncements(
        query as announcementServices.GetAnnouncementParams,
        currUser,
      );

    return apiResponse(res, StatusCodes.OK, {
      announcementsCount,
      announcements,
      message: responseMessage.ANNOUNCEMENT.RETRIEVED_ALL,
    });
  },
);

export const createAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const announcement = await announcementServices.createAnnouncement(body);

    return apiResponse(res, StatusCodes.CREATED, {
      announcement,
      message: "Announcement created successfully",
    });
  },
);

export const updateAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const body = req.body;
    const { announcementId } = req.params;

    const announcement = await announcementServices.updateAnnouncement(
      announcementId,
      body,
    );

    return apiResponse(res, StatusCodes.OK, {
      announcement,
      message: "Announcement updated successfully",
    });
  },
);

export const deleteAnnouncement = asyncHandler(
  async (req: Request, res: Response) => {
    const { announcementId } = req.params;
    await announcementServices.deleteAnnouncement(announcementId);

    return apiResponse(res, StatusCodes.OK, {
      message: "Announcement deleted successfully",
    });
  },
);
