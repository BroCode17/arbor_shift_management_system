import { Request, Response } from "express";
import { UserInsertType } from "../models/user";
import userService from "../services/user-service";


class UserController {

    async createUser(req: Request, res: Response): Promise<void> {
        try {
            const employeeData: Omit<UserInsertType, "id" | "created_at" | "deleted_at" | "updated_at"> = req.body
            const user = await userService.createUser(employeeData);
            res.status(201).json(user)
        } catch (error) {
            console.log(error)
            res.status(500).json({ success: false, message: "Internal error" });
        }
    }

    async getUserByEmail(req: Request, res: Response): Promise<void> {
        try {
            const { email } = req.params;
            const user = userService.getUserByEmail(email);
            res.status(200).json(user);
        } catch (error) {
            console.log(error);
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const response = await userService.getAllUsers();
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }

    async getUser(req: Request, res: Response): Promise<void> {
        console.log(req.params)
        try {
            const accessToken = req.headers.authorization?.split(" ")[1];
            if (!accessToken){
                //check if request has email
                const { identifier } = req.params;
                if (!identifier){
                    res.status(401).json({ success: false, message: "Unauthorized" })
                    return;
                }
                
                let user;
                if(identifier.includes("@")){
                     user = await userService.getUserByEmail(identifier);
                    res.status(200).json(user)
                    return;
                }else{
                     user = await userService.getUserById(identifier);
                    res.status(200).json(user)
                    return;
                }
            }
            const user = await userService.getUser(accessToken!);
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json({ success: false, message: "Internal server error" })
        }
    }
}

export default new UserController()