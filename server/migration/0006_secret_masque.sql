CREATE TABLE "reset-password-token" (
	"id" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	"email" text NOT NULL,
	CONSTRAINT "reset-password-token_id_token_pk" PRIMARY KEY("id","token")
);
