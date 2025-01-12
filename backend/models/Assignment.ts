import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"
import { Shift } from "./Shift"

@Entity("assignments")
export class Assignment {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => Shift, shift => shift.assignments)
    shift!: Shift

    @ManyToOne(() => User, user => user.assignments)
    user!: User

    @Column({ length: 50 })
    status!: 'CLAIMED' | 'CONFIRMED' | 'CANCELLED' | 'COMPLETED'

    @Column({ type: 'timestamp' })
    assignedAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @Column("text", { nullable: true })
    notes!: string
}
