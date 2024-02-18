CREATE TABLE IF NOT EXISTS "locations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" bigint,
	"description" text,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "print_spools" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"print_id" bigint,
	"spool_id" bigint,
	"amount_used" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "printers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"type" text,
	"location_ids" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "prints" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"user_id" bigint,
	"start_time" timestamp with time zone,
	"end_time" timestamp with time zone,
	"user_printer_id" bigint,
	"status" text,
	"tags" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spools" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"sku" text,
	"material" text,
	"color_name" text,
	"color" text,
	"brand" text,
	"original_quantity" numeric(12, 2),
	"remaining_quantity" numeric(12, 2),
	"purchase_price" numeric(12, 2),
	"purchase_date" timestamp with time zone,
	"location_id" bigint,
	"last_dried_date" timestamp with time zone,
	"tags" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_printers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" bigint,
	"printer_id" bigint,
	"nickname" text,
	"location_ids" jsonb,
	"tags" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"username" text,
	"email" text,
	CONSTRAINT "users_username_unique" UNIQUE("username"),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "locations_type_idx" ON "locations" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prints_user_id_idx" ON "prints" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prints_user_printer_id_idx" ON "prints" ("user_printer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_sku_idx" ON "spools" ("sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_user_id_idx" ON "spools" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_original_quantity_idx" ON "spools" ("original_quantity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_material_idx" ON "spools" ("material");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_color_name_idx" ON "spools" ("color_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_brand_idx" ON "spools" ("brand");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_printers_user_nickname_idx" ON "user_printers" ("user_id","nickname");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "locations" ADD CONSTRAINT "locations_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "print_spools" ADD CONSTRAINT "print_spools_print_id_prints_id_fk" FOREIGN KEY ("print_id") REFERENCES "prints"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "print_spools" ADD CONSTRAINT "print_spools_spool_id_spools_id_fk" FOREIGN KEY ("spool_id") REFERENCES "spools"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prints" ADD CONSTRAINT "prints_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "prints" ADD CONSTRAINT "prints_user_printer_id_user_printers_id_fk" FOREIGN KEY ("user_printer_id") REFERENCES "user_printers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spools" ADD CONSTRAINT "spools_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spools" ADD CONSTRAINT "spools_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_printers" ADD CONSTRAINT "user_printers_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_printers" ADD CONSTRAINT "user_printers_printer_id_printers_id_fk" FOREIGN KEY ("printer_id") REFERENCES "printers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
