import { asyncHandler } from "@/utils/asyncHandler";
import { Request, Response } from "express";
import * as eventServices from "@/services/event.services";
import { apiResponse } from "@/utils/apiResponse";
import { StatusCodes } from "http-status-codes";
import { responseMessage } from "@/utils/responseMessage";

export const getAllEvents = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const currUser = res.locals.user;

    const { events, eventsCount } = await eventServices.getAllEvents(
      query as eventServices.GetEventParams,
      currUser,
    );

    return apiResponse(res, StatusCodes.OK, {
      eventsCount,
      events,
      message: responseMessage.EVENT.RETRIEVED_ALL,
    });
  },
);

export const getEventsCalendar = asyncHandler(
  async (req: Request, res: Response) => {
    const query = req.query;
    const currUser = res.locals.user;

    const data = await eventServices.getEventsCalendar(
      query.dateParam as string,
      currUser,
    );

    return apiResponse(res, StatusCodes.OK, {
      data,
      message: responseMessage.EVENT.RETRIEVED_ALL,
    });
  },
);
