import { UserController } from '../../controllers/user_controller';
import { AuthController } from './../../controllers/auth_controller';
import express from 'express'
const userRoute = express.Router();
const authController = new AuthController();
const userController = new UserController();

userRoute.post('/register-user', (req, res) => {
    authController.register(req, res)
})
userRoute.get("/users", (req, res) => {
    userController.getAllUsers(req, res)
})
userRoute.get("/users/:email", (req, res) => {
    userController.getUserByEmail(req, res)
})


export default userRoute;