import express, {IRouter } from "express";
import dataRestController from "../data/controllers/dataRestController";
import authRestController from "../data/controllers/authController";

import { handleError } from "../utils/handleErrors";

const router: IRouter = express.Router();

router.use("/data", dataRestController);
router.use("/login", authRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
