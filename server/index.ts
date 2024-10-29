import express, { Express } from 'express'
import chalk from "chalk";
import router from "./router/router";
import "dotenv/config";
import cookieParser from 'cookie-parser';

const app : Express = express();

app.use(express.json());
app.use(cookieParser());
app.use(router);



app.listen(process.env.PORT || 7070 , () => {
  console.log(
    chalk.blueBright(`listening on: https://localhost:${process.env.PORT|| 7070}`)
  );
  
});