import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Certification } from "./Certification"

@Entity("user_certifications")
export class UserCertification {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => User, user => user.certifications)
    user!: User

    @ManyToOne(() => Certification, certification => certification.userCertifications)
    certification!: Certification

    @Column({ type: 'date', nullable: true })
    issueDate!: Date

    @Column({ type: 'date', nullable: true })
    expiryDate!: Date

    @Column({ length: 50 })
    status!: 'ACTIVE' | 'EXPIRED' | 'REVOKED'

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}