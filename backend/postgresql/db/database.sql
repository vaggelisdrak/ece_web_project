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
	"image" string,
	"location" string,
	"category" string,
	"description" text,
	"user_ID" string,
	"report_date" date,
	PRIMARY KEY ("id"),
	FOREIGN KEY ("user_ID") REFERENCES "User" ("id")
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

