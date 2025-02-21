import { Request, Response } from "express";
import { AvailableShiftSchemaInferInsert, ShiftSchemaInferInsert } from "../models/shift";
import shiftService from "../services/shift-service";
import { ClockRequestType } from "../types/clock";
class ShiftController {
    async createShift(req: Request, res: Response): Promise<void> {
        const shiftData: Omit<ShiftSchemaInferInsert, "id" | "created_at" | "updated_at">  = req.body;
        try {
            const result = await shiftService.createShiftTemplate(shiftData);
            console.log(result);
            res.status(201).json(result)
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    async getAllShifts(req: Request, res: Response): Promise<void>{
        try {
            const response = await shiftService.getAllShifts();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    async addAvaliabeShift(req: Request, res: Response): Promise<void> {
        const shiftData: Omit<AvailableShiftSchemaInferInsert, "id" | "created_at" | "updated_at">  = req.body;
        try {
            const response = await shiftService.addAvailabeShift(shiftData);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    async getAllAvaliableShifts(req: Request, res: Response): Promise<void> {
        try {
            const response = await shiftService.getAllAvailableShifts();
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    // Shift Claim and Asssignment
    async claimShift(req: Request, res: Response): Promise<void> {
        const { shiftId, userId } = req.body;
        try {
            const response = await shiftService.claimShift({shiftId, userId});
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }   
    }
    async getAllClaimedShifts(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        try {
            const response = await shiftService.getAllShiftsForUser(userId);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    async approveClaimShift(req: Request, res: Response): Promise<void> {
        const { shiftId, userId, status } = req.body;
        try {
            const response = await shiftService.approveClaimShift({shiftId, userId, status});
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    // get all approve shift for a user
    async getAllApprovedShiftsByUserId(req: Request, res: Response): Promise<void> {
        const { userId } = req.params;
        try {
            const response = await shiftService.getAllApprovedShiftsByUserId(userId);
            res.status(200).json(response);
        } catch (error) {
            console.log(error);
            res.status(500).json({success: false, messaeg: "Server internal error"})
        }
    }
    // clock in and out
    async clockIn(req: Request, res: Response): Promise<void> {
        try {
            const clockData: ClockRequestType = {
                ...req.body,
                timestamp: new Date()
            };
            
            const response = await shiftService.clockIn(clockData);
            res.status(200).json(response);
        } catch (error: any) {
            console.error('Clock-in error:', error);
            res.status(error.cause || 500).json({
                success: false,
                message: error.message || "Server internal error"
            });
        }
    }
    async clockOut(req: Request, res: Response): Promise<void> {
        try {
            const clockData: ClockRequestType = {
                ...req.body,
                timestamp: new Date()
            };
            
            const response = await shiftService.clockOut(clockData);
            res.status(200).json(response);
        } catch (error: any) {
            console.error('Clock-out error:', error);
            res.status(error.cause || 500).json({
                success: false,
                message: error.message || "Server internal error"
            });
        }
    }
    async updateShiftTemplate(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const shiftData = req.body;
        try {
            const result = await shiftService.updateShiftTemplate(id, shiftData);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server internal error" });
        }
    }
    async deleteShiftTemplate(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const result = await shiftService.deleteShiftTemplate(id);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server internal error" });
        }
    }
    async getAllShiftsForLocation(req: Request, res: Response): Promise<void> {
        const { locationId } = req.params;
        try {
            const result = await shiftService.getAllShiftsForLocation(locationId);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server internal error" });
        }
    }
    async getAllShiftsForLocationAndDate(req: Request, res: Response): Promise<void> {
        const { locationId } = req.params;
        const { date } = req.query;
        try {
            const result = await shiftService.getAllShiftsForLocationAndDate(locationId, date as string);
            res.status(200).json(result);
        } catch (error) {
            console.error(error);
            res.status(500).json({ success: false, message: "Server internal error" });
        }
    }
}

export default new ShiftController();