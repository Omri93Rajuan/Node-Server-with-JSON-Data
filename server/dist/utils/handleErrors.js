"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
const chalk_1 = __importDefault(require("chalk"));
const handleError = (res, status, message) => {
    console.log(chalk_1.default.redBright(message));
    return res.status(status).send(message);
};
exports.handleError = handleError;
