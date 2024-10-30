import fs from "fs";
import signInDto from "../model/dataDto";
import { generateAuthToken } from "../../middleware/jwt";
import User from "../model/dataModel";
import { comparePassword } from "../../helpers/bcrypt";

const data: string = fs.readFileSync("./data.json", "utf-8");
const Users = JSON.parse(data)

const loginUser = async ({ username, password } :signInDto ) =>{
    
      try {        
          const user:signInDto = Users.find((item:signInDto) => item.username === username &&
          comparePassword(password, item.password) === true);          
          if (!user) throw new Error("Authentication Error: Invalid email or password");
          const token = generateAuthToken(user);
          return Promise.resolve(token);

      } catch (error:any) {
        error.status = 400;
        return Promise.reject(error);
      }
      };


      export {
        loginUser
      }