// src/services/CertificationService.ts
import { Repository } from "typeorm"
import { AppDataSource } from "../config/data_source"
import { Certification } from "../models/Certification"
import { UserCertification } from "../models/UserCertification"

export class CertificationService {
    private certificationRepository: Repository<Certification>
    private userCertificationRepository: Repository<UserCertification>

    constructor() {
        this.certificationRepository = AppDataSource.getRepository(Certification)
        this.userCertificationRepository = AppDataSource.getRepository(UserCertification)
    }

    async assignToUser(userId: number, certificationId: number, expiryDate?: Date): Promise<UserCertification> {
        const userCert = this.userCertificationRepository.create({
            user: { id: userId },
            certification: { id: certificationId },
            status: 'ACTIVE',
            issueDate: new Date(),
            expiryDate
        })
        return this.userCertificationRepository.save(userCert)
    }

    async getUserCertifications(userId: number): Promise<UserCertification[]> {
        return this.userCertificationRepository.find({
            where: { user: { id: userId } },
            relations: ['certification']
        })
    }
}