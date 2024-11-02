import express, {IRouter, NextFunction } from "express";
import dataRestController from "../data/controllers/dataController";
import authRestController from "../data/controllers/authController";
import {verifyUser,verifyAdmin} from "../middleware/jwt"
import { handleError } from "../utils/handleErrors";

const router: IRouter = express.Router();

router.use("/data",verifyAdmin as NextFunction,dataRestController);
router.use("/auth", authRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
