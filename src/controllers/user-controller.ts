import { Request, Response } from "express";
import { UserInsertType } from "../models/user";
import userService from "../services/user-service";


class UserController {
    
    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const employeeData: Omit<UserInsertType, "id" | "created_at" | "deleted_at" | "updated_at">  = req.body
            const user = await userService.createUser(employeeData);
            res.status(201).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message:  "Internal error"});
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        try{
            const {email} = req.params;
            const user = userService.getUserByEmail(email);
            res.status(200).json(user);
        }catch(error) {
            console.log(error);
            res.status(500).json({success: false, message: "Internal server error"})
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const response = await userService.getAllUsers();
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({success: false, message: "Internal server error"})
        }
    }
}

export default new UserController()