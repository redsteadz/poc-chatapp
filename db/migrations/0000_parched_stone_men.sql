CREATE TABLE "prompt" (
	"id" serial PRIMARY KEY NOT NULL,
	"input" text DEFAULT '' NOT NULL,
	"output" text DEFAULT '' NOT NULL,
	"input_tokens" integer DEFAULT 0 NOT NULL,
	"output_tokens" integer DEFAULT 0 NOT NULL
);
--> statement-breakpoint
CREATE TABLE "users_table" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"age" integer NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "users_table_email_unique" UNIQUE("email")
);
