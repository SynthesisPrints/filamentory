CREATE SCHEMA "spoolhub";
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spoolhub"."locations" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"user_id" text,
	"description" text,
	"type" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spoolhub"."print_spools" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"print_id" bigint,
	"spool_id" bigint,
	"amount_used" numeric(12, 2)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spoolhub"."printers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"type" text,
	"location_ids" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spoolhub"."prints" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"name" text,
	"url" text,
	"user_id" text,
	"start_time" timestamp with time zone,
	"duration" interval,
	"user_printer_id" bigint,
	"status" text,
	"tags" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "spoolhub"."spools" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" text,
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
CREATE TABLE IF NOT EXISTS "spoolhub"."user_printers" (
	"id" bigserial PRIMARY KEY NOT NULL,
	"user_id" text,
	"printer_id" bigint,
	"nickname" text,
	"location_ids" jsonb,
	"tags" jsonb
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "locations_type_idx" ON "spoolhub"."locations" ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prints_user_id_idx" ON "spoolhub"."prints" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "prints_user_printer_id_idx" ON "spoolhub"."prints" ("user_printer_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_sku_idx" ON "spoolhub"."spools" ("sku");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_user_id_idx" ON "spoolhub"."spools" ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_original_quantity_idx" ON "spoolhub"."spools" ("original_quantity");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_material_idx" ON "spoolhub"."spools" ("material");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_color_name_idx" ON "spoolhub"."spools" ("color_name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "spools_brand_idx" ON "spoolhub"."spools" ("brand");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_printers_user_nickname_idx" ON "spoolhub"."user_printers" ("user_id","nickname");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spoolhub"."print_spools" ADD CONSTRAINT "print_spools_print_id_prints_id_fk" FOREIGN KEY ("print_id") REFERENCES "spoolhub"."prints"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spoolhub"."print_spools" ADD CONSTRAINT "print_spools_spool_id_spools_id_fk" FOREIGN KEY ("spool_id") REFERENCES "spoolhub"."spools"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spoolhub"."prints" ADD CONSTRAINT "prints_user_printer_id_user_printers_id_fk" FOREIGN KEY ("user_printer_id") REFERENCES "spoolhub"."user_printers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spoolhub"."spools" ADD CONSTRAINT "spools_location_id_locations_id_fk" FOREIGN KEY ("location_id") REFERENCES "spoolhub"."locations"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "spoolhub"."user_printers" ADD CONSTRAINT "user_printers_printer_id_printers_id_fk" FOREIGN KEY ("printer_id") REFERENCES "spoolhub"."printers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
