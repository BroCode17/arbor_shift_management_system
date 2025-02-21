CREATE TABLE "geofences" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar NOT NULL,
	"radius" numeric(10, 2) NOT NULL,
	"allowed_zones" jsonb,
	"restricted_zones" jsonb,
	"max_allowed_speed" numeric(5, 2),
	"requires_approval" boolean DEFAULT false,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "device_histories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"device_id" varchar NOT NULL,
	"last_known_latitude" numeric(10, 6),
	"last_known_longitude" numeric(10, 6),
	"last_seen_at" timestamp NOT NULL,
	"is_registered" boolean DEFAULT false,
	"is_trusted" boolean DEFAULT false,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "location_audits" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"shift_id" uuid NOT NULL,
	"device_id" varchar,
	"location_id" uuid NOT NULL,
	"device_latitude" numeric(10, 6) NOT NULL,
	"device_longitude" numeric(10, 6) NOT NULL,
	"distance" numeric(10, 2) NOT NULL,
	"ip_address" varchar,
	"user_agent" varchar,
	"event_type" varchar NOT NULL,
	"status" varchar NOT NULL,
	"metadata" jsonb,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "shift_assignments" ALTER COLUMN "actual_hours_worked" SET DEFAULT '0.0';--> statement-breakpoint
ALTER TABLE "shifts" ALTER COLUMN "start_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "shifts" ALTER COLUMN "end_time" SET DATA TYPE timestamp;--> statement-breakpoint
ALTER TABLE "locations" ADD COLUMN "geofence_id" uuid NOT NULL;--> statement-breakpoint
ALTER TABLE "location_audits" ADD CONSTRAINT "location_audits_user_id_employees_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_audits" ADD CONSTRAINT "location_audits_shift_id_available_shifts_id_fk" FOREIGN KEY ("shift_id") REFERENCES "public"."available_shifts"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "location_audits" ADD CONSTRAINT "location_audits_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "public"."locations"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" ADD CONSTRAINT "locations_geofence_id_geofences_id_fk" FOREIGN KEY ("geofence_id") REFERENCES "public"."geofences"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "locations" DROP COLUMN "rudis";