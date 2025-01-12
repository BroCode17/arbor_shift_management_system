import { Request, Response } from "express";
import { UserService } from "../servers/user_service";
import { CustomError } from "../errors/global_error_handler";
export class UserController {

    private userService;

    constructor(){
        this.userService = new UserService();
    }
    
    async getAllUsers(req: Request, res: Response): Promise<Response> {
        const allUsers = await this.userService.getAllUsers();
        console.log(allUsers)
        return res.status(201).json({success: true, allUsers})
    }
    async getUserByEmail(req: Request, res: Response): Promise<Response> {
        
        const allUsers = await this.userService.findByEmail(req.params.email)
        if(allUsers instanceof CustomError)
            return res.status(500).json({success: false, allUsers})
        return res.status(201).json({success: true, allUsers})
    }
}