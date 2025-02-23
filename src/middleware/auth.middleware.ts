import { Request, Response, NextFunction } from 'express';
import authService from '../services/auth-service';
import { RateLimiterMemory } from 'rate-limiter-flexible';
import tokenBlacklistService from '../services/token-blacklist-service';

const rateLimiter = new RateLimiterMemory({
  points: 5, // Number of points
  duration: 60, // Per second(s)
});

export const authenticate = async (req: Request, res: Response, next: NextFunction): Promise<any> => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authentication required' });
        }

        const token = authHeader.split(' ')[1];
        
        // Check if token is blacklisted
        if (tokenBlacklistService.isBlacklisted(token)) {
            return res.status(401).json({ message: 'Token has been invalidated' });
        }

        const payload = authService.verifyAccessToken(token);
        req.user = payload;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};

export const authorize = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Insufficient permissions' });
    }

    next();
  };
};

export const rateLimitMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await rateLimiter.consume(req.ip as string);
    next();
  } catch {
    res.status(429).json({ message: 'Too many requests' });
  }
};