import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as announcementServices from "@/services/announcement.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllAnnouncements = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;

    const { announcements, announcementsCount } =
      await announcementServices.getAllAnnouncements(
        query as announcementServices.GetAnnouncementParams,
      );

    return apiResponse(res, StatusCodes.OK, {
      announcementsCount,
      announcements,
      message: responseMessage.ANNOUNCEMENT.RETRIEVED_ALL,
    });
  },
);
