ALTER TABLE "locations" DROP CONSTRAINT "locations_geofence_id_geofences_id_fk";
--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_geofence_id_geofences_id_fk" FOREIGN KEY ("geofence_id") REFERENCES "public"."geofences"("id") ON DELETE cascade ON UPDATE no action;