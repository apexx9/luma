ALTER TABLE "users"
	ADD COLUMN IF NOT EXISTS "must_change_password" boolean DEFAULT false NOT NULL,
	ADD COLUMN IF NOT EXISTS "profile_verified" boolean DEFAULT false NOT NULL,
	ADD COLUMN IF NOT EXISTS "password_changed_at" timestamp,
	ADD COLUMN IF NOT EXISTS "profile_verified_at" timestamp;

UPDATE "users"
SET
	"must_change_password" = false,
	"profile_verified" = true,
	"password_changed_at" = COALESCE("password_changed_at", now()),
	"profile_verified_at" = COALESCE("profile_verified_at", now());
