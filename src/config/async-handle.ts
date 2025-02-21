import { Request, Response, NextFunction } from "express";

export const asyncHandler = (fn:(req:Request, res: Response, next: NextFunction) => Promise<void>) => {  
    return async (req:Request, res: Response, next: NextFunction): Promise<void> => {  
      try {  
        await fn(req, res, next);  
      } catch (error: any) {  
        console.error("Error occurred:", error); // Log the error  
        // You can customize the error response here  
        res.status(500).json({ message: "Internal Server Error", error: error.message });  
      }  
    };  
  };  