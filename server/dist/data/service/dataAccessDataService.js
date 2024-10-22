"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateData = exports.deleteData = exports.createData = exports.getData = exports.getAllData = void 0;
const fs_1 = __importDefault(require("fs"));
const data = fs_1.default.readFileSync("./data.json", "utf-8");
// פונקציה לקריאת כל הנתונים מהקובץ JSON
const getAllData = () => {
    try {
        return JSON.parse(data);
    }
    catch (error) {
        console.log("Error reading data from JSON:", error);
        return [];
    }
};
exports.getAllData = getAllData;
// פונקציה לקבלת נתון ספציפי לפי מזהה (id)
const getData = async (id) => {
    try {
        const data = await getAllData(); // קריאה לפונקציה getAllData() על מנת לקבל את הנתונים מהקובץ JSON
        const newData = data.filter((item) => item.id === id);
        if (!newData.length) {
            throw new Error("Could not find this card in the database");
        }
        return Promise.resolve(newData);
    }
    catch (error) {
        error.status = 404;
        throw error;
    }
};
exports.getData = getData;
// פונקציה ליצירת נתון חדש
const createData = async (newData) => {
    try {
        const currentData = await getAllData();
        currentData.push(newData);
        fs_1.default.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
        return Promise.resolve("Data created successfully");
    }
    catch (error) {
        throw error;
    }
};
exports.createData = createData;
// פונקציה למחיקת נתון לפי מזהה
const deleteData = async (id) => {
    try {
        const currentData = await getAllData();
        const index = currentData.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Could not find this card in the database");
        }
        const deletedData = currentData.splice(index, 1)[0];
        fs_1.default.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
        return Promise.resolve(deletedData);
    }
    catch (error) {
        error.status = 404;
        throw error;
    }
};
exports.deleteData = deleteData;
// פונקציה לעדכון נתון לפי מזהה
const updateData = async (id, updatedData) => {
    try {
        const currentData = await getAllData();
        const index = currentData.findIndex((item) => item.id === id);
        if (index === -1) {
            throw new Error("Could not find this card in the database");
        }
        currentData[index] = { ...currentData[index], ...updatedData };
        fs_1.default.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
        return Promise.resolve(currentData[index]);
    }
    catch (error) {
        error.status = 404;
        throw error;
    }
};
exports.updateData = updateData;
