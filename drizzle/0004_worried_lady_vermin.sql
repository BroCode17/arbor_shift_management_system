ALTER TABLE "location_audits" DROP CONSTRAINT "location_audits_shift_id_available_shifts_id_fk";
--> statement-breakpoint
ALTER TABLE "location_audits" ADD CONSTRAINT "location_audits_shift_id_shift_assignments_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."shift_assignments"("id") ON DELETE no action ON UPDATE no action;