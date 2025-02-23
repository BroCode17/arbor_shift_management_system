import { Request, Response } from 'express';

import authService from '../services/auth-service';
import userService from '../services/user-service';
import { loginSchema, registerSchema } from '../validators/auth.validator';
import tokenBlacklistService from '../services/token-blacklist-service';

class AuthController {
  async login(req: Request, res: Response): Promise<any>{
    try {
      const result = loginSchema.safeParse(req.body);
      const oldAccessToken = req.headers.authorization?.split(' ')[1];
      
      if (oldAccessToken) {
        // Get token expiry from payload;
        const decodedToken = authService.decodeToken(oldAccessToken);
        const timeUntilExpiry = decodedToken.exp! - Math.floor(Date.now() / 1000);
       // const { isTrue,  timeUntilExpiry } = authService.checkForOldAccessTokenAndReturnTimeUnitExpiry(oldAccessToken);
        // Add old token to blacklist
        tokenBlacklistService.addToBlacklist(oldAccessToken, timeUntilExpiry);
      }
      
      if (!result.success) {
        return res.status(400).json({ 
          errors: result.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }

      const { email, password } = result.data;
      const { user, tokens } = await authService.login(email, password);

      // Set refresh token in HTTP-only cookie
      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      });

      res.json({
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      res.status(401).json({ message: error.message });
    }
  }

  async register(req: Request, res: Response): Promise<any> {
    try {
      // Validate request body with zod
      const result = registerSchema.safeParse(req.body);
      
      // If validation fails, return error response
      if (!result.success) {
        return res.status(400).json({ 
          errors: result.error.errors.map(e => ({
            field: e.path.join('.'),
            message: e.message
          }))
        });
      }

      const { password, ...userData } = result.data;
      const hashedPassword = await authService.hashPassword(password);
      // Extract certificates from userData if present
      const { certificates, ...userDataWithoutCerts } = userData;
      
      const user = await userService.createUser({
        ...userDataWithoutCerts,
        passwordHash: hashedPassword,
        // Pass certificates if provided, empty array if not
        certificates: certificates || []
      });
      const tokens = authService.generateTokens(user.id!, user.role!);

      res.cookie('refreshToken', tokens.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
      });

      res.status(201).json({
        accessToken: tokens.accessToken,
        user: {
          id: user.id,
          email: user.email,
          role: user.role
        }
      });
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  }

  async refresh(req: Request, res: Response): Promise<any> {
    try {
        const refreshToken = req.cookies.refreshToken;
        const oldAccessToken = req.headers.authorization?.split(' ')[1];
        console.log(req.headers.authorization);
        if (!refreshToken) {
            return res.status(401).json({ message: 'Refresh token required' });
        }

        if (oldAccessToken) {
            // Get token expiry from payload
            const decodedToken = authService.decodeToken(oldAccessToken);
            const timeUntilExpiry = decodedToken.exp! - Math.floor(Date.now() / 1000);
          //  const {isTrue, timeUntilExpiry } = authService.checkForOldAccessTokenAndReturnTimeUnitExpiry(oldAccessToken);
            
            // Add old token to blacklist
            tokenBlacklistService.addToBlacklist(oldAccessToken, timeUntilExpiry);
        }

        const tokens = await authService.refreshAccessToken(refreshToken);

        res.cookie('refreshToken', tokens.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({ accessToken: tokens.accessToken });
    } catch (error: any) {
        res.status(401).json({ message: error.message });
    }
}

  async logout(req: Request, res: Response) {
    res.clearCookie('refreshToken');
    res.json({ message: 'Logged out successfully' });
  }
}

export default new AuthController();