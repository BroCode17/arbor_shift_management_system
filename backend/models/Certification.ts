import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { UserCertification } from "./UserCertification"
import { ShiftCertification } from "./ShiftCertification"

@Entity("certifications")
export class Certification {
    @PrimaryGeneratedColumn("uuid")
    id!: string

    @Column({ length: 100 })
    name!: string

    @Column("text")
    description!: string

    @CreateDateColumn()
    createdAt!: Date

    @UpdateDateColumn()
    updatedAt!: Date

    @OneToMany(() => UserCertification, userCert => userCert.certification)
    userCertifications!: UserCertification[]

    @OneToMany(() => ShiftCertification, shiftCert => shiftCert.certification)
    shiftCertifications!: ShiftCertification[]
}