import express from "express";

import dataRestController from "../data/routes/dataRestController.js";
import { handleError } from "../utils/handleErrors.js";

const router = express.Router();

router.use("/data", dataRestController);

router.use((req, res) => {
  handleError(res, 404, "Page not found!");
});

export default router;
