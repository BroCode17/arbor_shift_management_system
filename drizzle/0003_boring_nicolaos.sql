ALTER TABLE "shifts" ALTER COLUMN "min_staff_required" SET DEFAULT 1;--> statement-breakpoint
ALTER TABLE "shifts" ADD COLUMN "max_staff_required" integer DEFAULT 1;