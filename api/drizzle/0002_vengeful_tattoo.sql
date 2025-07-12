CREATE TABLE "actividad_usuario" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "actividad_usuario_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"usuario_id" integer,
	"tipo_actividad" varchar(100),
	"objeto_id" integer,
	"contexto" varchar(50),
	"fecha" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "conversaciones" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "conversaciones_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"usuario_1_id" integer,
	"usuario_2_id" integer,
	"creado_en" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "eventos" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "eventos_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"titulo" varchar(200),
	"descripcion" text,
	"tipo" varchar(100),
	"creador_id" integer,
	"universidad_id" integer,
	"fecha_inicio" timestamp,
	"fecha_fin" timestamp,
	"enlace_acceso" text,
	"creado_en" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "foros" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "foros_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(100),
	"descripcion" text
);
--> statement-breakpoint
CREATE TABLE "mensajes" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "mensajes_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"conversacion_id" integer,
	"emisor_id" integer,
	"contenido" text,
	"enviado_en" timestamp DEFAULT now(),
	"leido" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "oportunidades" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "oportunidades_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"titulo" varchar(200),
	"descripcion" text,
	"tipo" varchar(100),
	"universidad_id" integer,
	"fecha_limite" date
);
--> statement-breakpoint
CREATE TABLE "roles_proyecto" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_proyecto_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(50),
	"puede_editar" boolean DEFAULT false,
	"puede_comentar" boolean DEFAULT true,
	"puede_subir_archivos" boolean DEFAULT false,
	"puede_validar" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "roles_usuario" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_usuario_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "tags" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "tags_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(50)
);
--> statement-breakpoint
CREATE TABLE "universidades" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "universidades_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"nombre" varchar(150),
	"dominio_correo" varchar(100),
	"logo_url" text
);
--> statement-breakpoint
ALTER TABLE "actividad_usuario" ADD CONSTRAINT "actividad_usuario_usuario_id_users_id_fk" FOREIGN KEY ("usuario_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversaciones" ADD CONSTRAINT "conversaciones_usuario_1_id_users_id_fk" FOREIGN KEY ("usuario_1_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "conversaciones" ADD CONSTRAINT "conversaciones_usuario_2_id_users_id_fk" FOREIGN KEY ("usuario_2_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_creador_id_users_id_fk" FOREIGN KEY ("creador_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "eventos" ADD CONSTRAINT "eventos_universidad_id_universidades_id_fk" FOREIGN KEY ("universidad_id") REFERENCES "public"."universidades"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_conversacion_id_conversaciones_id_fk" FOREIGN KEY ("conversacion_id") REFERENCES "public"."conversaciones"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "mensajes" ADD CONSTRAINT "mensajes_emisor_id_users_id_fk" FOREIGN KEY ("emisor_id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "oportunidades" ADD CONSTRAINT "oportunidades_universidad_id_universidades_id_fk" FOREIGN KEY ("universidad_id") REFERENCES "public"."universidades"("id") ON DELETE no action ON UPDATE no action;