import { pgTable, uuid, timestamp, varchar, decimal, jsonb, boolean } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamp";
import { relations } from "drizzle-orm";
import { locationSchema } from "./location";
import { employeeSchema } from "./user";
import { availableShiftsSchema, shiftAssignmentsSchema } from "./shift";
import exp from "constants";

export const locationAuditSchema = pgTable('location_audits', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').references(() => employeeSchema.id).notNull(),
    shiftId: uuid('shift_id').references(() => shiftAssignmentsSchema.id).notNull(),
    deviceId: varchar('device_id'),
    locationId: uuid('location_id').references(() => locationSchema.id).notNull(),
    deviceLatitude: decimal('device_latitude', { precision: 10, scale: 6 }).notNull(),
    deviceLongitude: decimal('device_longitude', { precision: 10, scale: 6 }).notNull(),
    distance: decimal('distance', { precision: 10, scale: 2 }).$type<number>().notNull(),
    ipAddress: varchar('ip_address'),
    userAgent: varchar('user_agent'),
    eventType: varchar('event_type', { enum: ['clock_in', 'clock_out', 'violation', 'verification'] }).notNull(),
    status: varchar('status', { enum: ['success', 'failed'] }).notNull(),
    metadata: jsonb('metadata'),
    ...timestamps
});

export const deviceHistorySchema = pgTable('device_histories', {
    id: uuid('id').primaryKey().defaultRandom(),
    userId: uuid('user_id').notNull(),
    deviceId: varchar('device_id').notNull(),
    lastKnownLatitude: decimal('last_known_latitude', { precision: 10, scale: 6 }),
    lastKnownLongitude: decimal('last_known_longitude', { precision: 10, scale: 6 }),
    lastSeenAt: timestamp('last_seen_at').notNull(),
    isRegistered: boolean('is_registered').default(false),
    isTrusted: boolean('is_trusted').default(false),
    //accuracy: decimal('accuracy', { precision: 10, scale: 2 }).default("0.00"),
    ...timestamps
});

export const locationAuditRelations = relations(locationAuditSchema, ({ one }) => ({
    user: one(employeeSchema, {
        fields: [locationAuditSchema.userId],
        references: [employeeSchema.id],
    }),
    shift: one(shiftAssignmentsSchema, {
        fields: [locationAuditSchema.shiftId],
        references: [shiftAssignmentsSchema.id],
    }),
    location: one(locationSchema, {
        fields: [locationAuditSchema.locationId],
        references: [locationSchema.id],
    }),
}));

export type LocationAuditSchemaSelect = typeof locationAuditSchema.$inferSelect;
export type LocationAuditSchemaInsert = typeof locationAuditSchema.$inferInsert;
export type DeviceHistorySchemaSelect = typeof deviceHistorySchema.$inferSelect;
export type DeviceHistorySchemaInsert = typeof deviceHistorySchema.$inferInsert;