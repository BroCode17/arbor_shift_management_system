import express, { Request, Response } from 'express';
import cookieParser from "cookie-parser";
import userRoute from './routes/user-route';
import shiftRoute from './routes/shift-route';
import locationRoute from './routes/location-route';
const app = express();




// Middleware to parse JSON request body (if needed)
app.use(express.json());
app.use(cookieParser())

//
app.use(userRoute)
app.use(shiftRoute)
app.use(locationRoute)

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Express + TypeScript!');
});


export default app