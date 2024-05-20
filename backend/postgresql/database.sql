CREATE TABLE IF NOT EXISTS "User" (
	"id" integer,
	"email" string,
	"username" string,
	"password" string,
	PRIMARY KEY ("id", "email")
);

CREATE TABLE IF NOT EXISTS "DamageTicket" (
	"id" integer,
	"status" string,
	"damage_date" date,
	"image" blob,
	"location" string,
	"category" string,
	"description" text,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Post" (
	"user_ID" integer,
	"damageTicket_ID" integer,
	"report_date" date,
	PRIMARY KEY ("user_ID", "damageTicket_ID"),
	FOREIGN KEY ("user_ID") REFERENCES "User" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("damageTicket_ID") REFERENCES "DamageTicket" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Technician" (
	"id" integer,
	"full_name" string,
	"email" string,
	"phone_number" string,
	PRIMARY KEY ("id", "email")
);

CREATE TABLE IF NOT EXISTS "Worker" (
	"worker_ID" integer,
	"profession" string,
	PRIMARY KEY ("worker_ID"),
	FOREIGN KEY ("worker_ID") REFERENCES "User" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Admin" (
	"admin_ID" integer,
	PRIMARY KEY ("admin_ID"),
	FOREIGN KEY ("admin_ID") REFERENCES "User" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Assign" (
	"admin_ID" integer,
	"damageTicket_ID" integer,
	"technician_ID" integer,
	"assignment_date" date,
	"repair_cost" float,
	PRIMARY KEY ("admin_ID", "damageTicket_ID", "technician_ID"),
	FOREIGN KEY ("admin_ID") REFERENCES "Admin" ("admin_ID")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("damageTicket_ID") REFERENCES "DamageTicket" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE,
	FOREIGN KEY ("technician_ID") REFERENCES "Technician" ("id")
            ON UPDATE CASCADE
            ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "User" (
    "id" serial PRIMARY KEY,
    "email" varchar(255) UNIQUE NOT NULL,
    "username" varchar(255) NOT NULL,
    "password" varchar(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "DamageTicket" (
    "id" serial PRIMARY KEY,
    "status" varchar(255) NOT NULL,
    "damage_date" date NOT NULL,
    "image" bytea,
    "image_url" varchar(255),  -- New column for image URL/path
    "location" varchar(255) NOT NULL,
    "category" varchar(255) NOT NULL,
    "description" text NOT NULL
);

CREATE TABLE IF NOT EXISTS "Post" (
    "user_ID" integer NOT NULL,
    "damageTicket_ID" integer NOT NULL,
    "report_date" date NOT NULL,
    PRIMARY KEY ("user_ID", "damageTicket_ID"),
    FOREIGN KEY ("user_ID") REFERENCES "User" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("damageTicket_ID") REFERENCES "DamageTicket" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Technician" (
    "id" serial PRIMARY KEY,
    "full_name" varchar(255) NOT NULL,
    "email" varchar(255) UNIQUE NOT NULL,
    "phone_number" varchar(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Worker" (
    "worker_ID" integer PRIMARY KEY,
    "profession" varchar(255) NOT NULL,
    FOREIGN KEY ("worker_ID") REFERENCES "User" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Admin" (
    "admin_ID" integer PRIMARY KEY,
    FOREIGN KEY ("admin_ID") REFERENCES "User" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS "Assign" (
    "admin_ID" integer NOT NULL,
    "damageTicket_ID" integer NOT NULL,
    "technician_ID" integer NOT NULL,
    "assignment_date" date NOT NULL,
    "repair_cost" numeric NOT NULL,
    PRIMARY KEY ("admin_ID", "damageTicket_ID", "technician_ID"),
    FOREIGN KEY ("admin_ID") REFERENCES "Admin" ("admin_ID")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("damageTicket_ID") REFERENCES "DamageTicket" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    FOREIGN KEY ("technician_ID") REFERENCES "Technician" ("id")
        ON UPDATE CASCADE
        ON DELETE CASCADE
);