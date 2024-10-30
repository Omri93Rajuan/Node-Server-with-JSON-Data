import fs from "fs";
import signInDto from "../model/dataDto";
import { generateAuthToken } from "../../middleware/jwt";
import { comparePassword } from "../../helpers/bcrypt";
import { CookieOptions } from "express";
import { Request, Response } from 'express';


const data: string = fs.readFileSync("./data.json", "utf-8");
const Users = JSON.parse(data)

const cookieConfig: CookieOptions = {
    httpOnly: true,          // הגנה מפני XSS - הקוקי לא נגיש דרך JavaScript בצד הלקוח
    secure: true,            // שליחת הקוקי רק בחיבור HTTPS
    sameSite: 'strict',      // הגנה מפני CSRF
    maxAge: 24 * 60 * 60 * 1000  // תוקף של יום אחד (במילישניות)
};

const loginUser = async ({ username, password }: signInDto, res: Response) => {
    try {
        // בדיקת המשתמש כמו קודם
        const user = Users.find((item: signInDto) => 
            item.username === username && 
            comparePassword(password, item.password) === true
        );

        if (!user) {
            throw new Error("Authentication Error: Invalid email or password");
        }

        // יצירת הטוקן
        const token = generateAuthToken(user);

        // שמירת הטוקן בקוקי
        res.cookie('auth_token', token, cookieConfig);

        // אופציונלי: שליחת מידע נוסף בתגובה
        return Promise.resolve({
            message: "Login successful",
            user: {
                username: user.username,
            }
        });

    } catch (error: any) {
        error.status = 400;
        return Promise.reject(error);
    }
};

// פונקציה למחיקת הקוקי בעת התנתקות
const logoutUser = (res: Response) => {
    res.clearCookie('auth_token', {
        ...cookieConfig,
        maxAge: 0
    });
    return Promise.resolve({
        message: "Logout successful",
    });
};

// // פונקציית עזר לבדיקת תוקף הטוקן
// const verifyAuthCookie = (req: Request) => {
//     const token = req.cookies.auth_token;
//     if (!token) {
//         throw new Error("No authentication token found");
//     }
    
//     try {
//         // כאן תוכל להשתמש בפונקציה שמאמתת את הטוקן
//         const decoded = verifyAuthToken(token);
//         return decoded;
//     } catch (error) {
//         throw new Error("Invalid authentication token");
//     }
// };

      export {
        loginUser,
        logoutUser
      }