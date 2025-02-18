import { Router } from "express";

import * as eventControllers from "@/controllers/event.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const eventRouter = Router();

eventRouter.get("/", isAuthenticated, eventControllers.getAllEvents);
eventRouter.get(
  "/calendar",
  isAuthenticated,
  eventControllers.getEventsCalendar,
);
eventRouter.post("/", isAuthenticated, eventControllers.createEvent);
eventRouter.patch("/:eventId", isAuthenticated, eventControllers.updateEvent);
eventRouter.delete("/:eventId", isAuthenticated, eventControllers.deleteEvent);

export { eventRouter };
