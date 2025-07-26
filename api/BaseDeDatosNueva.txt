--
-- PostgreSQL database dump
--

-- Dumped from database version 17.5
-- Dumped by pg_dump version 17.2

-- Started on 2025-07-25 20:12:45

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- TOC entry 9 (class 2615 OID 42548)
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO postgres;

--
-- TOC entry 4 (class 3079 OID 60932)
-- Name: btree_gin; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS btree_gin WITH SCHEMA public;


--
-- TOC entry 5579 (class 0 OID 0)
-- Dependencies: 4
-- Name: EXTENSION btree_gin; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION btree_gin IS 'support for indexing common datatypes in GIN';


--
-- TOC entry 3 (class 3079 OID 60851)
-- Name: pg_trgm; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS pg_trgm WITH SCHEMA public;


--
-- TOC entry 5580 (class 0 OID 0)
-- Dependencies: 3
-- Name: EXTENSION pg_trgm; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION pg_trgm IS 'text similarity measurement and index searching based on trigrams';


--
-- TOC entry 2 (class 3079 OID 60840)
-- Name: uuid-ossp; Type: EXTENSION; Schema: -; Owner: -
--

CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;


--
-- TOC entry 5581 (class 0 OID 0)
-- Dependencies: 2
-- Name: EXTENSION "uuid-ossp"; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION "uuid-ossp" IS 'generate universally unique identifiers (UUIDs)';


--
-- TOC entry 426 (class 1255 OID 61588)
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 272 (class 1259 OID 42550)
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: postgres
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO postgres;

--
-- TOC entry 271 (class 1259 OID 42549)
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: postgres
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO postgres;

--
-- TOC entry 5582 (class 0 OID 0)
-- Dependencies: 271
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: postgres
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- TOC entry 221 (class 1259 OID 42341)
-- Name: actividad_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.actividad_usuario (
    id integer NOT NULL,
    usuario_id integer,
    tipo_actividad character varying(100),
    objeto_id integer,
    contexto character varying(50),
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.actividad_usuario OWNER TO postgres;

--
-- TOC entry 222 (class 1259 OID 42345)
-- Name: actividad_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.actividad_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.actividad_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 5583 (class 0 OID 0)
-- Dependencies: 222
-- Name: actividad_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.actividad_usuario_id_seq OWNED BY public.actividad_usuario.id;


--
-- TOC entry 223 (class 1259 OID 42346)
-- Name: asistencias_evento; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.asistencias_evento (
    id integer NOT NULL,
    evento_id integer,
    usuario_id integer,
    registrado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.asistencias_evento OWNER TO postgres;

--
-- TOC entry 224 (class 1259 OID 42350)
-- Name: asistencias_evento_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.asistencias_evento_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.asistencias_evento_id_seq OWNER TO postgres;

--
-- TOC entry 5584 (class 0 OID 0)
-- Dependencies: 224
-- Name: asistencias_evento_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.asistencias_evento_id_seq OWNED BY public.asistencias_evento.id;


--
-- TOC entry 281 (class 1259 OID 50878)
-- Name: bloques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.bloques (
    id integer NOT NULL,
    pagina_id integer,
    tipo character varying(50),
    contenido jsonb,
    orden integer DEFAULT 0,
    creado_por integer,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.bloques OWNER TO postgres;

--
-- TOC entry 282 (class 1259 OID 50885)
-- Name: bloques_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.bloques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.bloques_id_seq OWNER TO postgres;

--
-- TOC entry 5585 (class 0 OID 0)
-- Dependencies: 282
-- Name: bloques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.bloques_id_seq OWNED BY public.bloques.id;


--
-- TOC entry 310 (class 1259 OID 61490)
-- Name: collaborative_page_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.collaborative_page_permissions (
    id integer NOT NULL,
    page_id integer NOT NULL,
    user_id integer NOT NULL,
    permission_type_id integer NOT NULL,
    granted_by integer,
    granted_at timestamp without time zone DEFAULT now(),
    is_active boolean DEFAULT true
);


ALTER TABLE public.collaborative_page_permissions OWNER TO postgres;

--
-- TOC entry 309 (class 1259 OID 61489)
-- Name: collaborative_page_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.collaborative_page_permissions_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.collaborative_page_permissions_id_seq OWNER TO postgres;

--
-- TOC entry 5586 (class 0 OID 0)
-- Dependencies: 309
-- Name: collaborative_page_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.collaborative_page_permissions_id_seq OWNED BY public.collaborative_page_permissions.id;


--
-- TOC entry 298 (class 1259 OID 61409)
-- Name: content_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.content_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.content_types OWNER TO postgres;

--
-- TOC entry 297 (class 1259 OID 61408)
-- Name: content_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.content_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.content_types_id_seq OWNER TO postgres;

--
-- TOC entry 5587 (class 0 OID 0)
-- Dependencies: 297
-- Name: content_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.content_types_id_seq OWNED BY public.content_types.id;


--
-- TOC entry 225 (class 1259 OID 42359)
-- Name: conversaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.conversaciones (
    id integer NOT NULL,
    usuario_1_id integer,
    usuario_2_id integer,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.conversaciones OWNER TO postgres;

--
-- TOC entry 226 (class 1259 OID 42363)
-- Name: conversaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.conversaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.conversaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5588 (class 0 OID 0)
-- Dependencies: 226
-- Name: conversaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.conversaciones_id_seq OWNED BY public.conversaciones.id;


--
-- TOC entry 294 (class 1259 OID 61383)
-- Name: event_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.event_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    icon character varying(50),
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.event_types OWNER TO postgres;

--
-- TOC entry 293 (class 1259 OID 61382)
-- Name: event_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.event_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_types_id_seq OWNER TO postgres;

--
-- TOC entry 5589 (class 0 OID 0)
-- Dependencies: 293
-- Name: event_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.event_types_id_seq OWNED BY public.event_types.id;


--
-- TOC entry 227 (class 1259 OID 42364)
-- Name: eventos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.eventos (
    id integer NOT NULL,
    titulo character varying(200),
    descripcion text,
    tipo character varying(100),
    creador_id integer,
    universidad_id integer,
    fecha_inicio timestamp without time zone,
    fecha_fin timestamp without time zone,
    enlace_acceso text,
    creado_en timestamp without time zone DEFAULT now(),
    event_type_id integer,
    state_id integer,
    ubicacion text,
    capacidad_maxima integer,
    updated_at timestamp without time zone
);


ALTER TABLE public.eventos OWNER TO postgres;

--
-- TOC entry 228 (class 1259 OID 42370)
-- Name: eventos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.eventos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.eventos_id_seq OWNER TO postgres;

--
-- TOC entry 5590 (class 0 OID 0)
-- Dependencies: 228
-- Name: eventos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.eventos_id_seq OWNED BY public.eventos.id;


--
-- TOC entry 304 (class 1259 OID 61446)
-- Name: experience_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experience_types (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    is_active boolean DEFAULT true
);


ALTER TABLE public.experience_types OWNER TO postgres;

--
-- TOC entry 303 (class 1259 OID 61445)
-- Name: experience_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experience_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experience_types_id_seq OWNER TO postgres;

--
-- TOC entry 5591 (class 0 OID 0)
-- Dependencies: 303
-- Name: experience_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experience_types_id_seq OWNED BY public.experience_types.id;


--
-- TOC entry 229 (class 1259 OID 42371)
-- Name: experiencia_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.experiencia_usuario (
    id integer NOT NULL,
    usuario_id integer,
    tipo character varying(50),
    titulo character varying(100),
    descripcion text,
    fecha_inicio date,
    fecha_fin date
);


ALTER TABLE public.experiencia_usuario OWNER TO postgres;

--
-- TOC entry 230 (class 1259 OID 42376)
-- Name: experiencia_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.experiencia_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.experiencia_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 5592 (class 0 OID 0)
-- Dependencies: 230
-- Name: experiencia_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.experiencia_usuario_id_seq OWNED BY public.experiencia_usuario.id;


--
-- TOC entry 231 (class 1259 OID 42377)
-- Name: foros; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.foros (
    id integer NOT NULL,
    nombre character varying(100),
    descripcion text
);


ALTER TABLE public.foros OWNER TO postgres;

--
-- TOC entry 232 (class 1259 OID 42382)
-- Name: foros_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.foros_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.foros_id_seq OWNER TO postgres;

--
-- TOC entry 5593 (class 0 OID 0)
-- Dependencies: 232
-- Name: foros_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.foros_id_seq OWNED BY public.foros.id;


--
-- TOC entry 233 (class 1259 OID 42383)
-- Name: hilos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.hilos (
    id integer NOT NULL,
    foro_id integer,
    titulo character varying(150),
    contenido text,
    creador_id integer,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.hilos OWNER TO postgres;

--
-- TOC entry 234 (class 1259 OID 42389)
-- Name: hilos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.hilos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.hilos_id_seq OWNER TO postgres;

--
-- TOC entry 5594 (class 0 OID 0)
-- Dependencies: 234
-- Name: hilos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.hilos_id_seq OWNED BY public.hilos.id;


--
-- TOC entry 235 (class 1259 OID 42390)
-- Name: mensajes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.mensajes (
    id integer NOT NULL,
    conversacion_id integer,
    emisor_id integer,
    contenido text,
    enviado_en timestamp without time zone DEFAULT now(),
    leido boolean DEFAULT false
);


ALTER TABLE public.mensajes OWNER TO postgres;

--
-- TOC entry 236 (class 1259 OID 42397)
-- Name: mensajes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.mensajes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.mensajes_id_seq OWNER TO postgres;

--
-- TOC entry 5595 (class 0 OID 0)
-- Dependencies: 236
-- Name: mensajes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.mensajes_id_seq OWNED BY public.mensajes.id;


--
-- TOC entry 286 (class 1259 OID 50970)
-- Name: ofertas_laborales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ofertas_laborales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ofertas_laborales_id_seq OWNER TO postgres;

--
-- TOC entry 285 (class 1259 OID 50964)
-- Name: ofertas_laborales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ofertas_laborales (
    id integer DEFAULT nextval('public.ofertas_laborales_id_seq'::regclass) NOT NULL,
    logo_url text,
    titulo character varying(200),
    descripcion text,
    empresa character varying(150),
    ubicacion character varying(100),
    tipo_contrato character varying(100),
    salario character varying(100),
    fecha_publicacion date,
    fecha_limite date,
    creado_por integer,
    estado character varying(50) DEFAULT 'activo'::character varying
);


ALTER TABLE public.ofertas_laborales OWNER TO postgres;

--
-- TOC entry 237 (class 1259 OID 42398)
-- Name: oportunidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.oportunidades (
    id integer NOT NULL,
    titulo character varying(200),
    descripcion text,
    tipo character varying(100),
    universidad_id integer,
    fecha_limite date,
    opportunity_type_id integer,
    state_id integer,
    created_by integer,
    empresa character varying(150),
    salario_min numeric(10,2),
    salario_max numeric(10,2),
    modality_id integer,
    requisitos text,
    beneficios text,
    created_at timestamp without time zone DEFAULT now(),
    updated_at timestamp without time zone
);


ALTER TABLE public.oportunidades OWNER TO postgres;

--
-- TOC entry 238 (class 1259 OID 42403)
-- Name: oportunidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.oportunidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.oportunidades_id_seq OWNER TO postgres;

--
-- TOC entry 5596 (class 0 OID 0)
-- Dependencies: 238
-- Name: oportunidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.oportunidades_id_seq OWNED BY public.oportunidades.id;


--
-- TOC entry 296 (class 1259 OID 61396)
-- Name: opportunity_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.opportunity_types (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    icon character varying(50),
    is_active boolean DEFAULT true,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.opportunity_types OWNER TO postgres;

--
-- TOC entry 295 (class 1259 OID 61395)
-- Name: opportunity_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.opportunity_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.opportunity_types_id_seq OWNER TO postgres;

--
-- TOC entry 5597 (class 0 OID 0)
-- Dependencies: 295
-- Name: opportunity_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.opportunity_types_id_seq OWNED BY public.opportunity_types.id;


--
-- TOC entry 278 (class 1259 OID 50755)
-- Name: order_items; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_items (
    id integer NOT NULL,
    "orderId" integer NOT NULL,
    "productId" integer NOT NULL,
    quantity integer NOT NULL,
    price double precision NOT NULL
);


ALTER TABLE public.order_items OWNER TO postgres;

--
-- TOC entry 277 (class 1259 OID 50754)
-- Name: order_items_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.order_items ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.order_items_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 280 (class 1259 OID 50761)
-- Name: orders; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.orders (
    id integer NOT NULL,
    "createdAt" timestamp without time zone DEFAULT now() NOT NULL,
    status character varying(50) DEFAULT 'New'::character varying NOT NULL,
    "userId" integer NOT NULL,
    "stripePaymentIntentId" character varying(255)
);


ALTER TABLE public.orders OWNER TO postgres;

--
-- TOC entry 279 (class 1259 OID 50760)
-- Name: orders_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.orders ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.orders_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 239 (class 1259 OID 42404)
-- Name: paginas_colaborativas; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.paginas_colaborativas (
    id integer NOT NULL,
    proyecto_id integer,
    titulo character varying(200),
    descripcion text,
    creada_por integer,
    permisos_lectura text[],
    permisos_escritura text[],
    orden integer DEFAULT 0,
    creada_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.paginas_colaborativas OWNER TO postgres;

--
-- TOC entry 240 (class 1259 OID 42411)
-- Name: paginas_colaborativas_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.paginas_colaborativas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.paginas_colaborativas_id_seq OWNER TO postgres;

--
-- TOC entry 5598 (class 0 OID 0)
-- Dependencies: 240
-- Name: paginas_colaborativas_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.paginas_colaborativas_id_seq OWNED BY public.paginas_colaborativas.id;


--
-- TOC entry 241 (class 1259 OID 42412)
-- Name: participaciones_proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.participaciones_proyecto (
    id integer NOT NULL,
    proyecto_id integer,
    usuario_id integer,
    rol_id integer,
    estado character varying(20),
    invitado_por integer,
    fecha_invitacion timestamp without time zone DEFAULT now()
);


ALTER TABLE public.participaciones_proyecto OWNER TO postgres;

--
-- TOC entry 242 (class 1259 OID 42416)
-- Name: participaciones_proyecto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.participaciones_proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.participaciones_proyecto_id_seq OWNER TO postgres;

--
-- TOC entry 5599 (class 0 OID 0)
-- Dependencies: 242
-- Name: participaciones_proyecto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.participaciones_proyecto_id_seq OWNED BY public.participaciones_proyecto.id;


--
-- TOC entry 243 (class 1259 OID 42417)
-- Name: perfiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.perfiles (
    id integer NOT NULL,
    usuario_id integer,
    cv_url text,
    skills text,
    historial_participacion text
);


ALTER TABLE public.perfiles OWNER TO postgres;

--
-- TOC entry 244 (class 1259 OID 42422)
-- Name: perfiles_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.perfiles_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.perfiles_id_seq OWNER TO postgres;

--
-- TOC entry 5600 (class 0 OID 0)
-- Dependencies: 244
-- Name: perfiles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.perfiles_id_seq OWNED BY public.perfiles.id;


--
-- TOC entry 300 (class 1259 OID 61422)
-- Name: permission_types; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permission_types (
    id integer NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.permission_types OWNER TO postgres;

--
-- TOC entry 299 (class 1259 OID 61421)
-- Name: permission_types_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permission_types_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permission_types_id_seq OWNER TO postgres;

--
-- TOC entry 5601 (class 0 OID 0)
-- Dependencies: 299
-- Name: permission_types_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permission_types_id_seq OWNED BY public.permission_types.id;


--
-- TOC entry 245 (class 1259 OID 42423)
-- Name: postulaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.postulaciones (
    id integer NOT NULL,
    usuario_id integer,
    oportunidad_id integer,
    mensaje text,
    estado character varying(50),
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.postulaciones OWNER TO postgres;

--
-- TOC entry 246 (class 1259 OID 42429)
-- Name: postulaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.postulaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.postulaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5602 (class 0 OID 0)
-- Dependencies: 246
-- Name: postulaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.postulaciones_id_seq OWNED BY public.postulaciones.id;


--
-- TOC entry 288 (class 1259 OID 50985)
-- Name: postulaciones_laborales_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.postulaciones_laborales_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.postulaciones_laborales_id_seq OWNER TO postgres;

--
-- TOC entry 287 (class 1259 OID 50979)
-- Name: postulaciones_laborales; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.postulaciones_laborales (
    id integer DEFAULT nextval('public.postulaciones_laborales_id_seq'::regclass) NOT NULL,
    usuario_id integer,
    mensaje text,
    estado character varying(50),
    fecha timestamp without time zone DEFAULT now(),
    oferta_laboral_id integer
);


ALTER TABLE public.postulaciones_laborales OWNER TO postgres;

--
-- TOC entry 274 (class 1259 OID 42559)
-- Name: products; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.products (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    image character varying(255),
    price double precision NOT NULL
);


ALTER TABLE public.products OWNER TO postgres;

--
-- TOC entry 273 (class 1259 OID 42558)
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.products ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 306 (class 1259 OID 61458)
-- Name: project_technologies; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.project_technologies (
    id integer NOT NULL,
    proyecto_id integer NOT NULL,
    technology_name character varying(50) NOT NULL,
    proficiency_level integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT project_technologies_proficiency_level_check CHECK (((proficiency_level >= 1) AND (proficiency_level <= 5)))
);


ALTER TABLE public.project_technologies OWNER TO postgres;

--
-- TOC entry 305 (class 1259 OID 61457)
-- Name: project_technologies_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.project_technologies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.project_technologies_id_seq OWNER TO postgres;

--
-- TOC entry 5603 (class 0 OID 0)
-- Dependencies: 305
-- Name: project_technologies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.project_technologies_id_seq OWNED BY public.project_technologies.id;


--
-- TOC entry 247 (class 1259 OID 42430)
-- Name: proyectos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos (
    id integer NOT NULL,
    nombre character varying(200),
    descripcion text,
    creador_id integer,
    universidad_id integer,
    estado_verificacion character varying(50),
    vista_publica boolean DEFAULT true,
    creado_en timestamp without time zone DEFAULT now(),
    repositorio_url text,
    demo_url text,
    updated_at timestamp without time zone,
    state_id integer
);


ALTER TABLE public.proyectos OWNER TO postgres;

--
-- TOC entry 248 (class 1259 OID 42437)
-- Name: proyectos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_id_seq OWNER TO postgres;

--
-- TOC entry 5604 (class 0 OID 0)
-- Dependencies: 248
-- Name: proyectos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_id_seq OWNED BY public.proyectos.id;


--
-- TOC entry 249 (class 1259 OID 42438)
-- Name: proyectos_validaciones; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.proyectos_validaciones (
    id integer NOT NULL,
    proyecto_id integer,
    admin_id integer,
    comentarios text,
    estado character varying(50),
    fecha_validacion timestamp without time zone DEFAULT now()
);


ALTER TABLE public.proyectos_validaciones OWNER TO postgres;

--
-- TOC entry 250 (class 1259 OID 42444)
-- Name: proyectos_validaciones_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.proyectos_validaciones_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.proyectos_validaciones_id_seq OWNER TO postgres;

--
-- TOC entry 5605 (class 0 OID 0)
-- Dependencies: 250
-- Name: proyectos_validaciones_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.proyectos_validaciones_id_seq OWNED BY public.proyectos_validaciones.id;


--
-- TOC entry 283 (class 1259 OID 50899)
-- Name: relaciones_bloques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.relaciones_bloques (
    id integer NOT NULL,
    bloque_padre_id integer NOT NULL,
    bloque_hijo_id integer NOT NULL
);


ALTER TABLE public.relaciones_bloques OWNER TO postgres;

--
-- TOC entry 284 (class 1259 OID 50902)
-- Name: relaciones_bloques_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.relaciones_bloques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.relaciones_bloques_id_seq OWNER TO postgres;

--
-- TOC entry 5606 (class 0 OID 0)
-- Dependencies: 284
-- Name: relaciones_bloques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.relaciones_bloques_id_seq OWNED BY public.relaciones_bloques.id;


--
-- TOC entry 312 (class 1259 OID 61521)
-- Name: report_evidences; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.report_evidences (
    id integer NOT NULL,
    reporte_id integer NOT NULL,
    evidence_url text NOT NULL,
    evidence_type character varying(50),
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.report_evidences OWNER TO postgres;

--
-- TOC entry 311 (class 1259 OID 61520)
-- Name: report_evidences_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.report_evidences_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.report_evidences_id_seq OWNER TO postgres;

--
-- TOC entry 5607 (class 0 OID 0)
-- Dependencies: 311
-- Name: report_evidences_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.report_evidences_id_seq OWNED BY public.report_evidences.id;


--
-- TOC entry 251 (class 1259 OID 42445)
-- Name: reportes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.reportes (
    id integer NOT NULL,
    reportante_id integer,
    usuario_reportado_id integer,
    tipo_contenido character varying(100),
    contenido_id integer,
    motivo text,
    estado character varying(50),
    fecha timestamp without time zone DEFAULT now()
);


ALTER TABLE public.reportes OWNER TO postgres;

--
-- TOC entry 252 (class 1259 OID 42451)
-- Name: reportes_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.reportes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.reportes_id_seq OWNER TO postgres;

--
-- TOC entry 5608 (class 0 OID 0)
-- Dependencies: 252
-- Name: reportes_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.reportes_id_seq OWNED BY public.reportes.id;


--
-- TOC entry 253 (class 1259 OID 42452)
-- Name: respuestas_hilo; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.respuestas_hilo (
    id integer NOT NULL,
    hilo_id integer,
    usuario_id integer,
    contenido text,
    creado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.respuestas_hilo OWNER TO postgres;

--
-- TOC entry 254 (class 1259 OID 42458)
-- Name: respuestas_hilo_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.respuestas_hilo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.respuestas_hilo_id_seq OWNER TO postgres;

--
-- TOC entry 5609 (class 0 OID 0)
-- Dependencies: 254
-- Name: respuestas_hilo_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.respuestas_hilo_id_seq OWNED BY public.respuestas_hilo.id;


--
-- TOC entry 255 (class 1259 OID 42459)
-- Name: roles_proyecto; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_proyecto (
    id integer NOT NULL,
    nombre character varying(50),
    puede_editar boolean DEFAULT false,
    puede_comentar boolean DEFAULT true,
    puede_subir_archivos boolean DEFAULT false,
    puede_validar boolean DEFAULT false
);


ALTER TABLE public.roles_proyecto OWNER TO postgres;

--
-- TOC entry 256 (class 1259 OID 42466)
-- Name: roles_proyecto_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_proyecto_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_proyecto_id_seq OWNER TO postgres;

--
-- TOC entry 5610 (class 0 OID 0)
-- Dependencies: 256
-- Name: roles_proyecto_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_proyecto_id_seq OWNED BY public.roles_proyecto.id;


--
-- TOC entry 257 (class 1259 OID 42467)
-- Name: roles_usuario; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles_usuario (
    id integer NOT NULL,
    nombre character varying(50)
);


ALTER TABLE public.roles_usuario OWNER TO postgres;

--
-- TOC entry 258 (class 1259 OID 42470)
-- Name: roles_usuario_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_usuario_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_usuario_id_seq OWNER TO postgres;

--
-- TOC entry 5611 (class 0 OID 0)
-- Dependencies: 258
-- Name: roles_usuario_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_usuario_id_seq OWNED BY public.roles_usuario.id;


--
-- TOC entry 259 (class 1259 OID 42471)
-- Name: seguimientos; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.seguimientos (
    id integer NOT NULL,
    seguidor_id integer,
    seguido_usuario_id integer,
    seguido_proyecto_id integer,
    creado_en timestamp without time zone DEFAULT now(),
    CONSTRAINT seguimientos_check CHECK ((((seguido_usuario_id IS NOT NULL) AND (seguido_proyecto_id IS NULL)) OR ((seguido_usuario_id IS NULL) AND (seguido_proyecto_id IS NOT NULL))))
);


ALTER TABLE public.seguimientos OWNER TO postgres;

--
-- TOC entry 260 (class 1259 OID 42476)
-- Name: seguimientos_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.seguimientos_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.seguimientos_id_seq OWNER TO postgres;

--
-- TOC entry 5612 (class 0 OID 0)
-- Dependencies: 260
-- Name: seguimientos_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.seguimientos_id_seq OWNED BY public.seguimientos.id;


--
-- TOC entry 292 (class 1259 OID 61369)
-- Name: system_states; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.system_states (
    id integer NOT NULL,
    entity_type character varying(50) NOT NULL,
    code character varying(50) NOT NULL,
    name character varying(100) NOT NULL,
    description text,
    color character varying(7),
    is_active boolean DEFAULT true,
    sort_order integer DEFAULT 0,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.system_states OWNER TO postgres;

--
-- TOC entry 291 (class 1259 OID 61368)
-- Name: system_states_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.system_states_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.system_states_id_seq OWNER TO postgres;

--
-- TOC entry 5613 (class 0 OID 0)
-- Dependencies: 291
-- Name: system_states_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.system_states_id_seq OWNED BY public.system_states.id;


--
-- TOC entry 261 (class 1259 OID 42477)
-- Name: taggables; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.taggables (
    id integer NOT NULL,
    tag_id integer,
    objeto_id integer,
    tipo_objeto character varying(50)
);


ALTER TABLE public.taggables OWNER TO postgres;

--
-- TOC entry 262 (class 1259 OID 42480)
-- Name: taggables_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.taggables_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.taggables_id_seq OWNER TO postgres;

--
-- TOC entry 5614 (class 0 OID 0)
-- Dependencies: 262
-- Name: taggables_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.taggables_id_seq OWNED BY public.taggables.id;


--
-- TOC entry 289 (class 1259 OID 60085)
-- Name: tags; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tags (
    id integer NOT NULL,
    nombre character varying(50)
);


ALTER TABLE public.tags OWNER TO postgres;

--
-- TOC entry 290 (class 1259 OID 60088)
-- Name: tags_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tags_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tags_id_seq OWNER TO postgres;

--
-- TOC entry 5615 (class 0 OID 0)
-- Dependencies: 290
-- Name: tags_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tags_id_seq OWNED BY public.tags.id;


--
-- TOC entry 263 (class 1259 OID 42485)
-- Name: tokens_iniciales_acceso; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tokens_iniciales_acceso (
    id integer NOT NULL,
    usuario_id integer,
    token_acceso character varying(100),
    usado boolean DEFAULT false,
    generado_en timestamp without time zone DEFAULT now(),
    correo character varying(150)
);


ALTER TABLE public.tokens_iniciales_acceso OWNER TO postgres;

--
-- TOC entry 264 (class 1259 OID 42490)
-- Name: tokens_iniciales_acceso_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tokens_iniciales_acceso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tokens_iniciales_acceso_id_seq OWNER TO postgres;

--
-- TOC entry 5616 (class 0 OID 0)
-- Dependencies: 264
-- Name: tokens_iniciales_acceso_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tokens_iniciales_acceso_id_seq OWNED BY public.tokens_iniciales_acceso.id;


--
-- TOC entry 265 (class 1259 OID 42491)
-- Name: universidades; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.universidades (
    id integer NOT NULL,
    nombre character varying(150),
    dominio_correo character varying(100),
    logo_url text
);


ALTER TABLE public.universidades OWNER TO postgres;

--
-- TOC entry 266 (class 1259 OID 42496)
-- Name: universidades_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.universidades_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.universidades_id_seq OWNER TO postgres;

--
-- TOC entry 5617 (class 0 OID 0)
-- Dependencies: 266
-- Name: universidades_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.universidades_id_seq OWNED BY public.universidades.id;


--
-- TOC entry 308 (class 1259 OID 61474)
-- Name: user_skills; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_skills (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    skill_name character varying(100) NOT NULL,
    proficiency_level integer,
    created_at timestamp without time zone DEFAULT now(),
    CONSTRAINT user_skills_proficiency_level_check CHECK (((proficiency_level >= 1) AND (proficiency_level <= 5)))
);


ALTER TABLE public.user_skills OWNER TO postgres;

--
-- TOC entry 307 (class 1259 OID 61473)
-- Name: user_skills_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_skills_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_skills_id_seq OWNER TO postgres;

--
-- TOC entry 5618 (class 0 OID 0)
-- Dependencies: 307
-- Name: user_skills_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_skills_id_seq OWNED BY public.user_skills.id;


--
-- TOC entry 276 (class 1259 OID 50744)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    id integer NOT NULL,
    email character varying(255) NOT NULL,
    password character varying(255) NOT NULL,
    role character varying(255) DEFAULT 'user'::character varying NOT NULL,
    name character varying(255),
    address text
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 275 (class 1259 OID 50743)
-- Name: users_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

ALTER TABLE public.users ALTER COLUMN id ADD GENERATED ALWAYS AS IDENTITY (
    SEQUENCE NAME public.users_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- TOC entry 267 (class 1259 OID 42497)
-- Name: usuarios; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.usuarios (
    id integer NOT NULL,
    nombre character varying(100),
    correo character varying(150),
    contrasena text,
    rol_id integer,
    universidad_id integer,
    matricula character varying(50),
    telefono character varying(20),
    verificado boolean DEFAULT false,
    "debe_cambiar_contraseña" boolean DEFAULT true,
    github_url text,
    linkedin_url text,
    biografia text,
    cv_url text,
    cv_publico boolean DEFAULT false,
    creado_en timestamp without time zone DEFAULT now(),
    is_active boolean DEFAULT true,
    updated_at timestamp without time zone,
    last_login_at timestamp without time zone
);


ALTER TABLE public.usuarios OWNER TO postgres;

--
-- TOC entry 268 (class 1259 OID 42506)
-- Name: usuarios_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuarios_id_seq OWNER TO postgres;

--
-- TOC entry 5619 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuarios_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;


--
-- TOC entry 314 (class 1259 OID 61536)
-- Name: validation_documents; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.validation_documents (
    id integer NOT NULL,
    validation_id integer NOT NULL,
    document_name character varying(100) NOT NULL,
    document_url text,
    is_submitted boolean DEFAULT false,
    created_at timestamp without time zone DEFAULT now()
);


ALTER TABLE public.validation_documents OWNER TO postgres;

--
-- TOC entry 313 (class 1259 OID 61535)
-- Name: validation_documents_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.validation_documents_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.validation_documents_id_seq OWNER TO postgres;

--
-- TOC entry 5620 (class 0 OID 0)
-- Dependencies: 313
-- Name: validation_documents_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.validation_documents_id_seq OWNED BY public.validation_documents.id;


--
-- TOC entry 269 (class 1259 OID 42507)
-- Name: versiones_bloques; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.versiones_bloques (
    id integer NOT NULL,
    bloque_id integer,
    contenido jsonb,
    editado_por integer,
    editado_en timestamp without time zone DEFAULT now()
);


ALTER TABLE public.versiones_bloques OWNER TO postgres;

--
-- TOC entry 270 (class 1259 OID 42513)
-- Name: versiones_bloques_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.versiones_bloques_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.versiones_bloques_id_seq OWNER TO postgres;

--
-- TOC entry 5621 (class 0 OID 0)
-- Dependencies: 270
-- Name: versiones_bloques_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.versiones_bloques_id_seq OWNED BY public.versiones_bloques.id;


--
-- TOC entry 302 (class 1259 OID 61434)
-- Name: work_modalities; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.work_modalities (
    id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text,
    is_active boolean DEFAULT true
);


ALTER TABLE public.work_modalities OWNER TO postgres;

--
-- TOC entry 301 (class 1259 OID 61433)
-- Name: work_modalities_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.work_modalities_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.work_modalities_id_seq OWNER TO postgres;

--
-- TOC entry 5622 (class 0 OID 0)
-- Dependencies: 301
-- Name: work_modalities_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.work_modalities_id_seq OWNED BY public.work_modalities.id;


--
-- TOC entry 5133 (class 2604 OID 42553)
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- TOC entry 5078 (class 2604 OID 60057)
-- Name: actividad_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad_usuario ALTER COLUMN id SET DEFAULT nextval('public.actividad_usuario_id_seq'::regclass);


--
-- TOC entry 5080 (class 2604 OID 60058)
-- Name: asistencias_evento id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencias_evento ALTER COLUMN id SET DEFAULT nextval('public.asistencias_evento_id_seq'::regclass);


--
-- TOC entry 5137 (class 2604 OID 60059)
-- Name: bloques id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bloques ALTER COLUMN id SET DEFAULT nextval('public.bloques_id_seq'::regclass);


--
-- TOC entry 5169 (class 2604 OID 61493)
-- Name: collaborative_page_permissions id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions ALTER COLUMN id SET DEFAULT nextval('public.collaborative_page_permissions_id_seq'::regclass);


--
-- TOC entry 5156 (class 2604 OID 61412)
-- Name: content_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_types ALTER COLUMN id SET DEFAULT nextval('public.content_types_id_seq'::regclass);


--
-- TOC entry 5082 (class 2604 OID 60060)
-- Name: conversaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversaciones ALTER COLUMN id SET DEFAULT nextval('public.conversaciones_id_seq'::regclass);


--
-- TOC entry 5150 (class 2604 OID 61386)
-- Name: event_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_types ALTER COLUMN id SET DEFAULT nextval('public.event_types_id_seq'::regclass);


--
-- TOC entry 5084 (class 2604 OID 60061)
-- Name: eventos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos ALTER COLUMN id SET DEFAULT nextval('public.eventos_id_seq'::regclass);


--
-- TOC entry 5163 (class 2604 OID 61449)
-- Name: experience_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience_types ALTER COLUMN id SET DEFAULT nextval('public.experience_types_id_seq'::regclass);


--
-- TOC entry 5086 (class 2604 OID 60062)
-- Name: experiencia_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiencia_usuario ALTER COLUMN id SET DEFAULT nextval('public.experiencia_usuario_id_seq'::regclass);


--
-- TOC entry 5087 (class 2604 OID 60063)
-- Name: foros id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foros ALTER COLUMN id SET DEFAULT nextval('public.foros_id_seq'::regclass);


--
-- TOC entry 5088 (class 2604 OID 60064)
-- Name: hilos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hilos ALTER COLUMN id SET DEFAULT nextval('public.hilos_id_seq'::regclass);


--
-- TOC entry 5090 (class 2604 OID 60065)
-- Name: mensajes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes ALTER COLUMN id SET DEFAULT nextval('public.mensajes_id_seq'::regclass);


--
-- TOC entry 5093 (class 2604 OID 60066)
-- Name: oportunidades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades ALTER COLUMN id SET DEFAULT nextval('public.oportunidades_id_seq'::regclass);


--
-- TOC entry 5153 (class 2604 OID 61399)
-- Name: opportunity_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_types ALTER COLUMN id SET DEFAULT nextval('public.opportunity_types_id_seq'::regclass);


--
-- TOC entry 5095 (class 2604 OID 60067)
-- Name: paginas_colaborativas id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paginas_colaborativas ALTER COLUMN id SET DEFAULT nextval('public.paginas_colaborativas_id_seq'::regclass);


--
-- TOC entry 5098 (class 2604 OID 60068)
-- Name: participaciones_proyecto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones_proyecto ALTER COLUMN id SET DEFAULT nextval('public.participaciones_proyecto_id_seq'::regclass);


--
-- TOC entry 5100 (class 2604 OID 60069)
-- Name: perfiles id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles ALTER COLUMN id SET DEFAULT nextval('public.perfiles_id_seq'::regclass);


--
-- TOC entry 5159 (class 2604 OID 61425)
-- Name: permission_types id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_types ALTER COLUMN id SET DEFAULT nextval('public.permission_types_id_seq'::regclass);


--
-- TOC entry 5101 (class 2604 OID 60070)
-- Name: postulaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postulaciones ALTER COLUMN id SET DEFAULT nextval('public.postulaciones_id_seq'::regclass);


--
-- TOC entry 5165 (class 2604 OID 61461)
-- Name: project_technologies id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_technologies ALTER COLUMN id SET DEFAULT nextval('public.project_technologies_id_seq'::regclass);


--
-- TOC entry 5103 (class 2604 OID 60071)
-- Name: proyectos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos ALTER COLUMN id SET DEFAULT nextval('public.proyectos_id_seq'::regclass);


--
-- TOC entry 5106 (class 2604 OID 60072)
-- Name: proyectos_validaciones id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos_validaciones ALTER COLUMN id SET DEFAULT nextval('public.proyectos_validaciones_id_seq'::regclass);


--
-- TOC entry 5140 (class 2604 OID 60073)
-- Name: relaciones_bloques id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones_bloques ALTER COLUMN id SET DEFAULT nextval('public.relaciones_bloques_id_seq'::regclass);


--
-- TOC entry 5172 (class 2604 OID 61524)
-- Name: report_evidences id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_evidences ALTER COLUMN id SET DEFAULT nextval('public.report_evidences_id_seq'::regclass);


--
-- TOC entry 5108 (class 2604 OID 60074)
-- Name: reportes id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes ALTER COLUMN id SET DEFAULT nextval('public.reportes_id_seq'::regclass);


--
-- TOC entry 5110 (class 2604 OID 60075)
-- Name: respuestas_hilo id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_hilo ALTER COLUMN id SET DEFAULT nextval('public.respuestas_hilo_id_seq'::regclass);


--
-- TOC entry 5112 (class 2604 OID 60076)
-- Name: roles_proyecto id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_proyecto ALTER COLUMN id SET DEFAULT nextval('public.roles_proyecto_id_seq'::regclass);


--
-- TOC entry 5117 (class 2604 OID 60077)
-- Name: roles_usuario id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_usuario ALTER COLUMN id SET DEFAULT nextval('public.roles_usuario_id_seq'::regclass);


--
-- TOC entry 5118 (class 2604 OID 60078)
-- Name: seguimientos id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos ALTER COLUMN id SET DEFAULT nextval('public.seguimientos_id_seq'::regclass);


--
-- TOC entry 5146 (class 2604 OID 61372)
-- Name: system_states id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_states ALTER COLUMN id SET DEFAULT nextval('public.system_states_id_seq'::regclass);


--
-- TOC entry 5120 (class 2604 OID 60079)
-- Name: taggables id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggables ALTER COLUMN id SET DEFAULT nextval('public.taggables_id_seq'::regclass);


--
-- TOC entry 5145 (class 2604 OID 60089)
-- Name: tags id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags ALTER COLUMN id SET DEFAULT nextval('public.tags_id_seq'::regclass);


--
-- TOC entry 5121 (class 2604 OID 60081)
-- Name: tokens_iniciales_acceso id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens_iniciales_acceso ALTER COLUMN id SET DEFAULT nextval('public.tokens_iniciales_acceso_id_seq'::regclass);


--
-- TOC entry 5124 (class 2604 OID 60082)
-- Name: universidades id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidades ALTER COLUMN id SET DEFAULT nextval('public.universidades_id_seq'::regclass);


--
-- TOC entry 5167 (class 2604 OID 61477)
-- Name: user_skills id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills ALTER COLUMN id SET DEFAULT nextval('public.user_skills_id_seq'::regclass);


--
-- TOC entry 5125 (class 2604 OID 60083)
-- Name: usuarios id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);


--
-- TOC entry 5174 (class 2604 OID 61539)
-- Name: validation_documents id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.validation_documents ALTER COLUMN id SET DEFAULT nextval('public.validation_documents_id_seq'::regclass);


--
-- TOC entry 5131 (class 2604 OID 60084)
-- Name: versiones_bloques id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.versiones_bloques ALTER COLUMN id SET DEFAULT nextval('public.versiones_bloques_id_seq'::regclass);


--
-- TOC entry 5161 (class 2604 OID 61437)
-- Name: work_modalities id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_modalities ALTER COLUMN id SET DEFAULT nextval('public.work_modalities_id_seq'::regclass);


--
-- TOC entry 5531 (class 0 OID 42550)
-- Dependencies: 272
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: postgres
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	62be54e51befde672f7e7f320d620b198d91a9bdd9205bbaa0ca936970a37569	1752061945516
2	99966485a11c11d0d176fa221012f6ae274bd2186ad2d6155b1e36f54cfceead	1752227176631
\.


--
-- TOC entry 5480 (class 0 OID 42341)
-- Dependencies: 221
-- Data for Name: actividad_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.actividad_usuario (id, usuario_id, tipo_actividad, objeto_id, contexto, fecha) FROM stdin;
1	1	Registro en evento	1	evento	2025-07-03 17:49:12.94136
2	3	Postulación a oportunidad PRO	1	postulacion	2025-07-03 17:49:12.94136
3	4	Registro de Deja	1	postulacion	2025-07-17 02:49:39.189324
\.


--
-- TOC entry 5482 (class 0 OID 42346)
-- Dependencies: 223
-- Data for Name: asistencias_evento; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.asistencias_evento (id, evento_id, usuario_id, registrado_en) FROM stdin;
1	1	1	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5540 (class 0 OID 50878)
-- Dependencies: 281
-- Data for Name: bloques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.bloques (id, pagina_id, tipo, contenido, orden, creado_por, creado_en) FROM stdin;
1	1	texto	{"texto": "Bienvenido al proyecto"}	1	1	2025-07-13 16:19:59.996119
2	1	imagen	{"alt": "Logo", "url": "https://img.com/logo.png"}	2	1	2025-07-13 16:19:59.996119
3	1	video	{"url": "https://youtube.com/embed/123"}	1	1	2025-07-13 16:19:59.996119
\.


--
-- TOC entry 5569 (class 0 OID 61490)
-- Dependencies: 310
-- Data for Name: collaborative_page_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.collaborative_page_permissions (id, page_id, user_id, permission_type_id, granted_by, granted_at, is_active) FROM stdin;
\.


--
-- TOC entry 5557 (class 0 OID 61409)
-- Dependencies: 298
-- Data for Name: content_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.content_types (id, name, description, is_active, created_at) FROM stdin;
\.


--
-- TOC entry 5484 (class 0 OID 42359)
-- Dependencies: 225
-- Data for Name: conversaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.conversaciones (id, usuario_1_id, usuario_2_id, creado_en) FROM stdin;
1	1	2	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5553 (class 0 OID 61383)
-- Dependencies: 294
-- Data for Name: event_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.event_types (id, name, description, icon, is_active, created_at) FROM stdin;
\.


--
-- TOC entry 5486 (class 0 OID 42364)
-- Dependencies: 227
-- Data for Name: eventos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.eventos (id, titulo, descripcion, tipo, creador_id, universidad_id, fecha_inicio, fecha_fin, enlace_acceso, creado_en, event_type_id, state_id, ubicacion, capacidad_maxima, updated_at) FROM stdin;
2	Congreso de Tecnología	Evento sobre avances tecnológicos del 2025	Congreso	2	1	2025-09-15 10:00:00	2025-09-17 18:00:00	https://congreso-tec2025.com	2025-07-17 12:00:00	\N	\N	\N	\N	\N
3	Taller de Ciberseguridad	Taller práctico sobre buenas prácticas de seguridad digital	Taller	3	2	2025-10-05 09:00:00	2025-10-05 14:00:00	https://seguridaddigital.com/taller	2025-07-17 12:30:00	\N	\N	\N	\N	\N
4	qweqwe	qweqwe	aqweqw	2	1	2025-07-18 15:10:00	2025-07-19 16:10:00	www.youtube.com	2025-07-17 05:10:46.917586	\N	\N	\N	\N	\N
5	qweqweww	qweqw	eqwe	2	1	2025-07-18 17:13:00	2025-07-19 17:13:00	qweqwe.com	2025-07-17 05:14:03.063253	\N	\N	\N	\N	\N
\.


--
-- TOC entry 5563 (class 0 OID 61446)
-- Dependencies: 304
-- Data for Name: experience_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experience_types (id, name, description, is_active) FROM stdin;
\.


--
-- TOC entry 5488 (class 0 OID 42371)
-- Dependencies: 229
-- Data for Name: experiencia_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.experiencia_usuario (id, usuario_id, tipo, titulo, descripcion, fecha_inicio, fecha_fin) FROM stdin;
1	1	laboral	Backend Developer	Trabajo en proyectos Node.js	2023-01-01	2024-06-01
\.


--
-- TOC entry 5490 (class 0 OID 42377)
-- Dependencies: 231
-- Data for Name: foros; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.foros (id, nombre, descripcion) FROM stdin;
1	Foro General	Espacio para debatir ideas del sistema.
3	Otro Foro	Veamos
\.


--
-- TOC entry 5492 (class 0 OID 42383)
-- Dependencies: 233
-- Data for Name: hilos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.hilos (id, foro_id, titulo, contenido, creador_id, creado_en) FROM stdin;
1	1	Dudas sobre backend	¿Qué framework prefieren para API REST?	2	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5494 (class 0 OID 42390)
-- Dependencies: 235
-- Data for Name: mensajes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.mensajes (id, conversacion_id, emisor_id, contenido, enviado_en, leido) FROM stdin;
1	1	1	Hola Luis, revisaste el proyecto?	2025-07-03 17:49:12.94136	f
\.


--
-- TOC entry 5544 (class 0 OID 50964)
-- Dependencies: 285
-- Data for Name: ofertas_laborales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ofertas_laborales (id, logo_url, titulo, descripcion, empresa, ubicacion, tipo_contrato, salario, fecha_publicacion, fecha_limite, creado_por, estado) FROM stdin;
1	https://example.com/logos/techwave.png	Desarrollador Backend Node.js	Empresa en crecimiento busca desarrollador backend con experiencia en APIs REST y PostgreSQL.	TechWave	Remoto	Tiempo completo	$35,000 MXN	2025-07-20	2025-08-20	1	abierta
2	https://example.com/logos/biomedica.png	Analista de Datos Jr.	Responsable de procesar y analizar datos biomédicos con herramientas estadísticas.	BioMédica S.A.	Guadalajara	Medio tiempo	$18,000 MXN	2025-07-15	2025-08-01	2	abierta
3	https://example.com/logos/megacorp.png	Diseñador UX/UI	Diseñar interfaces de usuario funcionales y atractivas para aplicaciones móviles.	MegaCorp	CDMX	Freelance	$25,000 MXN	2025-07-18	2025-08-10	2	cerrada
\.


--
-- TOC entry 5496 (class 0 OID 42398)
-- Dependencies: 237
-- Data for Name: oportunidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.oportunidades (id, titulo, descripcion, tipo, universidad_id, fecha_limite, opportunity_type_id, state_id, created_by, empresa, salario_min, salario_max, modality_id, requisitos, beneficios, created_at, updated_at) FROM stdin;
1	Residencia Profesional	Proyecto de desarrollo con Angular	Proyecto	1	2025-08-01	\N	\N	\N	\N	\N	\N	\N	\N	\N	2025-07-25 19:34:25.133541	\N
\.


--
-- TOC entry 5555 (class 0 OID 61396)
-- Dependencies: 296
-- Data for Name: opportunity_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.opportunity_types (id, name, description, icon, is_active, created_at) FROM stdin;
\.


--
-- TOC entry 5537 (class 0 OID 50755)
-- Dependencies: 278
-- Data for Name: order_items; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_items (id, "orderId", "productId", quantity, price) FROM stdin;
\.


--
-- TOC entry 5539 (class 0 OID 50761)
-- Dependencies: 280
-- Data for Name: orders; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.orders (id, "createdAt", status, "userId", "stripePaymentIntentId") FROM stdin;
\.


--
-- TOC entry 5498 (class 0 OID 42404)
-- Dependencies: 239
-- Data for Name: paginas_colaborativas; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.paginas_colaborativas (id, proyecto_id, titulo, descripcion, creada_por, permisos_lectura, permisos_escritura, orden, creada_en) FROM stdin;
1	1	Documentación Inicial	Contiene los objetivos del proyecto	1	{1}	{1}	0	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5500 (class 0 OID 42412)
-- Dependencies: 241
-- Data for Name: participaciones_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.participaciones_proyecto (id, proyecto_id, usuario_id, rol_id, estado, invitado_por, fecha_invitacion) FROM stdin;
1	1	1	1	aceptado	1	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5502 (class 0 OID 42417)
-- Dependencies: 243
-- Data for Name: perfiles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.perfiles (id, usuario_id, cv_url, skills, historial_participacion) FROM stdin;
1	1	https://cv.com/ana	Node.js, PostgreSQL, Angular	Participante activa en 3 proyectos
\.


--
-- TOC entry 5559 (class 0 OID 61422)
-- Dependencies: 300
-- Data for Name: permission_types; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permission_types (id, code, name, description, created_at) FROM stdin;
\.


--
-- TOC entry 5504 (class 0 OID 42423)
-- Dependencies: 245
-- Data for Name: postulaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.postulaciones (id, usuario_id, oportunidad_id, mensaje, estado, fecha) FROM stdin;
1	2	1	Estoy interesado en ya.	pendiente	2025-07-03 17:49:12.94136
2	3	1	Angular Developes	pendiente	2025-07-17 02:34:00.83509
4	3	1	JavaScript	pendiente	2025-07-17 02:36:25.930379
\.


--
-- TOC entry 5546 (class 0 OID 50979)
-- Dependencies: 287
-- Data for Name: postulaciones_laborales; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.postulaciones_laborales (id, usuario_id, mensaje, estado, fecha, oferta_laboral_id) FROM stdin;
4	1	Estoy interesado en esta oferta y tengo experiencia previa en el área.	pendiente	2025-07-21 09:30:00	3
5	2	Me gustaría postularme, tengo disponibilidad inmediata.	aceptado	2025-07-20 14:15:00	2
6	2	He trabajado en un puesto similar antes y tengo buenas referencias.	rechazado	2025-07-19 18:45:00	1
\.


--
-- TOC entry 5533 (class 0 OID 42559)
-- Dependencies: 274
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.products (id, name, description, image, price) FROM stdin;
3	Laptop	\N	\N	999
5	Laptop	\N	\N	999
4	Celular	\N	\N	1000
6	Escritorio	\N	\N	999
\.


--
-- TOC entry 5565 (class 0 OID 61458)
-- Dependencies: 306
-- Data for Name: project_technologies; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.project_technologies (id, proyecto_id, technology_name, proficiency_level, created_at) FROM stdin;
\.


--
-- TOC entry 5506 (class 0 OID 42430)
-- Dependencies: 247
-- Data for Name: proyectos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyectos (id, nombre, descripcion, creador_id, universidad_id, estado_verificacion, vista_publica, creado_en, repositorio_url, demo_url, updated_at, state_id) FROM stdin;
1	Sistema de Gestión	Proyecto backend con Node.js y PostgreSQL	1	1	pendiente	t	2025-07-03 17:49:12.94136	\N	\N	\N	\N
\.


--
-- TOC entry 5508 (class 0 OID 42438)
-- Dependencies: 249
-- Data for Name: proyectos_validaciones; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.proyectos_validaciones (id, proyecto_id, admin_id, comentarios, estado, fecha_validacion) FROM stdin;
1	1	1	Todo correcto	validado	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5542 (class 0 OID 50899)
-- Dependencies: 283
-- Data for Name: relaciones_bloques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.relaciones_bloques (id, bloque_padre_id, bloque_hijo_id) FROM stdin;
1	1	2
2	1	2
3	1	3
\.


--
-- TOC entry 5571 (class 0 OID 61521)
-- Dependencies: 312
-- Data for Name: report_evidences; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.report_evidences (id, reporte_id, evidence_url, evidence_type, created_at) FROM stdin;
\.


--
-- TOC entry 5510 (class 0 OID 42445)
-- Dependencies: 251
-- Data for Name: reportes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.reportes (id, reportante_id, usuario_reportado_id, tipo_contenido, contenido_id, motivo, estado, fecha) FROM stdin;
1	1	2	mensaje	1	Lenguaje inapropiado	pendiente	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5512 (class 0 OID 42452)
-- Dependencies: 253
-- Data for Name: respuestas_hilo; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.respuestas_hilo (id, hilo_id, usuario_id, contenido, creado_en) FROM stdin;
1	1	1	Yo prefiero Express.js con node-postgres	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5514 (class 0 OID 42459)
-- Dependencies: 255
-- Data for Name: roles_proyecto; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_proyecto (id, nombre, puede_editar, puede_comentar, puede_subir_archivos, puede_validar) FROM stdin;
1	Líder	t	t	t	t
2	Colaborador	t	t	f	f
3	Observador	f	t	f	f
5	Jugador Veamos	f	t	t	f
\.


--
-- TOC entry 5516 (class 0 OID 42467)
-- Dependencies: 257
-- Data for Name: roles_usuario; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles_usuario (id, nombre) FROM stdin;
2	Estudiante
3	Profesor
1	Admin
7	NOOOO
8	YAAAAAAAA
9	admin_uni
\.


--
-- TOC entry 5518 (class 0 OID 42471)
-- Dependencies: 259
-- Data for Name: seguimientos; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.seguimientos (id, seguidor_id, seguido_usuario_id, seguido_proyecto_id, creado_en) FROM stdin;
1	1	2	\N	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5551 (class 0 OID 61369)
-- Dependencies: 292
-- Data for Name: system_states; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.system_states (id, entity_type, code, name, description, color, is_active, sort_order, created_at) FROM stdin;
\.


--
-- TOC entry 5520 (class 0 OID 42477)
-- Dependencies: 261
-- Data for Name: taggables; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.taggables (id, tag_id, objeto_id, tipo_objeto) FROM stdin;
1	1	1	proyecto
\.


--
-- TOC entry 5548 (class 0 OID 60085)
-- Dependencies: 289
-- Data for Name: tags; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tags (id, nombre) FROM stdin;
1	JavaScript
2	Machine Learning
3	 ASDASD
\.


--
-- TOC entry 5522 (class 0 OID 42485)
-- Dependencies: 263
-- Data for Name: tokens_iniciales_acceso; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tokens_iniciales_acceso (id, usuario_id, token_acceso, usado, generado_en, correo) FROM stdin;
1	1	abc123xyz	f	2025-07-03 17:49:12.94136	\N
\.


--
-- TOC entry 5524 (class 0 OID 42491)
-- Dependencies: 265
-- Data for Name: universidades; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.universidades (id, nombre, dominio_correo, logo_url) FROM stdin;
1	Universidad 	un.edu.mx	https://example.com/logo1.png
2	Instituto Tecnológico Vamos	it.edu.mx	https://example.com/logo2.png
\.


--
-- TOC entry 5567 (class 0 OID 61474)
-- Dependencies: 308
-- Data for Name: user_skills; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_skills (id, usuario_id, skill_name, proficiency_level, created_at) FROM stdin;
\.


--
-- TOC entry 5535 (class 0 OID 50744)
-- Dependencies: 276
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (id, email, password, role, name, address) FROM stdin;
2	jesus@gmail.com	Dio$ama135	admin	Esteban	Tijuana
3	esteban@gmail.com	$2b$10$RHzzXIZ9M8avaXIjBFVACemKKqMUIuqc4ThNO5kcwpT7N26KUEdGe	user	Jesus	Tijuana
4	esteban1@gmail.com	$2b$10$FpM9Ep0TTa1I15OTGnZzfO.4Zk9XNE0K2uQC55DOvAzCkspoo66vC	admin	Juan	Tijuana
5	elque@sea.com	$2b$10$esnLs/V.r4ADsNcWNKpjT.BIEU2YfXTUKZU21W6nWGGPg6KEnWe8.	admin_uni	Esteban	Dario Gomez
\.


--
-- TOC entry 5526 (class 0 OID 42497)
-- Dependencies: 267
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.usuarios (id, nombre, correo, contrasena, rol_id, universidad_id, matricula, telefono, verificado, "debe_cambiar_contraseña", github_url, linkedin_url, biografia, cv_url, cv_publico, creado_en, is_active, updated_at, last_login_at) FROM stdin;
1	Ana Torres	ana@un.edu.mx	hash123	2	1	A12345	555-1234	t	f	https://github.com/ana	https://linkedin.com/in/ana	Apasionada por la IA	https://cv.com/ana	t	2025-07-03 17:49:12.94136	t	\N	\N
2	Luis Pérez	luis@it.edu.mx	hash456	3	2	L67890	555-5678	f	t	https://github.com/luis	https://linkedin.com/in/luis	Especialista en redes	https://cv.com/luis	f	2025-07-03 17:49:12.94136	t	\N	\N
3	Esteban	esteban@gmail.com	$2b$10$wbg/qgmX.DTRzXCrG7B46OvidgGNo.prkwM6vRewwrdF4IWuwo2Eq	1	1	asd123	6631561542	f	t	https://	string	string	string	t	2025-07-22 20:37:46.332173	t	\N	\N
\.


--
-- TOC entry 5573 (class 0 OID 61536)
-- Dependencies: 314
-- Data for Name: validation_documents; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.validation_documents (id, validation_id, document_name, document_url, is_submitted, created_at) FROM stdin;
\.


--
-- TOC entry 5528 (class 0 OID 42507)
-- Dependencies: 269
-- Data for Name: versiones_bloques; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.versiones_bloques (id, bloque_id, contenido, editado_por, editado_en) FROM stdin;
1	1	{"texto": "Bienvenidos al proyecto actualizado"}	1	2025-07-03 17:49:12.94136
\.


--
-- TOC entry 5561 (class 0 OID 61434)
-- Dependencies: 302
-- Data for Name: work_modalities; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.work_modalities (id, name, description, is_active) FROM stdin;
\.


--
-- TOC entry 5623 (class 0 OID 0)
-- Dependencies: 271
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: postgres
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 2, true);


--
-- TOC entry 5624 (class 0 OID 0)
-- Dependencies: 222
-- Name: actividad_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.actividad_usuario_id_seq', 4, true);


--
-- TOC entry 5625 (class 0 OID 0)
-- Dependencies: 224
-- Name: asistencias_evento_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.asistencias_evento_id_seq', 1, false);


--
-- TOC entry 5626 (class 0 OID 0)
-- Dependencies: 282
-- Name: bloques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.bloques_id_seq', 3, true);


--
-- TOC entry 5627 (class 0 OID 0)
-- Dependencies: 309
-- Name: collaborative_page_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.collaborative_page_permissions_id_seq', 1, false);


--
-- TOC entry 5628 (class 0 OID 0)
-- Dependencies: 297
-- Name: content_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.content_types_id_seq', 1, false);


--
-- TOC entry 5629 (class 0 OID 0)
-- Dependencies: 226
-- Name: conversaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.conversaciones_id_seq', 1, false);


--
-- TOC entry 5630 (class 0 OID 0)
-- Dependencies: 293
-- Name: event_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.event_types_id_seq', 1, false);


--
-- TOC entry 5631 (class 0 OID 0)
-- Dependencies: 228
-- Name: eventos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.eventos_id_seq', 5, true);


--
-- TOC entry 5632 (class 0 OID 0)
-- Dependencies: 303
-- Name: experience_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experience_types_id_seq', 1, false);


--
-- TOC entry 5633 (class 0 OID 0)
-- Dependencies: 230
-- Name: experiencia_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.experiencia_usuario_id_seq', 1, false);


--
-- TOC entry 5634 (class 0 OID 0)
-- Dependencies: 232
-- Name: foros_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.foros_id_seq', 3, true);


--
-- TOC entry 5635 (class 0 OID 0)
-- Dependencies: 234
-- Name: hilos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.hilos_id_seq', 1, false);


--
-- TOC entry 5636 (class 0 OID 0)
-- Dependencies: 236
-- Name: mensajes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.mensajes_id_seq', 1, false);


--
-- TOC entry 5637 (class 0 OID 0)
-- Dependencies: 286
-- Name: ofertas_laborales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ofertas_laborales_id_seq', 3, true);


--
-- TOC entry 5638 (class 0 OID 0)
-- Dependencies: 238
-- Name: oportunidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.oportunidades_id_seq', 1, false);


--
-- TOC entry 5639 (class 0 OID 0)
-- Dependencies: 295
-- Name: opportunity_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.opportunity_types_id_seq', 1, false);


--
-- TOC entry 5640 (class 0 OID 0)
-- Dependencies: 277
-- Name: order_items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_items_id_seq', 1, false);


--
-- TOC entry 5641 (class 0 OID 0)
-- Dependencies: 279
-- Name: orders_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.orders_id_seq', 1, false);


--
-- TOC entry 5642 (class 0 OID 0)
-- Dependencies: 240
-- Name: paginas_colaborativas_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.paginas_colaborativas_id_seq', 1, false);


--
-- TOC entry 5643 (class 0 OID 0)
-- Dependencies: 242
-- Name: participaciones_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.participaciones_proyecto_id_seq', 1, false);


--
-- TOC entry 5644 (class 0 OID 0)
-- Dependencies: 244
-- Name: perfiles_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.perfiles_id_seq', 1, false);


--
-- TOC entry 5645 (class 0 OID 0)
-- Dependencies: 299
-- Name: permission_types_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permission_types_id_seq', 1, false);


--
-- TOC entry 5646 (class 0 OID 0)
-- Dependencies: 246
-- Name: postulaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.postulaciones_id_seq', 4, true);


--
-- TOC entry 5647 (class 0 OID 0)
-- Dependencies: 288
-- Name: postulaciones_laborales_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.postulaciones_laborales_id_seq', 6, true);


--
-- TOC entry 5648 (class 0 OID 0)
-- Dependencies: 273
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.products_id_seq', 6, true);


--
-- TOC entry 5649 (class 0 OID 0)
-- Dependencies: 305
-- Name: project_technologies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.project_technologies_id_seq', 1, false);


--
-- TOC entry 5650 (class 0 OID 0)
-- Dependencies: 248
-- Name: proyectos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyectos_id_seq', 1, false);


--
-- TOC entry 5651 (class 0 OID 0)
-- Dependencies: 250
-- Name: proyectos_validaciones_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.proyectos_validaciones_id_seq', 1, false);


--
-- TOC entry 5652 (class 0 OID 0)
-- Dependencies: 284
-- Name: relaciones_bloques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.relaciones_bloques_id_seq', 3, true);


--
-- TOC entry 5653 (class 0 OID 0)
-- Dependencies: 311
-- Name: report_evidences_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.report_evidences_id_seq', 1, false);


--
-- TOC entry 5654 (class 0 OID 0)
-- Dependencies: 252
-- Name: reportes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.reportes_id_seq', 1, false);


--
-- TOC entry 5655 (class 0 OID 0)
-- Dependencies: 254
-- Name: respuestas_hilo_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.respuestas_hilo_id_seq', 1, false);


--
-- TOC entry 5656 (class 0 OID 0)
-- Dependencies: 256
-- Name: roles_proyecto_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_proyecto_id_seq', 6, true);


--
-- TOC entry 5657 (class 0 OID 0)
-- Dependencies: 258
-- Name: roles_usuario_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_usuario_id_seq', 9, true);


--
-- TOC entry 5658 (class 0 OID 0)
-- Dependencies: 260
-- Name: seguimientos_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.seguimientos_id_seq', 1, false);


--
-- TOC entry 5659 (class 0 OID 0)
-- Dependencies: 291
-- Name: system_states_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.system_states_id_seq', 1, false);


--
-- TOC entry 5660 (class 0 OID 0)
-- Dependencies: 262
-- Name: taggables_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.taggables_id_seq', 1, false);


--
-- TOC entry 5661 (class 0 OID 0)
-- Dependencies: 290
-- Name: tags_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tags_id_seq', 5, true);


--
-- TOC entry 5662 (class 0 OID 0)
-- Dependencies: 264
-- Name: tokens_iniciales_acceso_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tokens_iniciales_acceso_id_seq', 1, false);


--
-- TOC entry 5663 (class 0 OID 0)
-- Dependencies: 266
-- Name: universidades_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.universidades_id_seq', 3, true);


--
-- TOC entry 5664 (class 0 OID 0)
-- Dependencies: 307
-- Name: user_skills_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_skills_id_seq', 1, false);


--
-- TOC entry 5665 (class 0 OID 0)
-- Dependencies: 275
-- Name: users_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_id_seq', 5, true);


--
-- TOC entry 5666 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuarios_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);


--
-- TOC entry 5667 (class 0 OID 0)
-- Dependencies: 313
-- Name: validation_documents_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.validation_documents_id_seq', 1, false);


--
-- TOC entry 5668 (class 0 OID 0)
-- Dependencies: 270
-- Name: versiones_bloques_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.versiones_bloques_id_seq', 1, false);


--
-- TOC entry 5669 (class 0 OID 0)
-- Dependencies: 301
-- Name: work_modalities_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.work_modalities_id_seq', 1, false);


--
-- TOC entry 5232 (class 2606 OID 42557)
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: postgres
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- TOC entry 5181 (class 2606 OID 50917)
-- Name: actividad_usuario actividad_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.actividad_usuario
    ADD CONSTRAINT actividad_usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 5183 (class 2606 OID 50919)
-- Name: asistencias_evento asistencias_evento_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.asistencias_evento
    ADD CONSTRAINT asistencias_evento_pkey PRIMARY KEY (id);


--
-- TOC entry 5244 (class 2606 OID 50888)
-- Name: bloques bloques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bloques
    ADD CONSTRAINT bloques_pkey PRIMARY KEY (id);


--
-- TOC entry 5290 (class 2606 OID 61499)
-- Name: collaborative_page_permissions collaborative_page_permission_page_id_user_id_permission_ty_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permission_page_id_user_id_permission_ty_key UNIQUE (page_id, user_id, permission_type_id);


--
-- TOC entry 5292 (class 2606 OID 61497)
-- Name: collaborative_page_permissions collaborative_page_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permissions_pkey PRIMARY KEY (id);


--
-- TOC entry 5266 (class 2606 OID 61420)
-- Name: content_types content_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_types
    ADD CONSTRAINT content_types_name_key UNIQUE (name);


--
-- TOC entry 5268 (class 2606 OID 61418)
-- Name: content_types content_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.content_types
    ADD CONSTRAINT content_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5185 (class 2606 OID 50921)
-- Name: conversaciones conversaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.conversaciones
    ADD CONSTRAINT conversaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 5258 (class 2606 OID 61394)
-- Name: event_types event_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_types
    ADD CONSTRAINT event_types_name_key UNIQUE (name);


--
-- TOC entry 5260 (class 2606 OID 61392)
-- Name: event_types event_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.event_types
    ADD CONSTRAINT event_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5187 (class 2606 OID 50923)
-- Name: eventos eventos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_pkey PRIMARY KEY (id);


--
-- TOC entry 5278 (class 2606 OID 61456)
-- Name: experience_types experience_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience_types
    ADD CONSTRAINT experience_types_name_key UNIQUE (name);


--
-- TOC entry 5280 (class 2606 OID 61454)
-- Name: experience_types experience_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experience_types
    ADD CONSTRAINT experience_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5189 (class 2606 OID 50925)
-- Name: experiencia_usuario experiencia_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.experiencia_usuario
    ADD CONSTRAINT experiencia_usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 5191 (class 2606 OID 50927)
-- Name: foros foros_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.foros
    ADD CONSTRAINT foros_pkey PRIMARY KEY (id);


--
-- TOC entry 5193 (class 2606 OID 50929)
-- Name: hilos hilos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.hilos
    ADD CONSTRAINT hilos_pkey PRIMARY KEY (id);


--
-- TOC entry 5195 (class 2606 OID 50931)
-- Name: mensajes mensajes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.mensajes
    ADD CONSTRAINT mensajes_pkey PRIMARY KEY (id);


--
-- TOC entry 5248 (class 2606 OID 50973)
-- Name: ofertas_laborales ofertas_laborales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas_laborales
    ADD CONSTRAINT ofertas_laborales_pkey PRIMARY KEY (id);


--
-- TOC entry 5197 (class 2606 OID 50933)
-- Name: oportunidades oportunidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades
    ADD CONSTRAINT oportunidades_pkey PRIMARY KEY (id);


--
-- TOC entry 5262 (class 2606 OID 61407)
-- Name: opportunity_types opportunity_types_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_types
    ADD CONSTRAINT opportunity_types_name_key UNIQUE (name);


--
-- TOC entry 5264 (class 2606 OID 61405)
-- Name: opportunity_types opportunity_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.opportunity_types
    ADD CONSTRAINT opportunity_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5240 (class 2606 OID 50759)
-- Name: order_items order_items_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT order_items_pkey PRIMARY KEY (id);


--
-- TOC entry 5242 (class 2606 OID 50767)
-- Name: orders orders_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);


--
-- TOC entry 5199 (class 2606 OID 50877)
-- Name: paginas_colaborativas paginas_colaborativas_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.paginas_colaborativas
    ADD CONSTRAINT paginas_colaborativas_pkey PRIMARY KEY (id);


--
-- TOC entry 5201 (class 2606 OID 50935)
-- Name: participaciones_proyecto participaciones_proyecto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.participaciones_proyecto
    ADD CONSTRAINT participaciones_proyecto_pkey PRIMARY KEY (id);


--
-- TOC entry 5203 (class 2606 OID 50937)
-- Name: perfiles perfiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.perfiles
    ADD CONSTRAINT perfiles_pkey PRIMARY KEY (id);


--
-- TOC entry 5270 (class 2606 OID 61432)
-- Name: permission_types permission_types_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_types
    ADD CONSTRAINT permission_types_code_key UNIQUE (code);


--
-- TOC entry 5272 (class 2606 OID 61430)
-- Name: permission_types permission_types_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permission_types
    ADD CONSTRAINT permission_types_pkey PRIMARY KEY (id);


--
-- TOC entry 5250 (class 2606 OID 50988)
-- Name: postulaciones_laborales postulaciones_laborales_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postulaciones_laborales
    ADD CONSTRAINT postulaciones_laborales_pkey PRIMARY KEY (id);


--
-- TOC entry 5205 (class 2606 OID 50939)
-- Name: postulaciones postulaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postulaciones
    ADD CONSTRAINT postulaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 5234 (class 2606 OID 42565)
-- Name: products products_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (id);


--
-- TOC entry 5282 (class 2606 OID 61465)
-- Name: project_technologies project_technologies_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_technologies
    ADD CONSTRAINT project_technologies_pkey PRIMARY KEY (id);


--
-- TOC entry 5284 (class 2606 OID 61467)
-- Name: project_technologies project_technologies_proyecto_id_technology_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_technologies
    ADD CONSTRAINT project_technologies_proyecto_id_technology_name_key UNIQUE (proyecto_id, technology_name);


--
-- TOC entry 5207 (class 2606 OID 50941)
-- Name: proyectos proyectos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_pkey PRIMARY KEY (id);


--
-- TOC entry 5209 (class 2606 OID 50943)
-- Name: proyectos_validaciones proyectos_validaciones_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos_validaciones
    ADD CONSTRAINT proyectos_validaciones_pkey PRIMARY KEY (id);


--
-- TOC entry 5246 (class 2606 OID 50905)
-- Name: relaciones_bloques relaciones_bloques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones_bloques
    ADD CONSTRAINT relaciones_bloques_pkey PRIMARY KEY (id);


--
-- TOC entry 5294 (class 2606 OID 61529)
-- Name: report_evidences report_evidences_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_evidences
    ADD CONSTRAINT report_evidences_pkey PRIMARY KEY (id);


--
-- TOC entry 5211 (class 2606 OID 50945)
-- Name: reportes reportes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.reportes
    ADD CONSTRAINT reportes_pkey PRIMARY KEY (id);


--
-- TOC entry 5213 (class 2606 OID 50947)
-- Name: respuestas_hilo respuestas_hilo_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.respuestas_hilo
    ADD CONSTRAINT respuestas_hilo_pkey PRIMARY KEY (id);


--
-- TOC entry 5215 (class 2606 OID 50949)
-- Name: roles_proyecto roles_proyecto_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_proyecto
    ADD CONSTRAINT roles_proyecto_pkey PRIMARY KEY (id);


--
-- TOC entry 5217 (class 2606 OID 50951)
-- Name: roles_usuario roles_usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles_usuario
    ADD CONSTRAINT roles_usuario_pkey PRIMARY KEY (id);


--
-- TOC entry 5219 (class 2606 OID 50953)
-- Name: seguimientos seguimientos_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.seguimientos
    ADD CONSTRAINT seguimientos_pkey PRIMARY KEY (id);


--
-- TOC entry 5254 (class 2606 OID 61381)
-- Name: system_states system_states_entity_type_code_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_states
    ADD CONSTRAINT system_states_entity_type_code_key UNIQUE (entity_type, code);


--
-- TOC entry 5256 (class 2606 OID 61379)
-- Name: system_states system_states_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.system_states
    ADD CONSTRAINT system_states_pkey PRIMARY KEY (id);


--
-- TOC entry 5221 (class 2606 OID 50955)
-- Name: taggables taggables_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.taggables
    ADD CONSTRAINT taggables_pkey PRIMARY KEY (id);


--
-- TOC entry 5252 (class 2606 OID 60091)
-- Name: tags tags_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tags
    ADD CONSTRAINT tags_pkey PRIMARY KEY (id);


--
-- TOC entry 5223 (class 2606 OID 50959)
-- Name: tokens_iniciales_acceso tokens_iniciales_acceso_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tokens_iniciales_acceso
    ADD CONSTRAINT tokens_iniciales_acceso_pkey PRIMARY KEY (id);


--
-- TOC entry 5226 (class 2606 OID 50961)
-- Name: universidades universidades_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.universidades
    ADD CONSTRAINT universidades_pkey PRIMARY KEY (id);


--
-- TOC entry 5286 (class 2606 OID 61481)
-- Name: user_skills user_skills_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_pkey PRIMARY KEY (id);


--
-- TOC entry 5288 (class 2606 OID 61483)
-- Name: user_skills user_skills_usuario_id_skill_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_usuario_id_skill_name_key UNIQUE (usuario_id, skill_name);


--
-- TOC entry 5236 (class 2606 OID 50753)
-- Name: users users_email_unique; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_unique UNIQUE (email);


--
-- TOC entry 5238 (class 2606 OID 50751)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);


--
-- TOC entry 5228 (class 2606 OID 50859)
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);


--
-- TOC entry 5296 (class 2606 OID 61545)
-- Name: validation_documents validation_documents_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.validation_documents
    ADD CONSTRAINT validation_documents_pkey PRIMARY KEY (id);


--
-- TOC entry 5230 (class 2606 OID 50963)
-- Name: versiones_bloques versiones_bloques_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.versiones_bloques
    ADD CONSTRAINT versiones_bloques_pkey PRIMARY KEY (id);


--
-- TOC entry 5274 (class 2606 OID 61444)
-- Name: work_modalities work_modalities_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_modalities
    ADD CONSTRAINT work_modalities_name_key UNIQUE (name);


--
-- TOC entry 5276 (class 2606 OID 61442)
-- Name: work_modalities work_modalities_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.work_modalities
    ADD CONSTRAINT work_modalities_pkey PRIMARY KEY (id);


--
-- TOC entry 5224 (class 1259 OID 51147)
-- Name: unique_token_por_correo; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX unique_token_por_correo ON public.tokens_iniciales_acceso USING btree (correo) WHERE (usado = false);


--
-- TOC entry 5334 (class 2620 OID 61594)
-- Name: bloques trg_update_bloques; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_bloques BEFORE UPDATE ON public.bloques FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5324 (class 2620 OID 61591)
-- Name: eventos trg_update_eventos; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_eventos BEFORE UPDATE ON public.eventos FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5325 (class 2620 OID 61596)
-- Name: foros trg_update_foros; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_foros BEFORE UPDATE ON public.foros FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5326 (class 2620 OID 61595)
-- Name: hilos trg_update_hilos; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_hilos BEFORE UPDATE ON public.hilos FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5327 (class 2620 OID 61592)
-- Name: oportunidades trg_update_oportunidades; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_oportunidades BEFORE UPDATE ON public.oportunidades FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5328 (class 2620 OID 61597)
-- Name: paginas_colaborativas trg_update_paginas; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_paginas BEFORE UPDATE ON public.paginas_colaborativas FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5329 (class 2620 OID 61598)
-- Name: perfiles trg_update_perfiles; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_perfiles BEFORE UPDATE ON public.perfiles FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5330 (class 2620 OID 61593)
-- Name: postulaciones trg_update_postulaciones; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_postulaciones BEFORE UPDATE ON public.postulaciones FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5331 (class 2620 OID 61590)
-- Name: proyectos trg_update_proyectos; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_proyectos BEFORE UPDATE ON public.proyectos FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5332 (class 2620 OID 61599)
-- Name: roles_usuario trg_update_roles_usuario; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_roles_usuario BEFORE UPDATE ON public.roles_usuario FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5333 (class 2620 OID 61589)
-- Name: usuarios trg_update_usuarios; Type: TRIGGER; Schema: public; Owner: postgres
--

CREATE TRIGGER trg_update_usuarios BEFORE UPDATE ON public.usuarios FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- TOC entry 5309 (class 2606 OID 50889)
-- Name: bloques bloques_creado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bloques
    ADD CONSTRAINT bloques_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.usuarios(id);


--
-- TOC entry 5310 (class 2606 OID 50894)
-- Name: bloques bloques_pagina_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.bloques
    ADD CONSTRAINT bloques_pagina_id_fkey FOREIGN KEY (pagina_id) REFERENCES public.paginas_colaborativas(id);


--
-- TOC entry 5318 (class 2606 OID 61515)
-- Name: collaborative_page_permissions collaborative_page_permissions_granted_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permissions_granted_by_fkey FOREIGN KEY (granted_by) REFERENCES public.usuarios(id);


--
-- TOC entry 5319 (class 2606 OID 61500)
-- Name: collaborative_page_permissions collaborative_page_permissions_page_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permissions_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.paginas_colaborativas(id) ON DELETE CASCADE;


--
-- TOC entry 5320 (class 2606 OID 61510)
-- Name: collaborative_page_permissions collaborative_page_permissions_permission_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permissions_permission_type_id_fkey FOREIGN KEY (permission_type_id) REFERENCES public.permission_types(id);


--
-- TOC entry 5321 (class 2606 OID 61505)
-- Name: collaborative_page_permissions collaborative_page_permissions_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.collaborative_page_permissions
    ADD CONSTRAINT collaborative_page_permissions_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 5297 (class 2606 OID 61557)
-- Name: eventos eventos_event_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_event_type_id_fkey FOREIGN KEY (event_type_id) REFERENCES public.event_types(id);


--
-- TOC entry 5298 (class 2606 OID 61562)
-- Name: eventos eventos_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.eventos
    ADD CONSTRAINT eventos_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.system_states(id);


--
-- TOC entry 5313 (class 2606 OID 50974)
-- Name: ofertas_laborales ofertas_laborales_creado_por_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ofertas_laborales
    ADD CONSTRAINT ofertas_laborales_creado_por_fkey FOREIGN KEY (creado_por) REFERENCES public.usuarios(id);


--
-- TOC entry 5299 (class 2606 OID 61577)
-- Name: oportunidades oportunidades_created_by_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades
    ADD CONSTRAINT oportunidades_created_by_fkey FOREIGN KEY (created_by) REFERENCES public.usuarios(id);


--
-- TOC entry 5300 (class 2606 OID 61582)
-- Name: oportunidades oportunidades_modality_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades
    ADD CONSTRAINT oportunidades_modality_id_fkey FOREIGN KEY (modality_id) REFERENCES public.work_modalities(id);


--
-- TOC entry 5301 (class 2606 OID 61567)
-- Name: oportunidades oportunidades_opportunity_type_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades
    ADD CONSTRAINT oportunidades_opportunity_type_id_fkey FOREIGN KEY (opportunity_type_id) REFERENCES public.opportunity_types(id);


--
-- TOC entry 5302 (class 2606 OID 61572)
-- Name: oportunidades oportunidades_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.oportunidades
    ADD CONSTRAINT oportunidades_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.system_states(id);


--
-- TOC entry 5306 (class 2606 OID 50768)
-- Name: order_items order_items_orderId_orders_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES public.orders(id);


--
-- TOC entry 5307 (class 2606 OID 50773)
-- Name: order_items order_items_productId_products_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_items
    ADD CONSTRAINT "order_items_productId_products_id_fk" FOREIGN KEY ("productId") REFERENCES public.products(id);


--
-- TOC entry 5308 (class 2606 OID 50778)
-- Name: orders orders_userId_users_id_fk; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT "orders_userId_users_id_fk" FOREIGN KEY ("userId") REFERENCES public.users(id);


--
-- TOC entry 5314 (class 2606 OID 50994)
-- Name: postulaciones_laborales postulaciones_laborales_oferta_laboral_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postulaciones_laborales
    ADD CONSTRAINT postulaciones_laborales_oferta_laboral_id_fkey FOREIGN KEY (oferta_laboral_id) REFERENCES public.ofertas_laborales(id);


--
-- TOC entry 5315 (class 2606 OID 50989)
-- Name: postulaciones_laborales postulaciones_laborales_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.postulaciones_laborales
    ADD CONSTRAINT postulaciones_laborales_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);


--
-- TOC entry 5316 (class 2606 OID 61468)
-- Name: project_technologies project_technologies_proyecto_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.project_technologies
    ADD CONSTRAINT project_technologies_proyecto_id_fkey FOREIGN KEY (proyecto_id) REFERENCES public.proyectos(id) ON DELETE CASCADE;


--
-- TOC entry 5303 (class 2606 OID 61552)
-- Name: proyectos proyectos_state_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.proyectos
    ADD CONSTRAINT proyectos_state_id_fkey FOREIGN KEY (state_id) REFERENCES public.system_states(id);


--
-- TOC entry 5311 (class 2606 OID 50911)
-- Name: relaciones_bloques relaciones_bloques_hijo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones_bloques
    ADD CONSTRAINT relaciones_bloques_hijo_fkey FOREIGN KEY (bloque_hijo_id) REFERENCES public.bloques(id);


--
-- TOC entry 5312 (class 2606 OID 50906)
-- Name: relaciones_bloques relaciones_bloques_padre_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.relaciones_bloques
    ADD CONSTRAINT relaciones_bloques_padre_fkey FOREIGN KEY (bloque_padre_id) REFERENCES public.bloques(id);


--
-- TOC entry 5322 (class 2606 OID 61530)
-- Name: report_evidences report_evidences_reporte_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.report_evidences
    ADD CONSTRAINT report_evidences_reporte_id_fkey FOREIGN KEY (reporte_id) REFERENCES public.reportes(id) ON DELETE CASCADE;


--
-- TOC entry 5317 (class 2606 OID 61484)
-- Name: user_skills user_skills_usuario_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_skills
    ADD CONSTRAINT user_skills_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id) ON DELETE CASCADE;


--
-- TOC entry 5304 (class 2606 OID 51148)
-- Name: usuarios usuarios_rol_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_rol_id_fkey FOREIGN KEY (rol_id) REFERENCES public.roles_usuario(id);


--
-- TOC entry 5305 (class 2606 OID 51153)
-- Name: usuarios usuarios_universidad_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_universidad_id_fkey FOREIGN KEY (universidad_id) REFERENCES public.universidades(id);


--
-- TOC entry 5323 (class 2606 OID 61546)
-- Name: validation_documents validation_documents_validation_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.validation_documents
    ADD CONSTRAINT validation_documents_validation_id_fkey FOREIGN KEY (validation_id) REFERENCES public.proyectos_validaciones(id) ON DELETE CASCADE;


-- Completed on 2025-07-25 20:12:45

--
-- PostgreSQL database dump complete
--

