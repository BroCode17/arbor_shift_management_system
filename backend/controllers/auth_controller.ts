import { UserService } from './../servers/user_service';
import { Request, Response } from 'express';
import { UserControllerTypes } from '../types';
//import { sendResetPasswordEmail } from '../utils/email';

export class AuthController {

  private userService;
  //Constructor
  constructor(){
    this.userService = new UserService()
  }
  // Register new user
   async register(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password, firstName, lastName, phoneNumber }: UserControllerTypes = req.body;
     
      // Create new user
      const response = await this.userService.create({lastName, firstName, email, phoneNumber }, password);
      console.log(response)
      // Generate JWT token
     return  res.sendStatus(201);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: 'Error registering user',
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    }
  }

  // Login user
  // async login(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { email, password } = req.body;

  //     // Check if user exists
  //     const user = await User.findOne({ email }).select('+password');
  //     if (!user) {
  //       return res.status(401).json({
  //         success: false,
  //         message: 'Invalid credentials'
  //       });
  //     }

  //     // Verify password
  //     const isPasswordValid = await bcrypt.compare(password, user.password);
  //     if (!isPasswordValid) {
  //       return res.status(401).json({
  //         success: false,
  //         message: 'Invalid credentials'
  //       });
  //     }

  //     // Generate JWT token
  //     const token = jwt.sign(
  //       { userId: user._id },
  //       process.env.JWT_SECRET as string,
  //       { expiresIn: '24h' }
  //     );

  //     // Set HTTP-only cookie
  //     res.cookie('token', token, {
  //       httpOnly: true,
  //       secure: process.env.NODE_ENV === 'production',
  //       maxAge: 24 * 60 * 60 * 1000 // 24 hours
  //     });

  //     return res.status(200).json({
  //       success: true,
  //       data: {
  //         token,
  //         user: {
  //           id: user._id,
  //           email: user.email,
  //           firstName: user.firstName,
  //           lastName: user.lastName
  //         }
  //       }
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Error logging in',
  //       error: error instanceof Error ? error.message : 'Unknown error occurred'
  //     });
  //   }
  // }

  // Logout user
  // async logout(req: Request, res: Response): Promise<Response> {
  //   try {
  //     // Clear the HTTP-only cookie
  //     res.cookie('token', '', {
  //       httpOnly: true,
  //       expires: new Date(0)
  //     });

  //     return res.status(200).json({
  //       success: true,
  //       message: 'Logged out successfully'
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Error logging out',
  //       error: error instanceof Error ? error.message : 'Unknown error occurred'
  //     });
  //   }
  // }

  // Reset password
  // async resetPassword(req: Request, res: Response): Promise<Response> {
  //   try {
  //     const { email } = req.body;

  //     // Find user by email
  //     const user = await User.findOne({ email });
  //     if (!user) {
  //       return res.status(404).json({
  //         success: false,
  //         message: 'User not found'
  //       });
  //     }

  //     // Generate reset token
  //     const resetToken = jwt.sign(
  //       { userId: user._id },
  //       process.env.JWT_SECRET as string,
  //       { expiresIn: '1h' }
  //     );

  //     // Save reset token to user
  //     user.resetPasswordToken = resetToken;
  //     user.resetPasswordExpire = new Date(Date.now() + 3600000); // 1 hour
  //     await user.save();

  //     // Send reset password email
  //     await sendResetPasswordEmail(user.email, resetToken);

  //     return res.status(200).json({
  //       success: true,
  //       message: 'Password reset email sent'
  //     });
  //   } catch (error) {
  //     return res.status(500).json({
  //       success: false,
  //       message: 'Error resetting password',
  //       error: error instanceof Error ? error.message : 'Unknown error occurred'
  //     });
  //   }
  // }
}

export default AuthController;