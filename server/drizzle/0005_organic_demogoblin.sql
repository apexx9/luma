CREATE TABLE "buildings" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text NOT NULL,
	"city" varchar(100) NOT NULL,
	"state" varchar(100) NOT NULL,
	"zip_code" varchar(20) NOT NULL,
	"country" varchar(100) DEFAULT 'USA',
	"type" varchar(50) NOT NULL,
	"total_units" integer DEFAULT 0 NOT NULL,
	"year_built" integer,
	"square_footage" integer,
	"number_of_floors" integer,
	"purchase_price" numeric(12, 2),
	"monthly_rent" numeric(10, 2),
	"property_tax" numeric(10, 2),
	"insurance" numeric(10, 2),
	"status" varchar(20) DEFAULT 'active',
	"manager_id" integer,
	"latitude" numeric(10, 8),
	"longitude" numeric(11, 8),
	"image_url" text,
	"description" text,
	"created_at" timestamp DEFAULT now(),
	"updated_at" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "buildings" ADD CONSTRAINT "buildings_manager_id_users_id_fk" FOREIGN KEY ("manager_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;