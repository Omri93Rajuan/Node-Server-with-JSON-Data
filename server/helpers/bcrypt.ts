import bcrypt from "bcrypt";

const generateUserPassword = (password:string) => {
  return bcrypt.hashSync(password, 10);
};

const comparePassword = (password:string, anotherPassword:string) => {
  return bcrypt.compareSync(password, anotherPassword);
};

export { generateUserPassword, comparePassword };
