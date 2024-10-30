import express, { Request, Response, NextFunction } from "express";
import { handleError } from "../../utils/handleErrors";
import { loginUser } from "../service/authService";
import User  from "../model/dataModel"; 

const router = express.Router();

interface LoginRequest extends Request {
  body: {
    username: string;
    password: string;
  };
}

router.post("/", async (req: LoginRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user: string = await loginUser({ username, password });
    res.json(user);
  } catch (error) {
    const status = (error as { status?: number }).status || 500;
    const message = (error as Error).message || "Internal Server Error";
    handleError(res, status, message);
    next(error); 
  }
});

export default router;
