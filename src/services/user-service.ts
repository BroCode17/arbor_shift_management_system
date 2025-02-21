import { UserInsertType, UserSelectType, employeeSchema } from './../models/user';
import { Request, Response } from 'express';
import { dbConnection } from '../utils/db';
import { eq } from 'drizzle-orm';

const db = dbConnection;

class UserService {
  async createUser( employeeData: Omit<UserInsertType, "id" | "created_at" | "updated_at" | "deleted_at">): Promise<UserInsertType> {
    const result = await db.insert(employeeSchema).values(employeeData).returning();
    console.log(result);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<UserSelectType | undefined> {
    const user = await db.select().from(employeeSchema).where(eq(employeeSchema.email, email));
    return user[0];
  }

  async getAllUsers(): Promise<UserSelectType[] | undefined> {
    const users = await db.select().from(employeeSchema);
    return users;
  }
}


export default new UserService();