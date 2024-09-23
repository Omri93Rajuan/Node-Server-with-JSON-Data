const express = require("express");
const app = express();
const router = require("./router/router");
const { handleError } = require("./utils/handleErrors");

const chalk = require("chalk");

app.use(express.json());

app.use(router);

app.use((err, req, res, next) => {
  handleError(res, 500, err.message);
});

const PORT = 8181;

app.listen(PORT, () => {
  console.log(chalk.blueBright("listening on: https://localhost:8181"));
});
