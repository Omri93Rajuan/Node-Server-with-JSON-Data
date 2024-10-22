"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const chalk_1 = __importDefault(require("chalk"));
const router_1 = __importDefault(require("./router/router"));
require("dotenv/config");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(router_1.default);
app.listen(process.env.PORT, () => {
    console.log(chalk_1.default.blueBright(`listening on: https://localhost:${process.env.PORT}`));
});
