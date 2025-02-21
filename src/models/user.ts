
import { pgTable, serial, uuid, varchar, decimal, timestamp, uniqueIndex, text } from 'drizzle-orm/pg-core';  

import {timestamps} from './timestamp'
import { relations } from 'drizzle-orm';
import { availableShiftsSchema, shiftAssignmentsSchema } from './shift';


export const employeeSchema = pgTable('employees', {  
    id: uuid('id').primaryKey().defaultRandom(),  
    email: varchar('email', { length: 255 }).notNull().unique(),  
    passwordHash: varchar('password_hash', { length: 255 }).notNull(),  
    firstName: varchar('first_name', { length: 100 }).notNull(),  
    lastName: varchar('last_name', { length: 100 }).notNull(),  
    role: text('role', {enum:['admin', 'user', 'manager']}).default('user').notNull(),
    // departmentId: uuid('department_id').references(() => departments.id), // Foreign key for department
    avatar: varchar({length: 225}),
    employeeId: varchar('employee_id', { length: 50 }).unique(),  
    hourlyRate: decimal('hourly_rate', { precision: 10, scale: 2 }).default("20.0"),  
    ...timestamps
});  

// relations
export const employeeSchemaRelations = relations(employeeSchema, ({many}) => ({
    claimedShifts: many(shiftAssignmentsSchema)
}))

// exporting user types
export type UserInsertType = typeof employeeSchema.$inferInsert;
export type UserSelectType = typeof employeeSchema.$inferSelect;
