const fs = require("fs");
const data = fs.readFileSync("./data.json");


const getDatas = () => {
    try {
        return JSON.parse(data);
    } catch (error) {
        console.log("Error reading data from JSON:", error);
        return [];
    }
};

const getData = async (id) => {
    try {
        const data = await getDatas(); // קריאה לפונקציה getDatas() על מנת לקבל את הנתונים מהקובץ JSON
        const newData = data.filter((item) => item.id === id);
        if (!newData.length) {
            throw new Error("Could not find this card in the database");
        }
        return Promise.resolve(newData);
    } catch (error) {
        error.status = 404;
        throw error;
    }
}


module.exports = {
    getDatas,
    getData
};