import { PgTable, varchar, uuid, timestamp, integer, pgTable, text, decimal } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamp";
import { relations } from "drizzle-orm";
import { availableShiftsSchema } from "./shift";
import { geofenceSchema } from "./geofence";

export const coordinateSchema = pgTable("coordinates", {
    id: uuid('id').primaryKey().defaultRandom(),
    latitude: decimal('latitude', { precision: 9, scale: 6 }).notNull(), // Holds latitude  
    longitude: decimal('longitude', { precision: 9, scale: 6 }).notNull(), // Holds longitude 
    ...timestamps
});

export const locationSchema = pgTable("locations", {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('location_name', {length: 255}).notNull().unique(),
    address: text().notNull().unique(),
    floor: integer().default(1),
    geofenceId: uuid('geofence_id').references(() => geofenceSchema.id, {onDelete: 'cascade'}).notNull(),
    coordinatesId: uuid('coordinates_id').references(() => coordinateSchema.id, {onDelete: 'cascade'}).notNull(),
    ...timestamps
});

export const coordinateSchemaRelations = relations(coordinateSchema, ({ one }) => ({
    location: one(locationSchema, {
        fields: [coordinateSchema.id],
        references: [locationSchema.coordinatesId],
    })
}));

export const locationSchemaRelations = relations(locationSchema, ({ one, many }) => ({
    availableShifts: many(availableShiftsSchema),
    coordinates: one(coordinateSchema, {
        fields: [locationSchema.coordinatesId],
        references: [coordinateSchema.id]
    }),
    geofence: one(geofenceSchema, {
        fields: [locationSchema.geofenceId],
        references: [geofenceSchema.id]
    })
}));

export type CoordinateSchemaInferInsert = typeof coordinateSchema.$inferInsert;
export type CoordinateSchemaInferSelect = typeof coordinateSchema.$inferSelect;
export type LocationSchemaInferInsert = typeof locationSchema.$inferInsert;
export type LocationSchemaInferSelect = typeof locationSchema.$inferSelect;