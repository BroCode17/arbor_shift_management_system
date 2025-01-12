import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User"
import { Assignment } from "./Assignment"
import { ShiftCertification } from "./ShiftCertification"

@Entity("shifts")
export class Shift {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @Column({ length: 150 })
    title!: string

    @Column({ length: 255 })
    location!: string

    @Column({ type: 'timestamp' })
    startTime!: Date

    @Column({ type: 'timestamp' })
    endTime!: Date

    @Column("int")
    totalSlots!: number

    @ManyToOne(() => User, user => user.createdShifts)
    createdBy!: User

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => Assignment, assignment => assignment.shift)
    assignments!: Assignment[]

    @OneToMany(() => ShiftCertification, shiftCert => shiftCert.shift)
    requiredCertifications!: ShiftCertification[]
}