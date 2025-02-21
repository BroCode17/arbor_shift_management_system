import { decimal, varchar, time, timestamp, uuid, integer, pgTable, date, text, boolean } from "drizzle-orm/pg-core";
import { locationSchema } from "./location";
import { employeeSchema } from "./user";
import { relations } from "drizzle-orm";
import { timestamps } from "./timestamp";

export const shiftSchema = pgTable('shifts', {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar({ length: 100 }),
    startTime: timestamp("start_time").notNull(),
    endTime: timestamp("end_time").notNull(),
    locationId: uuid("location_id").references(() => locationSchema.id),
    minStaffRequired: integer("min_staff_required").default(1),
    maxStaffRequired: integer("max_staff_required").default(1),
    defaultHourlyRate: decimal("default_hourly_rate", { precision: 10, scale: 2 }).default("20.0"),
    requiresApproval: boolean('requires_approval').default(true),
    ...timestamps
});

export const availableShiftsSchema = pgTable('available_shifts', {
    id: uuid('id').primaryKey().defaultRandom(),
    template_id: uuid('template_id').references(() => shiftSchema.id).notNull(),
    shift_date: date('shift_date').notNull(),
    start_time: timestamp('start_time').notNull(),
    end_time: timestamp('end_time').notNull(),
    status: varchar('status', { enum: ['open', 'filled', 'cancelled'] }).default('open'),
    hourly_rate: decimal('hourly_rate', { precision: 10, scale: 2 }),
    remaining_slots: integer('remaining_slots').notNull(), // Add this field to track available positions
    location_id: uuid('location_id').references(() => locationSchema.id),
    ...timestamps
});

export const shiftAssignmentsSchema = pgTable('shift_assignments', {
    id: uuid('id').primaryKey().defaultRandom(),
    shift_id: uuid('shift_id').references(() => availableShiftsSchema.id).notNull(),
    user_id: uuid('user_id').references(() => employeeSchema.id).notNull(),
    status: varchar('status', { enum: ['pending', 'accepted', 'rejected', 'completed', "in_progress"] }).default('pending'),// pending, accepted, rejected, completed
    clock_in: timestamp('clock_in'),
    clock_out: timestamp('clock_out'),
    actual_hours_worked: decimal('actual_hours_worked', { precision: 5, scale: 2 }).default("0.0"),
    notes: text('notes'),
    ...timestamps
});

// relationships
export const shiftRelations = relations(shiftSchema, ({ many }) => ({
    availableShifts: many(availableShiftsSchema),
    assingedShifts: many(shiftAssignmentsSchema),
}));

export const shiftAssignmentRelations = relations(shiftAssignmentsSchema, ({ one, many }) => ({
    employee: one(employeeSchema, {
        fields: [shiftAssignmentsSchema.user_id],
        references: [employeeSchema.id],
    }),
    shift: one(availableShiftsSchema, {
        fields: [shiftAssignmentsSchema.shift_id],
        references: [availableShiftsSchema.id],
    }),
}));


export const availableShiftsSchemaRelations = relations(availableShiftsSchema, ({ one, many }) => {
    return {
        location: one(locationSchema, {
            fields: [availableShiftsSchema.location_id],
            references: [locationSchema.id]
         },),
         shift: one(shiftSchema, {
            fields: [availableShiftsSchema.template_id],
            references: [shiftSchema.id]
        }),
    }
})

export type ShiftSchemaInferInsert = typeof shiftSchema.$inferInsert;
export type ShiftSchemaInferSelect = typeof shiftSchema.$inferSelect;
export type AvailableShiftSchemaInferInsert = typeof availableShiftsSchema.$inferSelect;
export type AvailableShiftSchemaInferSelect = typeof availableShiftsSchema.$inferSelect;
export type ShiftAssignmentsSchemaInferInsert = typeof shiftAssignmentsSchema.$inferSelect;
export type ShiftAssignmentsSchemaInferSelect = typeof shiftAssignmentsSchema.$inferSelect;
