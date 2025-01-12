import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsOptional, length, Length } from "class-validator"
import { UserCertification } from "./UserCertification"
import { Shift } from "./Shift"
import { Assignment } from "./Assignment"
import { Notification } from "./Notification"
import { AuditLog } from "./AuditLog"
export enum UserRole {
    EMPLOYEE = "EMPLOYEE",
    EMPLOYER = "EMPLOYER",
    ADMIN = "ADMIN"
}



@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ length: 100 })
    @IsNotEmpty()
    @Length(2, 100)
    firstName!: string

    @Column({ length: 100 })
    @IsNotEmpty()
    @Length(2, 100)
    lastName!: string

    @Column({ length: 255, unique: true })
    @IsEmail()
    email!: string

    @Column({ 
        length: 255,
        select: false
     })
    @IsNotEmpty()
    @Length(8, 100)
    hashedPassword!: string

    @Column({ 
        length: 50,
        array: true,
        default: [UserRole.EMPLOYEE]
     })
    @IsEnum(UserRole)
    role!: UserRole

    @Column({ nullable: true })
    resetPasswordToken?: string

    @Column({ nullable: true })
    resetPasswordExpire?: Date

    @Column({ length: 50, nullable: true })
    @IsOptional()
    @IsMobilePhone()
    phoneNumber!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => UserCertification, userCert => userCert.user)
    certifications!: UserCertification[]

    @OneToMany(() => Shift, shift => shift.createdBy)
    createdShifts!: Shift[]

    @OneToMany(() => Assignment, assignment => assignment.user)
    assignments!: Assignment[]

    @OneToMany(() => Notification, notification => notification.user)
    notifications!: Notification[]

    @OneToMany(() => AuditLog, auditLog => auditLog.user)
    auditLogs!: AuditLog[]
}
