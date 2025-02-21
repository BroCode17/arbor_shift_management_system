import express from "express";
import userController from "../controllers/user-controller";
const userRoute = express.Router();

userRoute.route('/user')
        .get(userController.getAllUsers)
        .post(userController.createUser)

userRoute.route('/user:email')
        .get(userController.getUserByEmail)

export default userRoute;