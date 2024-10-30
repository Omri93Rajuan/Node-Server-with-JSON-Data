import express, { Request, Response } from "express";
import {
  getAllData,
  getData,
  createData,
  deleteData,
  updateData,
} from "../service/dataAccessDataService";

import { handleError } from "../../utils/handleErrors";

const router = express.Router();

// GET all data
router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getAllData();
     res.send(data);
  } catch (error: any) {
     handleError(res, error.status || 403, error.message);
  }
});

// GET data by ID
router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const data = await getData(id);
     res.send(data);
  } catch (error: any) {
     handleError(res, error.status || 500, error.message);
  }
});

// POST new data
router.post("/", async (req: Request, res: Response) : Promise<void>=> {
  try {
    const newData = req.body;
    await createData(newData);
     res.status(201).send("Data created successfully");
  } catch (error: any) {
     handleError(res, error.status || 500, error.message);
  }
});

// PATCH (update) data by ID
router.patch("/:id", async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const editedData = await updateData(id, updatedData);
     res.send(editedData);
  } catch (error: any) {
     handleError(res, error.status || 500, error.message);
  }
});

// DELETE data by ID
router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedData = await deleteData(id);
     res.send(deletedData);
  } catch (error: any) {
     handleError(res, error.status || 500, error.message);
  }
});

export default router;
