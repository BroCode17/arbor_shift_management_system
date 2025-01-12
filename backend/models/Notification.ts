import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from "typeorm"
import { User } from "./User"

@Entity("notifications")
export class Notification {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @ManyToOne(() => User, user => user.notifications)
    user!: User

    @Column("text")
    message!: string

    @Column({ length: 50 })
    type!: 'SHIFT_ASSIGNED' | 'SHIFT_REMINDER' | 'CANCEL_NOTICE'

    @Column("boolean", { default: false })
    isRead!: boolean

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date
}
