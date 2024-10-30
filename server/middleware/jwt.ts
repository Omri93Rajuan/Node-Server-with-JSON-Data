import jwt, { JwtPayload } from 'jsonwebtoken';
import  User  from '../data/model/dataModel';

const key: string = process.env.JWT_SECRET || 'default_secret';

const generateAuthToken = (user: User): string => {
  const { id, isAdmin } = user;
  const token = jwt.sign({ id, isAdmin }, key);
  return token;
};

const verifyToken = (tokenFromClient: string): User | null => {
  try {
    const userDataFromPayload = jwt.verify(tokenFromClient, key) as JwtPayload;
    return userDataFromPayload as User;
  } catch (error) {
    return null;
  }
};

export {
    generateAuthToken,
    verifyToken
}