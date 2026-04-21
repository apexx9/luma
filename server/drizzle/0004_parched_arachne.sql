CREATE TABLE "admin_activity" (
	"id" serial PRIMARY KEY NOT NULL,
	"admin_id" integer NOT NULL,
	"action" text NOT NULL,
	"target" text NOT NULL,
	"details" text,
	"timestamp" timestamp DEFAULT now()
);
--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "role" text DEFAULT 'User';