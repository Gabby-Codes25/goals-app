CREATE TABLE IF NOT EXISTS "users" (
  "id" varchar(255) PRIMARY KEY,
  "email" varchar(255) NOT NULL UNIQUE,
  "first_name" varchar(100),
  "last_name" varchar(100),
  "full_name" varchar(200),
  "xp" integer DEFAULT 0 NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL
);

CREATE TABLE IF NOT EXISTS "goals" (
  "id" varchar(255) PRIMARY KEY,
  "user_id" varchar(255) NOT NULL,
  "title" varchar(255) NOT NULL,
  "description" text,
  "is_completed" boolean DEFAULT false NOT NULL,
  "created_at" timestamp DEFAULT now() NOT NULL,
  "updated_at" timestamp DEFAULT now() NOT NULL,
  FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE
);