// src/entities/ShiftCertification.ts
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne } from "typeorm"
import { Shift } from "./Shift"
import { Certification } from "./Certification"

@Entity("shift_certifications")
export class ShiftCertification {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @ManyToOne(() => Shift, shift => shift.requiredCertifications)
    shift!: Shift

    @ManyToOne(() => Certification, certification => certification.shiftCertifications)
    certification!: Certification

    @CreateDateColumn()
    createdAt!: Date
}