import express, { Express } from 'express'
import chalk from "chalk";
import router from "./router/router";
import "dotenv/config";

const app : Express = express();

app.use(express.json());

app.use(router);



app.listen(process.env.PORT, () => {
  console.log(
    chalk.blueBright(`listening on: https://localhost:${process.env.PORT}`)
  );
});
