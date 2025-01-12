import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity("audit_logs")
export class AuditLog {
    @PrimaryGeneratedColumn("uuid")
    id!: number

    @ManyToOne(() => User, user => user.auditLogs)
    user!: User

    @Column({ length: 50 })
    actionType!: 'CREATE_SHIFT' | 'ASSIGN_SHIFT' | 'UPDATE_CERTIFICATION'

    @Column("json")
    details!: object

    @CreateDateColumn()
    createdAt!: Date
}