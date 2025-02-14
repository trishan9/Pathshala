import { Router } from "express";

import * as announcementControllers from "@/controllers/announcement.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const announcementRouter = Router();

announcementRouter.get(
  "/",
  isAuthenticated,
  announcementControllers.getAllAnnouncements,
);

export { announcementRouter };
