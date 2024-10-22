"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataRestController_1 = __importDefault(require("../data/controllers/dataRestController"));
const handleErrors_1 = require("../utils/handleErrors");
const router = express_1.default.Router();
router.use("/data", dataRestController_1.default);
router.use((req, res) => {
    (0, handleErrors_1.handleError)(res, 404, "Page not found!");
});
exports.default = router;
