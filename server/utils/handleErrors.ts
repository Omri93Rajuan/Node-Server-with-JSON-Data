import chalk from "chalk";
import { Response } from "express";

const handleError = (res: Response, status: number, message: string): Response => {
  console.log(chalk.redBright(message));
  return res.status(status).send(message);
};


export { handleError };
