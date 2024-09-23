import express from "express";
import chalk from "chalk";
import router from "./router/router.js";
import {} from "./utils/handleErrors.js";

const app = express();

app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = 8181;

app.listen(PORT, () => {
  console.log(chalk.blueBright("listening on: https://localhost:8181"));
});
