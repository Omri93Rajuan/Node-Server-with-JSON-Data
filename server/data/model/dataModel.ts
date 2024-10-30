import { v4 } from "uuid";
import bcrypt from "bcrypt";

export default class User {
  public id: string;
  private password?: string;
  public isAdmin:boolean = false

  constructor(public username: string) {
    this.id = v4();
  }

  async hashPassword?(_password: string): Promise<void> {
    this.password = await bcrypt.hash(_password, 10);
  }

  async comparePassword?(_password: string): Promise<boolean> {
    return await bcrypt.compare(_password, this.password || "");
  }
}