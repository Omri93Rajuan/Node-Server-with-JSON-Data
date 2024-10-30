import fs from "fs";
import User from "../model/dataModel"
import signInDto from "../model/dataDto";
const data: string = fs.readFileSync("./data.json", "utf-8");

// פונקציה לקריאת כל הנתונים מהקובץ JSON
const getAllData = (): User[] => {
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log("Error reading data from JSON:", error);
    return [];
  }
};

// פונקציה לקבלת נתון ספציפי לפי מזהה (id)
const getData = async (id: string): Promise<User[]> => {
  try {
    const data: User[] = await getAllData(); // קריאה לפונקציה getAllData() על מנת לקבל את הנתונים מהקובץ JSON
    const newData = data.filter((item) => item.id === id);
    console.log(newData);
    
    if (!newData.length) {
      throw new Error("Could not find this card in the database");
    }
    return Promise.resolve(newData);
  } catch (error: any) {
    error.status = 404;
    throw error;
  }
};

// פונקציה ליצירת נתון חדש
const createData = async (newData: signInDto): Promise<string> => {
  try {
    const {username,password} = newData
    const userData = new User(username)  
    await userData.hashPassword!(password) 
    const currentData: User[] = await getAllData();
    currentData.push(userData);
    fs.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
    return Promise.resolve("Data created successfully");
  } catch (error) {
    throw error;
  }
};


// פונקציה למחיקת נתון לפי מזהה
const deleteData = async (id: string): Promise<User> => {
  try {
    const currentData: User[] = await getAllData();
    const index = currentData.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error("Could not find this card in the database");
    }
    const deletedData = currentData.splice(index, 1)[0];
    fs.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
    return Promise.resolve(deletedData);
  } catch (error: any) {
    error.status = 404;
    throw error;
  }
};

// פונקציה לעדכון נתון לפי מזהה
const updateData = async (id: string, updatedData: Partial<User>): Promise<User> => {
  try {
    const currentData: User[] = await getAllData();
    const index = currentData.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Could not find this card in the database");
    
    currentData[index] = { ...currentData[index], ...updatedData };
    fs.writeFileSync("./data.json", JSON.stringify(currentData, null, 2));
    return Promise.resolve(currentData[index]);
  } catch (error: any) {
    error.status = 404;
    throw error;
  }
};

export { getAllData, getData, createData, deleteData, updateData };
