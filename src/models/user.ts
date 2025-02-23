
import { pgTable, serial, uuid, varchar, decimal, timestamp, uniqueIndex, text, boolean } from 'drizzle-orm/pg-core';  
import { timestamps } from './timestamp'
import { relations } from 'drizzle-orm';
import { availableShiftsSchema, shiftAssignmentsSchema } from './shift';

// Create certificate schema
export const certificateSchema = pgTable('certificates', {
    id: uuid('id').primaryKey().defaultRandom(),
    employeeId: uuid('employee_id').references(() => employeeSchema.id),
    certificateName: varchar('certificate_name', { length: 255 }).notNull(),
    certificateIssuer: varchar('certificate_issuer', { length: 255 }).notNull(),
    certificateNumber: varchar('certificate_number', { length: 50 }).notNull(),
    certificateImageUrl: varchar('certificate_image_url', { length: 255}),
    issueDate: timestamp('issue_date').notNull(),
    expiryDate: timestamp('expiry_date'),
    isValid: boolean('is_valid').default(true),
    ...timestamps
});

export const employeeSchema = pgTable('employees', {  
    id: uuid('id').primaryKey().defaultRandom(),  
    email: varchar('email', { length: 255 }).notNull().unique(),  
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),  
    firstName: varchar('first_name', { length: 100 }).notNull(),  
    lastName: varchar('last_name', { length: 100 }).notNull(),  
    role: text('role', {enum:['admin', 'user', 'manager']}).default('user').notNull(),
    requiresCertificate: boolean('requires_certificate')
        .default(true)
        .notNull(),
    avatar: varchar({length: 225}),
    employeeId: varchar('employee_id', { length: 50 }).unique(),  
    hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }).$type<number>().default(20.0),  
    ...timestamps
});  

// Update relations to include certificates
export const employeeSchemaRelations = relations(employeeSchema, ({many}) => ({
    claimedShifts: many(shiftAssignmentsSchema),
    certificates: many(certificateSchema)
}));

export const certificateRelations = relations(certificateSchema, ({one}) => ({
    employee: one(employeeSchema, {
        fields: [certificateSchema.employeeId],
        references: [employeeSchema.id],
    })
}));

// Types
export type UserInsertType = typeof employeeSchema.$inferInsert;
export type UserSelectType = typeof employeeSchema.$inferSelect;
export type CertificateInsertType = typeof certificateSchema.$inferInsert;
export type CertificateSelectType = typeof certificateSchema.$inferSelect;
