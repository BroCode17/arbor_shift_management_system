import { pgTable, uuid, decimal, jsonb, varchar, boolean, integer } from "drizzle-orm/pg-core";
import { timestamps } from "./timestamp";
import { relations } from "drizzle-orm";
import { locationSchema } from "./location";

export const geofenceSchema = pgTable('geofences', {
    id: uuid('id').primaryKey().defaultRandom(),
    name: varchar('name').notNull(),
    radius: decimal('radius', { precision: 10, scale: 2 }).$type<number>().notNull(), // in meters
    allowedZones: jsonb('allowed_zones').$type<[number, number][][]>(), // Array of polygons
    restrictedZones: jsonb('restricted_zones').$type<[number, number][][]>(), // Array of polygons
    maxAllowedSpeed: decimal('max_allowed_speed', { precision: 5, scale: 2 }).$type<number>(), // km/h
    requiresApproval: boolean('requires_approval').default(false),
    age: integer('age').$type<number>(), // years
    ...timestamps
});

export const geofenceSchemaRelations = relations(geofenceSchema, ({ many }) => ({
    locations: many(locationSchema)
}));

export type GeofenceSchemaSelect = typeof geofenceSchema.$inferSelect;
export type GeofenceSchemaInsert = typeof geofenceSchema.$inferInsert;