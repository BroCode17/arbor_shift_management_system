import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs';
import { dbConnection as db } from '../utils/db';
import { employeeSchema } from '../models/user';
import { eq } from 'drizzle-orm';
import { TokenPayload } from '../types/auth';


class AuthService {
  private readonly accessTokenSecret = process.env.JWT_ACCESS_SECRET!
  private readonly refreshTokenSecret = process.env.JWT_REFRESH_SECRET!
  private readonly accessTokenExpiry =  '15m';
  private readonly refreshTokenExpiry =  '7d';

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 12);
  }

  async validatePassword(password: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(password, hashedPassword);
  }

  generateTokens(userId: string, role: string): { accessToken: string; refreshToken: string } {
    const payload: TokenPayload = { userId, role };

    const accessToken = jwt.sign(payload, this.accessTokenSecret, {
      expiresIn: this.accessTokenExpiry,
    });

    const refreshToken = jwt.sign(payload, this.refreshTokenSecret, {
      expiresIn: this.refreshTokenExpiry,
    });

    return { accessToken, refreshToken };
  }

  async login(email: string, password: string) {
    const user = await db.query.employeeSchema.findFirst({
      where: (employee, { eq }) => eq(employee.email, email),
   
    });

    console.log(user);

    if (!user) {
      throw new Error('Invalid credentials');
    }

    const isValidPassword = await this.validatePassword(password, user.passwordHash);
    if (!isValidPassword) {
      throw new Error('Invalid credentials');
    }

    

   const tokens = this.generateTokens(user.id, user.role);
    return { user, tokens};
  }

  verifyAccessToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.accessTokenSecret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid access token');
    }
  }

  decodeToken(token: string): TokenPayload {
    try {
      // Decode token without verification
      const decoded = jwt.decode(token) as TokenPayload;
      
      if (!decoded) {
        throw new Error('Invalid token format');
      }
      
      return decoded;
    } catch (error) {
      throw new Error('Failed to decode token');
    }
  }

  verifyRefreshToken(token: string): TokenPayload {
    try {
      return jwt.verify(token, this.refreshTokenSecret) as TokenPayload;
    } catch (error) {
      throw new Error('Invalid refresh token');
    }
  }

  async refreshAccessToken(refreshToken: string) {
    const payload = this.verifyRefreshToken(refreshToken);
    const user = await db.query.employeeSchema.findFirst({
      where: (employee, { eq }) => eq(employee.id, payload.userId)
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.generateTokens(user.id, user.role);
   // return { user, tokens:"tokens" };
  }


 checkForOldAccessTokenAndReturnTimeUnitExpiry(oldAccessToken: string): {isTrue: boolean, timeUntilExpiry: number} {
    try {
      const decoded = this.decodeToken(oldAccessToken);
      const currentTime = Math.floor(Date.now() / 1000);
      const timeUntilExpiry = decoded.exp! - Math.floor(Date.now() / 1000);
      return {isTrue: decoded.exp! < currentTime, timeUntilExpiry} ;
    } catch (error) {
      return {isTrue: false, timeUntilExpiry: 0};
    }
  }
}

export default new AuthService();