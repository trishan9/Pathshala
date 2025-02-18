import { Router } from "express";

import * as announcementControllers from "@/controllers/announcement.controllers";
import { isAuthenticated } from "@/middlewares/isAuthenicated";

const announcementRouter = Router();

announcementRouter.get(
  "/",
  isAuthenticated,
  announcementControllers.getAllAnnouncements,
);
announcementRouter.post(
  "/",
  isAuthenticated,
  announcementControllers.createAnnouncement,
);
announcementRouter.patch(
  "/:announcementId",
  isAuthenticated,
  announcementControllers.updateAnnouncement,
);
announcementRouter.delete(
  "/:announcementId",
  isAuthenticated,
  announcementControllers.deleteAnnouncement,
);

export { announcementRouter };
