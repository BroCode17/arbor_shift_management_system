CREATE TABLE "certificates" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"employee_id" uuid,
	"certificate_name" varchar(255) NOT NULL,
	"certificate_issuer" varchar(255) NOT NULL,
	"certificate_number" varchar(50) NOT NULL,
	"certificate_image_url" varchar(255),
	"issue_date" timestamp NOT NULL,
	"expiry_date" timestamp,
	"is_valid" boolean DEFAULT true,
	"updated_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"deleted_at" timestamp with time zone
);
--> statement-breakpoint
ALTER TABLE "employees" ADD COLUMN "requires_certificate" boolean DEFAULT true NOT NULL;--> statement-breakpoint
ALTER TABLE "certificates" ADD CONSTRAINT "certificates_employee_id_employees_id_fk" FOREIGN KEY ("employee_id") REFERENCES "public"."employees"("id") ON DELETE no action ON UPDATE no action;