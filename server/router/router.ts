import express, {IRouter } from "express";
import dataRestController from "../data/controllers/dataRestController";
import { handleError } from "../utils/handleErrors";

const router: IRouter = express.Router();

router.use("/data", dataRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
