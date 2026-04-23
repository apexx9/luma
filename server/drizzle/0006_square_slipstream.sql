CREATE TABLE "units" (
	"id" serial PRIMARY KEY NOT NULL,
	"building_id" integer NOT NULL,
	"name" varchar(50) NOT NULL,
	"type" varchar(50) NOT NULL,
	"status" varchar(20) DEFAULT 'vacant',
	"square_footage" integer,
	"bedrooms" integer,
	"bathrooms" integer,
	"floor" integer,
	"rent" numeric(10, 2),
	"deposit" numeric(10, 2),
	"tenant" varchar(255),
	"tenant_email" varchar(255),
	"tenant_phone" varchar(20),
	"lease_start" timestamp,
	"lease_end" timestamp,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "units" ADD CONSTRAINT "units_building_id_buildings_id_fk" FOREIGN KEY ("building_id") REFERENCES "public"."buildings"("id") ON DELETE cascade ON UPDATE no action;