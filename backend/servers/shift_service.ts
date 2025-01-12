// src/services/ShiftService.ts
import { Repository, Between } from "typeorm"
import { AppDataSource } from "../config/data_source"
import { Shift } from "../models/Shift"
import { Assignment } from "../models/Assignment"

export class ShiftService {
    private shiftRepository: Repository<Shift>
    private assignmentRepository: Repository<Assignment>

    constructor() {
        this.shiftRepository = AppDataSource.getRepository(Shift)
        this.assignmentRepository = AppDataSource.getRepository(Assignment)
    }

    async create(shiftData: Partial<Shift>): Promise<Shift> {
        const shift = this.shiftRepository.create(shiftData)
        return this.shiftRepository.save(shift)
    }

    async findAvailableShifts(startDate: Date, endDate: Date): Promise<Shift[]> {
        return this.shiftRepository.find({
            where: {
                startTime: Between(startDate, endDate),
                // Add more conditions as needed
            },
            relations: ['requiredCertifications', 'assignments']
        })
    }

    async assignUserToShift(shiftId: string, userId: string): Promise<Assignment> {
        const assignment = this.assignmentRepository.create({
            shift: { id: shiftId },
            user: { id: userId },
            status: 'CLAIMED',
            assignedAt: new Date()
        })
        return this.assignmentRepository.save(assignment)
    }
}
