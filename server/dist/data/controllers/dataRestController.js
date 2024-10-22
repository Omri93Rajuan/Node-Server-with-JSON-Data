"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dataAccessDataService_1 = require("../service/dataAccessDataService");
const handleErrors_1 = require("../../utils/handleErrors");
const router = express_1.default.Router();
// GET all data
router.get("/", async (req, res) => {
    try {
        const data = await (0, dataAccessDataService_1.getAllData)();
        res.send(data);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error.status || 403, error.message);
    }
});
// GET data by ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await (0, dataAccessDataService_1.getData)(parseInt(id));
        res.send(data);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error.status || 500, error.message);
    }
});
// POST new data
router.post("/", async (req, res) => {
    try {
        const newData = req.body;
        await (0, dataAccessDataService_1.createData)(newData);
        res.status(201).send("Data created successfully");
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error.status || 500, error.message);
    }
});
// PATCH (update) data by ID
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const editedData = await (0, dataAccessDataService_1.updateData)(parseInt(id), updatedData);
        res.send(editedData);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error.status || 500, error.message);
    }
});
// DELETE data by ID
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedData = await (0, dataAccessDataService_1.deleteData)(parseInt(id));
        res.send(deletedData);
    }
    catch (error) {
        (0, handleErrors_1.handleError)(res, error.status || 500, error.message);
    }
});
exports.default = router;
