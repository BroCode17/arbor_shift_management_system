import express, { NextFunction, Request, Response } from 'express';
import cookieParser from "cookie-parser";
import userRoute from './routes/user-route';
import shiftRoute from './routes/shift-route';
import locationRoute from './routes/location-route';
import authRoute from './routes/auth-route';
import { authenticate } from './middleware/auth.middleware';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true
}));
app.use(express.json());
app.use(cookieParser())

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});

// Public routes
app.use(authRoute);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});


// Protected routes
app.use(authenticate);
app.use(userRoute);
app.use( shiftRoute);
app.use( locationRoute);



app.use((req: Request, res: Response) => {
  res.status(404).json({ 
    success: false, 
    message: 'Route not found' 
  });
});


export default app