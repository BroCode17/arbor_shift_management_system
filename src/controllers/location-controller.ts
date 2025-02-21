import { Request, Response } from "express";
import { coordinateSchema, CoordinateSchemaInferInsert, locationSchema, LocationSchemaInferInsert } from "../models/location";
import locationService, { LocationCustomType } from "../services/location-service";


class LocationController {
    
    async addLocations(req: Request, res: Response): Promise<void> {
       //First insert to coordinate table
       const cor: Omit<LocationCustomType, "id" | "created_at" | "updated_at" | "deleted_at"> = req.body;
       try{
         const response = await locationService.addLocations(cor);
         res.status(201).json(response)
       }catch(e){
        console.log(e)
        res.status(500).json({success: false, message:  "Internal error"});
       }
    }

    async getAllLocations(req: Request, res: Response): Promise<void>{
        try {
            const response = await locationService.getAllLocations();
            res.status(200).json(response)
        } catch (error) {
            console.log(error)
            res.status(500).json({success: false, message:  "Internal error"});
        }
    }

}

export default new LocationController();