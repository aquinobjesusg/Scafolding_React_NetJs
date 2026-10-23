--
-- PostgreSQL database dump
--

\restrict vKML0CUa819y7ihvTqwyGLuAWrpf8472e0kwbozx5YbNLlQlzgBwaRegxevsPoU

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 17.6

-- Started on 2026-09-24 12:56:45

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
-- TOC entry 273 (class 1255 OID 99724)
-- Name: calcular_edad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.calcular_edad(p_id_usuario integer DEFAULT 0, OUT v_edad integer) RETURNS integer
    LANGUAGE sql STABLE PARALLEL RESTRICTED
    AS $$
    -- Calcula la edad en años a partir de la fecha de nacimiento.
    -- Si no existe el usuario, devuelve NULL (mejor que 0).
   SELECT COALESCE(
    (SELECT EXTRACT(YEAR FROM age(CURRENT_DATE, fecha_nacimiento_titular))::integer
     FROM public.paciente WHERE id_titular = p_id_usuario),
    0
);
$$;


ALTER FUNCTION public.calcular_edad(p_id_usuario integer, OUT v_edad integer) OWNER TO admin;

--
-- TOC entry 274 (class 1255 OID 99725)
-- Name: ver_activo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_activo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT activo.nombre FROM activo WHERE activo.id = p_id_usuario;$$;


ALTER FUNCTION public.ver_activo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 292 (class 1255 OID 106508)
-- Name: ver_ente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ente.siglas_ente FROM ente WHERE ente.id_ente = p_id_usuario;$$;


ALTER FUNCTION public.ver_ente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 275 (class 1255 OID 99726)
-- Name: ver_especialidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_especialidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT especialidad.nombre_especialidad FROM especialidad WHERE especialidad.id_especialidad = p_id_usuario;$$;


ALTER FUNCTION public.ver_especialidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 276 (class 1255 OID 99727)
-- Name: ver_estado_cita(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_estado_cita(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_cita.descripción_estado FROM estado_cita WHERE estado_cita.id_estado = p_id_usuario$$;


ALTER FUNCTION public.ver_estado_cita(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 301 (class 1255 OID 106511)
-- Name: ver_estado_pais(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_estado_pais(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE estado_venezuela.id_estado_pais = p_id_usuario$$;


ALTER FUNCTION public.ver_estado_pais(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 277 (class 1255 OID 99728)
-- Name: ver_medico(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_medico(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT medico.nombre_medico FROM medico WHERE medico.id_medico = p_id_usuario$$;


ALTER FUNCTION public.ver_medico(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 278 (class 1255 OID 99729)
-- Name: ver_modulo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_modulo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT modulos.nombre_modulos FROM modulos WHERE modulos.id_modulos = p_id_usuario$$;


ALTER FUNCTION public.ver_modulo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 279 (class 1255 OID 99730)
-- Name: ver_motivo_consulta(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_motivo_consulta(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT motivo_consulta.nombre_motivo_consulta  FROM motivo_consulta WHERE motivo_consulta.id_motivo_consulta = p_id_usuario;$$;


ALTER FUNCTION public.ver_motivo_consulta(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 280 (class 1255 OID 99731)
-- Name: ver_nacionalidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_nacionalidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.nombre_nacionalidad FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;


ALTER FUNCTION public.ver_nacionalidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 281 (class 1255 OID 99732)
-- Name: ver_nacionalidada(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_nacionalidada(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.abreviatura FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;


ALTER FUNCTION public.ver_nacionalidada(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 282 (class 1255 OID 99733)
-- Name: ver_paciente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_nacionalidada(paciente.id_nacionalidad) || ' ' || paciente.cedula_titular || ' '  || paciente.nombre_titular || ' '  || paciente.apellido_titular  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 293 (class 1255 OID 106509)
-- Name: ver_paciente_ente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_ente(paciente.id_ente)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_ente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 303 (class 1255 OID 106521)
-- Name: ver_paciente_estado(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_estado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_estado_pais(paciente.id_estado_pais)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_estado(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 304 (class 1255 OID 106522)
-- Name: ver_paciente_universidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_universidad(paciente.id_universidad)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_universidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 287 (class 1255 OID 100170)
-- Name: ver_parentesco(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_parentesco(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT parentesco.nombre_parentesco FROM parentesco WHERE parentesco.id_parentesco = p_id_usuario;$$;


ALTER FUNCTION public.ver_parentesco(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 283 (class 1255 OID 99734)
-- Name: ver_rol(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_rol(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT rol.nombre FROM rol WHERE rol.id_rol = p_id_usuario$$;


ALTER FUNCTION public.ver_rol(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 284 (class 1255 OID 99735)
-- Name: ver_sexo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_sexo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT sexo.sexo FROM sexo WHERE sexo.id_sexo = p_id_usuario$$;


ALTER FUNCTION public.ver_sexo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 285 (class 1255 OID 99736)
-- Name: ver_tipo_de_empleado(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_tipo_de_empleado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT tipo_de_empleado.nombre_tipo_de_empleado FROM tipo_de_empleado WHERE tipo_de_empleado.id_tipo_de_empleado = p_id_usuario$$;


ALTER FUNCTION public.ver_tipo_de_empleado(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 302 (class 1255 OID 106519)
-- Name: ver_universidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT universidad.nombre_universidad FROM universidad WHERE universidad.id_universidad = p_id_usuario$$;


ALTER FUNCTION public.ver_universidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 286 (class 1255 OID 99737)
-- Name: ver_usuario(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_usuario(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT usuario.correo FROM usuario WHERE usuario.id_usuario = p_id_usuario;$$;


ALTER FUNCTION public.ver_usuario(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 215 (class 1259 OID 99738)
-- Name: activo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.activo (
    id integer NOT NULL,
    nombre character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.activo OWNER TO admin;

--
-- TOC entry 216 (class 1259 OID 99742)
-- Name: bd_condicion; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bd_condicion (
    id integer NOT NULL,
    condicion character varying(300) DEFAULT NULL::character varying
);


ALTER TABLE public.bd_condicion OWNER TO admin;

--
-- TOC entry 217 (class 1259 OID 99746)
-- Name: bd_datos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bd_datos (
    id integer NOT NULL,
    cedula character varying(300) DEFAULT NULL::character varying,
    nombre character varying(300) DEFAULT NULL::character varying,
    apellido character varying(300) DEFAULT NULL::character varying,
    id_departamento integer,
    id_condicion integer,
    id_tipopersonal integer,
    id_ente integer
);


ALTER TABLE public.bd_datos OWNER TO admin;

--
-- TOC entry 218 (class 1259 OID 99754)
-- Name: bd_departamento; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bd_departamento (
    id integer NOT NULL,
    departamento character varying(300),
    id_institucion integer
);


ALTER TABLE public.bd_departamento OWNER TO admin;

--
-- TOC entry 219 (class 1259 OID 99757)
-- Name: bd_institucion; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bd_institucion (
    id integer NOT NULL,
    institucion character varying(300) DEFAULT NULL::character varying
);


ALTER TABLE public.bd_institucion OWNER TO admin;

--
-- TOC entry 220 (class 1259 OID 99761)
-- Name: bd_tipopersonal; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.bd_tipopersonal (
    id integer NOT NULL,
    personal character varying(300) DEFAULT NULL::character varying
);


ALTER TABLE public.bd_tipopersonal OWNER TO admin;

--
-- TOC entry 272 (class 1259 OID 114747)
-- Name: carga_masiva; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.carga_masiva (
    id_carga_masiva integer NOT NULL,
    id_usuario integer,
    fecha_carga_hora timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    nombre_archivo_seleccionado character varying(255),
    cedula_beneficiario_ref character varying(255),
    numero_1 character varying(255),
    universidad_institucion character varying(255),
    numero_2 character varying(255),
    cedula_titular character varying(255),
    apellidos character varying(255),
    nombres character varying(255),
    cedula_beneficiario character varying(255),
    parentesco character varying(255) DEFAULT NULL::character varying,
    sexo character varying(255) DEFAULT NULL::character varying,
    fecha_nacimiento character varying(255),
    edad character varying(255),
    telefono_1 character varying(255),
    correo character varying(255) DEFAULT NULL::character varying,
    cargo character varying(255),
    id_log_archivo integer,
    campo15 character varying(255) DEFAULT NULL::character varying,
    campo16 character varying(255) DEFAULT NULL::character varying
);


ALTER TABLE public.carga_masiva OWNER TO admin;

--
-- TOC entry 271 (class 1259 OID 114746)
-- Name: carga_masiva_id_carga_masiva_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.carga_masiva_id_carga_masiva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carga_masiva_id_carga_masiva_seq OWNER TO admin;

--
-- TOC entry 3805 (class 0 OID 0)
-- Dependencies: 271
-- Name: carga_masiva_id_carga_masiva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.carga_masiva_id_carga_masiva_seq OWNED BY public.carga_masiva.id_carga_masiva;


--
-- TOC entry 221 (class 1259 OID 99765)
-- Name: cita; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.cita (
    id_cita integer NOT NULL,
    id_titular integer,
    id_paciente integer,
    fecha_de_registro information_schema.time_stamp,
    fecha_de_cita date,
    id_especialidad integer,
    id_usuario integer,
    id_medico integer,
    observacion character varying(250),
    id_estado_cita integer,
    id_motivo_consulta integer,
    id_autorizacion_usuario integer DEFAULT 0
);


ALTER TABLE public.cita OWNER TO admin;

--
-- TOC entry 3806 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE cita; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.cita IS 'tabla que muestra la siguiente consulta de los pacientes';


--
-- TOC entry 3807 (class 0 OID 0)
-- Dependencies: 221
-- Name: COLUMN cita.observacion; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON COLUMN public.cita.observacion IS 'para dar una descripción y motivo dela cita';


--
-- TOC entry 222 (class 1259 OID 99768)
-- Name: cita_id_cita_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.cita_id_cita_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cita_id_cita_seq OWNER TO admin;

--
-- TOC entry 3808 (class 0 OID 0)
-- Dependencies: 222
-- Name: cita_id_cita_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.cita_id_cita_seq OWNED BY public.cita.id_cita;


--
-- TOC entry 223 (class 1259 OID 99769)
-- Name: coordinacion; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.coordinacion (
    id_coordinacion integer NOT NULL,
    nom_coordinacion character varying(255) NOT NULL,
    siglas_coordinacion character varying(20),
    id_direccion_linea integer NOT NULL,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.coordinacion OWNER TO admin;

--
-- TOC entry 224 (class 1259 OID 99772)
-- Name: coordinacion_id_coordinacion_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.coordinacion_id_coordinacion_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.coordinacion_id_coordinacion_seq OWNER TO admin;

--
-- TOC entry 3809 (class 0 OID 0)
-- Dependencies: 224
-- Name: coordinacion_id_coordinacion_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.coordinacion_id_coordinacion_seq OWNED BY public.coordinacion.id_coordinacion;


--
-- TOC entry 225 (class 1259 OID 99773)
-- Name: direccion_general; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.direccion_general (
    id_direccion_general integer NOT NULL,
    nom_direccion_general character varying(255) NOT NULL,
    siglas_direccion_general character varying(20),
    ubicacion_direccion_general character varying(255),
    id_ente integer NOT NULL,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.direccion_general OWNER TO admin;

--
-- TOC entry 226 (class 1259 OID 99778)
-- Name: direccion_general_id_direccion_general_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.direccion_general_id_direccion_general_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.direccion_general_id_direccion_general_seq OWNER TO admin;

--
-- TOC entry 3810 (class 0 OID 0)
-- Dependencies: 226
-- Name: direccion_general_id_direccion_general_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.direccion_general_id_direccion_general_seq OWNED BY public.direccion_general.id_direccion_general;


--
-- TOC entry 227 (class 1259 OID 99779)
-- Name: direccion_linea; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.direccion_linea (
    id_direccion_linea integer NOT NULL,
    nom_direccion_linea character varying(255) NOT NULL,
    siglas_direccion_linea character varying(20),
    id_direccion_general integer NOT NULL,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.direccion_linea OWNER TO admin;

--
-- TOC entry 228 (class 1259 OID 99782)
-- Name: direccion_linea_id_direccion_linea_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.direccion_linea_id_direccion_linea_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.direccion_linea_id_direccion_linea_seq OWNER TO admin;

--
-- TOC entry 3811 (class 0 OID 0)
-- Dependencies: 228
-- Name: direccion_linea_id_direccion_linea_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.direccion_linea_id_direccion_linea_seq OWNED BY public.direccion_linea.id_direccion_linea;


--
-- TOC entry 229 (class 1259 OID 99783)
-- Name: ente; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.ente (
    id_ente integer NOT NULL,
    nom_ente character varying(255),
    siglas_ente character varying(20),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.ente OWNER TO admin;

--
-- TOC entry 230 (class 1259 OID 99786)
-- Name: ente_id_ente_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.ente_id_ente_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.ente_id_ente_seq OWNER TO admin;

--
-- TOC entry 3812 (class 0 OID 0)
-- Dependencies: 230
-- Name: ente_id_ente_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.ente_id_ente_seq OWNED BY public.ente.id_ente;


--
-- TOC entry 231 (class 1259 OID 99787)
-- Name: especialidad; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.especialidad (
    id_especialidad integer NOT NULL,
    nombre_especialidad character varying(255),
    turno_manana integer DEFAULT 0 NOT NULL,
    turno_tarde integer DEFAULT 0 NOT NULL,
    "ubicación" character varying,
    in_activo integer DEFAULT 1 NOT NULL,
    siglas character varying(255)
);


ALTER TABLE public.especialidad OWNER TO admin;

--
-- TOC entry 3813 (class 0 OID 0)
-- Dependencies: 231
-- Name: TABLE especialidad; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.especialidad IS 'tabla que muestra los servicios  del DAS';


--
-- TOC entry 232 (class 1259 OID 99795)
-- Name: especialidad_id_especialidad_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.especialidad_id_especialidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.especialidad_id_especialidad_seq OWNER TO admin;

--
-- TOC entry 3814 (class 0 OID 0)
-- Dependencies: 232
-- Name: especialidad_id_especialidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.especialidad_id_especialidad_seq OWNED BY public.especialidad.id_especialidad;


--
-- TOC entry 233 (class 1259 OID 99796)
-- Name: estado_venezuela; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.estado_venezuela (
    id_estado_pais integer NOT NULL,
    nombre_estado_pais character varying(250),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.estado_venezuela OWNER TO admin;

--
-- TOC entry 3815 (class 0 OID 0)
-- Dependencies: 233
-- Name: TABLE estado_venezuela; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.estado_venezuela IS 'los estados de venezuela de donde vienen los pacientes';


--
-- TOC entry 234 (class 1259 OID 99799)
-- Name: estado_Venezuela_id_estado_pais_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public."estado_Venezuela_id_estado_pais_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public."estado_Venezuela_id_estado_pais_seq" OWNER TO admin;

--
-- TOC entry 3816 (class 0 OID 0)
-- Dependencies: 234
-- Name: estado_Venezuela_id_estado_pais_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public."estado_Venezuela_id_estado_pais_seq" OWNED BY public.estado_venezuela.id_estado_pais;


--
-- TOC entry 235 (class 1259 OID 99800)
-- Name: estado_cita; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.estado_cita (
    id_estado integer NOT NULL,
    "descripción_estado" character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.estado_cita OWNER TO admin;

--
-- TOC entry 3817 (class 0 OID 0)
-- Dependencies: 235
-- Name: TABLE estado_cita; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.estado_cita IS 'tabla para tener un control de citas(pendientes/listas)';


--
-- TOC entry 236 (class 1259 OID 99803)
-- Name: etario; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.etario (
    id_etario integer NOT NULL,
    nombre_etario character varying(255),
    desde integer DEFAULT 0,
    hasta integer DEFAULT 0,
    in_activo integer DEFAULT 1 NOT NULL
);


ALTER TABLE public.etario OWNER TO admin;

--
-- TOC entry 237 (class 1259 OID 99809)
-- Name: etario_id_etario_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.etario_id_etario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.etario_id_etario_seq OWNER TO admin;

--
-- TOC entry 3818 (class 0 OID 0)
-- Dependencies: 237
-- Name: etario_id_etario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.etario_id_etario_seq OWNED BY public.etario.id_etario;


--
-- TOC entry 238 (class 1259 OID 99810)
-- Name: historial; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.historial (
    id_historial integer NOT NULL,
    fecha_registro date,
    id_titular integer,
    id_beneficiario integer,
    id_universidad integer,
    id_ente integer,
    id_medico integer,
    motivo character varying(255),
    traslado character varying(255),
    observaciones character varying(255)
);


ALTER TABLE public.historial OWNER TO admin;

--
-- TOC entry 3819 (class 0 OID 0)
-- Dependencies: 238
-- Name: TABLE historial; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.historial IS 'tabla que muestra los datos personales del titular y el beneficiario, junto con las atenciones medicas';


--
-- TOC entry 239 (class 1259 OID 99815)
-- Name: historial_id_historial_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.historial_id_historial_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.historial_id_historial_seq OWNER TO admin;

--
-- TOC entry 3820 (class 0 OID 0)
-- Dependencies: 239
-- Name: historial_id_historial_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.historial_id_historial_seq OWNED BY public.historial.id_historial;


--
-- TOC entry 240 (class 1259 OID 99816)
-- Name: horarios_medicos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.horarios_medicos (
    id_horarios_medicos integer NOT NULL,
    lun_t1 integer,
    lun_t2 integer,
    mar_t1 integer,
    mar_t2 integer,
    mie_t1 integer,
    mie_t2 integer,
    jue_t1 integer,
    jue_t2 integer,
    vie_t1 integer,
    vie_t2 integer,
    sab_t1 integer,
    sab_t2 integer,
    dom_t1 integer,
    dom_t2 integer,
    id_especialidad integer,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.horarios_medicos OWNER TO admin;

--
-- TOC entry 241 (class 1259 OID 99819)
-- Name: horarios_medicos_id_horarios_medicos_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.horarios_medicos_id_horarios_medicos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.horarios_medicos_id_horarios_medicos_seq OWNER TO admin;

--
-- TOC entry 3821 (class 0 OID 0)
-- Dependencies: 241
-- Name: horarios_medicos_id_horarios_medicos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.horarios_medicos_id_horarios_medicos_seq OWNED BY public.horarios_medicos.id_horarios_medicos;


--
-- TOC entry 270 (class 1259 OID 114723)
-- Name: log_archivos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.log_archivos (
    id_log_archivos integer NOT NULL,
    fecha_de_registro information_schema.time_stamp DEFAULT NULL::timestamp with time zone,
    id_usuario integer,
    observacion character varying(250),
    archivo_origen character varying(250),
    archivo_destino character varying(250),
    in_procesado integer DEFAULT 0,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.log_archivos OWNER TO admin;

--
-- TOC entry 269 (class 1259 OID 114722)
-- Name: log_archivos_id_log_archivos_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.log_archivos_id_log_archivos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.log_archivos_id_log_archivos_seq OWNER TO admin;

--
-- TOC entry 3822 (class 0 OID 0)
-- Dependencies: 269
-- Name: log_archivos_id_log_archivos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.log_archivos_id_log_archivos_seq OWNED BY public.log_archivos.id_log_archivos;


--
-- TOC entry 242 (class 1259 OID 99820)
-- Name: medico; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.medico (
    id_medico integer NOT NULL,
    nombre_medico character varying(255),
    apellido_medico character varying(255),
    cedula_medico integer,
    id_usuario integer,
    in_activo integer DEFAULT 1 NOT NULL,
    correo_medico character varying,
    telefono1_medico character varying,
    telefono2_medico character varying,
    id_sexo integer,
    id_nacionalidad integer,
    id_especialidad integer
);


ALTER TABLE public.medico OWNER TO admin;

--
-- TOC entry 3823 (class 0 OID 0)
-- Dependencies: 242
-- Name: TABLE medico; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.medico IS 'tabla que muestra los médicos del servicio médico DAS';


--
-- TOC entry 243 (class 1259 OID 99826)
-- Name: medico_id_medico_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.medico_id_medico_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.medico_id_medico_seq OWNER TO admin;

--
-- TOC entry 3824 (class 0 OID 0)
-- Dependencies: 243
-- Name: medico_id_medico_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.medico_id_medico_seq OWNED BY public.medico.id_medico;


--
-- TOC entry 244 (class 1259 OID 99827)
-- Name: modulos; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.modulos (
    id_modulos integer NOT NULL,
    nombre_modulos character varying(255),
    comportamiento character varying,
    in_activo integer DEFAULT 1
);


ALTER TABLE public.modulos OWNER TO admin;

--
-- TOC entry 245 (class 1259 OID 99832)
-- Name: modulos_id_modulos_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.modulos_id_modulos_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.modulos_id_modulos_seq OWNER TO admin;

--
-- TOC entry 3825 (class 0 OID 0)
-- Dependencies: 245
-- Name: modulos_id_modulos_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.modulos_id_modulos_seq OWNED BY public.modulos.id_modulos;


--
-- TOC entry 246 (class 1259 OID 99833)
-- Name: motivo_consulta; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.motivo_consulta (
    id_motivo_consulta integer NOT NULL,
    nombre_motivo_consulta character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.motivo_consulta OWNER TO admin;

--
-- TOC entry 247 (class 1259 OID 99836)
-- Name: motivo_consulta_id_motivo_consulta_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.motivo_consulta_id_motivo_consulta_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.motivo_consulta_id_motivo_consulta_seq OWNER TO admin;

--
-- TOC entry 3826 (class 0 OID 0)
-- Dependencies: 247
-- Name: motivo_consulta_id_motivo_consulta_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.motivo_consulta_id_motivo_consulta_seq OWNED BY public.motivo_consulta.id_motivo_consulta;


--
-- TOC entry 248 (class 1259 OID 99837)
-- Name: nacionalidad; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.nacionalidad (
    id_nacionalidad integer NOT NULL,
    nombre_nacionalidad character varying(20),
    abreviatura character varying(20)
);


ALTER TABLE public.nacionalidad OWNER TO admin;

--
-- TOC entry 3827 (class 0 OID 0)
-- Dependencies: 248
-- Name: TABLE nacionalidad; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.nacionalidad IS 'tabla que muestra la identidad del paciente';


--
-- TOC entry 249 (class 1259 OID 99840)
-- Name: nacionalidad_id_nacionalidad_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.nacionalidad_id_nacionalidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.nacionalidad_id_nacionalidad_seq OWNER TO admin;

--
-- TOC entry 3828 (class 0 OID 0)
-- Dependencies: 249
-- Name: nacionalidad_id_nacionalidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.nacionalidad_id_nacionalidad_seq OWNED BY public.nacionalidad.id_nacionalidad;


--
-- TOC entry 250 (class 1259 OID 99841)
-- Name: paciente; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.paciente (
    id_titular integer NOT NULL,
    id_usuario integer,
    fecha_registro_titular timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    fecha_nacimiento_titular date,
    cedula_titular character varying(255) DEFAULT NULL::character varying,
    nombre_titular character varying(255),
    apellido_titular character varying(255),
    telefono_titular character varying(255) DEFAULT NULL::character varying,
    id_sexo integer,
    id_universidad integer,
    id_ente integer,
    id_nacionalidad integer,
    id_direccion_general integer,
    id_direccion_linea integer,
    id_coordinacion integer,
    correo_titular character varying(255) DEFAULT NULL::character varying,
    edad_titular integer,
    telefono2_titular character varying,
    direccion_corta_casa_titular character varying(250),
    id_estado integer,
    in_activo integer DEFAULT 1 NOT NULL,
    id_paciente_titular integer,
    in_condicion_especial integer DEFAULT 0 NOT NULL,
    in_cortesia integer DEFAULT 0 NOT NULL,
    id_parentesco integer,
    tipo_de_empleado integer,
    id_estado_pais integer,
    id_tipo_de_empleado integer
);


ALTER TABLE public.paciente OWNER TO admin;

--
-- TOC entry 3829 (class 0 OID 0)
-- Dependencies: 250
-- Name: TABLE paciente; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.paciente IS 'esta tabla es para registrar los datos del titular';


--
-- TOC entry 251 (class 1259 OID 99850)
-- Name: parametros_general; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.parametros_general (
    id_parametros integer NOT NULL,
    nombre_parametros character varying(255),
    valor_parametros character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.parametros_general OWNER TO admin;

--
-- TOC entry 252 (class 1259 OID 99855)
-- Name: parametros_general_id_parametros_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.parametros_general_id_parametros_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parametros_general_id_parametros_seq OWNER TO admin;

--
-- TOC entry 3830 (class 0 OID 0)
-- Dependencies: 252
-- Name: parametros_general_id_parametros_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.parametros_general_id_parametros_seq OWNED BY public.parametros_general.id_parametros;


--
-- TOC entry 253 (class 1259 OID 99856)
-- Name: parentesco; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.parentesco (
    id_parentesco integer NOT NULL,
    nombre_parentesco character varying(20),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.parentesco OWNER TO admin;

--
-- TOC entry 254 (class 1259 OID 99859)
-- Name: parentesco_id_parentesco_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.parentesco_id_parentesco_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.parentesco_id_parentesco_seq OWNER TO admin;

--
-- TOC entry 3831 (class 0 OID 0)
-- Dependencies: 254
-- Name: parentesco_id_parentesco_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.parentesco_id_parentesco_seq OWNED BY public.parentesco.id_parentesco;


--
-- TOC entry 255 (class 1259 OID 99860)
-- Name: rol; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.rol (
    id_rol integer NOT NULL,
    nombre character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.rol OWNER TO admin;

--
-- TOC entry 3832 (class 0 OID 0)
-- Dependencies: 255
-- Name: TABLE rol; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.rol IS 'tabla que guarda los roles que se usaran en el sistema';


--
-- TOC entry 256 (class 1259 OID 99863)
-- Name: rol_id_rol_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.rol_id_rol_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.rol_id_rol_seq OWNER TO admin;

--
-- TOC entry 3833 (class 0 OID 0)
-- Dependencies: 256
-- Name: rol_id_rol_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.rol_id_rol_seq OWNED BY public.rol.id_rol;


--
-- TOC entry 257 (class 1259 OID 99864)
-- Name: sexo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.sexo (
    id_sexo integer NOT NULL,
    sexo character varying(20)
);


ALTER TABLE public.sexo OWNER TO admin;

--
-- TOC entry 3834 (class 0 OID 0)
-- Dependencies: 257
-- Name: TABLE sexo; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.sexo IS 'esta tabla es para mostrar el genero';


--
-- TOC entry 258 (class 1259 OID 99867)
-- Name: sexo_id_sexo_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.sexo_id_sexo_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.sexo_id_sexo_seq OWNER TO admin;

--
-- TOC entry 3835 (class 0 OID 0)
-- Dependencies: 258
-- Name: sexo_id_sexo_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.sexo_id_sexo_seq OWNED BY public.sexo.id_sexo;


--
-- TOC entry 259 (class 1259 OID 99868)
-- Name: tipo_de_empleado; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.tipo_de_empleado (
    id_tipo_de_empleado integer NOT NULL,
    nombre_tipo_de_empleado character varying(255),
    valor_tipo_de_empleado character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.tipo_de_empleado OWNER TO admin;

--
-- TOC entry 260 (class 1259 OID 99873)
-- Name: tipo_de_empleado_id_tipo_de_empleado_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.tipo_de_empleado_id_tipo_de_empleado_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tipo_de_empleado_id_tipo_de_empleado_seq OWNER TO admin;

--
-- TOC entry 3836 (class 0 OID 0)
-- Dependencies: 260
-- Name: tipo_de_empleado_id_tipo_de_empleado_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.tipo_de_empleado_id_tipo_de_empleado_seq OWNED BY public.tipo_de_empleado.id_tipo_de_empleado;


--
-- TOC entry 261 (class 1259 OID 99874)
-- Name: titular_id_titular_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.titular_id_titular_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.titular_id_titular_seq OWNER TO admin;

--
-- TOC entry 3837 (class 0 OID 0)
-- Dependencies: 261
-- Name: titular_id_titular_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.titular_id_titular_seq OWNED BY public.paciente.id_titular;


--
-- TOC entry 262 (class 1259 OID 99875)
-- Name: titular_te_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.titular_te_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.titular_te_seq OWNER TO admin;

--
-- TOC entry 3838 (class 0 OID 0)
-- Dependencies: 262
-- Name: titular_te_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.titular_te_seq OWNED BY public.paciente.telefono2_titular;


--
-- TOC entry 263 (class 1259 OID 99876)
-- Name: trazabilidad; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.trazabilidad (
    id_trazabilidad integer NOT NULL,
    fecha_de_registro information_schema.time_stamp DEFAULT NULL::timestamp with time zone,
    evento character varying(255) DEFAULT NULL::character varying,
    id_usuario integer,
    direccion_ip character varying(255) DEFAULT NULL::character varying,
    tx_datos character varying(500) DEFAULT NULL::character varying
);


ALTER TABLE public.trazabilidad OWNER TO admin;

--
-- TOC entry 264 (class 1259 OID 99884)
-- Name: trazabilidad_id_trazabilidad_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.trazabilidad_id_trazabilidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.trazabilidad_id_trazabilidad_seq OWNER TO admin;

--
-- TOC entry 3839 (class 0 OID 0)
-- Dependencies: 264
-- Name: trazabilidad_id_trazabilidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.trazabilidad_id_trazabilidad_seq OWNED BY public.trazabilidad.id_trazabilidad;


--
-- TOC entry 265 (class 1259 OID 99885)
-- Name: universidad; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.universidad (
    id_universidad integer NOT NULL,
    nombre_universidad character varying(255),
    siglas_universidad character varying(255),
    in_activo integer DEFAULT 1
);


ALTER TABLE public.universidad OWNER TO admin;

--
-- TOC entry 3840 (class 0 OID 0)
-- Dependencies: 265
-- Name: TABLE universidad; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.universidad IS 'tabla que muestra todas las universidades de venezuela';


--
-- TOC entry 266 (class 1259 OID 99890)
-- Name: universidad_id_universidad_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.universidad_id_universidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.universidad_id_universidad_seq OWNER TO admin;

--
-- TOC entry 3841 (class 0 OID 0)
-- Dependencies: 266
-- Name: universidad_id_universidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.universidad_id_universidad_seq OWNED BY public.universidad.id_universidad;


--
-- TOC entry 267 (class 1259 OID 99891)
-- Name: usuario; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.usuario (
    id_usuario integer NOT NULL,
    nombre character varying(255),
    apellido character varying(255),
    correo character varying(255),
    id_rol integer,
    contrasenia character varying(20),
    usuario character varying,
    in_inactivo integer DEFAULT 1 NOT NULL,
    in_cambiar_clave integer DEFAULT 0 NOT NULL,
    id_modulo integer,
    in_autoriza integer DEFAULT 0,
    in_cita_autorizacion integer DEFAULT 0
);


ALTER TABLE public.usuario OWNER TO admin;

--
-- TOC entry 3842 (class 0 OID 0)
-- Dependencies: 267
-- Name: TABLE usuario; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.usuario IS 'tabla que guadará los usuarios que usaran el sistema';


--
-- TOC entry 268 (class 1259 OID 99898)
-- Name: usuario_id_usuario_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.usuario_id_usuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.usuario_id_usuario_seq OWNER TO admin;

--
-- TOC entry 3843 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 3490 (class 2604 OID 114750)
-- Name: carga_masiva id_carga_masiva; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva ALTER COLUMN id_carga_masiva SET DEFAULT nextval('public.carga_masiva_id_carga_masiva_seq'::regclass);


--
-- TOC entry 3426 (class 2604 OID 99899)
-- Name: cita id_cita; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_id_cita_seq'::regclass);


--
-- TOC entry 3428 (class 2604 OID 99900)
-- Name: coordinacion id_coordinacion; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion ALTER COLUMN id_coordinacion SET DEFAULT nextval('public.coordinacion_id_coordinacion_seq'::regclass);


--
-- TOC entry 3430 (class 2604 OID 99901)
-- Name: direccion_general id_direccion_general; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general ALTER COLUMN id_direccion_general SET DEFAULT nextval('public.direccion_general_id_direccion_general_seq'::regclass);


--
-- TOC entry 3432 (class 2604 OID 99902)
-- Name: direccion_linea id_direccion_linea; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea ALTER COLUMN id_direccion_linea SET DEFAULT nextval('public.direccion_linea_id_direccion_linea_seq'::regclass);


--
-- TOC entry 3434 (class 2604 OID 99903)
-- Name: ente id_ente; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ente ALTER COLUMN id_ente SET DEFAULT nextval('public.ente_id_ente_seq'::regclass);


--
-- TOC entry 3436 (class 2604 OID 99904)
-- Name: especialidad id_especialidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.especialidad ALTER COLUMN id_especialidad SET DEFAULT nextval('public.especialidad_id_especialidad_seq'::regclass);


--
-- TOC entry 3440 (class 2604 OID 99905)
-- Name: estado_venezuela id_estado_pais; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_venezuela ALTER COLUMN id_estado_pais SET DEFAULT nextval('public."estado_Venezuela_id_estado_pais_seq"'::regclass);


--
-- TOC entry 3443 (class 2604 OID 99906)
-- Name: etario id_etario; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.etario ALTER COLUMN id_etario SET DEFAULT nextval('public.etario_id_etario_seq'::regclass);


--
-- TOC entry 3447 (class 2604 OID 99907)
-- Name: historial id_historial; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_id_historial_seq'::regclass);


--
-- TOC entry 3448 (class 2604 OID 99908)
-- Name: horarios_medicos id_horarios_medicos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos ALTER COLUMN id_horarios_medicos SET DEFAULT nextval('public.horarios_medicos_id_horarios_medicos_seq'::regclass);


--
-- TOC entry 3486 (class 2604 OID 114726)
-- Name: log_archivos id_log_archivos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos ALTER COLUMN id_log_archivos SET DEFAULT nextval('public.log_archivos_id_log_archivos_seq'::regclass);


--
-- TOC entry 3450 (class 2604 OID 99909)
-- Name: medico id_medico; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico ALTER COLUMN id_medico SET DEFAULT nextval('public.medico_id_medico_seq'::regclass);


--
-- TOC entry 3452 (class 2604 OID 99910)
-- Name: modulos id_modulos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id_modulos SET DEFAULT nextval('public.modulos_id_modulos_seq'::regclass);


--
-- TOC entry 3454 (class 2604 OID 99911)
-- Name: motivo_consulta id_motivo_consulta; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.motivo_consulta ALTER COLUMN id_motivo_consulta SET DEFAULT nextval('public.motivo_consulta_id_motivo_consulta_seq'::regclass);


--
-- TOC entry 3456 (class 2604 OID 99912)
-- Name: nacionalidad id_nacionalidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.nacionalidad ALTER COLUMN id_nacionalidad SET DEFAULT nextval('public.nacionalidad_id_nacionalidad_seq'::regclass);


--
-- TOC entry 3457 (class 2604 OID 99913)
-- Name: paciente id_titular; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente ALTER COLUMN id_titular SET DEFAULT nextval('public.titular_id_titular_seq'::regclass);


--
-- TOC entry 3465 (class 2604 OID 99915)
-- Name: parametros_general id_parametros; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parametros_general ALTER COLUMN id_parametros SET DEFAULT nextval('public.parametros_general_id_parametros_seq'::regclass);


--
-- TOC entry 3467 (class 2604 OID 99916)
-- Name: parentesco id_parentesco; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parentesco ALTER COLUMN id_parentesco SET DEFAULT nextval('public.parentesco_id_parentesco_seq'::regclass);


--
-- TOC entry 3469 (class 2604 OID 99917)
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- TOC entry 3471 (class 2604 OID 99918)
-- Name: sexo id_sexo; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sexo ALTER COLUMN id_sexo SET DEFAULT nextval('public.sexo_id_sexo_seq'::regclass);


--
-- TOC entry 3472 (class 2604 OID 99919)
-- Name: tipo_de_empleado id_tipo_de_empleado; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tipo_de_empleado ALTER COLUMN id_tipo_de_empleado SET DEFAULT nextval('public.tipo_de_empleado_id_tipo_de_empleado_seq'::regclass);


--
-- TOC entry 3474 (class 2604 OID 99920)
-- Name: trazabilidad id_trazabilidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trazabilidad ALTER COLUMN id_trazabilidad SET DEFAULT nextval('public.trazabilidad_id_trazabilidad_seq'::regclass);


--
-- TOC entry 3479 (class 2604 OID 99921)
-- Name: universidad id_universidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.universidad ALTER COLUMN id_universidad SET DEFAULT nextval('public.universidad_id_universidad_seq'::regclass);


--
-- TOC entry 3481 (class 2604 OID 99922)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 3742 (class 0 OID 99738)
-- Dependencies: 215
-- Data for Name: activo; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.activo VALUES (1, 'SI');
INSERT INTO public.activo VALUES (0, 'NO');


--
-- TOC entry 3743 (class 0 OID 99742)
-- Dependencies: 216
-- Data for Name: bd_condicion; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_condicion VALUES (1, 'Activo');
INSERT INTO public.bd_condicion VALUES (2, 'Jubilado');
INSERT INTO public.bd_condicion VALUES (3, 'Pensinado');


--
-- TOC entry 3744 (class 0 OID 99746)
-- Dependencies: 217
-- Data for Name: bd_datos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_datos VALUES (1, '2472590', 'RAMONA NATIVIDAD', 'QUIÑONES ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (2, '2765794', 'HAYDEE MILAGROS', 'TRUJILLO MARTINEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (3, '2780567', 'ORLANDO ', 'HERNANDEZ SAMBRANO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (4, '2933889', 'ELIO AMBROSIO', 'SUAREZ MOLINA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (5, '3244016', 'GLADYS MERCEDES', 'LEON ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (6, '3295195', 'CARMEN ZORAIDA', 'BELANDRIA ARELLANO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (7, '3347857', 'EDITH JOSE', 'CANELON ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (8, '3428620', 'MARIA HIMELDA', 'BAUTISTA BOADA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (9, '3479318', 'CARLOS ARMANDO', 'LOPEZ HIDALGO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (10, '3631939', 'PEDRO MANUEL', 'LAYA GIMON', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (11, '3744675', 'IVONNE OSIO', 'DE MORALES', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (12, '3752424', 'ZORAIDA COROMOTO', 'CASTRO MONTOYA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (13, '3788915', 'ANTONIA ', 'MORENO DE RICO', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (14, '3803810', 'ANIBAL JOSE', 'FERNANDEZ ALFONZO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (15, '3804505', 'SILVIA BARBARA', 'FARIAS DE BASTARDO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (16, '3805360', 'CARMEN TERESA', 'VELAZQUEZ DE GUEVARA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (17, '3810179', 'MARÍA EFIGENIA', 'OSORIO SANCHEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (18, '3810962', 'ELIZABETH CRISTINA', 'CEDILLO REQUES', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (19, '3814648', 'JOSE ELOY', 'LEOPOLTO RODRIGUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (20, '3821973', 'FABIO ', 'LOPEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (21, '3837378', 'CESAR ', 'QUINTERO QUIJADA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (22, '3907461', 'MARTHA ELENA', 'CHACON VIERAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (23, '3969247', 'ROCIO PISANI', 'DE ACUÑA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (24, '3973307', 'ROSSINI EMILIO', 'GUZMAN GARCIA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (25, '3982849', 'VANDER VELDE', 'DE CACINARI', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (26, '3985218', 'ELINOR ', 'ARTEAGA DE MARCANO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (27, '3988496', 'CARMEN JOSEFINA', 'MEDRANO VIRLA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (28, '4020734', 'ROSA ENEIDA', 'HENRIQUEZ ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (29, '4034831', 'NORIS ', 'MARTINEZ FARRERAS ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (30, '4083848', 'MARINIEVES ', 'MARTIN SERRANO ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (31, '4088383', 'DOMINGO ANTONIO', 'PIETRINI CATONI', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (32, '4103365', 'MORELA VICTORIA', 'BONALDE DUNO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (33, '4116975', 'GERMAN BELTRAN', 'SALAZAR ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (34, '4132968', 'RAFAEL MOISES', 'OLIMPO RIVOLTA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (35, '4163333', 'ESPERANZA ', 'MARTUS ACEVEDO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (36, '4165346', 'RUBENS OLENO', 'LEON MATUTE', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (37, '4166731', 'NADIA ', 'CASTILLO MONLOY ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (38, '4167716', 'JOSE IGNACIO', 'HERRERA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (39, '4208291', 'NELIDA ', 'COLMENARES ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (40, '4209145', 'GRACE BEATRIZ', 'SOSA GARCIA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (41, '4246486', 'ZORAIDA ', 'ECHENIQUE LOPEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (42, '4246986', 'GUSTAVO FRANCISCO', 'BELISARIO RODRIGUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (43, '4253126', 'NELIDA ', 'PORTILLO DE MATTAR', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (44, '4269227', 'DANID RAUL', 'VASQUEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (45, '4276348', 'ORLANDO JOSE', 'APOLON ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (46, '4279556', 'OMAR ANTONIO', 'ESCALANTE AYARO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (47, '4304646', 'ELOYSA  ', 'DE REYES', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (48, '4358763', 'JESSICA ', 'SOUFFRONT LANDER ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (49, '4361716', 'PEDRO ALCANTARA', 'SIFONTES LUGO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (50, '4421934', 'VICTOR RAMON', 'SOJO GIL', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (51, '4434198', 'CARMEN ELENA', 'OLIVERO PEÑA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (52, '4439172', 'VERONICA DE LA TRINIDAD', ' VALECILLOS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (53, '4463825', 'ROBERT GIOVANNI', 'CORDOVA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (54, '4551865', 'HENRY RAFAEL', 'TOVAR ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (55, '4580917', 'THERA MAGGIORE', 'SANCHEZ ROJAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (56, '4582735', 'JUAN CARLOS', 'MUÑOZ MARTINEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (57, '4585057', 'JESUS SALVADOR', 'CASTRO ITANARE', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (58, '4587629', 'MONICA BIAVA', 'HIDALGO ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (59, '4660480', 'ROMELIA ', 'BRICEÑO DE MENTADO', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (60, '4672024', 'JOSÉ GREGORIO', 'GOMEZ RODRÍGUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (61, '4768308', 'HUMBERTO ', 'FUENMAYOR GARCIA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (62, '4816568', 'NUBIA ISABEL', 'PEÑA DE CAÑAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (63, '4820802', 'EVELYN ', 'CHACON DE GARCIA', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (64, '4835009', 'CARMEN ', 'HERRERA VILLANUEVA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (65, '4847997', 'ALBERTO JOSE', 'LONGA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (66, '4850375', 'HECTOR ENRIQUE', 'CASTILLO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (67, '4854514', 'RAIZA MARIBEL', 'TOYO TORRES', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (68, '4916071', 'LEYDES ', 'MORALES RONDON ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (69, '4919082', 'GLADYS ', 'BRICEÑO ANDRADE ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (70, '5009123', 'SANTOS ARTURO', 'PACHECO SABINO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (71, '5019765', 'JESUS ALBERTO', 'GOMEZ MEDINA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (72, '5117255', 'VICTORIA ', 'MARTINEZ PEREZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (73, '5134588', 'WADIDCHT ', 'PINEDA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (74, '5192722', 'ALEXIS ', 'ZURITA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (75, '5217423', 'ROSA MARIA', 'PICON PULIDO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (76, '5219410', 'ELEONORA ', 'MANDATO DEFAZIO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (77, '5223409', 'JAIDY MANCILLA', 'PEREZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (78, '5304381', 'DAVID AGUSTIN', 'SILVA ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (79, '5304767', 'MARIA ', 'ALMIÑANA MAGALLON', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (80, '5315152', 'ANIBAL JOSE', 'TEJERA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (81, '5430361', 'ALBA MAIGUALIDAD', 'ORONOZ DE CUSTODIO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (82, '5442872', 'ANA OLGA', 'GUERRA SAMBRANO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (83, '5459169', 'ISIDRO RAMON', 'RAMIREZ NAVEA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (84, '5499805', 'ELDA PROCERPINA', 'ROMERO CONTRERAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (85, '5537813', 'LEONOR MARIASOLE', 'RONDON LEON', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (86, '5567241', 'BEATRIZ COROMOTO', 'PINTO DE GONZALEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (87, '5604303', 'CARMEN TOMASA', 'MEDINA GONZALEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (88, '5609706', 'YESID AUXILIADORA', 'SARMIENTO DE GORRIN', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (89, '5614201', 'GLADYS ', 'DIAZ DE ORDOÑEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (90, '5650035', 'LIYANE', 'MALPICA CONTRERAS ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (91, '5880771', 'ANAYS DEL VALLE', 'ADRIAN BRAZON', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (92, '5887121', ' YAJAIRA', 'MERCEDES RUIZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (93, '5887607', 'FRANCO ORLANDO', 'PEROZZI ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (94, '5893483', 'ANA GISELA', 'GONZALEZ NOGALES', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (95, '5893536', 'CARMEN ZULAY', 'GINES ARCIA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (96, '5960102', 'GLADYS MARIA', 'MARTINEZ GUEVARA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (97, '5963639', 'JOSE OSWALDO', 'GONZALEZ PARRA', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (98, '5974095', 'HENRY MICHEL', 'ORDOÑEZ BELL', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (99, '6005883', 'CARMEN ', 'GUTIERREZ HERNANDEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (100, '6051029', 'PACIFICO ANTONIO', 'RUIZ PERDOMO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (101, '6057669', 'FRANCISCO ANGEL', 'VIVAS ROSALES', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (102, '6084064', 'JONA TOMAS', 'PEREZ ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (103, '6109419', 'EUCLIDES JOSE ', 'MEDINA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (104, '6110473', 'ADELAIRA CIRA', 'ACOSTA ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (105, '6111127', 'DOUGLAS JESÚS', 'OLIVAR LOZADA', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (106, '6116611', 'JULIO CESAR', 'MARTINEZ PALACIOS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (107, '6116659', 'ZULAY MARGARITA', 'MILLAN SALAZAR', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (108, '6118549', 'YURACXI ', 'CORREA DE OCHOA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (109, '6118662', 'GLORIA JOSEFINA', 'FARIAS EDEMBURGO', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (110, '6118767', 'JACOB ', 'SERRUYA WAHNON ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (111, '6120214', 'YSABEL THIBISAY', 'SOTO GONZALEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (112, '6139493', ' MARIO JOSE', 'RODRIGUEZ APONTE', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (113, '6146635', 'EUSEBIA ', 'BOADA DE CEDEÑO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (114, '6163117', 'ANAHIAS NATALIA', 'GOMEZ ALVAREZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (115, '6169911', 'LAURA COROMOTO', 'ROJAS GALAVIZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (116, '6189198', 'VILMA VIRGINIA', 'PINTO CEDEÑO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (117, '6206661', 'NURYS SUSANA', 'ECHARRY GUILLEN', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (118, '6207279', 'BUSTER ABEL', 'CARRILLO CHISTONE', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (119, '6209533', 'LUIS ALFREDO', 'MARQUEZ ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (120, '6224832', 'GEANY JOSE', 'ARAY ROJAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (121, '6232891', 'MARTHA ELENA', 'ARISTIQUETA ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (122, '6240974', 'MIGUEL ANGEL', 'ROJAS RIVERA', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (123, '6242124', 'HERNÁN ROBERTO', 'LÓPEZ PEÑA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (124, '6249457', 'THAIS VESTALIA', 'MAIZ ESPINOZA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (125, '6250127', 'MORELBA JOSEFINA', 'COLINA LANDAETA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (126, '6261007', 'MERCEDES NINOSKA', 'MUCHACHO ALVAREZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (127, '6265825', 'EURIDICES ', 'AVILA PALMA ', 9, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (128, '6332054', 'CARMEN OMAIRA', 'IRAZABAL FONSECA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (129, '6343147', 'MANUEL SALVADOR', 'BRICEÑO MENDEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (130, '6345460', 'OSDAICER ', 'ROSAS DE BOER', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (131, '6355339', 'MARIANELA ', 'DI PUGLIA ECHEZURIA', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (132, '6361884', 'EFREN DE JESUS', 'LOPEZ ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (133, '6366946', 'ANA BECSAIDA', 'MORENO CABEZA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (134, '6371184', 'ALEXIS RAMON', 'PARRA GARCIA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (135, '6371632', 'JORGE OSCAR', 'MENDEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (136, '6376937', 'FRANCISCO ALBERTO', 'ROJAS ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (137, '6386519', 'FELICIA ', 'MENDOZA ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (138, '6430347', 'CARLOS ', 'NUÑEZ MORENO ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (139, '6433873', 'JORGE ANTONIO', 'BARBOZA BRAVO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (140, '6435769', 'LUZ MARIELA', 'UZCATEGUI MUJICA', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (141, '6440364', 'ZENAIDA ', 'DAVILA ESCALONA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (142, '6442144', 'VICENTE EMILIO', 'BLANCO ANGULO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (143, '6442325', 'PEDRO JOSE', 'LABARCA CALZADILLA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (144, '6443935', 'GUBUANI ', 'GONZALEZ MARTINEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (145, '6444462', 'JOSE RAMON', 'ARIAS RODRIGUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (146, '6449307', 'MARIA MIREYA', 'DAVILA ESCALONA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (147, '6451335', 'MIGUELINA ', 'SALAS GARCIA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (148, '6466151', 'JOSE ALEXIS', 'SULBARAN ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (149, '6469216', 'BRISEIDE DE MENESES', 'NAVARRO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (150, '6513448', 'ABELARDO JOSE', 'PADILLA PERALTA', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (151, '6525606', 'AMERICA MARIA', 'ORELLANA DELGADO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (152, '6544739', 'SOL ', 'NEGRETTE TORREALBA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (153, '6547328', 'YANET COROMOTO', 'RAMIREZ FRANCO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (154, '6653621', 'MONICA LILIAN', 'CASTILLO ARANZAZU', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (155, '6687263', 'JHONNY DE JESUS', 'OJEDA ASCANIO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (156, '6692623', 'JUAN CARLOS', 'BLANCO VASQUEZ', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (157, '6726947', 'YAJAIRA COROMOTO', 'VASQUEZ DIAZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (158, '6730515', 'DANIEL DAVID', 'GASPARRI REY', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (159, '6731011', 'AWILDA JOSEFINA', 'CHACON ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (160, '6750297', 'MAYRA ALEJANDRA', 'CONTRERAS CAÑIZALEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (161, '6812011', 'ANA MARGARITA', 'PINO PASQUIER', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (162, '6814955', 'IVONNE MARIELA', 'SERRANO RODRIGUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (163, '6842370', 'REINA MILAGRO', 'FLORES ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (164, '6845905', ' ALIRIO ', 'BARRETO GODOY ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (165, '6852794', 'ELOISA ', 'PEREZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (166, '6854961', 'MARIA YAIRA', 'NIÑO CRUZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (167, '6856166', 'BELKYS ', 'RIVERO GONZALEZ ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (168, '6857124', 'MARIA ALEJANDRINA', 'RADA DE JIMENEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (169, '6860204', 'VICTOR HUGO', 'MACABI SOTO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (170, '6860975', 'ZURITA SOLMAR', 'ARELLAN ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (171, '6863136', 'BELKIS CECILIA', 'CHIQUITO BARRERO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (172, '6865633', 'JULIO CESAR', 'ACOSTA ARISMENDI', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (173, '6866694', 'FRANCIS LORENA', 'CHIRINOS ROJO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (174, '6868223', 'DAVID ABRAHAN', 'VIVAS ROJAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (175, '6887297', 'JOSE RAMON', 'MARTINEZ SUAREZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (176, '6892986', 'NELIDA IRIS', 'MILA UGAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (177, '6894561', 'AYMARA ', 'SOLORZANO ESPINOZA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (178, '6899991', 'EVELYN ZENAIDA', 'GARCIA CARTAYA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (179, '6970937', 'LUIS FRANCISCO', 'RODRIGUEZ ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (180, '7046793', 'MANUEL VICENTE', 'ORTEGA NUÑEZ', 16, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (181, '7297392', 'VICTOR EDUARDO', 'AVILA RODRIGUEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (182, '7565409', 'JULIAN MANUEL', 'ELJURI MARIN', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (183, '7660769', 'ENRIQUE JESÚS', 'HERRERA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (184, '7662560', 'MILAGROS COROMOTO', 'SILVA PEREZ', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (185, '7757965', 'EDUARDO SEGUNDO', 'LEAL COROBO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (186, '7912185', 'JESUS MARIA', 'PEÑA GAMEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (187, '7929501', 'PEDRO ', 'DURAN ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (188, '7953798', 'HECTOR GUADALUPE', 'DAVILA OJEDA', 8, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (189, '7999312', 'RUBEN ', 'GOMEZ GARCIA ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (190, '8215883', 'JOSE HUMBERTO', 'RAMOS CALDERON', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (191, '8455919', 'MIRNA MARGARITA', 'NOGUERA ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (192, '8477557', 'ELIAS JOSUE', 'VIZCAINO PEREZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (193, '8481592', ' ANA', 'TERESA HENRIQUEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (194, '8531907', 'ISMELDA DEL CARMEN', 'VALDEZ HERNANDEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (195, '8580829', 'AURA MARINA', 'SILVA SIMOZA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (196, '8638695', 'CARMEN GISELA', 'MUNDARAIN DE RAMIREZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (197, '8893015', 'YRAIMA JOSEFINA', 'SALAZAR ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (198, '8955180', 'LUIS FELIPE', 'ORDAZ JIMENEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (199, '9094434', 'LEIBA MARGARITA', 'SAYAGO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (200, '9158843', ' AIXA', 'YANNE SARMIENTO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (201, '9297380', 'YULI JOSEFINA', 'ARCIA AGUILERA', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (202, '9324359', 'LUIS RAMON', 'MAVARES RONDON', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (203, '9326076', 'EDGAR ', 'PAVON ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (204, '9383153', 'SULMA YAMIRA', 'ANDRADE DURAN', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (205, '9411619', 'MARIA ', 'RODRIGUEZ GIMENEZ ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (206, '9413134', 'YURAMIN ', 'AULAR RANGEL ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (207, '9413703', 'OSCAR ', 'PARRA CHACON ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (208, '9418956', 'AQUILES JOSE', 'POLO GONZALEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (209, '9425450', 'LORENIS DEL VALLE', 'VELASQUEZ ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (210, '9485993', 'ADRIANA LISBETHE', 'ZAYA MENDOZA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (211, '9488159', 'ANTONIO JOSE', 'MOY CARVAJAL', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (212, '9493580', 'MARIBEL ELENA', 'IZARRA LAGUNA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (213, '9650466', 'DULCE MARIA', 'ASUAJE JIMENEZ', 12, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (214, '9671633', 'LITZI ARLENE', 'RENGIFO MANZO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (215, '9846282', 'LUIS ENRIQUE', 'NAVAS ESCALONA', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (216, '9957787', 'NOELIS FRANCISCA', 'ASTUDILLO DE AMUNDARAIN', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (217, '9959502', 'CLAUDIA JOSEFINA', 'HERRERA SIRGO', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (218, '10072400', 'THAIS MARIBEL', 'ORTIZ MURGA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (219, '10096977', 'MARLENE JOSEFINA', 'URBINA BLANCO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (220, '10152832', 'YARITZA JAQUELIN', 'ROMERO PULIDO', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (221, '10172664', 'ILSE KARELY', 'SUAREZ SALAS', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (222, '10184808', 'YURAIMA CELEDONIA', 'MATA AVILA', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (223, '10215465', 'DORIS GUADALUPE', 'MARCANO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (224, '10303302', 'NELLYS JOSEFINA', 'JIMENEZ CARIPE', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (225, '10310460', 'JOSE GREGORIO', 'INFANTE ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (226, '10379742', 'ASTRID DEL VALLE', 'VILORIA BURGOS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (227, '10380161', 'ANA ', 'MEDINA DE NAVARRO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (228, '10396291', 'NOLBERTO ', 'GONZALEZ MORENO ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (229, '10489768', ' EULISES', 'JOSE FAGUNDEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (230, '10495942', 'RORAIMA ANGELINA', 'HIBIRMA DELGADO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (231, '10500259', 'YASMIN DEL CARMEN', 'ZAVALA CAÑAS', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (232, '10500592', 'MILDRED JOSEFINA', 'MEDINA DE SALAZAR', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (233, '10502308', 'MILVIA BEATRIZ', 'CARIPE LIENDO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (234, '10505078', 'GILBERTO ', 'MONTILLA NUÑEZ ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (235, '10507885', 'MARISOL ', 'HERNANDEZ ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (236, '10509074', 'GENNER ELIAS', 'RUIZ SANGRONIS', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (237, '10514101', 'LUIS ARGENIS', 'RODRIGUEZ RODRIGUEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (238, '10541318', 'ANA ', 'DOMINGUEZ CARUCI ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (239, '10541978', 'EDGAR JOSE', 'MORENO GARCIA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (240, '10542398', 'ROSA YASMIN', 'ORTIZ ', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (241, '10542767', 'ROBERTO ANTONIO', 'SANDOVAL FAJARDO', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (242, '10549568', 'JOSE GREGORIO', 'ALDANA LINARES', 15, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (243, '10580602', 'NIURKA ELICETH', 'ODUBER SANTELI', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (244, '10582189', 'ZANDRA JOSEFINA', 'GUERRERO ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (245, '10610783', 'INGRID ZORELLY', 'GARCIA PONSON', 16, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (246, '10626105', 'ALEXANDER FREDDY', 'PULIDO BUSTAMANTE', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (247, '10707041', 'JORGE LUIS', 'ACOSTA ZARRAGA', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (248, '10813028', 'PEDRO LIZANDRO', 'GONTO RODRIGUEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (249, '10821448', 'JUDITH DEL CARMEN', 'PEREZ CABELLO', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (250, '10822397', 'ANA LEONOR', 'HENRIQUEZ ESPAÑOL', 13, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (251, '10872414', 'MARIA ZULEINY', 'PEÑA MORA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (252, '10946925', 'CARMEN ALICIA', 'GUEVARA RAMIREZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (253, '10976012', ' SAUL EDUARDO', ' RUIZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (254, '11049607', 'ERIKA ', 'TREJO GARRIDO ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (255, '11164456', 'MIGUEL AUGUSTO', 'ASTUDILLO ALMEIDA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (256, '11195809', 'FERNANDO RAFAEL', 'VALDES ALCALA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (257, '11279008', 'RAFAEL ENRIQUE', 'ARRIECHE ABREU', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (258, '11338525', 'ANNIE YSABEL', 'FEBRES ALVAREZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (259, '11384119', 'JUANA MARGARITA', 'RUIZ BASANTE', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (260, '11396410', 'JUAN ESTEBAN', 'CRESPO TORRES', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (261, '11410071', 'LAURA ELENA', 'DELGADO SILVA', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (262, '11552291', 'PEDRO LUIS', 'MALAVER RUIZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (263, '11555154', 'ARELYS COROMOTO', 'ADRIANZA GUTIERREZ', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (264, '11561093', 'DESIREE DEL VALLE', 'MUJICA MIJARES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (265, '11638834', 'YOAISMAR DEL VALLE', 'FIGUEROA SALAZAR', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (266, '11691988', 'SHEILA MARIA', 'ALCALA ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (267, '11723527', 'GUSTAVO GREGORIO', 'RODRIGUEZ FIGUEROA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (268, '11734050', 'MARCOS GERARDO', 'MUJICA CHACON', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (269, '11741637', 'CARLOS EDUARDO', 'ROJAS PERAZA', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (270, '11834339', 'MARIA DE LOURDES', 'TOVAR CARPIO', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (271, '11923376', 'RICHARD ', 'GONZALEZ MEDINA ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (272, '11938870', 'CARMEN NORELYS', 'ALVARADO DIAZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (273, '11940527', 'YANETH JOSEFINA', 'BECERRA DE SANCHEZ', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (274, '11982894', 'WOLFGANG RUBEN', 'ACOSTA LEON', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (275, '11991999', 'LEVY TIBISAY', 'PARRAS ROSAS', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (276, '12096936', 'PEDRO ', 'BRICEÑO ZERPA ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (277, '12113287', 'EGLE NAZARETH', 'VARGAS BLANCO', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (278, '12146566', 'LIGIA YOLANDA', 'LUGO IBARRA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (279, '12161503', 'JOSEFINA DE LA CRUZ', 'MEDINA UGUETO', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (280, '12165259', 'DESIREE DRUSILA', 'INOJOSA AVELLANEDA', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (281, '12213365', 'NAIVE DEL CARMEN', 'COLMENARES VASQUEZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (282, '12261012', 'ERMI RAFAEL', 'BORROME ', 2, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (283, '12261299', 'MANUEL INDALESIO', 'SIEGLETT ', 12, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (284, '12302670', 'NORA ALEXANDRA', 'AVILA GALLARDO', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (285, '12357281', 'YAMILETH ZULAY', 'CARDENAS SOTO', 13, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (286, '12389548', ' ROCIO', 'IVETH CASTAÑEDA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (287, '12390963', 'ORLANDO USECHE', 'QUINTERO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (288, '12397817', 'MARYURING JOHANA', 'GONZALEZ VENTURA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (289, '12429595', 'ANGEL SIMON', 'OCHOA MEDINA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (290, '12456477', 'LUIS GABRIEL', 'BRICEÑO MORILLO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (291, '12459337', 'JOSE ALEXANDER', 'MEJIAS ARRAIZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (292, '12470412', 'ILDELID DEL VALLE', 'ESPINOZA LOPEZ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (293, '12481744', 'JOHANN ARGENIS', 'OCOPIO PEREZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (294, '12508330', 'OMAIRA ANTONIA', 'ZARRAGA MARQUEZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (295, '12588629', 'NILZA JOSEFINA', 'CHIRINO CHIRINO', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (296, '12617229', 'WILFREDO ISMAEL', 'HERRERA MOLINA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (297, '12638842', 'REHYNER ', 'MEDINA PINTO ', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (298, '12685780', 'ROSSANA ', 'DELGADO SILVA ', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (299, '12687533', 'BETSAIDA MARIA', 'COLMENARES CASTILLO', 9, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (300, '12687901', 'DEYVIS DEL CARMEN', 'CARTAYA HERRERA', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (301, '12688421', 'HELIODORO JONATHAN', 'COLMENARES VASQUEZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (302, '12688789', 'CARLA SOLANGE', 'RODRIGUEZ HERNANDEZ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (303, '12688959', 'ALEIDY HAIDEE', 'RODRIGUEZ TORREALBA', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (304, '12689356', 'JACKSON ', 'BENITEZ RODRIGUEZ ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (305, '12711059', ' JORGE LUIS', 'CASTRO GUARACO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (306, '12762515', 'HENRY DANIEL', 'LANDAETA URDANETA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (307, '12764458', 'MARISELA DEL CARMEN', 'GONZALEZ MORA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (308, '12783119', 'YOUSE ', 'OCOPIO LOPEZ ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (309, '12785870', 'MILAGRO DE JESUS', 'RIOS ORELLANES', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (310, '12826315', 'MAITE MARGARITA', 'CARABALLO RODRIGUEZ', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (311, '12832342', 'LEWIS OMAR', 'SUAREZ FIGUEREDO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (312, '12911349', 'RAIHAM ', 'GRATEROL NARANJO ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (313, '12912119', 'CARLOS AGUSTIN', 'RODRIGUEZ NIÑO', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (314, '12912873', 'GERNELIS PEÑA', 'GARZON ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (315, '12950147', 'GABRIELA MONTSERRAT', 'DIAZ DIAZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (316, '12955189', 'JACKSON NEHOMAR', 'SALAS MARTINEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (317, '12958091', 'JOSE ARTURO', 'MOLINA MORALES', 9, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (318, '12959348', 'ELIEZER EDUARDO', 'GONZALEZ VIVAS', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (319, '12983877', 'LIUBA COROMOTO', 'RENGIFO RODRIGUEZ', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (320, '13043331', 'LUISA MARIA', 'CORRO ALCALA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (321, '13057758', 'BENITO JOSE', 'LIRA ROMERO', 18, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (322, '13070789', 'DEIVIS JHOAM', 'MALPICA IDROGO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (323, '13086000', 'LISBETH BEATRIZ', 'MARIANY ROMERO', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (324, '13127696', 'YANNETH MERCEDES', 'ALEMAN ', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (325, '13159134', 'GARDENIA PRISCILA', 'BETANCOURT MOREJON', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (326, '13190240', 'MARISEL DEL VALLE', 'GUTIERREZ LAREZ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (327, '13201489', 'DAILUBYS ', 'ZAMBRANO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (328, '13225184', 'MINERVA ZULAIKA', 'LESSMAN ESCOBAR', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (329, '13237730', 'OSCAR DAVID', 'TOVAR ALVARADO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (330, '13253837', 'FRANCISCO JOSÉ', 'ROJAS MARTÍNEZ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (331, '13260673', 'THAIS DEL ROSARIO', 'NUÑEZ ', 10, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (332, '13289122', 'LIZ MARVERLING', 'MANZANILLA ARRAIZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (333, '13311547', 'CAROLINA JANETH', 'AGUILAR YANEZ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (334, '13312415', 'JESUS ALEJANDRO', 'OSAL DURAN', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (335, '13338281', 'MARTHA GABRIELA', 'GARCIA GARCIA', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (336, '13379125', 'DAVID ANTONIO', 'PEREZ GUZMAN', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (337, '13382562', 'JOSE GIOVANNI', 'PORRAS ESCALANTE', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (338, '13401469', 'EDGAR EDUARDO', 'PRIMERA ESTRELLA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (339, '13405824', 'OLIDA YAJAIRA', 'OSUNA RAMIREZ', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (340, '13408718', 'LUDMILA ', 'CORREA CHACON ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (341, '13422990', 'JESUS DANIEL', 'SOSA ALVAREZ', 15, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (342, '13459879', 'ELY JOSE', 'FERMIN CABRILES', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (343, '13477462', 'ROSELYN ', 'MORENO SALAS ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (344, '13482460', 'ESMERALDA DEL VALLE', 'BLANCO RODRIGUEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (345, '13487031', 'YANNY MARIA', 'CORDOBA GONZALEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (346, '13493852', 'BETZABETH MARGARITA', 'MANZANILLA MÉNDEZ', 9, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (347, '13494653', 'DEISY VIOLETA', 'MALDONADO ROJAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (348, '13563565', 'ROLLS ANDRY', 'MORILLO CORRO', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (349, '13638620', 'EDWIN ROGER', 'VERGARA SANTIS', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (350, '13715494', 'IVETTE CAROLINA', 'ORENZE GALINDO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (351, '13747490', 'JACK DANIEL', 'GONZALEZ PEREZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (352, '13846511', 'CARLOS JOSE', 'ROSALES ORTEGANA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (353, '13847293', 'NELSON AMOSI', 'HERNANDEZ RONDON', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (354, '13859436', 'MAHIL JOSEFINA', 'ALVAREZ MORENO', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (355, '13860672', 'ROSA AMELIA', 'GELVEZ ORTIZ', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (356, '13864883', 'YORMELIT VALENTINA', 'GARCIA VARGAS', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (357, '13872493', 'JAIRO JOSE', 'BLANCO AGUILERA', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (358, '13888737', 'KARLA VANESSA', 'BRAVO ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (359, '13951891', 'CARLOS DANIEL', 'PEREZ GUERRERO', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (360, '13964401', 'ANGIE IVANIA ', 'RUIZ LARGO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (361, '14016265', 'LEANDRO EUGENIO', 'GONZALEZ GOMEZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (362, '14032152', 'JESUS RAMON', 'RIVAS HERRERA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (363, '14037714', 'SHIRLEY DEL ROCIO', 'GONZALEZ MENDEZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (364, '14127272', 'MERVIN ALEJANDRO', 'GOITIA PARADA', 15, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (365, '14129316', 'WILSON EDUARDO', 'MARTINEZ REINA', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (366, '14139512', 'NORMA YARITZA', 'CAMACHO MORENO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (367, '14140778', 'NAIYIBE YASMIN', 'ASTUDILLO BORGES', 10, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (368, '14142324', 'MAGDALIS ', 'HERNANDEZ MENDEZ ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (369, '14153253', 'JOSE GREGORIO', 'AROCHA BLANCO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (370, '14157273', 'LILIANA ALYOLIZTH', 'MARRERO CHACÓN', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (371, '14194597', 'LIXMARY RUXELY', 'FERNANDEZ RODRIGUEZ', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (372, '14195413', 'LAURA ANDREINA', 'SOSA MARCANO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (373, '14196542', 'DARWIN ALBERTO', 'HERRERA LAGOS', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (374, '14277642', 'NIORELIS JOSEFINA', 'CHIRINOS MARCANO', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (375, '14284711', 'JEAN CARLOS', 'VARGAS VARGAS', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (376, '14287260', 'DIYIRKA GENARY', 'LOPEZ CONTRERAS', 13, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (377, '14322068', 'GRABIEL DE JESUS', 'VILLARROEL LOSADA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (378, '14345889', 'MERYVAN VIRGINIA', 'MORALES GUACARAN', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (379, '14378194', 'VICTOR MANUEL', 'ONTIVEROS PULIDO', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (380, '14445905', 'NELWIN RAFAEL', 'ALCALA GUARAMATO', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (381, '14451114', 'JASMIN CAROLINA', 'COLMENARES ZAVALA', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (382, '14452585', 'ISACC ', 'BOLTOMIER ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (383, '14454735', 'CARLOS DEBERI', 'MOLINA SILVA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (384, '14471605', 'EDUARD ', 'MOLINA ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (385, '14481848', 'MARISEL KARINA', 'CUBILLAN ROJAS', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (386, '14485200', 'EDGARDO ELIECER', 'LOZANO MAURY', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (387, '14488090', 'VICTORIA DEL VALLE', 'AGUILERA ACOSTA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (388, '14519774', 'YURAIMA ELIZABETH', 'SAYA CARMONA', 10, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (389, '14568779', 'ANGEL DAVID', 'ROMERO TINEO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (390, '14584206', 'RUSTELL DARIO', 'JIMENEZ MARTINEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (391, '14755779', 'ELIZABETH KARINA', 'PEROZO SUAREZ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (392, '14756695', 'VIRGILIO ', 'URIEPERO ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (393, '14782464', 'RUTH DEL PILAR', 'GALAVIZ PARRA', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (394, '14838815', 'YONATHAN ', 'PACHECO APARICIO ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (395, '14855300', 'JOSÉ ALEXANDER', 'URBANO DÍAZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (396, '14935500', 'GEISON ALEJANDRO', 'PEREZ GUILARTE', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (397, '14968968', 'JANNER JOSÉ', 'TURPIAL RAVAGO', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (398, '14999745', 'JACQUELINE JORDAN', 'FOREST ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (399, '15024741', 'YELITZE DAYANA', 'HERRERA URBINA', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (400, '15028878', 'WENDY DAYANA', 'MONTAÑEZ CHACON', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (401, '15048072', 'MILANGELA SUNIN', 'VIERA MENDOZA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (402, '15048073', 'NAYLET DEL CARMEN', 'VIERA MENDOZA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (403, '15133691', 'YENNY YURIMA', 'DELMAR SANDOVAL', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (404, '15135850', 'YELITZA DEL CARMEN', 'AVILA VARGAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (405, '15148645', 'NORBERT JOSEP', 'GONZALEZ PEREZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (406, '15169820', 'REBECA ', 'CALDERON MARRERO ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (407, '15175412', 'ALEJANDRO ANTONIO', 'QUERECUTO MONTERO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (408, '15178622', 'MARIEXIS ALEJANDRA', 'FERNANDEZ OSORIO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (409, '15196570', 'JESUS DARIO', 'MORA MORA', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (410, '15224894', 'DORISBEL ', 'CAUCHO CISNERO ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (411, '15267771', 'YOHANA ', 'ACUÑA RODRIGUEZ ', 23, 3, 8, 1);
INSERT INTO public.bd_datos VALUES (412, '15314399', 'JAIRO JESUS', 'ZAMBRANO PLAZA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (413, '15370772', 'ARACELYS BEATRIZ', 'OMAÑA FERNANDEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (414, '15394929', 'JONATHAN HENDER', 'FLORES BETANCOURT', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (415, '15395173', 'DORIS CONSUELO', 'PINEDA NIÑO', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (416, '15420198', 'ENYER ALEJANDRO', 'GARCIA BLANCO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (417, '15508186', 'ANNY ', 'PEREZ ', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (418, '15582115', 'CARLOS ALBERTO', 'QUINTANA DEL PINO', 16, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (419, '15586727', 'JHON DELBIS', 'TORRES ALTAMAR', 8, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (420, '15604095', 'MELISA DESIREE', 'MANTILLA ALARCON', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (421, '15605030', 'BELLALIS CAROLINA', 'ÁLVAREZ ROSENDO', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (422, '15687778', 'MERLYS JOSEFINA', 'FERREIRA HERNANDEZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (423, '15759071', 'JHONNEL RAFAEL', 'ROSALES TOYO', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (424, '15792328', 'KARINA YASMIN', 'RODRIGUEZ AVILAN', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (425, '15830488', 'ATENAIDA LILI', 'LOZADA CASTILLO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (426, '15893272', 'JOSE GREGORIO', 'MARCANO GARCIA', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (427, '15904079', 'NORQUIZ YOSELIZ', 'CABELLO PERALES', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (428, '15923987', 'JOSE RITO', 'VELASQUEZ RANGEL', 8, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (429, '15947602', 'DULCE MARTINIS', 'DA COSTA', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (430, '16082254', 'LUIS RAMON', 'QUINTANA DELGADO', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (431, '16086281', 'DAYANA YULEIMA', 'RIVAS MUJICA', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (432, '16148834', 'JACKSON JESUS', 'PEREZ SILVA', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (433, '16163837', 'LILIANA CAROLINA', 'CARRILLO MUÑOZ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (434, '16166115', 'VICTOR ALFONZO', 'SEGOVIA ACOSTA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (435, '16226579', 'GLEIDY MILAGROS', 'LOPEZ ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (436, '16263194', 'ADERALVIS LORENA', 'VILLARREAL PICHARDO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (437, '16265071', 'YEINY YASMIN', 'TOLOZA RODRIGUEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (438, '16268824', 'ANGERT ELIEZER', 'MACHADO DONACIMIENTOS', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (439, '16273664', 'SIMON ALEJANDRO', 'GONZALEZ REYES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (440, '16273980', 'RUTH DAYANA', 'ARVELO MORALES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (441, '16286889', 'DAYANA CAROLINA', 'CAPITILLO MAITA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (442, '16359400', 'EVARISTO JOSE', 'FORD SALAZAR', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (443, '16370001', 'GUILLERMO ALEJANDRO', 'SANTANA GARCIA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (444, '16379674', 'DEYANIRA MILAGROS', 'RIVERO PEROZO', 15, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (445, '16432478', 'DARWIN ALEXANDER', 'SILVA HENRÍQUEZ', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (446, '16472769', 'FRANK MOISES', 'CORONADO NUÑEZ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (447, '16507452', 'JESSICA KAREN', 'DUN ARROYO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (448, '16578329', 'MARLIN NAIRET', 'RIVAS RAMIREZ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (449, '16620344', 'MARIAN JOSE', 'GOMEZ LUGO', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (450, '16662940', 'MANUEL ALFREDO', 'NARANJO RIVAS', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (451, '16663646', 'YISLETH LISBETH', 'BERMUDEZ SOSA', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (452, '16670037', 'YUSMEIDY RIVAS', 'MANRIQUE ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (453, '16713019', 'RAIDY YELENA', 'MAZA BENCOMO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (454, '16713455', 'GUIDO BILY', 'FEDE URBINA', 1, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (455, '16815075', 'DIANA CAROLINA', 'ROJAS MAESTRE', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (456, '16821592', 'GUIMAR MARGARITA', 'BELLO SERRANO', 16, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (457, '16952301', 'KIMBERLING MARIELA', 'LOPEZ OLIVEROS', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (458, '16986975', 'RAIZA ADELFINA', 'RINCON ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (459, '17036974', 'YULEIMA JOSEFINA', 'VALERA CASTELLANO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (460, '17100199', 'WITNNEY MICHELL', 'CASTILLO RAMOS', 13, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (461, '17234562', 'XENIA DEL CARMEN ', 'GUERRA RUIZ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (462, '17311522', 'JESUS EDUARDO', 'VARGAS ROJAS', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (463, '17311795', 'MIGUEL ANGEL ', 'RODRIGUEZ MURIA', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (464, '17320072', 'LUISA YOLIVER', 'MERZA PEREZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (465, '17341021', 'WILLIAM ALFREDO', 'UZCATEGUI CONTRERAS', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (466, '17529511', 'ROMMER ABEL', 'ESCOBAR URBINA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (467, '17587550', 'LEIDY JOHANA', 'BURGOS SOTILLO', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (468, '17619967', 'FERMIN JOSE', 'CARIPA OROPEZA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (469, '17642057', 'ERLY JOSELYN', 'MESIAS MIRABAL', 12, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (470, '17671576', 'MILENA DEL CARMEN', 'GUILLEN ', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (471, '17719266', 'LEHINA YUDEIKY', 'LOPEZ CAMACHO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (472, '17719289', 'LEHINA AIRALED', 'LOPEZ CAMACHO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (473, '17887433', 'LILIANA ANDREINA', 'CONTRERAS BRICEÑO', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (474, '17906420', 'LENIN ALFONZO', 'TORO FERMIN', 1, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (475, '17956331', 'KARINA DEL VALLE', 'CARABALLO LOPEZ', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (476, '18020660', 'ROSANA DEL VALLE', 'BOLIVAR MATHEUS', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (477, '18023229', 'FRANCISCO ANTONIO', 'VARELA ', 13, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (478, '18032766', 'PABLO JOSE', 'GARCIA ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (479, '18109664', 'ISOANT DE LA PAZ', 'CARRASCO MOLINA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (480, '18128484', 'ANA MARIA', 'COURBENAS VISBAL', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (481, '18129367', 'EDIXON DARIO', 'GARCIA TORRES', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (482, '18133647', 'JOSE MANUEL', 'URBINA ZULETA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (483, '18143871', 'ANA KARINA', 'ROMERO PEREDA', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (484, '18275520', 'MARISELA STEFHANIE', 'SOTO CHIRINOS', 3, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (485, '18331251', 'KENDRY MARIA', 'DE ARBENIA GIL', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (486, '18388211', 'JOSE ANTONIO', 'CONTRERAS RIVERO', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (487, '18413572', 'ARELYS ESTEFANIA', 'COVA BELMONTE', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (488, '18657135', 'ARRAMIGRIS MATSEL', 'FERRERA HERNANDEZ', 18, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (489, '18677006', 'LEUDYSNAVEL WUENDYS', 'PUNGUTA JAIMES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (490, '18707900', 'HERVELY IRENEA', 'JARAMILLO SAVERY', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (491, '18761413', 'CLARA LEINIBETH', 'LOPEZ DE HERNANDEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (492, '18837724', 'EDGARY ELOISA', 'JASPE SILVA', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (493, '18912759', 'RAIZA JOSEFINA', 'ORTIZ DIAZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (494, '19045959', 'LENINA CECILIA', 'MORENO MARCANO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (495, '19153984', 'JESUS ANTONIO', 'NUÑEZ ', 3, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (496, '19160755', 'JEXNI LOREDANA ', 'TORREALBA BARRIENTOS', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (497, '19200347', 'JESUS ALBERTO', 'RANGEL GUARENA', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (498, '19200754', 'HEISEL YESENIA', 'PASTOR ZAMORA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (499, '19201822', 'FRANK GERMAYN', 'FRANQUIZ GONZALEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (500, '19203099', 'NANCY JUNILEE', 'VARGAS PEREZ', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (501, '19314833', 'EHSABET GABRIELA', 'ROJAS RODRIGUEZ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (502, '19338635', 'NAYELIZ CAROLINA', 'FERNANDEZ TORREALBA', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (503, '19374635', 'ROSSMARY CRISTINA', 'HERNANDEZ PARACO', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (504, '19380231', 'MIRNA DEL CARMEN', 'VERA BLANCO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (505, '19421280', 'VIRGINIA DEL VALLE', 'GONZALEZ LACRUZ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (506, '19500866', 'MARLUDYS REBECA', 'BOLIVAR IRAZABAL', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (507, '19575179', 'RAFAEL ALEXANDER', 'NUÑEZ ESCALONA', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (508, '19638684', 'LUIS GUSTAVO', 'MOLINA BENAVENTE', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (509, '19819243', 'VICTOR MANUEL', 'RODRIGUEZ BLANCO', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (510, '19868013', 'FRANZULYS ALEXANDRA', 'MAITA GIL', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (511, '19936484', 'JOSE MANUEL', 'VAAMONDE RANGEL', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (512, '19943495', 'PEDRO ANTONIO', 'HURTADO ANGULO', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (513, '19959538', 'PABLO JOSE', 'RUIZ ROMERO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (514, '20033000', 'SOLIMAR DEL CARMEN', 'RICO ANDRADE', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (515, '20132832', 'MELVICK JOSELYN', 'GAVIDIA GARCIA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (516, '20173340', 'ANAHEIM MORENO', 'MEDINA ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (517, '20174064', 'JENIFER DANIELA', 'GARCIA DIAZ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (518, '20220904', 'VIVIANA PATRICIA', 'SOTO ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (519, '20362854', 'AMAYA CAROLINA', 'CARPINTERO FERREIRA', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (520, '20413360', 'ALEXANDRA CAROLINA', 'PEÑA MELENDEZ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (521, '20568186', 'HUGO RAFAEL', 'GOMEZ SECO', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (522, '20616411', 'MARIANA ANDREINA', 'GONZALEZ LANDER', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (523, '20617291', 'SANDRA LISBHET', 'SANTANDER LAGOS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (524, '20756852', 'ÁNGEL JOEL', 'CASTILLO BRAVO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (525, '20758910', 'ALBARA ESTHER', 'PEÑA ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (526, '20818799', 'NISKEILA ANDREINA', 'DELGADO BRICEÑO', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (527, '20824703', 'ALFONSO DURAN', 'RICO ', 22, 2, 7, 1);
INSERT INTO public.bd_datos VALUES (528, '20826440', 'CARLA ANDREINA', 'BRAVO BAUTISTA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (529, '20910226', 'ANGGER ROXANA', 'RODRIGUEZ LOPEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (530, '20910508', 'JHONALD JOSÉ', 'CABALLERO RAPIO', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (531, '21175611', 'YESENIA CAROLINA ', 'VELASQUEZ JARAMILLO', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (532, '21214641', 'NATASSHA ORTA', 'ONTIVEROS ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (533, '21291527', 'GEMINIS DEL CARMEN', 'DELGADO PEDROZA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (534, '21335175', 'GERMAN DAMASCO', 'CONTRERAS CASTILLO', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (535, '21378061', 'ROSA BERMARY', 'MARQUEZ BELL', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (536, '21411630', 'JOSE MANUEL', 'MENDOZA ACOSTA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (537, '21482298', 'LUIS ENRIQUE', 'CALDERON PAREJO', 10, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (538, '21538070', 'ROSELYN ', 'SANCHEZ ALVAREZ ', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (539, '22028564', 'CINDY ROXANA', 'CASTELLANOS FERNANDEZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (540, '22030722', 'ENYER ALEXANDER', 'BELLO SANCHEZ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (541, '22042502', 'WILL JERFRY', 'MENDOZA REYES', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (542, '22492266', 'MARIBEL LLAMAS', 'FRIAS ', 4, 1, 3, 1);
INSERT INTO public.bd_datos VALUES (543, '22522297', 'MOISES ARMANDO', 'BENITEZ PUERTA', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (544, '22526139', 'ALBERTO LUIS', 'MARTÍNEZ BUATE', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (545, '23658761', 'MARIANO ANTONIO', 'MEDINA MORA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (546, '23661110', 'NELSON RAFAEL', 'ZERPA GUEDEZ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (547, '23689442', 'ADRIANA MARIA', 'ARRIECHI AMUNDARAY', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (548, '23695157', 'JEISON ALEXANDER', 'JASPE ALFONZO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (549, '23709113', 'GLEIDYS SANYILANE', 'POLANCO TEZARA', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (550, '23711023', 'KEYRLING BETZABETH', 'SALCEDO ROJAS', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (551, '23951541', 'MARIANNY SANCHEZ', 'BARRIOS ', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (552, '24088846', 'DAMARIS ALEXANDRA', 'CARVAJAL MENDEZ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (553, '24213843', 'YEMINA MARLIN', 'PIÑANGO BIZOT', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (554, '24238386', 'LUCIA PAOLA', 'MORA PAEZ', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (555, '24284638', 'YULBERT ALEXIS', 'JARAMILLO MISETT', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (556, '24740214', 'ABRAHAM ISAIAS', 'PATIÑO PATIÑO', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (557, '24884028', 'YANETZY YELISNEIDY', 'SANCHEZ VALLENILLA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (558, '24895820', 'GERALDINE ALEXANDRA', 'ANTEQUERA ALZURU', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (559, '24971885', 'YUSBELYS CAROLINA', 'PEREZ LOPEZ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (560, '24982012', 'ILIANIS DAYARYS', 'PALACIOS COLMENARES', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (561, '24992499', 'MILANGELA WALO', 'COLOMBETT ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (562, '25171880', 'MANUEL ISRRAEL', 'TORRES TOCUYO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (563, '25212327', 'FABIOLA ANDREINA', 'BENITEZ RAMIREZ', 8, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (564, '25624446', 'MARLIZT COROMOTO', 'CORDERO FALIVERA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (565, '25814434', 'ZARAY VANESSA', 'PEREZ LINARES', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (566, '25887681', 'FRANKLIN JOSE', 'MARIN ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (567, '26104705', 'EVELYN VERUSKA', 'MONTOYA CASTILLO', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (568, '26184767', 'DAYAIRI DEL AMAZONAS', 'RUIZ LARGO', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (569, '26254885', 'MILEIDIS MARGARITA', 'ESPINOZA SALAS', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (570, '26615633', 'ANABEL DE JESUS', 'ALAYON PAEZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (571, '26647015', 'GENNESIS KARINA', 'ROMERO BOLIVAR', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (572, '26809700', 'YANILKYS ALEJANDRA ', 'LOPEZ HERRERA', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (573, '26838267', 'VICTOR JOSUE', 'BERNAEZ RONDON', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (574, '27013931', 'LISANDRO ADOLFO ', 'CABRERA PINTO', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (575, '27048725', 'ENDHER ALEJANDRO', 'PEÑA MORENO', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (576, '27103645', 'ANDRIS VANESSA', 'LEZAMA ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (577, '27346060', 'JOSUE EDUARDO', 'VARGAS DOMINGUEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (578, '27359060', 'JOSE GREGORIO', 'YBARRA GONZALEZ', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (579, '27474451', 'EDGARY YURUANY', 'GARMENDIA RIVERO', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (580, '27515499', 'ESTHEFANY VALENTINA', 'JIMENÉZ CUBILLÁN', 11, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (581, '27581076', 'STEFANY PAOLA', 'PEREIRA MUJICA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (582, '27598830', 'STEPHANIE GABRIELA', 'ZAMBRANO VARGAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (583, '27606068', 'DANNY ALEJANDRO ', 'COVA ESTUPIÑAN ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (584, '27693463', 'YURIANGEL NAIRIAM', 'FREITES HERNANDEZ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (585, '27802128', 'DERVIS DEL JESUS', 'LEON QUIJADA', 5, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (586, '28092132', 'HAIDEE MARIA JESUS', 'CHIRINO VERGEL', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (587, '28100419', 'NELSIBETH DE LOS ANGELES', 'ROSA VARGAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (588, '28115724', 'VICTOR MANUEL', 'SUAREZ AGUILERA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (589, '28469068', 'DEIKER DAVID', 'ACUÑA BELLO', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (590, '28712047', 'ELISANYELA DEL CARMEN', 'CORDERO JIMENEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (591, '29533037', 'YUSELA FERNANDA', 'HERAZO ARRIOJA', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (592, '29609910', 'JOELYS GABRIELA', 'RAMIREZ PEREZ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (593, '29671908', 'JOSE SANTIAGO', 'MOTA RODRIGUEZ', 21, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (594, '29861899', 'DANIELY RUXELIZ', 'SOSA FERNANDEZ', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (595, '29955478', 'GENESIS ANDREINA', 'NIETO FUENTES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (596, '29990351', 'CESAR ALEJANDRO', 'OROPEZA REYES', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (597, '30011630', 'SEBASTIAN ', 'GOMEZ ', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (598, '30030732', 'WILBERT GABRIEL', 'PEREZ MEJIAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (599, '30032603', 'FRANCISCO JAVIER', 'PRIMERA LLAMAS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (600, '30112418', 'DIEGO ALFREDO', 'VIZCAINO MORLES', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (601, '30153305', 'ARIANNY JOSELIN', 'BERNAEZ CEBALLOS', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (602, '30162445', 'ROSMERI LEMI', 'AGUILERA MELENDEZ', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (603, '30464171', 'AMBAR ', 'NAVAS ', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (604, '30551718', 'YILARY MARIANA', 'MEDINA MARTINEZ', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (605, '30719074', 'ARIADNA ESTEFANIA', 'RODRIGUEZ TOLEDO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (606, '30831617', 'GABRIELA ALEJANDRA', 'MENDEZ ARANGUREN', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (607, '30950357', 'ALTAIR HERNANDEZ', 'CARRILLO ', 8, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (608, '30997670', 'JESUS EDUARDO', 'MORALES FARACO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (609, '31079460', 'DARIAGLIS YARISAY ', 'GUZMAN LINERO', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (610, '31088607', 'YULIANA SARAI', 'BELISARIO VALENZUELA', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (611, '31159951', 'BARBARA JILMARIE', 'PEÑALOZA VALLADARES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (612, '31255600', 'EDRIEN ENRIQUE', 'QUEZADA URBINA', 5, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (613, '31288827', 'IRKARIN GABRIELA', 'VARGAS RODRIGUEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (614, '31323498', 'GISEL ADRIANA', 'CASTRO FARIAS', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (615, '31448413', 'DANIEL DAVID', 'LOPEZ CASTILLO', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (616, '31769477', 'CAMILA MIRELA', 'MADERA NUÑEZ', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (617, '31798072', 'ASHELEY PAOLA', 'RIVERO GOMEZ', 1, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (618, '31863454', 'ANDREA ALEJANDRA ', 'COVUCCI COLMENARES ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (619, '32083091', 'CHRISTIAN ALBERTO', 'BRIZUELA VARGAS', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (620, '32105238', 'HERNAN JOSE', 'LOPEZ MARCANO', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (621, '32375149', 'DANIELA VALENTINA', 'OLIVAR TORRES', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (622, '32397109', 'KEISER ALEJANDRA', 'PATIÑO TORREALBA', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (623, '32514509', 'JOSE DAVID', 'VILLAMIZAR OCHOA', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (624, '83784151', 'DIANA CAROLINA', 'RODRIGUEZ PLAZAS', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (625, '14666299', 'FRANCISCO CESAR ', 'VIELMA DONADO ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (626, '17115877', 'JUAN CARLOS ', 'MARQUEZ CHIRINOS', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (627, '17871051', 'CHARYTIN DE LOS ANGELES ', 'VASQUEZ HERRERA ', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (628, '20841277', 'WENDY YURUBY ', 'BLANCO ABACHE', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (629, '33628648', 'LUZMAR ALEJANDRA ', 'BOGADO GRATEROL', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (630, '11799169', 'JOSMER RAMON ', 'CAMACHO LINARES', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (631, '13066077', 'LIMBERT ELIUT ', 'ALFINGER NEÑEZ ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (632, '13161746', 'HENRY ANTONIO ', 'TOVAR SUTIL', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (633, '14952101', 'NIELYS KARINA ', 'VILLAMIZAR CASTILLO', 10, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (634, '15267368', 'KRICEL CECILIA ', 'BIAGGINI BARRIOS', 13, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (635, '16386227', 'YANELBA DEL VALLE ', 'TIRADO SUAREZ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (636, '16672842', 'HAYMARA CAROLINA ', 'BIZOT PEREZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (637, '19175805', 'ALBANY DESIREE ', 'LOAIZA MUÑOZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (638, '19582183', 'ROSBELY JOSEFINA ', 'VILLARROEL ', 3, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (639, '26590871', 'VERUSCKHA ELIANYX ', 'DUGARTE GUANCHEZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (640, '26751664', 'LIZ DANIELA ', 'ISAQUITA E', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (641, '27493676', 'MISAEL BRYAN ', 'RICO VILAR', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (642, '28547285', 'GIULIANNO JOSE ', 'HERNANDEZ GUARAÑA', 11, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (643, '28593380', 'VICDENEY VICTORIA ', 'VELASQUEZ ALVAREZ', 2, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (644, '29750213', 'BRAYAN JESUS ', 'NAVAS VILLANUEVA', 4, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (645, '30726415', 'SOLIANNY JOSEFINA ', 'LOZADA FLORES', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (646, '31081690', 'OSMAIVER JAVIER ', 'ARIAS BELEÑO', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (647, '30098971', 'ARIANNY LISMAR ', 'PEREZ PONCE', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (648, '31507578', 'LUIS MARIO ', 'ARENAS LACRUZ', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (649, '31872203', 'ANDREA YORGELIS ', 'YAGUARE ALCALA', 6, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (650, '16902860', 'ANDERSON JEAN PIER ', 'HERNANDEZ CAÑIZALEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (651, '20303536', 'CARLOS ENRIQUE ', 'ANDRADE GONZALEZ', 4, 1, 4, 1);
INSERT INTO public.bd_datos VALUES (652, '5217395', 'ANA MARIA ', 'SANJUAN MARTINEZ ', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (653, '8741151', 'YOEL RAFAEL ', 'AMAYA JIMENEZ', 3, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (654, '10489426', 'FRANCISCO JOSE ', 'GARCES DA SILVA', 13, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (655, '11307566', 'ROSA LUISMARY ', 'MEJIA VARELA', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (656, '11513488', 'CAROLIN ', 'MOYA COVA', 12, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (657, '15582949', 'DAMARYS ELISAMA ', 'ALMENAR NORIEGA', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (658, '20862215', 'KATHERINE YAMELIS ', 'LAVIERA NUÑEZ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (659, '5263986', 'FERNANDO ISMAEL ', 'FIGUERA ', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (660, '14033013', 'ORLANDO ENRIQUE ', 'TERAN CHAPMAN', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (661, '18486456', 'JOSMIREY SAIYUBY ', 'ANTEQUERA GONZÁLEZ ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (662, '11048778', 'JESULY  DANIELA ', 'ESPINOZA FIGUERA ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (663, '18810964', 'WILBEL GABRIEL ', 'FREITES REQUNA', 15, 1, 2, 1);
INSERT INTO public.bd_datos VALUES (664, '15612590', 'NELSON ANTONIO ', 'FERNÁNDEZ SUÁREZ ', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (665, '19826108', 'MARÍA DANIELA ', 'RAMÍREZ BENÍTEZ', 6, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (666, '7254740', 'ROGER ASDRUBAL ', 'ESCORIHUELA BLANCO', 4, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (667, '12783493', 'ANGELA ROSA ', 'GUTIERREZ MARQUEZ', 2, 1, 1, 1);
INSERT INTO public.bd_datos VALUES (668, '24042367', 'STEFANY ', 'FERNANDES JARDIN', 12, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (669, '13310430', 'NAIDET LORENA  ', 'LÓPEZ ROMERO', 12, 1, 5, 1);
INSERT INTO public.bd_datos VALUES (670, '17348173', 'LUIS ALBERTO ', 'SUCRE CABRE', 12, 1, 5, 1);


--
-- TOC entry 3745 (class 0 OID 99754)
-- Dependencies: 218
-- Data for Name: bd_departamento; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_departamento VALUES (1, 'departamento', 1);
INSERT INTO public.bd_departamento VALUES (2, 'Oficina De Tecnologias De La Informacion Y La Comunicación --> MEU                                  ', 1);
INSERT INTO public.bd_departamento VALUES (3, 'Oficina De Gestion Humana --> MEU                                                                   ', 1);
INSERT INTO public.bd_departamento VALUES (4, 'Viceministerio Para El Vivir Bien Estudiantil Y La Comunidad Universitaria --> MEU                  ', 1);
INSERT INTO public.bd_departamento VALUES (5, 'Oficina De Gestion Administrativa --> MEU                                                           ', 1);
INSERT INTO public.bd_departamento VALUES (6, 'Direccion De Gestion Comunicacional --> MEU                                                         ', 1);
INSERT INTO public.bd_departamento VALUES (7, 'Direccion General De Despacho --> MEU                                                               ', 1);
INSERT INTO public.bd_departamento VALUES (8, 'Direccion General De Seguridad --> MEU                                                              ', 1);
INSERT INTO public.bd_departamento VALUES (9, 'Viceministerio De Gestion Universitaria --> MEU                                                     ', 1);
INSERT INTO public.bd_departamento VALUES (10, 'Oficina De Planificacion Y Presupuesto --> MEU                                                      ', 1);
INSERT INTO public.bd_departamento VALUES (11, 'Oficna Estrategica De Seguimiento Y Evaluacion De Politicas Publicas --> MEU                        ', 1);
INSERT INTO public.bd_departamento VALUES (12, 'Oficina De Integración Y Asuntos Internacionales --> MEU                                            ', 1);
INSERT INTO public.bd_departamento VALUES (13, 'Consultoria Juridica --> MEU                                                                        ', 1);
INSERT INTO public.bd_departamento VALUES (14, 'Viceministerio Para La Transformacion De La Educacion Universitaria --> MEU                         ', 1);
INSERT INTO public.bd_departamento VALUES (15, 'Oficina Infraestructura Y Planta Fisica --> MEU                                                     ', 1);
INSERT INTO public.bd_departamento VALUES (16, 'Oficina De Atencion Al Ciudadano --> MEU                                                            ', 1);
INSERT INTO public.bd_departamento VALUES (17, 'Auditoria Interna --> MEU                                                                           ', 1);
INSERT INTO public.bd_departamento VALUES (18, 'Area Sustantiva Transitoria --> MEU                                                                 ', 1);
INSERT INTO public.bd_departamento VALUES (19, 'Oficina De Coordinacion Territorial --> MEU                                                         ', 1);
INSERT INTO public.bd_departamento VALUES (20, 'Oficina De Gestion Comunicacional --> MEU                                                           ', 1);
INSERT INTO public.bd_departamento VALUES (21, 'Enfermeria --> MEU                                                                                  ', 1);
INSERT INTO public.bd_departamento VALUES (22, 'Comision De Servicio --> MEU                                                                        ', 1);
INSERT INTO public.bd_departamento VALUES (23, 'Jubilado --> MEU                                                                                    ', 1);
INSERT INTO public.bd_departamento VALUES (24, 'Pensionado --> MEU                                                                                  ', 1);
INSERT INTO public.bd_departamento VALUES (25, 'Caravana --> MEU                                                                                    ', 1);
INSERT INTO public.bd_departamento VALUES (26, 'Adscrito Al Despacho --> MEU                                                                        ', 1);
INSERT INTO public.bd_departamento VALUES (27, 'Almacen Los Cortijos --> MEU                                                                        ', 2);
INSERT INTO public.bd_departamento VALUES (28, 'Area De Correspondencia --> OPSU                                                                    ', 2);
INSERT INTO public.bd_departamento VALUES (29, 'Area De Seguridad --> OPSU                                                                          ', 2);
INSERT INTO public.bd_departamento VALUES (30, 'Asuntos Laborales --> OPSU                                                                          ', 2);
INSERT INTO public.bd_departamento VALUES (31, 'Centro De Tecnologia Sistemas Y Servicios De Informacion --> OPSU                                   ', 2);
INSERT INTO public.bd_departamento VALUES (32, 'Consejo Consultivo Nacional De Postgrado --> OPSU                                                   ', 2);
INSERT INTO public.bd_departamento VALUES (33, 'Consultoria Juridica --> OPSU                                                                       ', 2);
INSERT INTO public.bd_departamento VALUES (34, 'Direccion --> OPSU                                                                                  ', 2);
INSERT INTO public.bd_departamento VALUES (35, 'Oficina De Informacion Y Relaciones Publicas --> OPSU                                               ', 2);
INSERT INTO public.bd_departamento VALUES (36, 'Oficina De Personal --> OPSU                                                                        ', 2);
INSERT INTO public.bd_departamento VALUES (37, 'Planificacion Y Presupuesto --> OPSU                                                                ', 2);
INSERT INTO public.bd_departamento VALUES (38, 'Programa Administrativo Financiero --> OPSU                                                         ', 2);
INSERT INTO public.bd_departamento VALUES (39, 'Programa De Desarrollo Espacial Y Fisico --> OPSU                                                   ', 2);
INSERT INTO public.bd_departamento VALUES (40, 'Programa De Evaluacion Institucional --> OPSU                                                       ', 2);
INSERT INTO public.bd_departamento VALUES (41, 'Programa Nacional De Ingreso --> OPSU                                                               ', 2);
INSERT INTO public.bd_departamento VALUES (42, 'Secretariado Permanente --> OPSU                                                                    ', 2);
INSERT INTO public.bd_departamento VALUES (43, 'Servicios Generales --> OPSU                                                                        ', 2);
INSERT INTO public.bd_departamento VALUES (44, 'Direccion De Administracion De Salud --> OPSU                                                       ', 2);
INSERT INTO public.bd_departamento VALUES (45, 'Unidad Administrativa --> OPSU                                                                      ', 2);
INSERT INTO public.bd_departamento VALUES (46, 'Unidad De Apoyo --> OPSU                                                                            ', 2);
INSERT INTO public.bd_departamento VALUES (47, 'Apoyo Institucional --> OPSU                                                                        ', 2);
INSERT INTO public.bd_departamento VALUES (48, 'Comision De Servicio --> OPSU                                                                       ', 2);
INSERT INTO public.bd_departamento VALUES (49, 'Jubilado --> OPSU                                                                                   ', 2);
INSERT INTO public.bd_departamento VALUES (50, 'Pensionado --> OPSU                                                                                 ', 2);
INSERT INTO public.bd_departamento VALUES (51, 'Honorario Profesionales --> OPSU                                                                    ', 2);
INSERT INTO public.bd_departamento VALUES (52, 'Oficina De Atencion Al Ciudadano --> OPSU                                                           ', 2);
INSERT INTO public.bd_departamento VALUES (53, 'Transporte Opsu --> OPSU                                                                            ', 2);
INSERT INTO public.bd_departamento VALUES (54, 'Auxiliar De Mantenimiento --> OPSU                                                                  ', 4);
INSERT INTO public.bd_departamento VALUES (55, 'Presidencia --> M. Sucre                                                                            ', 4);
INSERT INTO public.bd_departamento VALUES (56, 'Vicepresidencia (Sala Sucre) Miranda  --> M. Sucre                                                  ', 4);
INSERT INTO public.bd_departamento VALUES (57, 'Auditoría Interna  --> M. Sucre                                                                     ', 4);
INSERT INTO public.bd_departamento VALUES (58, 'Consultoría Jurídica  --> M. Sucre                                                                  ', 4);
INSERT INTO public.bd_departamento VALUES (59, 'Dirección De Administración --> M. Sucre                                                            ', 4);
INSERT INTO public.bd_departamento VALUES (60, 'Pensionado --> M. Sucre                                                                             ', 4);
INSERT INTO public.bd_departamento VALUES (61, 'Dirección De Atención Al Ciudadano --> M. Sucre                                                     ', 4);
INSERT INTO public.bd_departamento VALUES (62, 'Dirección De Atención Al Triunfador --> M. Sucre                                                    ', 4);
INSERT INTO public.bd_departamento VALUES (63, 'Dirección De Comunicaciones --> M. Sucre                                                            ', 4);
INSERT INTO public.bd_departamento VALUES (64, 'Dirección De Enlace Y Apoyo Academico --> M. Sucre                                                  ', 4);
INSERT INTO public.bd_departamento VALUES (65, 'Dirección De Infraestructura --> M. Sucre                                                           ', 4);
INSERT INTO public.bd_departamento VALUES (66, 'Dirección De Planificación Y Presupuesto --> M. Sucre                                               ', 4);
INSERT INTO public.bd_departamento VALUES (67, 'Dirección De Servicios Generales --> M. Sucre                                                       ', 4);
INSERT INTO public.bd_departamento VALUES (68, 'Dirección De Tecnología De La Información --> M. Sucre                                              ', 4);
INSERT INTO public.bd_departamento VALUES (69, 'Cuerpo Colegiado Dtto. Capital --> M. Sucre                                                         ', 5);
INSERT INTO public.bd_departamento VALUES (70, 'Presidencia --> FAMES                                                                               ', 5);
INSERT INTO public.bd_departamento VALUES (71, 'Direccion De Gestion Operativa --> FAMES                                                            ', 5);
INSERT INTO public.bd_departamento VALUES (72, 'Direccion De Promocion De La Salud Y Difusion Institucional --> FAMES                               ', 5);
INSERT INTO public.bd_departamento VALUES (73, 'Direccion De Gestion Humana --> FAMES                                                               ', 5);
INSERT INTO public.bd_departamento VALUES (74, 'Consultoria Juridica --> FAMES                                                                      ', 5);
INSERT INTO public.bd_departamento VALUES (75, 'Direccion De Gestion Administrativa Y Financiera --> FAMES                                          ', 5);
INSERT INTO public.bd_departamento VALUES (76, 'Direccion De Planificacion Y Presupuesto --> FAMES                                                  ', 5);
INSERT INTO public.bd_departamento VALUES (77, 'Direccion De Gestion De Tecnologia De La Informacion Y Sistemas --> FAMES                           ', 5);
INSERT INTO public.bd_departamento VALUES (78, 'Auditoria Interna --> FAMES                                                                         ', 3);
INSERT INTO public.bd_departamento VALUES (79, 'Direccion De  Tecnología --> CIM                                                                    ', 3);
INSERT INTO public.bd_departamento VALUES (80, 'Direccion De Planificación, Presupuesto Y Organización --> CIM                                      ', 3);
INSERT INTO public.bd_departamento VALUES (81, 'Dirección De Comunicación --> CIM                                                                   ', 3);
INSERT INTO public.bd_departamento VALUES (82, 'Dirección General De Gestión Y Divulgación De Contenidos --> CIM                                    ', 3);
INSERT INTO public.bd_departamento VALUES (83, 'Direccion General De Interacción Académica --> CIM                                                  ', 3);
INSERT INTO public.bd_departamento VALUES (84, 'Direccion General De Investigaciòn --> CIM                                                          ', 3);
INSERT INTO public.bd_departamento VALUES (85, 'Direccion General De Participación Social Y Desarrollo Territorial --> CIM                          ', 3);
INSERT INTO public.bd_departamento VALUES (86, 'Presidencia --> CIM                                                                                 ', 3);
INSERT INTO public.bd_departamento VALUES (87, 'Direccion General Geopolitica, Integración Y Desarrollo --> CIM                                     ', 3);
INSERT INTO public.bd_departamento VALUES (88, 'Direccion De Gestión De Talento Humano --> CIM                                                      ', 3);
INSERT INTO public.bd_departamento VALUES (89, 'Direccion De Gestión Administrativa --> CIM                                                         ', 3);
INSERT INTO public.bd_departamento VALUES (90, 'Jubilado --> CIM                                                                                    ', 4);
INSERT INTO public.bd_departamento VALUES (91, 'Direccion de Personal -- M. Sucre                                                                   ', 4);
INSERT INTO public.bd_departamento VALUES (92, 'Cuerpos Colegiados (Miranda) --) M. Sucre                                                           ', 4);
INSERT INTO public.bd_departamento VALUES (93, 'Cuerpos Colegiados (La Guaira) --) M. Sucre                                                         ', 6);
INSERT INTO public.bd_departamento VALUES (94, 'PRESIDENCIA Fundacion Dr. Salvador Allende / ELAM                                                   ', 6);
INSERT INTO public.bd_departamento VALUES (95, 'AUDITORIA INTERNA Fundacion Dr. Salvador Allende / ELAM                                             ', 6);
INSERT INTO public.bd_departamento VALUES (96, 'DIRECCION GENERAL DEL DESPACHO Fundacion Dr. Salvador Allende / ELAM                                ', 6);
INSERT INTO public.bd_departamento VALUES (97, 'CONSULTORIA JURIDICA Fundacion Dr. Salvador Allende / ELAM                                          ', 6);
INSERT INTO public.bd_departamento VALUES (98, 'DIRECCION DE RELACIONES INSTERINSTITUCIONALES / ELAM                                                ', 6);
INSERT INTO public.bd_departamento VALUES (99, 'DIRECCIÓN DE GESTIÓN COMUNICACIONAL Fundacion Dr. Salvador Allende / ELAM                           ', 6);
INSERT INTO public.bd_departamento VALUES (100, 'DIRECCIÓN DE ATECION AL CIUDADANO Fundacion Dr. Salvador Allende / ELAM                             ', 6);
INSERT INTO public.bd_departamento VALUES (101, 'DIRECCIÓN DE TECNOLOGÍA E INFORMATICA Fundacion Dr. Salvador Allende / ELAM                         ', 6);
INSERT INTO public.bd_departamento VALUES (102, 'DIRECCIÓN DE PLANIFICACIÓN Y PRESUPUESTO Fundacion Dr. Salvador Allende / ELAM                      ', 6);
INSERT INTO public.bd_departamento VALUES (103, 'DIRECCIÓN DE GESTIÓN HUMANA Fundacion Dr. Salvador Allende / ELAM                                   ', 6);
INSERT INTO public.bd_departamento VALUES (104, 'DIRECCOÓN DE GESTIÓN ADMINISTRATIVA Fundacion Dr. Salvador Allende / ELAM                           ', 6);
INSERT INTO public.bd_departamento VALUES (105, 'DIRECCIÓN DE SERVICIOS GENERALES Fundacion Dr. Salvador Allende / ELAM                              ', 6);
INSERT INTO public.bd_departamento VALUES (106, 'DIRECCIÓN DE SEGURIDAD Fundacion Dr. Salvador Allende / ELAM                                        ', 6);
INSERT INTO public.bd_departamento VALUES (107, 'DIRECCIÓN DE TRANSPORTE Fundacion Dr. Salvador Allende / ELAM                                       ', 6);
INSERT INTO public.bd_departamento VALUES (108, 'DIRECCIÓN DE ACADEMICA Fundacion Dr. Salvador Allende / ELAM                                        ', 6);
INSERT INTO public.bd_departamento VALUES (109, 'DIRECCIÓN DE SECRETARIA Fundacion Dr. Salvador Allende / ELAM                                       ', 6);
INSERT INTO public.bd_departamento VALUES (110, 'DIRECCIÓN DE BIENESTAR ESTUDIANTIL Fundacion Dr. Salvador Allende / ELAM                            ', 6);
INSERT INTO public.bd_departamento VALUES (111, 'DIRECCIÓN GENERAL DE SALUD Fundacion Dr. Salvador Allende / ELAM                                    ', 6);
INSERT INTO public.bd_departamento VALUES (112, 'DIRECCIÓN DE LINEA EJE SAN ANTONIO DE LOS ALTOS Fundacion Dr. Salvador Allende / ELAM               ', 6);
INSERT INTO public.bd_departamento VALUES (113, 'DIRECCIÓN DE LINEA EJE FILA DE MARICHE Fundacion Dr. Salvador Allende / ELAM                        ', 7);
INSERT INTO public.bd_departamento VALUES (114, 'Presidencia --> Fundayacucho                                                                        ', 7);
INSERT INTO public.bd_departamento VALUES (115, 'Direccion Ejecutiva del Despacho --> Fundayacucho                                                   ', 7);
INSERT INTO public.bd_departamento VALUES (116, 'Auditoria Interna --> Fundayacucho                                                                  ', 7);
INSERT INTO public.bd_departamento VALUES (117, 'Direccion General de Talento Humano --> Fundayacucho                                                ', 7);
INSERT INTO public.bd_departamento VALUES (118, 'Consultoria Juridica --> Fundayacucho                                                               ', 7);
INSERT INTO public.bd_departamento VALUES (119, 'Vicepresidencia para el Alba y la Cooperación Internacional --> Fundayacucho                        ', 7);
INSERT INTO public.bd_departamento VALUES (120, 'Vicepresidencia de Becas y Convenios --> Fundayacucho                                               ', 7);
INSERT INTO public.bd_departamento VALUES (121, 'Oficina de Atención Al Ciudadano --> Fundayacucho                                                   ', 7);
INSERT INTO public.bd_departamento VALUES (122, 'Direccion General de Relaciones Interinstitucionales --> Fundayacucho                               ', 7);
INSERT INTO public.bd_departamento VALUES (123, 'Direccion General de Tecnología de la Información  --> Fundayacucho                                 ', 7);
INSERT INTO public.bd_departamento VALUES (124, 'Direccion Ejecutiva de Administración y Finanzas --> Fundayacucho                                   ', 7);
INSERT INTO public.bd_departamento VALUES (125, 'Direccion General de Planificación y Presupuesto  --> Fundayacucho                                  ', 7);
INSERT INTO public.bd_departamento VALUES (126, 'Direccion General de Servicios Generales  --> Fundayacucho                                          ', 7);
INSERT INTO public.bd_departamento VALUES (127, 'Direccion General de Talento Humano (Jubilados) --> Fundayacucho                                    ', 7);
INSERT INTO public.bd_departamento VALUES (128, 'Direccion General de Talento Humano (Pensionados) --> Fundayacucho                                  ', 4);
INSERT INTO public.bd_departamento VALUES (129, 'Jubilados  --> M. Sucre                                                                             ', 8);
INSERT INTO public.bd_departamento VALUES (130, 'PRESIDENCIA --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (131, 'CONSULTORIA JURIDICA --> Fundivit                                                           ', 8);
INSERT INTO public.bd_departamento VALUES (132, 'OFICINA DE GESTION ADMINISTRATIVA --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (133, 'OFICINA DE PLANIFICACION Y PRESUPUESTO --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (134, 'COORDINACION DE PRESUPUESTO --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (135, 'COORDINACION ORGANIZACION Y METODOS --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (136, 'OFICINA DE GESTION HUMANA --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (137, 'OFICINA DE GESTION COMUNICACIONAL --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (138, 'GERENCIA DE ANALISIS ESTADISTICO DEL TRANSPORTE --> Fundivit', 8);
INSERT INTO public.bd_departamento VALUES (139, 'GERENCIA DE PROYECTOS ESTRATEGICOS DE TRANSPORTE --> Fundivit', 8);


--
-- TOC entry 3746 (class 0 OID 99757)
-- Dependencies: 219
-- Data for Name: bd_institucion; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_institucion VALUES (1, 'Ministerio de Educación Universitaria                                                               ');
INSERT INTO public.bd_institucion VALUES (2, 'Oficina de Planificación del Sector Universitario                                                   ');
INSERT INTO public.bd_institucion VALUES (3, 'Centro Internacional Miranda                                                                        ');
INSERT INTO public.bd_institucion VALUES (4, 'Mision Sucre                                                                                        ');
INSERT INTO public.bd_institucion VALUES (5, 'FAMES                                                                                               ');
INSERT INTO public.bd_institucion VALUES (6, 'ELAM                                                                                                ');
INSERT INTO public.bd_institucion VALUES (7, 'FUNDAYACUCHO                                                                                        ');
INSERT INTO public.bd_institucion VALUES (8, 'LA FUNDACIÓN VENEZOLANA DE INVESTIGACIÓN, DESARROLLO E INNOVACIÓN PARA EL TRANSPORTE');


--
-- TOC entry 3747 (class 0 OID 99761)
-- Dependencies: 220
-- Data for Name: bd_tipopersonal; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_tipopersonal VALUES (1, 'Empleado Fijo            ');
INSERT INTO public.bd_tipopersonal VALUES (2, 'Empleado Contratado      ');
INSERT INTO public.bd_tipopersonal VALUES (3, 'Obrero Fijo              ');
INSERT INTO public.bd_tipopersonal VALUES (4, 'Obrero Contratado        ');
INSERT INTO public.bd_tipopersonal VALUES (5, 'Comisión de Servicio     ');
INSERT INTO public.bd_tipopersonal VALUES (6, 'Apoyo Institucional      ');
INSERT INTO public.bd_tipopersonal VALUES (7, 'Jubilado                 ');
INSERT INTO public.bd_tipopersonal VALUES (8, 'Pensionado               ');
INSERT INTO public.bd_tipopersonal VALUES (9, 'Contratado HP            ');


--
-- TOC entry 3799 (class 0 OID 114747)
-- Dependencies: 272
-- Data for Name: carga_masiva; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3748 (class 0 OID 99765)
-- Dependencies: 221
-- Data for Name: cita; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.cita VALUES (1, 11, 11, '2026-08-25 22:31:29+00', '2026-08-25', 21, 2, 79, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (2, 12, 12, '2026-08-25 22:32:13.35+00', '2026-08-25', 25, 1, 79, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (3, 13, 13, '2026-08-25 22:32:50.04+00', '2026-08-25', 21, 3, 72, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (4, 14, 14, '2026-08-31 10:06:21+00', '2026-08-31', 1, 1, 72, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (5, 15, 15, '2026-08-31 16:07:11.43+00', '2026-08-31', 14, 3, 65, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (6, 16, 16, '2026-08-31 16:12:38.74+00', '2026-08-31', 12, 3, 63, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (7, 17, 17, '2026-09-02 12:08:46.72+00', '2026-09-02', 7, 1, 86, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (8, 18, 18, '2026-09-02 14:16:34.61+00', '2026-08-31', 2, 3, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (9, 19, 19, '2026-09-02 14:40:25.93+00', '2026-09-02', 1, 1, 51, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (10, 20, 20, '2026-09-02 14:47:16.66+00', '2026-09-02', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (11, 21, 21, '2026-09-02 14:57:06.82+00', '2026-09-02', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (12, 22, 22, '2026-09-02 16:09:05.38+00', '2026-09-02', 3, 1, 54, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (13, 23, 23, '2026-09-03 13:25:54.58+00', '2026-09-03', 1, 1, 60, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (14, 24, 24, '2026-09-03 13:59:49.27+00', '2026-09-03', 3, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (15, 25, 25, '2026-09-03 14:25:24.68+00', '2026-09-03', 2, 1, 51, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (16, 26, 26, '2026-09-03 14:32:44.39+00', '2026-09-03', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (17, 27, 27, '2026-09-03 14:45:25.94+00', '2026-09-03', 5, 1, 51, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (18, 28, 28, '2026-09-03 14:50:51.93+00', '2026-09-03', 2, 1, 52, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (19, 29, 29, '2026-09-03 14:51:34.14+00', '2026-09-03', 1, 1, 53, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (20, 30, 30, '2026-09-03 14:52:53.1+00', '2026-09-03', 2, 1, 54, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (21, 31, 31, '2026-09-03 14:58:24.98+00', '2011-06-14', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (22, 32, 32, '2026-09-03 15:16:04.16+00', '2026-09-17', 3, 5, 84, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (23, 33, 33, '2026-09-03 15:33:34.92+00', '2026-09-03', 3, 1, 58, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (24, 34, 34, '2026-09-03 15:35:08.19+00', '2026-09-03', 6, 1, 51, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (25, 35, 35, '2026-09-04 14:58:22.28+00', '2026-09-04', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (26, 36, 36, '2026-09-09 13:52:33.35+00', '2026-09-09', 14, 1, 64, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (27, 37, 37, '2026-09-09 14:41:17.04+00', '2023-08-08', 13, 1, 62, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (28, 38, 38, '2026-09-10 13:41:50.46+00', '2026-09-11', 1, 1, 50, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (29, 39, 39, '2026-09-14 12:52:56.77+00', '2026-09-14', 13, 1, 52, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (30, 40, 40, '2026-09-14 12:55:32+00', '2026-09-14', 12, 1, 63, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (31, 41, 41, '2026-09-14 13:32:51.27+00', '2026-09-14', 1, 1, 53, NULL, 1, NULL, 0);


--
-- TOC entry 3750 (class 0 OID 99769)
-- Dependencies: 223
-- Data for Name: coordinacion; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.coordinacion VALUES (1, 'COORDINACION DEL DESPACHO', '', 36, 1);
INSERT INTO public.coordinacion VALUES (2, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 36, 1);
INSERT INTO public.coordinacion VALUES (3, 'COORDINACION DE SALA SITUACIONAL 1 X 10', '', 36, 1);
INSERT INTO public.coordinacion VALUES (4, 'COORDINACION DE CORRESPONDENCIA Y ARCHIVO', '', 36, 1);
INSERT INTO public.coordinacion VALUES (5, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 1, 1);
INSERT INTO public.coordinacion VALUES (6, 'COORDINACIÓN DE PARTICIPACIÓN ESTUDIANTIL', '', 4, 1);
INSERT INTO public.coordinacion VALUES (7, 'COORDINACIÓN DE SEGUIMIENTO DEL SECTOR UNIVERSITARIO', '', 4, 1);
INSERT INTO public.coordinacion VALUES (8, 'COORDINACION DE SERVICIOS ESTUDIANTILES', '', 5, 1);
INSERT INTO public.coordinacion VALUES (9, 'COORDINACIÓN DEL DESPACHO', '', 6, 1);
INSERT INTO public.coordinacion VALUES (10, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 6, 1);
INSERT INTO public.coordinacion VALUES (11, 'COORDINACION DE OFERTA ACADEMICA DEL SUBSISTEMA DE EDUCACION UNIVERSITARIA', '', 7, 1);
INSERT INTO public.coordinacion VALUES (12, 'COORDINACION DE PLANIFICACION Y ANALISIS PROSPECTIVO DEL DESPACHO DE GESTION UNIVERSITARIA', '', 7, 1);
INSERT INTO public.coordinacion VALUES (13, 'COORDINACION DE SEGUIMIENTO Y SUPERVICION DE LA EDUCACION MUNICIPALIZADA', '', 8, 1);
INSERT INTO public.coordinacion VALUES (14, 'COORDINACION DE FORTALECIMIENTO DE LA EDUCACION MUNICIPALIZADA Y OTROS PROGRAMAS DE INCLUSION', '', 8, 1);
INSERT INTO public.coordinacion VALUES (15, 'COORDINACION DE SUPERVISION Y SEGUIMIENTO DE INSTITUCIONES DE EDUCACION UNIVERSITARIA DE GESTION PRIVADA', '', 9, 1);
INSERT INTO public.coordinacion VALUES (16, 'COORDINACION DE TRAMITES UNIVERSITARIOS', '', 9, 1);
INSERT INTO public.coordinacion VALUES (17, 'PERSONAL EN COMISIÓN DE SERVICIO', '', 6, 1);
INSERT INTO public.coordinacion VALUES (18, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 10, 1);
INSERT INTO public.coordinacion VALUES (19, 'COORDINACION DE DOCTRINAS Y DICTAMENES', '', 14, 1);
INSERT INTO public.coordinacion VALUES (20, 'COORDINACION DE INSTRUMENTARIA JURIDICA', '', 16, 1);
INSERT INTO public.coordinacion VALUES (21, 'COORDINACION DE SEGUIMIENTO DEL SECTOR UNIVERSITARIO', '', 17, 1);
INSERT INTO public.coordinacion VALUES (22, 'COORDINACION DE ANALISIS Y SEGUIMIENTO SOCIOPOLITICO', '', 17, 1);
INSERT INTO public.coordinacion VALUES (23, 'COORDINACION DE ANALISIS DE IMPACTO Y DEFINICION DE ESCENARIOS', '', 17, 1);
INSERT INTO public.coordinacion VALUES (24, 'COORDINACION DE CONSOLIDACION ESTADISTICA', '', 17, 1);
INSERT INTO public.coordinacion VALUES (25, 'COORDINACION ATENCION INTEGRAL', '', 37, 1);
INSERT INTO public.coordinacion VALUES (26, 'COORDINACION DE SEGUIMIENTO Y CONTROL DE LA GESTION', '', 37, 1);
INSERT INTO public.coordinacion VALUES (27, 'COORDINACION PARA EL FORTALECIMIENTO DEL PODER POPULAR', '', 37, 1);
INSERT INTO public.coordinacion VALUES (28, 'COORDINACION DE PRENSA', '', 19, 1);
INSERT INTO public.coordinacion VALUES (29, 'COORDINACION DE CONTROL DE GESTION', '', 23, 1);
INSERT INTO public.coordinacion VALUES (30, 'COORDINACION DE ENTES ADSCRITO', '', 24, 1);
INSERT INTO public.coordinacion VALUES (31, 'COORDINACION DE DESARROLLO ORGANIZACIONAL', '', 25, 1);
INSERT INTO public.coordinacion VALUES (32, 'COORDINACION DE OPTIMIZACION DE PROCESOS', '', 25, 1);
INSERT INTO public.coordinacion VALUES (33, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 26, 1);
INSERT INTO public.coordinacion VALUES (34, 'COORDINACIÓN DE RECLUTAMIENTO Y SELECCIÓN', '', 26, 1);
INSERT INTO public.coordinacion VALUES (35, 'COORDINACIÓN DE EGRESO Y CONTROL DEL SISROE', '', 26, 1);
INSERT INTO public.coordinacion VALUES (36, 'COORDINACIÓN DE ADIESTRAMIENTO Y EVALUACIÓN DE DESEMPEÑO', '', 26, 1);
INSERT INTO public.coordinacion VALUES (37, 'COORDINACIÓN DE ARCHIVO', '', 26, 1);
INSERT INTO public.coordinacion VALUES (38, 'COORDINACIÓN DE BIENESTAR SOCIAL', '', 27, 1);
INSERT INTO public.coordinacion VALUES (39, 'COORDINACIÓN DE PROCESOS DE JUBILACIONES', '', 27, 1);
INSERT INTO public.coordinacion VALUES (40, 'COORDINACIÓN TÉCNICO ADMINISTRATIVO', '', 27, 1);
INSERT INTO public.coordinacion VALUES (41, 'COORDINACIÓN DE HIGIENE Y SEGURIDAD INDUSTRIAL', '', 27, 1);
INSERT INTO public.coordinacion VALUES (42, 'COORDINACIÓN DE PRESUPUESTO Y MAQUETAS', '', 28, 1);
INSERT INTO public.coordinacion VALUES (43, 'COORDINACIÓN DE NÓMINA', '', 28, 1);
INSERT INTO public.coordinacion VALUES (44, 'COORDINACIÓN DE PRESTACIONES SOCIALES Y LIQUIDACIONES', '', 28, 1);
INSERT INTO public.coordinacion VALUES (45, 'COORDINACIÓN DE APOYO TÉCNICO A LAS UNIVERSIDADES', '', 29, 1);
INSERT INTO public.coordinacion VALUES (46, 'COORDINACIÓN DE ASISTENCIA Y SALUD', '', 30, 1);
INSERT INTO public.coordinacion VALUES (47, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 41, 1);
INSERT INTO public.coordinacion VALUES (48, 'COORDINACIÓN DE TESORERÍA', '', 31, 1);
INSERT INTO public.coordinacion VALUES (49, 'COORDINACIÓN DE CONTABILIDAD', '', 31, 1);
INSERT INTO public.coordinacion VALUES (50, 'COORDINACIÓN DE COMPRAS', '', 31, 1);
INSERT INTO public.coordinacion VALUES (51, 'COORDINACIÓN GENERAL DE LOS ALMACÉNES', '', 31, 1);
INSERT INTO public.coordinacion VALUES (52, 'COORDINACIÓN DE SERVICIOS GENERALES', '', 32, 1);
INSERT INTO public.coordinacion VALUES (53, 'COORDINACIÓN DE TRANSPORTE', '', 32, 1);
INSERT INTO public.coordinacion VALUES (54, 'COORDINACIÓN DE ARCHIVO CORRESPONDENCIA Y REPRODUCCIÓN', '', 32, 1);
INSERT INTO public.coordinacion VALUES (55, 'COORDINACIÓN DE BIENES', '', 33, 1);
INSERT INTO public.coordinacion VALUES (56, 'COORDINACIÓN DE SEGURIDAD INTEGRAL', '', 34, 1);
INSERT INTO public.coordinacion VALUES (57, 'COORDINACION DE CONTROL Y SEGUIMIENTO', '', 38, 1);
INSERT INTO public.coordinacion VALUES (58, 'COORDINACIÓN DE INFRAESTRUCTURA TECNOLÓGICA Y SERVICIOS', '', 38, 1);
INSERT INTO public.coordinacion VALUES (59, 'COORDINACIÓN DE SOPORTE TÉCNICO', '', 38, 1);
INSERT INTO public.coordinacion VALUES (60, 'COORDINACIÓN DE DESARROLLO', '', 38, 1);
INSERT INTO public.coordinacion VALUES (61, 'COORDINACIÓN DE AMERICA Y EL CARIBE', '', 35, 1);
INSERT INTO public.coordinacion VALUES (62, 'COORDINACIÓN DE ASIA MEDIO ORIENTE Y OCEANIA', '', 35, 1);
INSERT INTO public.coordinacion VALUES (63, 'COORDINACIÓN DE EUROPA Y AFRICA', '', 35, 1);
INSERT INTO public.coordinacion VALUES (64, 'SIN ESPECIFICAR', '', 39, 1);
INSERT INTO public.coordinacion VALUES (66, 'SIN ESPECIFICAR', '', 41, 1);
INSERT INTO public.coordinacion VALUES (67, 'COORDINACIÓN NACIONAL DE CONSEJOS UNIVERSITARIOS', 'CEGU', 36, 1);
INSERT INTO public.coordinacion VALUES (71, 'ÁREA DE TRANSPORTE', '', 46, 1);
INSERT INTO public.coordinacion VALUES (72, 'ÁREA DE CORRESPONDENCIA', '', 46, 1);
INSERT INTO public.coordinacion VALUES (73, 'CONTROL PRESUPUESTARIO', '', 47, 1);
INSERT INTO public.coordinacion VALUES (74, 'DEPARTAMENTO DE SOPORTE TÉCNICO', '', 48, 1);
INSERT INTO public.coordinacion VALUES (75, 'DEPARTAMENTO DE DESARROLLO', '', 48, 1);
INSERT INTO public.coordinacion VALUES (76, 'DEPARTAMENTO DE TELECOMUNICACIONES', '', 48, 1);
INSERT INTO public.coordinacion VALUES (77, 'ÁREA DE PRESUPUESTO', '', 49, 1);
INSERT INTO public.coordinacion VALUES (78, 'ÁREA DE ADMINISTRACIÓN DE PERSONAL', '', 49, 1);
INSERT INTO public.coordinacion VALUES (79, 'ÁREA DE INGRESO Y DESARROLLO', '', 49, 1);
INSERT INTO public.coordinacion VALUES (80, 'ÁREA DE BIENESTAR SOCIAL', '', 49, 1);
INSERT INTO public.coordinacion VALUES (81, 'PLANIFICACIÓN', '', 50, 1);
INSERT INTO public.coordinacion VALUES (82, 'PRESUPUESTO', '', 50, 1);
INSERT INTO public.coordinacion VALUES (83, 'SEGUIMIENTO ANÁLISIS Y CONTROL', '', 50, 1);
INSERT INTO public.coordinacion VALUES (84, 'ASESORÍA LABORAL', '', 50, 1);
INSERT INTO public.coordinacion VALUES (85, 'ÁREA DE APOYO A LA COORDINACIÓN', '', 51, 1);
INSERT INTO public.coordinacion VALUES (86, 'ÁREA DE ATENCIÓN A LAS Y LOS USUARIOS', '', 51, 1);
INSERT INTO public.coordinacion VALUES (87, 'ÁREA DE EXPLORACIÓN VOCACIONAL', '', 51, 1);
INSERT INTO public.coordinacion VALUES (88, 'ÁREA DE GESTIÓN Y ACOMPAÑAMIENTO A REGIONES', '', 51, 1);
INSERT INTO public.coordinacion VALUES (89, 'ÁREA DE CONTROL DE DATOS Y REGISTROS ESTADÍSTICOS', '', 51, 1);
INSERT INTO public.coordinacion VALUES (90, 'DEPARTAMENTO DE ESTADÍSTICA', '', 52, 1);
INSERT INTO public.coordinacion VALUES (91, 'CENIDES', '', 52, 1);
INSERT INTO public.coordinacion VALUES (92, 'FONDO EDITORIAL', '', 52, 1);
INSERT INTO public.coordinacion VALUES (93, 'ALMACÉN LOS CORTIJOS', '', 31, 1);
INSERT INTO public.coordinacion VALUES (94, 'COORDINACIÓN DE ALMACÉN', '', 42, 1);
INSERT INTO public.coordinacion VALUES (100, 'SIN ESPECIFICAR', '', 38, 1);
INSERT INTO public.coordinacion VALUES (101, 'SIN ESPECIFICAR', '', 48, 1);
INSERT INTO public.coordinacion VALUES (102, 'SIN ESPECIFICAR', '', 45, 1);
INSERT INTO public.coordinacion VALUES (104, 'SIN ESPECIFICAR', '', 60, 1);
INSERT INTO public.coordinacion VALUES (105, 'SIN ESPECIFICAR', '', 44, 1);
INSERT INTO public.coordinacion VALUES (106, 'SIN ESPECIFICAR', '', 46, 1);
INSERT INTO public.coordinacion VALUES (107, 'SIN ESPECIFICAR', '', 61, 1);
INSERT INTO public.coordinacion VALUES (108, 'SIN ESPECIFICAR', '', 62, 1);
INSERT INTO public.coordinacion VALUES (109, 'SIN ESPECIFICAR', '', 11, 1);
INSERT INTO public.coordinacion VALUES (110, 'SIN ESPECIFICAR', '', 12, 1);
INSERT INTO public.coordinacion VALUES (111, 'SIN ESPECIFICAR', '', 13, 1);
INSERT INTO public.coordinacion VALUES (112, 'SIN ESPECIFICAR', '', 2, 1);
INSERT INTO public.coordinacion VALUES (113, 'SIN ESPECIFICAR', '', 3, 1);
INSERT INTO public.coordinacion VALUES (114, 'SIN ESPECIFICAR', '', 63, 1);
INSERT INTO public.coordinacion VALUES (115, 'SIN ESPECIFICAR', '', 18, 1);
INSERT INTO public.coordinacion VALUES (116, 'SIN ESPECIFICAR', '', 64, 1);
INSERT INTO public.coordinacion VALUES (117, 'SIN ESPECIFICAR', '', 65, 1);
INSERT INTO public.coordinacion VALUES (118, 'SIN ESPECIFICAR', '', 66, 1);
INSERT INTO public.coordinacion VALUES (119, 'SIN ESPECIFICAR', '', 15, 1);
INSERT INTO public.coordinacion VALUES (120, 'SIN ESPECIFICAR', '', 67, 1);
INSERT INTO public.coordinacion VALUES (121, 'SIN ESPECIFICAR', '', 20, 1);
INSERT INTO public.coordinacion VALUES (122, 'SIN ESPECIFICAR', '', 22, 1);
INSERT INTO public.coordinacion VALUES (123, 'SIN ESPECIFICAR', '', 21, 1);
INSERT INTO public.coordinacion VALUES (124, 'SIN ESPECIFICAR', '', 68, 1);
INSERT INTO public.coordinacion VALUES (125, 'SIN ESPECIFICAR', '', 69, 1);
INSERT INTO public.coordinacion VALUES (126, 'SIN ESPECIFICAR', '', 70, 1);
INSERT INTO public.coordinacion VALUES (127, 'SIN ESPECIFICAR', '', 71, 1);
INSERT INTO public.coordinacion VALUES (128, 'SIN ESPECIFICAR', '', 72, 1);
INSERT INTO public.coordinacion VALUES (129, 'SIN ESPECIFICAR', '', 73, 1);
INSERT INTO public.coordinacion VALUES (130, 'SIN ESPECIFICAR', '', 74, 1);
INSERT INTO public.coordinacion VALUES (131, 'SIN ESPECIFICAR', '', 75, 1);
INSERT INTO public.coordinacion VALUES (132, 'SIN ESPECIFICAR', '', 76, 1);
INSERT INTO public.coordinacion VALUES (134, 'SIN ESPECIFICAR', '', 78, 1);
INSERT INTO public.coordinacion VALUES (135, 'SIN ESPECIFICAR', '', 79, 1);
INSERT INTO public.coordinacion VALUES (136, 'SIN ESPECIFICAR', '', 80, 1);
INSERT INTO public.coordinacion VALUES (137, 'SIN ESPECIFICAR', '', 81, 1);
INSERT INTO public.coordinacion VALUES (138, 'SIN ESPECIFICAR', '', 82, 1);
INSERT INTO public.coordinacion VALUES (139, 'SIN ESPECIFICAR', '', 43, 1);
INSERT INTO public.coordinacion VALUES (140, 'SIN ESPECIFICAR', '', 83, 1);
INSERT INTO public.coordinacion VALUES (141, 'SIN ESPECIFICAR', '', 84, 1);
INSERT INTO public.coordinacion VALUES (142, 'SIN ESPECIFICAR', '', 85, 1);
INSERT INTO public.coordinacion VALUES (143, 'SIN ESPECIFICAR', '', 86, 1);
INSERT INTO public.coordinacion VALUES (145, 'SIN ESPECIFICAR', '', 87, 1);
INSERT INTO public.coordinacion VALUES (146, 'SIN ESPECIFICAR', '', 25, 1);
INSERT INTO public.coordinacion VALUES (147, 'SIN ESPECIFICAR', '', 26, 1);
INSERT INTO public.coordinacion VALUES (148, 'SIN ESPECIFICAR', '', 27, 1);
INSERT INTO public.coordinacion VALUES (149, 'SIN ESPECIFICAR', '', 93, 1);
INSERT INTO public.coordinacion VALUES (150, 'SIN ESPECIFICAR', '', 17, 1);
INSERT INTO public.coordinacion VALUES (151, 'SIN ESPECIFICAR', '', 89, 1);
INSERT INTO public.coordinacion VALUES (152, 'SIN ESPECIFICAR', '', 33, 1);
INSERT INTO public.coordinacion VALUES (153, 'SIN ESPECIFICAR', '', 31, 1);
INSERT INTO public.coordinacion VALUES (154, 'SIN ESPECIFICAR', '', 34, 1);
INSERT INTO public.coordinacion VALUES (155, 'SIN ESPECIFICAR', '', 10, 1);
INSERT INTO public.coordinacion VALUES (156, 'SIN ESPECIFICAR', '', 47, 1);
INSERT INTO public.coordinacion VALUES (157, 'SIN ESPECIFICAR', '', 91, 1);
INSERT INTO public.coordinacion VALUES (158, 'SIN ESPECIFICAR', '', 5, 1);
INSERT INTO public.coordinacion VALUES (159, 'SIN ESPECIFICAR', '', 96, 1);
INSERT INTO public.coordinacion VALUES (160, 'SIN ESPECIFICAR', '', 19, 1);
INSERT INTO public.coordinacion VALUES (161, 'SIN ESPECIFICAR', '', 52, 1);
INSERT INTO public.coordinacion VALUES (162, 'SIN ESPECIFICAR', '', 37, 1);
INSERT INTO public.coordinacion VALUES (163, 'SIN ESPECIFICAR', '', 32, 1);
INSERT INTO public.coordinacion VALUES (164, 'SIN ESPECIFICAR', '', 24, 1);
INSERT INTO public.coordinacion VALUES (165, 'SIN ESPECIFICAR', '', 8, 1);
INSERT INTO public.coordinacion VALUES (166, 'SIN ESPECIFICAR', '', 28, 1);
INSERT INTO public.coordinacion VALUES (167, 'SIN ESPECIFICAR', '', 94, 1);
INSERT INTO public.coordinacion VALUES (168, 'SIN ESPECIFICAR', '', 30, 1);
INSERT INTO public.coordinacion VALUES (169, 'SIN ESPECIFICAR', '', 95, 1);
INSERT INTO public.coordinacion VALUES (170, 'SIN ESPECIFICAR', '', 50, 1);
INSERT INTO public.coordinacion VALUES (171, 'SIN ESPECIFICAR', '', 51, 1);
INSERT INTO public.coordinacion VALUES (172, 'SIN ESPECIFICAR', '', 42, 1);
INSERT INTO public.coordinacion VALUES (173, 'SIN ESPECIFICAR', '', 90, 1);
INSERT INTO public.coordinacion VALUES (174, 'SIN ESPECIFICAR', '', 6, 1);
INSERT INTO public.coordinacion VALUES (175, 'SIN ESPECIFICAR', '', 29, 1);
INSERT INTO public.coordinacion VALUES (176, 'SIN ESPECIFICAR', '', 16, 1);
INSERT INTO public.coordinacion VALUES (177, 'SIN ESPECIFICAR', '', 36, 1);
INSERT INTO public.coordinacion VALUES (178, 'SIN ESPECIFICAR', '', 4, 1);
INSERT INTO public.coordinacion VALUES (179, 'SIN ESPECIFICAR', '', 92, 1);
INSERT INTO public.coordinacion VALUES (180, 'SIN ESPECIFICAR', '', 23, 1);
INSERT INTO public.coordinacion VALUES (181, 'SIN ESPECIFICAR', '', 1, 1);
INSERT INTO public.coordinacion VALUES (182, 'SIN ESPECIFICAR', '', 49, 1);
INSERT INTO public.coordinacion VALUES (183, 'SIN ESPECIFICAR', '', 14, 1);
INSERT INTO public.coordinacion VALUES (184, 'SIN ESPECIFICAR', '', 35, 1);
INSERT INTO public.coordinacion VALUES (185, 'SIN ESPECIFICAR', '', 9, 1);
INSERT INTO public.coordinacion VALUES (186, 'SIN ESPECIFICAR', '', 88, 1);
INSERT INTO public.coordinacion VALUES (187, 'SIN ESPECIFICAR', '', 7, 1);
INSERT INTO public.coordinacion VALUES (65, 'SIN ESPECIFICAR', '', 47, 1);
INSERT INTO public.coordinacion VALUES (133, 'SIN ESPECIFICAR', '', 85, 1);
INSERT INTO public.coordinacion VALUES (188, 'SIN ESPECIFICAR', '', 97, 1);
INSERT INTO public.coordinacion VALUES (68, 'SIN ESPECIFICAR', '', 98, 1);
INSERT INTO public.coordinacion VALUES (69, 'SIN ESPECIFICAR', '', 99, 1);
INSERT INTO public.coordinacion VALUES (144, 'SIN ESPECIFICAR', '', 100, 1);


--
-- TOC entry 3752 (class 0 OID 99773)
-- Dependencies: 225
-- Data for Name: direccion_general; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.direccion_general VALUES (15, 'OFICINA DE GESTIÓN ADMINISTRATIVA', '', 'TORRE MINCYT PISO 8', 9, 1);
INSERT INTO public.direccion_general VALUES (16, 'DIRECCIÓN DE GESTIÓN HUMANA', '', 'TORRE MINCYT PISO 7', 9, 1);
INSERT INTO public.direccion_general VALUES (17, 'VICEMINISTERIO PARA LA TRANSFORMACIÓN DE LA EDUCACIÓN UNIVERSITARIA', '', 'TORRE OPSU PISO 7', 9, 1);
INSERT INTO public.direccion_general VALUES (18, 'VICEMINISTERIO PARA LA GESTIÓN UNIVERSITARIA', '', 'TORRE OPSU PISO 10', 9, 1);
INSERT INTO public.direccion_general VALUES (19, 'VICEMINISTERIO DEL VIVIR BIEN PARA LA COMUNIDAD UNIVERSITARIA', '', 'TORRE OPSU PISO 12', 9, 1);
INSERT INTO public.direccion_general VALUES (20, 'DIRECCIÓN GENERAL DE PARTICIPACIÓN ESTUDIANTIL', '', 'TORRE MINCYT PISO 13', 9, 1);
INSERT INTO public.direccion_general VALUES (22, 'OFICINA ESTRATÉGICA DE GESTIÓN Y SEGUIMIENTO DE POLÍTICAS PÚBLICAS', '', 'TORRE MINCYT PISO 13', 9, 1);
INSERT INTO public.direccion_general VALUES (23, 'AUDITORÍA INTERNA', '', 'TORRE MINCYT PISO 8', 9, 1);
INSERT INTO public.direccion_general VALUES (24, 'OFICINA DE TECNOLOGÍA DE LA INFORMACIÓN Y LA COMUNICACIÓN', '', 'TORRE MINCYT PISO 8', 9, 1);
INSERT INTO public.direccion_general VALUES (25, 'OFICINA DE INTEGRACIÓN Y ASUNTOS INTERNACIONALES', '', 'TORRE OPSU PISO 10', 9, 1);
INSERT INTO public.direccion_general VALUES (26, 'DIRECCIÓN GENERAL DEL SISTEMA NACIONAL DE SERVICIOS ESTUDIANTILES', '', 'TORRE MINCYT PISO 13', 9, 1);
INSERT INTO public.direccion_general VALUES (27, 'DIRECCIÓN GENERAL DE GESTIÓN PRODUCTIVA', '', 'TORRE OPSU PISO 6', 9, 1);
INSERT INTO public.direccion_general VALUES (34, 'CONSULTORÍA JURÍDICA', '', 'TORRE OPSU', 9, 1);
INSERT INTO public.direccion_general VALUES (36, 'DIRECCIÓN GENERAL DEL DESPACHO', '', 'TORRE OPSU PISO 1', 9, 1);
INSERT INTO public.direccion_general VALUES (37, 'DESPACHO DEL MINISTRO', '', 'TORRE OPSU PISO 1', 9, 1);
INSERT INTO public.direccion_general VALUES (38, 'OFICINA DE ATENCIÓN CIUDADANA', '', 'TORRE OPSU MZZ1', 9, 1);
INSERT INTO public.direccion_general VALUES (40, 'OFICINA DE PLANIFICACIÓN Y PRESUPUESTO', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (44, 'DIRECCIÓN GENERAL DE VINCULACIÓN COMUNITARIA Y PRODUCTIVA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (45, 'OFICINA DE GESTIÓN COMUNICACIONAL', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (46, 'COORDINACIÓN NACIONAL TERRITORIAL DE GESTIÓN UNIVERSITARIA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (47, 'DIRECCIÓN GENERAL DE ASISTENCIA INTEGRAL AL TRABAJADOR UNIVERSITARIO', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (48, 'DIRECCIÓN GENERAL DEL VIVIR BIEN DE DEPORTE Y RECREACIÓN', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (49, 'DIRECCIÓN GENERAL DE PLANIFICACIÓN PARA LA GESTIÓN UNIVERSITARIA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (50, 'DIRECCIÓN GENERAL PARA LA CALIDAD DE LA GESTIÓN UNIVERSITARIA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (51, 'DIRECCIÓN GENERAL DE SUPERVICION PARA LA GESTIÓN UNIVERSITARIA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (52, 'DIRECCIÓN GENERAL DE PLANIFICACIÓN Y DESARROLLO ACADÉMICO INTEGRAL UNIVERSITARIO', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (53, 'DIRECCIÓN GENERAL DE CREACIÓN INTELECTUAL', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (55, 'CONSULTORÍA JURÍDICA DE SECRETARIADO PERMANENTE', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (56, 'UNIDAD DE EVALUACIÓN DE SECRETARIADO PERMANENTE', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (57, 'CONSEJO CONSULTIVO NACIONAL DE POSTGRADO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (58, 'DIRECCIÓN ADJUNTA', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (59, 'JEFATURA DE UNIDAD', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (60, 'CONSULTORÍA JURÍDICA', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (61, 'AUDITORIA INTERNA', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (62, 'OFICINA DE ATENCIÓN AL CIUDADANO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (63, 'OFICINA DE INFORMACIÓN Y RELACIONES PÚBLICAS', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (64, 'UNIDAD ADMINISTRATIVA', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (65, 'DEPARTAMENTO DE ASISTENCIA Y SALUD', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (66, 'OFICINA DE PLANIFICACIÓN Y PRESUPUESTO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (67, 'OFICINA DE ARCHIVO INTERMEDIO Y GESTIÓN DOCUMENTAL', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (68, 'COORDINACIÓN DE TECNOLOGÍA Y SISTEMAS DE INFORMACIÓN', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (69, 'DEPARTAMENTO DE PERSONAL', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (70, 'PROGRAMA ADMINISTRATIVO FINANCIERO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (71, 'PROGRAMA DESARROLLO ESPACIAL Y FÍSICO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (72, 'PROGRAMA NACIONAL DE INGRESO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (73, 'UNIDAD DE APOYO', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (74, 'PROGRAMA EVALUACIÓN INSTITUCIONAL', '', '', 10, 1);
INSERT INTO public.direccion_general VALUES (80, 'DIRECCION GENERAL DE CULTURA', '', '', 9, 1);
INSERT INTO public.direccion_general VALUES (81, 'DIRECCIÓN GENERAL DEL DESPACHO', '', '', 10, 1);


--
-- TOC entry 3754 (class 0 OID 99779)
-- Dependencies: 227
-- Data for Name: direccion_linea; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.direccion_linea VALUES (1, 'DIRECCIÓN GENERAL DEL DESPACHO DEL VICEMINISTERIO (A)', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (2, 'DIRECCIÓN GENERAL DE ASISTENCIA INTEGRAL AL TRABAJADOR UNIVERSITARIO', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (3, 'DIRECCIÓN GENERAL DEL VIVIR BIEN DE DEPORTE RECREACIÓN Y CULTURA', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (4, 'DIRECCIÓN GENERAL DE PARTICIPACIÓN ESTUDIANTIL', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (5, 'DIRECCIÓN GENERAL DEL SISTEMA NACIONAL DE SERVICIOS ESTUDIANTILES', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (6, 'DIRECCIÓN GENERAL DEL DESPACHO DEL VICEMINISTERIO (A)', '', 18, 1);
INSERT INTO public.direccion_linea VALUES (7, 'DIRECCIÓN GENERAL DE PLANIFICACIÓN PARA LA GESTIÓN UNIVERSITARIA', '', 18, 1);
INSERT INTO public.direccion_linea VALUES (8, 'DIRECCIÓN GENERAL PARA LA CALIDAD DE LA GESTIÓN UNIVERSITARIA', '', 18, 1);
INSERT INTO public.direccion_linea VALUES (9, 'DIRECCIÓN GENERAL DE SUPERVICION PARA LA GESTIÓN UNIVERSITARIA', '', 18, 1);
INSERT INTO public.direccion_linea VALUES (10, 'DIRECCIÓN GENERAL DEL DESPACHO DEL VICEMINISTERIO (A)', '', 17, 1);
INSERT INTO public.direccion_linea VALUES (11, 'DIRECCIÓN GENERAL DE VINCULACIÓN COMUNITARIA Y PRODUCTIVA', '', 17, 1);
INSERT INTO public.direccion_linea VALUES (12, 'DIRECCIÓN GENERAL DE PLANIFICACIÓN Y DESARROLLO ACADÉMICO INTEGRAL UNIVERSITARIO', '', 17, 1);
INSERT INTO public.direccion_linea VALUES (13, 'DIRECCIÓN GENERAL DE CREACIÓN INTELECTUAL', '', 17, 1);
INSERT INTO public.direccion_linea VALUES (14, 'DIRECCIÓN DE ASESORÍA JURÍDICA', '', 34, 1);
INSERT INTO public.direccion_linea VALUES (15, 'DIRECCION DE CONTRATACIONES', '', 34, 1);
INSERT INTO public.direccion_linea VALUES (16, 'DIRECCIÓN DE ASUNTOS ADMINISTRATIVOS Y JURISDICCIONALES', '', 34, 1);
INSERT INTO public.direccion_linea VALUES (17, 'DIRECCIÓN DE SEGUIMIENTO DE POLÍTICAS PUBLICAS', '', 22, 1);
INSERT INTO public.direccion_linea VALUES (18, 'DIRECCIÓN DE EVALUACIÓN DE POLÍTICAS PUBLICAS', '', 22, 1);
INSERT INTO public.direccion_linea VALUES (19, 'DIRECCIÓN DE INFORMACIÓN', '', 45, 1);
INSERT INTO public.direccion_linea VALUES (20, 'DIRECCIÓN DE ANÁLISIS Y SEGUIMIENTO', '', 45, 1);
INSERT INTO public.direccion_linea VALUES (21, 'DIRECCIÓN DE RELACIONES PUBLICAS Y PROTOCOLO', '', 45, 1);
INSERT INTO public.direccion_linea VALUES (22, 'DIRECCIÓN DE IMAGEN INSTITUCIONAL', '', 45, 1);
INSERT INTO public.direccion_linea VALUES (23, 'DIRECCIÓN DE PLANIFICACIÓN Y CONTROL DE GESTIÓN', '', 40, 1);
INSERT INTO public.direccion_linea VALUES (24, 'DIRECCIÓN DE PRESUPUESTO', '', 40, 1);
INSERT INTO public.direccion_linea VALUES (25, 'DIRECCIÓN DE ORGANIZACIÓN Y PROCESOS', '', 40, 1);
INSERT INTO public.direccion_linea VALUES (26, 'DIRECCIÓN DE PLANIFICACIÓN Y DESARROLLO', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (27, 'DIRECCIÓN DE PROCESOS LABORALES', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (28, 'DIRECCIÓN DE REMUNERACIONES', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (29, 'DIRECCIÓN DE ENLACE CON LAS UNIVERSIDADES', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (30, 'DIRECCIÓN DE ASISTENCIA Y SALUD', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (31, 'DIRECCIÓN DE FINANZAS', '', 15, 1);
INSERT INTO public.direccion_linea VALUES (32, 'DIRECCIÓN DE INFRAESTRUCTURA MANTENIMIENTO Y SERVICIOS GENERALES', '', 15, 1);
INSERT INTO public.direccion_linea VALUES (33, 'DIRECCIÓN DE BIENES PÚBLICOS', '', 15, 1);
INSERT INTO public.direccion_linea VALUES (34, 'DIRECCIÓN DE SEGURIDAD INTEGRAL', '', 15, 1);
INSERT INTO public.direccion_linea VALUES (35, 'DIRECCIÓN DE ASUNTOS BILATERALES', '', 25, 1);
INSERT INTO public.direccion_linea VALUES (36, 'SIN ESPECIFICAR', '', 36, 1);
INSERT INTO public.direccion_linea VALUES (37, 'SIN ESPECIFICAR', '', 38, 1);
INSERT INTO public.direccion_linea VALUES (38, 'SIN ESPECIFICAR', '', 24, 1);
INSERT INTO public.direccion_linea VALUES (39, 'SIN ESPECIFICAR', '', 37, 1);
INSERT INTO public.direccion_linea VALUES (40, 'SIN ESPECIFICAR', '', 61, 1);
INSERT INTO public.direccion_linea VALUES (41, 'SIN ESPECIFICAR', '', 46, 1);
INSERT INTO public.direccion_linea VALUES (42, 'COMPRAS', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (43, 'DEPARTAMENTO DE FINANZAS', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (44, 'ÁREA DE SEGUIMIENTO Y CONTROL', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (46, 'DEPARTAMENTO DE SERVICIOS GENERALES', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (47, 'SIN ESPECIFICAR', '', 66, 1);
INSERT INTO public.direccion_linea VALUES (48, 'SIN ESPECIFICAR', '', 68, 1);
INSERT INTO public.direccion_linea VALUES (49, 'SIN ESPECIFICAR', '', 69, 1);
INSERT INTO public.direccion_linea VALUES (50, 'SIN ESPECIFICAR', '', 70, 1);
INSERT INTO public.direccion_linea VALUES (51, 'SIN ESPECIFICAR', '', 72, 1);
INSERT INTO public.direccion_linea VALUES (52, 'SIN ESPECIFICAR', '', 73, 1);
INSERT INTO public.direccion_linea VALUES (60, 'SIN ESPECIFICAR', '', 80, 1);
INSERT INTO public.direccion_linea VALUES (61, 'SIN ESPECIFICAR', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (62, 'SIN ESPECIFICAR', '', 15, 1);
INSERT INTO public.direccion_linea VALUES (63, 'SIN ESPECIFICAR', '', 20, 1);
INSERT INTO public.direccion_linea VALUES (64, 'SIN ESPECIFICAR', '', 23, 1);
INSERT INTO public.direccion_linea VALUES (65, 'SIN ESPECIFICAR', '', 26, 1);
INSERT INTO public.direccion_linea VALUES (66, 'SIN ESPECIFICAR', '', 27, 1);
INSERT INTO public.direccion_linea VALUES (67, 'SIN ESPECIFICAR', '', 44, 1);
INSERT INTO public.direccion_linea VALUES (68, 'SIN ESPECIFICAR', '', 47, 1);
INSERT INTO public.direccion_linea VALUES (69, 'SIN ESPECIFICAR', '', 48, 1);
INSERT INTO public.direccion_linea VALUES (70, 'SIN ESPECIFICAR', '', 49, 1);
INSERT INTO public.direccion_linea VALUES (71, 'SIN ESPECIFICAR', '', 50, 1);
INSERT INTO public.direccion_linea VALUES (72, 'SIN ESPECIFICAR', '', 51, 1);
INSERT INTO public.direccion_linea VALUES (73, 'SIN ESPECIFICAR', '', 52, 1);
INSERT INTO public.direccion_linea VALUES (74, 'SIN ESPECIFICAR', '', 53, 1);
INSERT INTO public.direccion_linea VALUES (75, 'SIN ESPECIFICAR', '', 55, 1);
INSERT INTO public.direccion_linea VALUES (76, 'SIN ESPECIFICAR', '', 56, 1);
INSERT INTO public.direccion_linea VALUES (77, 'SIN ESPECIFICAR', '', 57, 1);
INSERT INTO public.direccion_linea VALUES (78, 'SIN ESPECIFICAR', '', 58, 1);
INSERT INTO public.direccion_linea VALUES (79, 'SIN ESPECIFICAR', '', 59, 1);
INSERT INTO public.direccion_linea VALUES (80, 'SIN ESPECIFICAR', '', 60, 1);
INSERT INTO public.direccion_linea VALUES (81, 'SIN ESPECIFICAR', '', 62, 1);
INSERT INTO public.direccion_linea VALUES (82, 'SIN ESPECIFICAR', '', 63, 1);
INSERT INTO public.direccion_linea VALUES (83, 'SIN ESPECIFICAR', '', 65, 1);
INSERT INTO public.direccion_linea VALUES (84, 'SIN ESPECIFICAR', '', 67, 1);
INSERT INTO public.direccion_linea VALUES (85, 'SIN ESPECIFICAR', '', 71, 1);
INSERT INTO public.direccion_linea VALUES (86, 'SIN ESPECIFICAR', '', 74, 1);
INSERT INTO public.direccion_linea VALUES (87, 'SEGURIDAD', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (88, 'SIN ESPECIFICAR', '', 25, 1);
INSERT INTO public.direccion_linea VALUES (89, 'SIN ESPECIFICAR', '', 17, 1);
INSERT INTO public.direccion_linea VALUES (90, 'SIN ESPECIFICAR', '', 34, 1);
INSERT INTO public.direccion_linea VALUES (91, 'SIN ESPECIFICAR', '', 18, 1);
INSERT INTO public.direccion_linea VALUES (92, 'SIN ESPECIFICAR', '', 40, 1);
INSERT INTO public.direccion_linea VALUES (93, 'SIN ESPECIFICAR', '', 19, 1);
INSERT INTO public.direccion_linea VALUES (94, 'SIN ESPECIFICAR', '', 16, 1);
INSERT INTO public.direccion_linea VALUES (95, 'SIN ESPECIFICAR', '', 22, 1);
INSERT INTO public.direccion_linea VALUES (96, 'SIN ESPECIFICAR', '', 45, 1);
INSERT INTO public.direccion_linea VALUES (45, 'ÁREA DE BIENES NACIONALES', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (97, 'SIN ESPECIFICAR', '', 81, 1);
INSERT INTO public.direccion_linea VALUES (98, 'AREA DE TESORERÍA', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (99, 'AREA DE CONTABILIDAD', '', 64, 1);
INSERT INTO public.direccion_linea VALUES (100, 'AREA DE CAJA DE AHORRO', '', 64, 1);


--
-- TOC entry 3756 (class 0 OID 99783)
-- Dependencies: 229
-- Data for Name: ente; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.ente VALUES (9, 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA', 'MPPEU', 1);
INSERT INTO public.ente VALUES (10, 'CONSEJO NACIONAL DE UNIVERSIDADES', 'CNU', 1);


--
-- TOC entry 3758 (class 0 OID 99787)
-- Dependencies: 231
-- Data for Name: especialidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.especialidad VALUES (16, 'ODONTOLOGIA', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (17, 'LABORATORIO', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (27, 'MED. OCUPACIONAL', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (28, 'RX', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (29, 'DOPPLER', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (32, 'MAPA', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (33, 'HOLTER DE RITMO', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (34, 'OPTOMETRIC', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (35, 'NEUROCIRUGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (25, 'DERMATOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (24, 'DIABETOLOGO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (23, 'GASTROENTEROLOGO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (22, 'NEUROLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (1, 'MED. GENERAL', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (2, 'MED. INTERNA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (3, 'PEDIATRIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (4, 'GINECOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (5, 'CARDIOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (6, 'VASCULAR PERIFERICO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (7, 'NUTRICION', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (8, 'ONCOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (9, 'ECOGRAFIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (10, 'PSICOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (11, 'PSIQUIATRIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (12, 'TRAUMATOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (13, 'FISIOTERAPIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (14, 'OFTALMOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (15, 'UROLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (18, 'NEUMONOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (19, 'OTORRINO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (20, 'ENDOCRINO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (21, 'FISIATRIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (26, 'EPIDEMIOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (30, 'CITOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (31, 'EKG', 6, 6, NULL, 1, NULL);


--
-- TOC entry 3762 (class 0 OID 99800)
-- Dependencies: 235
-- Data for Name: estado_cita; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.estado_cita VALUES (5, 'Atendida', 1);
INSERT INTO public.estado_cita VALUES (1, 'Pendiente', 1);
INSERT INTO public.estado_cita VALUES (2, 'Cancelada', 1);
INSERT INTO public.estado_cita VALUES (3, 'Reprogramada', 1);
INSERT INTO public.estado_cita VALUES (4, 'Anulada', 1);


--
-- TOC entry 3760 (class 0 OID 99796)
-- Dependencies: 233
-- Data for Name: estado_venezuela; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.estado_venezuela VALUES (1, 'Amazonas', 1);
INSERT INTO public.estado_venezuela VALUES (2, 'Anzoátegui', 1);
INSERT INTO public.estado_venezuela VALUES (3, 'Apure', 1);
INSERT INTO public.estado_venezuela VALUES (4, 'Aragua', 1);
INSERT INTO public.estado_venezuela VALUES (5, 'Barinas', 1);
INSERT INTO public.estado_venezuela VALUES (6, 'Bolívar', 1);
INSERT INTO public.estado_venezuela VALUES (7, 'Carabobo', 1);
INSERT INTO public.estado_venezuela VALUES (8, 'Cojedes', 1);
INSERT INTO public.estado_venezuela VALUES (9, 'Delta Amacuro', 1);
INSERT INTO public.estado_venezuela VALUES (10, 'Falcón', 1);
INSERT INTO public.estado_venezuela VALUES (11, 'Guárico', 1);
INSERT INTO public.estado_venezuela VALUES (12, 'Lara', 1);
INSERT INTO public.estado_venezuela VALUES (13, 'Mérida', 1);
INSERT INTO public.estado_venezuela VALUES (14, 'Miranda', 1);
INSERT INTO public.estado_venezuela VALUES (15, 'Monagas', 1);
INSERT INTO public.estado_venezuela VALUES (16, 'Nueva Esparta', 1);
INSERT INTO public.estado_venezuela VALUES (18, 'Sucre', 1);
INSERT INTO public.estado_venezuela VALUES (19, 'Táchira', 1);
INSERT INTO public.estado_venezuela VALUES (20, 'Trujillo', 1);
INSERT INTO public.estado_venezuela VALUES (21, 'La Guaira', 1);
INSERT INTO public.estado_venezuela VALUES (22, 'Yaracuy', 1);
INSERT INTO public.estado_venezuela VALUES (23, 'Zulia', 1);
INSERT INTO public.estado_venezuela VALUES (17, 'Portuguesa', 1);
INSERT INTO public.estado_venezuela VALUES (24, 'Distrito Captial', 1);


--
-- TOC entry 3763 (class 0 OID 99803)
-- Dependencies: 236
-- Data for Name: etario; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.etario VALUES (1, '0-5', 0, 5, 1);
INSERT INTO public.etario VALUES (2, '6-10', 6, 10, 1);
INSERT INTO public.etario VALUES (3, '11-15', 11, 15, 1);
INSERT INTO public.etario VALUES (4, '16-20', 16, 20, 1);
INSERT INTO public.etario VALUES (5, '21-25', 21, 25, 1);
INSERT INTO public.etario VALUES (6, '26-30', 26, 30, 1);
INSERT INTO public.etario VALUES (7, '30-35', 30, 35, 1);
INSERT INTO public.etario VALUES (8, '36-40', 36, 40, 1);
INSERT INTO public.etario VALUES (9, '41-50', 41, 50, 1);
INSERT INTO public.etario VALUES (10, '51-60', 51, 60, 1);
INSERT INTO public.etario VALUES (11, '61-70', 61, 70, 1);
INSERT INTO public.etario VALUES (12, '71-80', 71, 80, 1);
INSERT INTO public.etario VALUES (13, '81-110', 81, 110, 1);


--
-- TOC entry 3765 (class 0 OID 99810)
-- Dependencies: 238
-- Data for Name: historial; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3767 (class 0 OID 99816)
-- Dependencies: 240
-- Data for Name: horarios_medicos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.horarios_medicos VALUES (3, 52, NULL, 60, NULL, 72, NULL, 82, NULL, 52, NULL, NULL, NULL, NULL, NULL, 2, 1);
INSERT INTO public.horarios_medicos VALUES (4, 53, NULL, 61, NULL, 73, NULL, 83, NULL, 65, NULL, NULL, NULL, NULL, NULL, 4, 1);
INSERT INTO public.horarios_medicos VALUES (5, 54, NULL, 62, NULL, 74, NULL, 84, NULL, 90, NULL, NULL, NULL, NULL, NULL, 3, 1);
INSERT INTO public.horarios_medicos VALUES (6, 55, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 21, 1);
INSERT INTO public.horarios_medicos VALUES (8, 56, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 18, 1);
INSERT INTO public.horarios_medicos VALUES (9, NULL, NULL, 63, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 12, 1);
INSERT INTO public.horarios_medicos VALUES (10, NULL, NULL, NULL, NULL, 75, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 6, 1);
INSERT INTO public.horarios_medicos VALUES (11, NULL, NULL, NULL, NULL, NULL, NULL, 85, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 25, 1);
INSERT INTO public.horarios_medicos VALUES (12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 91, NULL, NULL, NULL, NULL, 15, 1);
INSERT INTO public.horarios_medicos VALUES (14, 57, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 57, NULL, NULL, NULL, NULL, NULL, 7, 1);
INSERT INTO public.horarios_medicos VALUES (15, NULL, NULL, 64, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 8, 1);
INSERT INTO public.horarios_medicos VALUES (16, NULL, NULL, NULL, NULL, 76, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 19, 1);
INSERT INTO public.horarios_medicos VALUES (17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 96, NULL, NULL, 5, 1);
INSERT INTO public.horarios_medicos VALUES (13, NULL, NULL, NULL, NULL, 78, NULL, NULL, NULL, NULL, NULL, 95, NULL, NULL, NULL, 9, 1);
INSERT INTO public.horarios_medicos VALUES (18, NULL, NULL, NULL, NULL, 79, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 22, 1);
INSERT INTO public.horarios_medicos VALUES (19, NULL, NULL, NULL, NULL, 77, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 11, 1);
INSERT INTO public.horarios_medicos VALUES (20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 97, NULL, NULL, NULL, 23, 1);
INSERT INTO public.horarios_medicos VALUES (2, 50, 70, 58, 70, 70, 100, 80, 70, 86, 70, NULL, NULL, NULL, NULL, 1, 1);
INSERT INTO public.horarios_medicos VALUES (7, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 94, NULL, NULL, 94, NULL, NULL, NULL, 10, 1);


--
-- TOC entry 3797 (class 0 OID 114723)
-- Dependencies: 270
-- Data for Name: log_archivos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.log_archivos VALUES (1, NULL, 7, 'observbacion', 'origen', 'destino', 0, 1);
INSERT INTO public.log_archivos VALUES (3, '2026-09-22 12:53:56+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', 'b2b344dd3efe7914.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (2, '2026-09-22 12:44:28+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', 'f8108798efb18aad.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (4, '2026-09-22 13:04:47+00', 1, 'Se cargo el archivo de Excel', 'Archivos Procesados_archivo.xlsx', 'ab3a09c1742121ec.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (5, '2026-09-22 13:10:37+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', '6bedb8fc17d45e68.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (6, '2026-09-22 14:20:38+00', 1, 'Se cargo el archivo de Excel', 'Archivos Procesados_archivo.xlsx', '720bb64805192875.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (7, '2026-09-23 09:21:15+00', 1, 'Se cargo el archivo de Excel', 'Archivos Procesados_archivo.xlsx', '9f9ed593bfa8b0e2.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (8, '2026-09-23 09:40:44+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', '699bdd00f876e20e.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (9, '2026-09-23 09:42:30+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', '379738e8bf1af16f.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (10, '2026-09-23 13:19:18+00', 5, 'Se cargo el archivo de Excel', 'Trazabilidad de Usuario_archivo.xlsx', '4dd1638ee5d4efb5.xlsx', 0, 1);


--
-- TOC entry 3769 (class 0 OID 99820)
-- Dependencies: 242
-- Data for Name: medico; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.medico VALUES (51, 'Solangel', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (52, 'Matilde Anes', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO public.medico VALUES (53, 'Karla Graterol', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO public.medico VALUES (54, 'Gledys González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO public.medico VALUES (56, 'Dayana Campos', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 18);
INSERT INTO public.medico VALUES (57, 'Yasmin Gavidia', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 7);
INSERT INTO public.medico VALUES (60, 'Estrella Márquez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO public.medico VALUES (61, 'Freddy Lugo', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO public.medico VALUES (62, 'Jessica Velásquez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO public.medico VALUES (63, 'Katherine Laviera', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 12);
INSERT INTO public.medico VALUES (64, 'Daniel La Concha', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 8);
INSERT INTO public.medico VALUES (72, 'Cesar Osorio', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO public.medico VALUES (73, 'Lourdes Solórzano', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO public.medico VALUES (74, 'Catherine Faria', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO public.medico VALUES (75, 'Luis Valecillos', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 6);
INSERT INTO public.medico VALUES (76, 'Suhail Falcón', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 19);
INSERT INTO public.medico VALUES (77, 'Yosmar González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 11);
INSERT INTO public.medico VALUES (78, 'Deivys Chuyen', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 9);
INSERT INTO public.medico VALUES (79, 'Ana González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 22);
INSERT INTO public.medico VALUES (82, 'Ricardo León', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2);
INSERT INTO public.medico VALUES (83, 'Dessire Torrez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO public.medico VALUES (84, 'Yemileth Ysaya', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO public.medico VALUES (85, 'Asdrúbal Rodríguez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 25);
INSERT INTO public.medico VALUES (65, 'Sahully Tovar', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4);
INSERT INTO public.medico VALUES (90, 'Yoselin Rodríguez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3);
INSERT INTO public.medico VALUES (91, 'Marlin Meza', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 15);
INSERT INTO public.medico VALUES (94, 'María Fabiola', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 10);
INSERT INTO public.medico VALUES (95, 'Luis Arraiz', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 9);
INSERT INTO public.medico VALUES (96, 'María Espinoza', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 5);
INSERT INTO public.medico VALUES (97, 'Belkis Morale', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 23);
INSERT INTO public.medico VALUES (99, 'Dayana', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 13);
INSERT INTO public.medico VALUES (98, 'Stefany', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 13);
INSERT INTO public.medico VALUES (55, 'Gioconda Tineo', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 21);
INSERT INTO public.medico VALUES (70, 'Glenys', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (69, 'Milagel Padilla', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 35);
INSERT INTO public.medico VALUES (80, 'Adriana', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (50, 'Vicdeney', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (86, 'Verushcka', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (58, 'Jeiser', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);
INSERT INTO public.medico VALUES (100, 'Cledimar', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1);


--
-- TOC entry 3771 (class 0 OID 99827)
-- Dependencies: 244
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.modulos VALUES (1, 'DAS', 'PC', 1);


--
-- TOC entry 3773 (class 0 OID 99833)
-- Dependencies: 246
-- Data for Name: motivo_consulta; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3775 (class 0 OID 99837)
-- Dependencies: 248
-- Data for Name: nacionalidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.nacionalidad VALUES (1, 'Venezolano', 'V');
INSERT INTO public.nacionalidad VALUES (2, 'Extranjero', 'E');


--
-- TOC entry 3777 (class 0 OID 99841)
-- Dependencies: 250
-- Data for Name: paciente; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.paciente VALUES (18, 3, '2026-09-02 14:16:34.610539+00', '1960-12-12', '2131233', 'Maria', 'Rodriguez', '04147895623', 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, 65, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 19, 1);
INSERT INTO public.paciente VALUES (19, 1, '2026-09-02 14:40:25.931203+00', '2000-04-02', '29369258', 'zdff', 'zdgg', '04241475869', 1, NULL, 9, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04147418596', 'Av. Antimano', NULL, 1, NULL, 0, 0, 1, NULL, 18, 2);
INSERT INTO public.paciente VALUES (20, 1, '2026-09-02 14:47:16.660853+00', '2000-02-20', '29369258', 'gfj', 'fgj', '04241475869', 2, 54, NULL, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04148526947', 'Av. Antimano', NULL, 1, NULL, 0, 0, 2, NULL, 19, 1);
INSERT INTO public.paciente VALUES (21, 1, '2026-09-02 14:57:06.818463+00', '2000-04-02', '29201147', 'Victoria', 'c', '04241475869', 2, 47, NULL, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04148526947', 'Av. Antimano', NULL, 1, NULL, 0, 0, 2, NULL, 17, 2);
INSERT INTO public.paciente VALUES (15, 3, '2026-08-31 16:07:11.426681+00', '1979-05-14', '12487657', 'Alberto', 'Rodriguez', '04129873641', 1, NULL, 9, 1, 24, 38, 50, NULL, 47, NULL, NULL, 16, 1, NULL, 0, 0, 7, 1, 16, 1);
INSERT INTO public.paciente VALUES (11, NULL, '2026-06-05 04:00:00+00', '2004-02-20', '30831617', 'Gabriela Alejandra', 'Méndez Aranguren', '04243966467', 2, NULL, 9, 1, 24, 38, 60, 'correo@correo.com', 22, '1', NULL, 2, 1, 12, 0, 1, 1, 2, 2, 2);
INSERT INTO public.paciente VALUES (17, 1, '2026-09-02 12:08:46.719341+00', '2011-09-02', '12121212', 'Alberto', 'Rodriguez', '04129873641', 2, NULL, 10, 1, 24, 38, 50, 'gabi@gmail.com', 15, NULL, NULL, NULL, 1, NULL, 0, 0, 7, 3, 18, 3);
INSERT INTO public.paciente VALUES (16, 3, '2026-08-31 16:12:38.735616+00', '1960-12-12', '121314156', 'Maria', 'Rodriguez', '04147895623', 2, NULL, 9, 1, 24, 38, 50, NULL, 65, NULL, NULL, NULL, 1, NULL, 0, 0, 9, 3, 19, 3);
INSERT INTO public.paciente VALUES (12, NULL, '2026-08-24 12:13:20+00', '1988-08-24', '12456789', 'Alberto', 'Martinez', '123112', 1, NULL, 10, 2, 24, 38, 50, 'correo@correo.com', 38, '2', NULL, 3, 1, 12, 0, 0, NULL, 1, 3, 1);
INSERT INTO public.paciente VALUES (13, NULL, '2026-08-24 16:26:35.027293+00', '2010-08-24', '32432341', 'Andrés', 'Quintero', '55542234', 1, NULL, 9, 1, 24, 38, 50, 'correo@correo.com', 16, '3', NULL, 1, 1, 12, 0, 0, 2, 1, 1, 1);
INSERT INTO public.paciente VALUES (14, NULL, '2026-08-26 10:20:28+00', '2012-08-26', '54645656', 'Josefina', 'Quintero', '443112', 2, NULL, 10, 1, 24, 38, 50, 'correo@gmail.com', 12, '12341', NULL, 1, 1, 12, 1, 0, 3, 1, 1, 1);
INSERT INTO public.paciente VALUES (22, 1, '2026-09-02 16:09:05.379222+00', '1963-02-03', '6481975', 'LUIS', 'YANEZ', '04127343276', 1, NULL, 10, 1, NULL, NULL, NULL, NULL, 63, NULL, NULL, NULL, 1, NULL, 0, 0, 7, NULL, 24, 1);
INSERT INTO public.paciente VALUES (23, 1, '2026-09-03 13:25:54.581228+00', '1960-12-12', '12123321', 'Maria', 'Rodriguez', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg123123@gmail.com', 65, '04120005689', NULL, NULL, 1, NULL, 0, 0, 9, NULL, 19, 1);
INSERT INTO public.paciente VALUES (24, 1, '2026-09-03 13:59:49.268797+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 16, 1);
INSERT INTO public.paciente VALUES (25, 1, '2026-09-03 14:25:24.676329+00', '1973-07-14', '12345123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 18, 1);
INSERT INTO public.paciente VALUES (26, 1, '2026-09-03 14:32:44.389528+00', '1973-07-14', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, NULL, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 18, 1);
INSERT INTO public.paciente VALUES (27, 1, '2026-09-03 14:45:25.937772+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 16, 1);
INSERT INTO public.paciente VALUES (28, 1, '2026-09-03 14:50:51.926725+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 16, 1);
INSERT INTO public.paciente VALUES (29, 1, '2026-09-03 14:51:34.144626+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 5, NULL, 16, 2);
INSERT INTO public.paciente VALUES (30, 1, '2026-09-03 14:52:53.098127+00', '1973-07-14', '12123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 18, 1);
INSERT INTO public.paciente VALUES (31, 1, '2026-09-03 14:58:24.976134+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 16, 1);
INSERT INTO public.paciente VALUES (32, 5, '2026-09-03 15:16:04.155396+00', '1994-02-02', '24592043', 'JESUS ALEJANDRO', 'SALAZAR GONZALEZ', '0412-1353143', 1, NULL, NULL, 1, NULL, NULL, NULL, 'direcciondesaludmppeu2026@gmail.com', 32, NULL, 'AV. SAN MARTIN', NULL, 1, NULL, 0, 0, 10, NULL, 24, 1);
INSERT INTO public.paciente VALUES (33, 1, '2026-09-03 15:33:34.915748+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 7, NULL, 16, 1);
INSERT INTO public.paciente VALUES (34, 1, '2026-09-03 15:35:08.188561+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 17, 1);
INSERT INTO public.paciente VALUES (35, 1, '2026-09-04 14:58:22.284421+00', '2004-02-20', '30831617', 'gabriela', 'mendez', NULL, 2, NULL, NULL, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 24, 1);
INSERT INTO public.paciente VALUES (36, 1, '2026-09-09 13:52:33.347899+00', '2010-12-12', '1231', 'Gabi', 'Gabi2', '04147895623', 2, NULL, 10, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 15, NULL, NULL, NULL, 1, NULL, 0, 0, 6, NULL, 17, 1);
INSERT INTO public.paciente VALUES (37, 1, '2026-09-09 14:41:17.035958+00', '2026-09-08', '12123', 'Jesus', 'Aquino', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'kronavikingo@gmail.com', 0, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 16, 2);
INSERT INTO public.paciente VALUES (38, 1, '2026-09-10 13:41:50.462737+00', '1990-01-01', '98134150', 'Prueba', 'CorreoGerencia', '04120000000', 1, 1, NULL, 1, NULL, NULL, NULL, 'gerencia.op.oti@gmail.com', 36, '04120000001', 'Prueba de correo en produccion', NULL, 1, NULL, 0, 0, 1, NULL, 1, 1);
INSERT INTO public.paciente VALUES (39, 1, '2026-09-14 12:52:56.774788+00', '1973-07-14', '123123213', 'Jesus', 'Aquino', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 13, 1);
INSERT INTO public.paciente VALUES (40, 1, '2026-09-14 12:55:32.002098+00', '1973-07-14', '12123123', 'Victor', 'Diaz', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'vbernaiz@mppu.gov.ve', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 8, NULL, 13, 2);
INSERT INTO public.paciente VALUES (41, 1, '2026-09-14 13:32:51.268912+00', '2004-02-20', '30831617', 'gabriela', 'mendez', '04123695825', 2, NULL, 9, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 15, 1);


--
-- TOC entry 3778 (class 0 OID 99850)
-- Dependencies: 251
-- Data for Name: parametros_general; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.parametros_general VALUES (1, 'Edad para Beneficiarios', '25', 1);
INSERT INTO public.parametros_general VALUES (2, 'Beneficiarios Menores de Edad', '9', 1);


--
-- TOC entry 3780 (class 0 OID 99856)
-- Dependencies: 253
-- Data for Name: parentesco; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.parentesco VALUES (1, 'Papá', 1);
INSERT INTO public.parentesco VALUES (2, 'Mamá', 1);
INSERT INTO public.parentesco VALUES (3, 'Hijo', 1);
INSERT INTO public.parentesco VALUES (4, 'Hija', 1);
INSERT INTO public.parentesco VALUES (5, 'Esposo', 1);
INSERT INTO public.parentesco VALUES (6, 'Esposa', 1);
INSERT INTO public.parentesco VALUES (7, 'Familiar', 1);
INSERT INTO public.parentesco VALUES (8, 'Concubina', 1);
INSERT INTO public.parentesco VALUES (9, 'Concubino', 1);
INSERT INTO public.parentesco VALUES (10, 'Titular', 1);


--
-- TOC entry 3782 (class 0 OID 99860)
-- Dependencies: 255
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.rol VALUES (1, 'ADMIN', 1);
INSERT INTO public.rol VALUES (2, 'CITAS', 1);


--
-- TOC entry 3784 (class 0 OID 99864)
-- Dependencies: 257
-- Data for Name: sexo; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.sexo VALUES (1, 'Masculino');
INSERT INTO public.sexo VALUES (2, 'Femenino');


--
-- TOC entry 3786 (class 0 OID 99868)
-- Dependencies: 259
-- Data for Name: tipo_de_empleado; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.tipo_de_empleado VALUES (1, 'Activo', NULL, 1);
INSERT INTO public.tipo_de_empleado VALUES (2, 'Jubilado-Pensionado', NULL, 1);
INSERT INTO public.tipo_de_empleado VALUES (3, 'Sin Especificar', NULL, 1);


--
-- TOC entry 3790 (class 0 OID 99876)
-- Dependencies: 263
-- Data for Name: trazabilidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.trazabilidad VALUES (1, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (2, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (3, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (4, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (5, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (6, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (7, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (8, '2026-01-01 00:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (9, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (10, '2026-01-01 00:00:00+00', 'LISTAR-Interactiva de Pacientes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (11, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (12, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (13, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (14, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (15, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (16, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (17, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (18, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (19, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (20, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (21, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (22, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (23, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (24, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (25, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (26, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (27, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (28, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (29, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (30, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (31, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (32, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (33, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (34, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (35, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (36, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (37, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (38, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (39, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (40, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (41, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (42, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (43, '2026-01-01 00:00:00+00', 'LISTAR-Interactiva de Pacientes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (44, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (45, '2026-01-01 00:00:00+00', 'LISTAR-Reporte Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (46, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (47, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (48, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (49, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (50, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (51, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (52, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (53, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (54, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (55, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (56, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (57, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (58, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (59, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (60, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (61, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (62, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (63, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (64, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (65, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (66, '2026-01-01 00:00:00+00', 'LISTAR-Interactiva de Pacientes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (67, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (68, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (69, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (70, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (71, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (72, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (73, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (74, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (75, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (76, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (77, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (78, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (79, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (80, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (81, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (82, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (83, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (84, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (85, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (86, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (87, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (88, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (89, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (90, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (91, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (92, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (93, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (94, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (95, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (96, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (97, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (98, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (99, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (100, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (101, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (102, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (103, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (104, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (105, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (106, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (107, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (108, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (109, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (110, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (111, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (112, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (113, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (114, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (115, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (116, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (117, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (118, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (119, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (120, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (121, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (122, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (123, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (124, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (125, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (126, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (127, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (128, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (129, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (130, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (131, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (132, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (133, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (134, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (135, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (136, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (137, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (138, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (139, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (140, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (141, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (142, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (143, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (144, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (145, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (146, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (147, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (148, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (149, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (150, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (151, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (152, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (153, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (154, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (155, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (156, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (157, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (158, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (159, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (160, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (161, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (162, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (163, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (164, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (165, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (166, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (167, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (168, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (169, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (170, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (171, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (172, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (173, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (174, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (175, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (176, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (177, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (178, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (179, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (180, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (181, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (182, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (1128, '2026-09-03 09:40:30+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (183, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (184, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (185, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (186, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (187, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (188, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (189, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (190, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (191, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (192, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (193, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (194, '2025-12-31 23:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (195, '2025-12-31 23:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (196, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (197, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (198, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (199, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (200, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (201, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (202, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (203, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (204, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (205, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (206, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (207, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (208, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (209, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (210, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (211, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (212, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (213, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (214, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (215, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (216, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (217, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (218, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (219, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (220, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (221, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (222, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (223, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (224, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (225, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (226, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (227, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (228, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (229, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (230, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (231, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (232, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (233, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (234, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (235, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (236, '2025-12-31 23:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (237, '2025-12-31 23:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (238, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (239, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (240, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (241, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (242, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (243, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (244, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (245, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (246, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (247, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (248, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (249, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (250, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (251, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (252, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (253, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (254, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (255, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (256, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (257, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (258, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (259, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (260, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (261, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (262, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (263, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (264, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (265, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (266, '2025-12-31 23:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (267, '2025-12-31 23:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (268, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (269, '2025-12-31 23:00:00+00', 'LISTAR-Direccion General', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (270, '2025-12-31 23:00:00+00', 'LISTAR-Dirección Línea', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (271, '2025-12-31 23:00:00+00', 'LISTAR-Coordinación', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (272, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (273, '2025-12-31 23:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (274, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (275, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (276, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (277, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (278, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (279, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (280, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (281, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (282, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (283, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (284, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (285, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (286, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (287, '2025-12-31 23:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (288, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (289, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (290, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (291, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (292, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (293, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (294, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (295, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (296, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (297, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (298, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (299, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (300, '2025-12-31 23:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (301, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (302, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (303, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (304, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (305, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (306, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (307, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (308, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (309, '2025-12-31 23:00:00+00', 'LISTAR-Direccion General', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (310, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (311, '2025-12-31 23:00:00+00', 'LISTAR-Direccion General', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (312, '2025-12-31 23:00:00+00', 'LISTAR-Dirección Línea', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (313, '2025-12-31 23:00:00+00', 'LISTAR-Coordinación', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (314, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (315, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (316, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (317, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (318, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (319, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (320, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (321, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (322, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (323, '2025-12-31 23:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (324, '2025-12-31 23:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (325, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (326, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (327, '2025-12-31 23:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (328, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (329, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (330, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (331, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (332, '2025-12-31 23:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (333, '2025-12-31 23:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (334, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (335, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (336, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (337, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (338, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (339, '2025-12-31 23:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (340, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (341, '2025-12-31 23:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (342, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (343, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (344, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (345, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (346, '2025-12-31 23:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (347, '2025-12-31 23:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (348, '2025-12-31 23:00:00+00', 'LISTAR-Entes', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (349, '2025-12-31 23:00:00+00', 'LISTAR-Direccion General', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (350, '2025-12-31 23:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (351, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (352, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (353, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (354, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (355, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (356, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (357, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (358, '2025-12-31 23:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (359, '2025-12-31 23:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (360, '2025-12-31 23:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (361, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (362, '2025-12-31 23:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (363, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (364, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (365, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (366, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (367, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (368, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (369, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (370, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (371, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (372, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (373, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (374, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (375, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (376, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (377, '2025-12-31 23:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (378, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (379, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (380, '2025-12-31 23:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (381, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (382, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (383, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (384, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (385, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (386, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (387, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (388, '2025-12-31 23:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (389, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (390, '2025-12-31 23:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (391, '2025-12-31 23:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (392, '2025-12-31 23:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (393, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (394, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (395, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (396, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (397, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (398, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (399, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (400, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (401, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (402, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (403, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (404, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (405, '2026-01-01 00:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (406, '2026-01-01 00:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (407, '2026-01-01 00:00:00+00', 'LISTAR-Estados del País', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (408, '2026-01-01 00:00:00+00', 'LISTAR-Direccion General', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (409, '2026-01-01 00:00:00+00', 'LISTAR-Dirección Línea', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (410, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (411, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (412, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (413, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (414, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (415, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (416, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (417, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (418, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (419, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (420, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (421, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (422, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (423, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (424, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (425, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (426, '2026-01-01 00:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (427, '2026-01-01 00:00:00+00', 'LISTAR-Módulos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (428, '2026-01-01 00:00:00+00', 'LISTAR-Parentescos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (429, '2026-01-01 00:00:00+00', 'LISTAR-Parentescos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (430, '2026-01-01 00:00:00+00', 'LISTAR-Parentescos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (431, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (432, '2026-01-01 00:00:00+00', 'LISTAR-Etario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (433, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (434, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (435, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (436, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (437, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (438, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (439, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (440, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (441, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (442, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (443, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (444, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (445, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (446, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (447, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (448, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (449, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (450, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (451, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (452, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (453, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (454, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (455, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (456, '2026-01-01 00:00:00+00', 'EXCEL-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (457, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (458, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (459, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (460, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (461, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (462, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (463, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (464, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (465, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (466, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (467, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (468, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (469, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (470, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (471, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (472, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (473, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (474, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (475, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (476, '2026-01-01 00:00:00+00', 'LISTAR-Parentescos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (477, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (478, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (479, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (480, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (481, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (482, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (483, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (484, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (485, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (486, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (487, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (488, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (489, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (490, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (491, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (492, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Parámetros', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (493, '2026-01-01 00:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (494, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (495, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (496, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (497, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (498, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (499, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (500, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (501, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Roles', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (502, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (503, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (504, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (505, '2026-01-01 00:00:00+00', 'EXCEL-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (506, '2026-01-01 00:00:00+00', 'EXCEL-ERROR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (507, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (508, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (509, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (510, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (511, '2026-01-01 00:00:00+00', 'LISTAR-Lista De Base de Datos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (512, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (513, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (514, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (515, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (516, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (517, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (518, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (519, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (520, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (521, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (522, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (523, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (524, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (525, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Usuarios', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (526, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (527, '2026-01-01 00:00:00+00', 'LISTAR-Médicos & Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (528, '2026-01-01 00:00:00+00', 'LISTAR-Parentescos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (529, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (530, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (531, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (532, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Especialidades', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (533, '2026-01-01 00:00:00+00', 'LISTAR-Horarios Médicos', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (534, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (535, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (536, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Citas', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (537, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (538, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (539, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (540, '2026-01-01 00:00:00+00', 'LOGIN-DATOS-INCORRECTOS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (541, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (542, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (543, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiario menores a 25', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (544, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (545, '2026-01-01 00:00:00+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (546, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (547, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (548, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (549, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (550, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (551, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (552, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (553, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (554, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (555, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (556, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (557, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (558, '2026-01-01 00:00:00+00', 'LOGIN', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (559, '2026-01-01 00:00:00+00', 'LOGIN-INICIO-SESION', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (560, '2026-08-28 08:54:38+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (561, '2026-08-28 08:54:38+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (562, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (563, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (564, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Beneficiario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (565, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (566, '2026-01-01 00:00:00+00', 'LISTAR-Lista de Titulares', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (567, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (568, '2026-08-28 08:58:55+00', 'LOGIN', 0, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (569, '2026-08-28 08:58:55+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (570, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (571, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (572, '2026-01-01 00:00:00+00', 'ESTADISTICAS-GETARIO', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (573, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.8.9.1', NULL);
INSERT INTO public.trazabilidad VALUES (574, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (575, '2026-01-01 00:00:00+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (576, '2026-01-01 00:00:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (577, '2026-08-28 09:06:37+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (578, '2026-08-28 09:06:40+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (579, '2026-08-28 09:07:08+00', 'ESTADISTICAS-GETARIO', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (580, '2026-08-28 09:07:10+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (581, '2026-08-28 09:36:50+00', 'ESTADISTICAS-GETARIO', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (582, '2026-08-28 09:36:54+00', 'LISTAR-Etario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (583, '2026-08-28 09:37:03+00', 'LISTAR-Parentescos', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (584, '2026-08-28 09:37:13+00', 'LISTAR-Parentescos', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (585, '2026-08-28 09:37:17+00', 'LISTAR-Lista de Citas', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (586, '2026-08-28 09:37:25+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (587, '2026-08-28 09:42:26+00', 'LISTAR-Lista de Citas', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (588, '2026-08-28 09:42:31+00', 'LISTAR-Parentescos', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (589, '2026-08-28 09:42:36+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (590, '2026-08-28 09:46:10+00', 'LOGIN', 0, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (591, '2026-08-28 09:46:10+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (592, '2026-08-28 09:46:13+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (593, '2026-08-28 09:47:21+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (594, '2026-08-28 10:03:54+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (595, '2026-08-28 10:05:30+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (596, '2026-08-28 10:06:25+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (597, '2026-08-28 10:10:08+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (598, '2026-08-28 10:12:23+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (599, '2026-08-28 10:13:52+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (600, '2026-08-28 10:14:21+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (601, '2026-08-28 10:14:45+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (602, '2026-08-28 10:14:59+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (603, '2026-08-28 10:15:48+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (604, '2026-08-28 10:17:31+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (605, '2026-08-28 10:19:24+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (606, '2026-08-28 10:20:01+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (607, '2026-08-28 10:21:35+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (608, '2026-08-28 10:22:40+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (609, '2026-08-28 10:23:01+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (610, '2026-08-28 10:25:06+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (611, '2026-08-28 10:25:33+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (612, '2026-08-28 10:26:11+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (613, '2026-08-28 10:26:39+00', 'LISTAR-Trazabilidad de Usuario', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (614, '2026-08-28 10:27:01+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (615, '2026-08-28 10:27:01+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (616, '2026-08-28 10:27:05+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (617, '2026-08-28 10:27:23+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (618, '2026-08-28 10:29:53+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (619, '2026-08-28 10:30:41+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (620, '2026-08-28 10:31:39+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (621, '2026-08-28 10:31:46+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (622, '2026-08-28 10:39:44+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (623, '2026-08-28 10:40:30+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (624, '2026-08-28 10:40:55+00', 'LISTAR-Trazabilidad de Usuario', 3, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (625, '2026-08-28 10:41:48+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (626, '2026-08-28 10:41:48+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (627, '2026-08-28 10:41:51+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (628, '2026-08-28 10:41:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (629, '2026-08-28 10:42:09+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (630, '2026-08-28 10:44:18+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (631, '2026-08-28 10:44:22+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (632, '2026-08-28 10:44:28+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (633, '2026-08-28 10:45:08+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (634, '2026-08-28 10:45:13+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (635, '2026-08-28 10:45:21+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (636, '2026-08-28 10:45:26+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (637, '2026-08-28 10:45:53+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (638, '2026-08-28 10:46:25+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (639, '2026-08-28 10:46:41+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (640, '2026-08-28 10:46:59+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (641, '2026-08-28 10:47:43+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (642, '2026-08-28 10:48:11+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (643, '2026-08-28 10:52:05+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (644, '2026-08-28 10:52:19+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (645, '2026-08-28 10:52:33+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (646, '2026-08-28 10:52:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (647, '2026-08-28 10:53:03+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (648, '2026-08-28 10:53:16+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (649, '2026-08-28 10:53:20+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (650, '2026-08-28 10:53:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (651, '2026-08-28 11:02:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (652, '2026-08-28 11:03:22+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (653, '2026-08-28 11:03:39+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (654, '2026-08-28 11:03:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (655, '2026-08-28 11:06:50+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (656, '2026-08-28 11:09:41+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (657, '2026-08-28 11:10:08+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (658, '2026-08-28 11:12:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (659, '2026-08-28 11:13:05+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (660, '2026-08-28 11:13:28+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (661, '2026-08-28 11:13:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (662, '2026-08-28 11:14:00+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (663, '2026-08-28 11:14:38+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (664, '2026-08-28 11:14:53+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (665, '2026-08-28 11:15:41+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (666, '2026-08-28 11:15:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (667, '2026-08-28 11:16:14+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (668, '2026-08-28 11:16:38+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (669, '2026-08-28 11:17:08+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (670, '2026-08-28 11:18:38+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (671, '2026-08-28 11:19:14+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (672, '2026-08-28 11:19:28+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (673, '2026-08-28 11:21:33+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (674, '2026-08-28 11:22:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (675, '2026-08-28 11:23:07+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (676, '2026-08-28 11:23:39+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (677, '2026-08-28 11:24:41+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (678, '2026-08-28 11:24:55+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (679, '2026-08-28 11:25:17+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (680, '2026-08-28 11:25:33+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (681, '2026-08-28 11:25:59+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (682, '2026-08-28 11:26:33+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (683, '2026-08-28 11:26:46+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (684, '2026-08-28 11:27:47+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (685, '2026-08-28 11:27:47+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (686, '2026-08-28 11:28:33+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (687, '2026-08-28 12:38:06+00', 'LOGIN', 0, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (688, '2026-08-28 12:38:06+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (689, '2026-08-28 12:38:12+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (690, '2026-08-28 12:43:30+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (691, '2026-08-28 12:44:09+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (692, '2026-08-28 12:45:11+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.9', NULL);
INSERT INTO public.trazabilidad VALUES (693, '2026-08-31 08:31:56+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (694, '2026-08-31 08:31:56+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (695, '2026-08-31 08:32:13+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (696, '2026-08-31 08:32:16+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (697, '2026-08-31 08:32:24+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (698, '2026-08-31 08:32:33+00', 'LISTAR-Etario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (699, '2026-08-31 08:32:43+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (700, '2026-08-31 08:50:56+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (701, '2026-08-31 08:50:56+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (702, '2026-08-31 08:51:15+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (703, '2026-08-31 08:51:19+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (704, '2026-08-31 08:51:23+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (705, '2026-08-31 08:51:31+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (706, '2026-08-31 08:51:38+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (707, '2026-08-31 08:51:46+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (708, '2026-08-31 08:53:44+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (709, '2026-08-31 08:54:07+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (710, '2026-08-31 08:54:07+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (711, '2026-08-31 08:55:21+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (712, '2026-08-31 08:55:21+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (713, '2026-08-31 08:55:24+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (714, '2026-08-31 08:55:24+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (715, '2026-08-31 08:55:24+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (716, '2026-08-31 08:55:24+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (717, '2026-08-31 08:55:25+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (718, '2026-08-31 08:55:25+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (719, '2026-08-31 08:55:25+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (720, '2026-08-31 08:55:25+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (721, '2026-08-31 08:55:25+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (722, '2026-08-31 08:55:25+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (723, '2026-08-31 08:55:26+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (724, '2026-08-31 08:55:26+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (725, '2026-08-31 08:55:26+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (726, '2026-08-31 08:55:26+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (727, '2026-08-31 08:55:26+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (728, '2026-08-31 08:55:26+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (729, '2026-08-31 08:55:26+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (730, '2026-08-31 08:55:26+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (731, '2026-08-31 08:55:27+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (732, '2026-08-31 08:55:27+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (733, '2026-08-31 08:55:37+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (734, '2026-08-31 08:58:42+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (735, '2026-08-31 08:58:42+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (736, '2026-08-31 09:02:33+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (737, '2026-08-31 09:02:33+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (738, '2026-08-31 09:06:17+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (739, '2026-08-31 09:06:17+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (740, '2026-08-31 09:09:38+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (741, '2026-08-31 09:09:38+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (742, '2026-08-31 09:11:14+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (743, '2026-08-31 09:11:14+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (744, '2026-08-31 09:14:34+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (745, '2026-08-31 09:14:34+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (746, '2026-08-31 09:15:50+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (747, '2026-08-31 09:15:50+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (748, '2026-08-31 09:16:05+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (749, '2026-08-31 09:16:05+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (750, '2026-08-31 09:16:23+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (751, '2026-08-31 09:16:23+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (752, '2026-08-31 09:20:36+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (753, '2026-08-31 09:20:36+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (754, '2026-08-31 09:23:46+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (755, '2026-08-31 09:23:46+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (756, '2026-08-31 09:24:14+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (757, '2026-08-31 09:24:14+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (758, '2026-08-31 09:25:20+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (759, '2026-08-31 09:25:20+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (760, '2026-08-31 09:25:23+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (761, '2026-08-31 09:25:23+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (762, '2026-08-31 09:25:23+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (763, '2026-08-31 09:25:23+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (764, '2026-08-31 09:25:23+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (765, '2026-08-31 09:25:23+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (766, '2026-08-31 09:25:36+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (767, '2026-08-31 09:25:36+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (768, '2026-08-31 09:26:16+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (769, '2026-08-31 09:26:16+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (770, '2026-08-31 09:26:44+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (771, '2026-08-31 09:27:15+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (772, '2026-08-31 09:27:31+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (773, '2026-08-31 09:27:38+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (774, '2026-08-31 09:28:43+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (775, '2026-08-31 09:29:13+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (776, '2026-08-31 09:29:32+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (777, '2026-08-31 09:30:07+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (778, '2026-08-31 09:30:11+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (779, '2026-08-31 09:30:14+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (780, '2026-08-31 09:30:37+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (781, '2026-08-31 09:30:41+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (782, '2026-08-31 09:30:44+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (783, '2026-08-31 09:30:46+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (784, '2026-08-31 09:30:55+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (785, '2026-08-31 09:30:58+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (786, '2026-08-31 09:31:14+00', 'LISTAR-Etario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (787, '2026-08-31 09:32:23+00', 'LISTAR-Etario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (788, '2026-08-31 09:32:28+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (789, '2026-08-31 09:32:58+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (790, '2026-08-31 09:33:01+00', 'LISTAR-Parentescos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (791, '2026-08-31 09:33:08+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (792, '2026-08-31 09:36:21+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (793, '2026-08-31 09:41:25+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (794, '2026-08-31 09:43:29+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (795, '2026-08-31 09:48:51+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (796, '2026-08-31 09:50:32+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (797, '2026-08-31 09:51:05+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (798, '2026-08-31 09:55:42+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (799, '2026-08-31 09:56:30+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (800, '2026-08-31 09:58:14+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (801, '2026-08-31 09:58:17+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (802, '2026-08-31 09:58:19+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (803, '2026-08-31 09:58:19+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (804, '2026-08-31 09:58:19+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (805, '2026-08-31 09:58:19+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (806, '2026-08-31 10:04:05+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (807, '2026-08-31 10:04:37+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (808, '2026-08-31 10:04:52+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (809, '2026-08-31 10:07:03+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (810, '2026-08-31 10:07:10+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (811, '2026-08-31 10:11:12+00', 'LOGIN', 0, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (812, '2026-08-31 10:11:12+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (813, '2026-08-31 10:11:20+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (814, '2026-08-31 10:11:23+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (815, '2026-08-31 10:11:32+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (816, '2026-08-31 10:13:05+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (817, '2026-08-31 10:13:09+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (818, '2026-08-31 10:13:10+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (819, '2026-08-31 10:13:35+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (820, '2026-08-31 10:15:00+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (821, '2026-08-31 10:15:05+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (822, '2026-08-31 10:15:43+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (823, '2026-08-31 10:16:07+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (824, '2026-08-31 10:16:36+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (825, '2026-08-31 10:17:13+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (826, '2026-08-31 10:17:43+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (827, '2026-08-31 10:17:43+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (828, '2026-08-31 10:17:50+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (829, '2026-08-31 10:17:57+00', 'ESTADISTICAS-BASICAS', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (830, '2026-08-31 10:18:09+00', 'ESTADISTICAS-GETARIO', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (831, '2026-08-31 10:18:15+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (832, '2026-08-31 10:18:27+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (833, '2026-08-31 10:33:50+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (834, '2026-08-31 10:33:50+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (835, '2026-08-31 10:33:53+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (836, '2026-08-31 10:33:58+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (837, '2026-08-31 10:35:21+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (838, '2026-08-31 10:38:05+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (839, '2026-08-31 10:38:31+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (840, '2026-08-31 10:41:48+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (841, '2026-08-31 10:51:20+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (842, '2026-08-31 10:51:42+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (843, '2026-08-31 10:51:49+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (844, '2026-08-31 10:52:01+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (845, '2026-08-31 10:52:49+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (846, '2026-08-31 10:55:58+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (847, '2026-08-31 10:58:48+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (848, '2026-08-31 10:59:24+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (849, '2026-08-31 10:59:34+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (850, '2026-08-31 10:59:55+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (851, '2026-08-31 11:00:47+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (852, '2026-08-31 11:00:52+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (853, '2026-08-31 12:04:09+00', 'LOGIN', 0, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (854, '2026-08-31 12:04:09+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (855, '2026-08-31 12:04:12+00', 'LISTAR-Lista de Citas', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (856, '2026-08-31 12:04:20+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (857, '2026-08-31 12:07:11+00', 'Inserción Citas paciente Se creó el Registro de Cita', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (858, '2026-08-31 12:07:15+00', 'LISTAR-Lista de Citas', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (859, '2026-08-31 12:07:21+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (860, '2026-08-31 12:09:37+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (861, '2026-08-31 12:09:44+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (862, '2026-08-31 12:11:29+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (863, '2026-08-31 12:11:31+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (864, '2026-08-31 12:11:31+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (865, '2026-08-31 12:11:31+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (866, '2026-08-31 12:11:32+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (867, '2026-08-31 12:11:32+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (868, '2026-08-31 12:11:32+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (869, '2026-08-31 12:11:32+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (870, '2026-08-31 12:11:47+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (871, '2026-08-31 12:11:50+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (872, '2026-08-31 12:12:38+00', 'Inserción Citas paciente Se creó el Registro de Cita', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (873, '2026-08-31 12:12:41+00', 'LISTAR-Lista de Citas', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (874, '2026-08-31 12:12:51+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (875, '2026-08-31 12:13:08+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (876, '2026-08-31 12:13:20+00', 'LISTAR-Beneficiario menores a 25', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (877, '2026-08-31 12:13:23+00', 'LISTAR-Lista de Citas', 3, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (878, '2026-09-02 07:40:31+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (879, '2026-09-02 07:40:31+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (880, '2026-09-02 07:40:39+00', 'LISTAR-Entes', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (881, '2026-09-02 08:08:42+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (882, '2026-09-02 08:09:50+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (883, '2026-09-02 08:19:54+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (884, '2026-09-02 08:20:08+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (885, '2026-09-02 08:22:38+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (886, '2026-09-02 08:22:40+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (887, '2026-09-02 08:24:25+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (888, '2026-09-02 08:24:27+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (889, '2026-09-02 08:32:13+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (890, '2026-09-02 08:32:52+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (891, '2026-09-02 08:39:21+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (892, '2026-09-02 08:39:45+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (893, '2026-09-02 08:39:57+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (894, '2026-09-02 08:40:35+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (895, '2026-09-02 08:46:07+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (896, '2026-09-02 08:47:15+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (897, '2026-09-02 08:47:49+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (898, '2026-09-02 08:48:03+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (899, '2026-09-02 08:48:04+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (900, '2026-09-02 08:48:04+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (901, '2026-09-02 08:48:05+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (902, '2026-09-02 08:48:05+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (903, '2026-09-02 08:48:56+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (904, '2026-09-02 08:52:26+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (905, '2026-09-02 08:52:39+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (906, '2026-09-02 08:56:16+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (907, '2026-09-02 08:57:04+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (908, '2026-09-02 08:57:54+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (909, '2026-09-02 09:00:31+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (910, '2026-09-02 09:08:12+00', 'LOGIN', 0, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (911, '2026-09-02 09:08:12+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (912, '2026-09-02 09:08:15+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (913, '2026-09-02 09:08:37+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (914, '2026-09-02 09:08:52+00', 'LISTAR-Beneficiario menores a 25', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (915, '2026-09-02 09:08:55+00', 'LISTAR-Beneficiarios Menores de Edad', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (916, '2026-09-02 09:08:57+00', 'LISTAR-Beneficiarios con Condición Especial', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (917, '2026-09-02 09:09:04+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (918, '2026-09-02 09:09:06+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (919, '2026-09-02 09:09:09+00', 'LISTAR-Lista de Citas', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (920, '2026-09-02 09:09:23+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (921, '2026-09-02 09:09:30+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (922, '2026-09-02 09:09:53+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (923, '2026-09-02 09:12:54+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (924, '2026-09-02 09:15:37+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (925, '2026-09-02 09:15:37+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (926, '2026-09-02 09:15:40+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (927, '2026-09-02 09:16:07+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (928, '2026-09-02 09:16:11+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (929, '2026-09-02 09:17:26+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (930, '2026-09-02 09:18:15+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (931, '2026-09-02 09:19:34+00', 'LISTAR-Beneficiario menores a 25', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (932, '2026-09-02 09:19:36+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (933, '2026-09-02 09:19:39+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (934, '2026-09-02 09:19:47+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (935, '2026-09-02 09:21:59+00', 'LOGIN', 0, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (936, '2026-09-02 09:21:59+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (937, '2026-09-02 09:22:52+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (938, '2026-09-02 09:23:03+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (939, '2026-09-02 09:23:33+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (940, '2026-09-02 09:25:06+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (941, '2026-09-02 09:25:11+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (942, '2026-09-02 09:26:05+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (943, '2026-09-02 09:27:12+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (944, '2026-09-02 09:30:54+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (945, '2026-09-02 09:31:00+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (946, '2026-09-02 09:31:34+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (947, '2026-09-02 09:31:36+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (948, '2026-09-02 09:31:37+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (949, '2026-09-02 09:31:37+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (950, '2026-09-02 09:31:37+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (951, '2026-09-02 09:31:38+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (952, '2026-09-02 09:31:38+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (953, '2026-09-02 09:31:38+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (954, '2026-09-02 09:31:58+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (955, '2026-09-02 09:47:39+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (956, '2026-09-02 10:03:13+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (957, '2026-09-02 10:03:43+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (958, '2026-09-02 10:08:06+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (959, '2026-09-02 10:08:50+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (960, '2026-09-02 10:09:14+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (961, '2026-09-02 10:09:17+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (962, '2026-09-02 10:09:44+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (963, '2026-09-02 10:13:21+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (964, '2026-09-02 10:15:15+00', 'LOGIN', 0, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (965, '2026-09-02 10:15:15+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (966, '2026-09-02 10:16:34+00', 'Inserción Citas paciente Se creó el Registro de Cita', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (967, '2026-09-02 10:16:39+00', 'LISTAR-Lista de Citas', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (968, '2026-09-02 10:22:31+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (969, '2026-09-02 10:22:34+00', 'LISTAR-Lista de Citas', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (970, '2026-09-02 10:22:38+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (971, '2026-09-02 10:33:06+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (972, '2026-09-02 10:38:07+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (973, '2026-09-02 10:38:17+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (974, '2026-09-02 10:44:58+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (975, '2026-09-02 10:45:01+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (976, '2026-09-02 10:52:47+00', 'LISTAR-Lista de Citas', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (977, '2026-09-02 10:53:03+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (978, '2026-09-02 10:51:33+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (979, '2026-09-02 10:53:26+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (980, '2026-09-02 10:53:33+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (981, '2026-09-02 10:54:48+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (982, '2026-09-02 10:54:52+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (983, '2026-09-02 11:01:56+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (984, '2026-09-02 11:03:06+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (985, '2026-09-02 11:04:10+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (986, '2026-09-02 11:04:32+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (987, '2026-09-02 11:04:37+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (988, '2026-09-02 11:05:00+00', 'LISTAR-Lista de Citas', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (989, '2026-09-02 11:05:04+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (990, '2026-09-02 11:05:12+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (991, '2026-09-02 11:05:16+00', 'ESTADISTICAS-GETARIO', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (992, '2026-09-02 11:05:18+00', 'ESTADISTICAS-BASICAS', 3, '172.17.11.22', NULL);
INSERT INTO public.trazabilidad VALUES (993, '2026-09-02 11:03:00+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (994, '2026-09-02 11:16:34+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (995, '2026-09-02 11:16:34+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (996, '2026-09-02 12:05:44+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (997, '2026-09-02 12:05:44+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (998, '2026-09-02 12:06:17+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (999, '2026-09-02 12:06:28+00', 'LISTAR-Horarios Médicos', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1000, '2026-09-02 12:06:41+00', 'LISTAR-Lista de Especialidades', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1001, '2026-09-02 12:07:08+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1002, '2026-09-02 12:09:05+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1003, '2026-09-02 12:09:08+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1004, '2026-09-02 12:10:16+00', 'LISTAR-Horarios Médicos', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1005, '2026-09-02 12:12:11+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1006, '2026-09-02 12:13:49+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1007, '2026-09-02 12:14:04+00', 'LISTAR-Lista de Usuarios', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1008, '2026-09-02 12:14:22+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1009, '2026-09-02 12:15:22+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1010, '2026-09-02 12:16:15+00', 'LISTAR-Lista de Roles', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1011, '2026-09-02 12:16:27+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1012, '2026-09-02 12:16:30+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1013, '2026-09-02 12:16:43+00', 'ESTADISTICAS-BASICAS', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1014, '2026-09-02 12:18:28+00', 'LISTAR-Lista de Usuarios', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1015, '2026-09-02 12:21:22+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1016, '2026-09-02 12:25:24+00', 'LISTAR-Lista De Base de Datos', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1017, '2026-09-02 12:29:03+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1018, '2026-09-02 12:29:52+00', 'LISTAR-Lista de Usuarios', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1019, '2026-09-02 12:31:18+00', 'LISTAR-Lista de Citas', 1, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1020, '2026-09-02 12:43:14+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1021, '2026-09-02 12:43:14+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1022, '2026-09-02 12:58:41+00', 'LISTAR-Lista de Usuarios', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1023, '2026-09-02 13:00:29+00', 'LISTAR-Lista de Titulares', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1024, '2026-09-02 13:00:37+00', 'ESTADISTICAS-BASICAS', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1025, '2026-09-02 13:00:50+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1026, '2026-09-02 13:01:53+00', 'LISTAR-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1027, '2026-09-02 13:02:08+00', 'LISTAR-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1028, '2026-09-02 13:02:12+00', 'EXCEL-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1029, '2026-09-02 13:02:32+00', 'ESTADISTICAS-GETARIO', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1030, '2026-09-02 13:11:11+00', 'LOGIN', 0, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1031, '2026-09-02 13:11:11+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1032, '2026-09-02 13:11:50+00', 'LOGIN', 0, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1033, '2026-09-02 13:11:50+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1034, '2026-09-02 13:11:56+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1035, '2026-09-02 13:12:04+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1036, '2026-09-02 13:12:10+00', 'LISTAR-Lista de Parámetros', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1037, '2026-09-02 13:12:18+00', 'LISTAR-Etario', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1038, '2026-09-02 13:12:37+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1039, '2026-09-02 13:13:22+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1040, '2026-09-02 13:13:42+00', 'LISTAR-Estados del País', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1041, '2026-09-02 13:13:57+00', 'LISTAR-Entes', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1042, '2026-09-02 13:14:04+00', 'LISTAR-Direccion General', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1043, '2026-09-02 13:14:36+00', 'LISTAR-Dirección Línea', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1044, '2026-09-02 13:14:42+00', 'LISTAR-Coordinación', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1045, '2026-09-02 13:14:51+00', 'LISTAR-Lista de Titulares', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1046, '2026-09-02 13:14:59+00', 'LISTAR-Lista de Beneficiario', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1047, '2026-09-02 13:15:08+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1048, '2026-09-02 13:15:16+00', 'LISTAR-Lista De Base de Datos', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1049, '2026-09-02 13:15:25+00', 'LISTAR-Parentescos', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1050, '2026-09-02 13:15:30+00', 'LISTAR-Lista de Citas', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1051, '2026-09-02 13:15:52+00', 'LISTAR-Lista de Citas', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1052, '2026-09-02 13:18:10+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1053, '2026-09-02 13:18:30+00', 'ESTADISTICAS-GETARIO', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1054, '2026-09-02 13:18:37+00', 'LISTAR-Beneficiario menores a 25', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1055, '2026-09-02 13:18:39+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1056, '2026-09-02 13:18:41+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1057, '2026-09-02 13:18:44+00', 'LISTAR-Lista de Roles', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1058, '2026-09-02 13:19:58+00', 'LISTAR-Lista de Citas', 1, '172.17.11.191', NULL);
INSERT INTO public.trazabilidad VALUES (1059, '2026-09-02 13:20:58+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1060, '2026-09-02 13:20:58+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1061, '2026-09-02 13:21:10+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1062, '2026-09-02 13:21:10+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1063, '2026-09-02 13:21:17+00', 'LISTAR-Lista de Citas', 5, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1064, '2026-09-02 14:21:45+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1065, '2026-09-02 14:21:45+00', 'LOGIN-USUARIO-INICIO-SESION', 7, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1066, '2026-09-02 14:25:06+00', 'LOGIN', 0, '172.17.1.18', NULL);
INSERT INTO public.trazabilidad VALUES (1067, '2026-09-02 14:25:06+00', 'LOGIN-USUARIO-INICIO-SESION', 9, '172.17.1.18', NULL);
INSERT INTO public.trazabilidad VALUES (1068, '2026-09-02 14:25:51+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1069, '2026-09-02 14:25:51+00', 'LOGIN-USUARIO-INICIO-SESION', 8, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1070, '2026-09-02 15:14:56+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1071, '2026-09-02 15:14:56+00', 'LOGIN-USUARIO-INICIO-SESION', 7, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1072, '2026-09-02 15:15:10+00', 'LISTAR-Lista de Citas', 7, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1073, '2026-09-02 15:15:46+00', 'LISTAR-Lista de Citas', 7, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1074, '2026-09-02 15:55:38+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1075, '2026-09-02 15:55:38+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1076, '2026-09-02 15:55:52+00', 'LISTAR-Lista de Roles', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1077, '2026-09-02 15:55:57+00', 'LISTAR-Lista de Usuarios', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1078, '2026-09-02 15:57:26+00', 'LISTAR-Lista de Roles', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1079, '2026-09-02 15:58:02+00', 'LISTAR-Beneficiarios con Condición Especial', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1080, '2026-09-02 16:07:24+00', 'LOGIN', 0, '172.17.1.31', NULL);
INSERT INTO public.trazabilidad VALUES (1081, '2026-09-02 16:07:24+00', 'LOGIN-USUARIO-INICIO-SESION', 6, '172.17.1.31', NULL);
INSERT INTO public.trazabilidad VALUES (1082, '2026-09-02 16:08:08+00', 'LISTAR-Lista de Citas', 6, '172.17.1.31', NULL);
INSERT INTO public.trazabilidad VALUES (1083, '2026-09-02 16:24:24+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1084, '2026-09-02 16:24:24+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1085, '2026-09-02 16:25:22+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1086, '2026-09-02 16:25:22+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1087, '2026-09-02 16:25:28+00', 'LISTAR-Lista de Titulares', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1088, '2026-09-02 16:25:31+00', 'LISTAR-Lista de Beneficiario', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1089, '2026-09-02 16:25:40+00', 'LISTAR-Médicos & Especialidades', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1090, '2026-09-02 16:26:17+00', 'LISTAR-Módulos', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1091, '2026-09-02 16:26:21+00', 'LISTAR-Lista de Roles', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1092, '2026-09-02 16:26:29+00', 'LISTAR-Médicos & Especialidades', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1093, '2026-09-02 16:26:34+00', 'LISTAR-Horarios Médicos', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1094, '2026-09-02 16:26:57+00', 'ESTADISTICAS-GETARIO', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1095, '2026-09-02 16:26:59+00', 'ESTADISTICAS-BASICAS', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1096, '2026-09-03 08:49:20+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1097, '2026-09-03 08:49:20+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1098, '2026-09-03 08:49:23+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1099, '2026-09-03 08:52:05+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1100, '2026-09-03 08:52:22+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1101, '2026-09-03 08:52:28+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1102, '2026-09-03 09:04:19+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1103, '2026-09-03 09:06:31+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1104, '2026-09-03 09:06:35+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1105, '2026-09-03 09:06:49+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1106, '2026-09-03 09:07:02+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1107, '2026-09-03 09:07:19+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1108, '2026-09-03 09:07:30+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1109, '2026-09-03 09:08:45+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1110, '2026-09-03 09:09:09+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1111, '2026-09-03 09:12:31+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1112, '2026-09-03 09:12:43+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1113, '2026-09-03 09:12:55+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1114, '2026-09-03 09:15:25+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1115, '2026-09-03 09:15:25+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1116, '2026-09-03 09:15:28+00', 'LISTAR-Lista de Usuarios', 3, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1117, '2026-09-03 09:16:12+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1118, '2026-09-03 09:16:27+00', 'LISTAR-Trazabilidad de Usuario', 3, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1119, '2026-09-03 09:21:10+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1120, '2026-09-03 09:21:10+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1121, '2026-09-03 09:21:19+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1122, '2026-09-03 09:21:19+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1123, '2026-09-03 09:21:29+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1124, '2026-09-03 09:24:42+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1125, '2026-09-03 09:25:54+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1126, '2026-09-03 09:25:59+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1127, '2026-09-03 09:32:23+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1129, '2026-09-03 09:40:30+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1130, '2026-09-03 09:40:43+00', 'LISTAR-Parentescos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1131, '2026-09-03 09:40:54+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1132, '2026-09-03 09:47:34+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1133, '2026-09-03 09:51:38+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1134, '2026-09-03 09:51:46+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1135, '2026-09-03 09:51:53+00', 'EXCEL-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1136, '2026-09-03 09:54:47+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1137, '2026-09-03 09:56:43+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1138, '2026-09-03 09:59:49+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1139, '2026-09-03 10:02:03+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1140, '2026-09-03 10:02:11+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1141, '2026-09-03 10:02:20+00', 'LISTAR-Parentescos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1142, '2026-09-03 10:02:28+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1143, '2026-09-03 10:02:44+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1144, '2026-09-03 10:15:33+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1145, '2026-09-03 10:24:32+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1146, '2026-09-03 10:24:32+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1147, '2026-09-03 10:25:22+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1148, '2026-09-03 10:29:08+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1149, '2026-09-03 10:32:41+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1150, '2026-09-03 10:33:42+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1151, '2026-09-03 10:34:59+00', 'LISTAR-Beneficiarios con Condición Especial', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1152, '2026-09-03 10:35:08+00', 'LISTAR-Beneficiarios con Condición Especial', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1153, '2026-09-03 10:35:09+00', 'LISTAR-Beneficiarios con Condición Especial', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1154, '2026-09-03 10:35:30+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1155, '2026-09-03 10:35:30+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1156, '2026-09-03 10:35:39+00', 'LISTAR-Lista de Parámetros', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1157, '2026-09-03 10:35:51+00', 'LISTAR-Coordinación', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1158, '2026-09-03 10:35:49+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1159, '2026-09-03 10:35:49+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1160, '2026-09-03 10:35:58+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1161, '2026-09-03 10:36:10+00', 'LISTAR-Lista de Parámetros', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1162, '2026-09-03 10:36:15+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1163, '2026-09-03 10:36:39+00', 'LISTAR-Dirección Línea', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1164, '2026-09-03 10:36:45+00', 'LISTAR-Coordinación', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1165, '2026-09-03 10:36:49+00', 'LISTAR-Médicos & Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1166, '2026-09-03 10:37:15+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1167, '2026-09-03 10:37:38+00', 'LISTAR-Médicos & Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1168, '2026-09-03 10:37:58+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1169, '2026-09-03 10:38:10+00', 'LISTAR-Beneficiario menores a 25', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1170, '2026-09-03 10:38:19+00', 'LISTAR-Módulos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1171, '2026-09-03 10:47:18+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1172, '2026-09-03 10:47:18+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1173, '2026-09-03 10:50:16+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1174, '2026-09-03 10:50:16+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1175, '2026-09-03 10:50:51+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1176, '2026-09-03 10:52:50+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1177, '2026-09-03 10:57:53+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1178, '2026-09-03 10:57:53+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1179, '2026-09-03 10:58:24+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1180, '2026-09-03 11:03:14+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1181, '2026-09-03 11:05:39+00', 'ESTADISTICAS-GETARIO', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1182, '2026-09-03 11:05:55+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1183, '2026-09-03 11:05:55+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1184, '2026-09-03 11:06:04+00', 'LISTAR-Lista de Citas', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1185, '2026-09-03 11:07:02+00', 'LISTAR-Beneficiarios con Condición Especial', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1186, '2026-09-03 11:07:10+00', 'LISTAR-Lista de Titulares', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1187, '2026-09-03 11:07:25+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1188, '2026-09-03 11:07:58+00', 'ESTADISTICAS-BASICAS', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1189, '2026-09-03 11:12:40+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1190, '2026-09-03 11:13:31+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1191, '2026-09-03 11:15:51+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1192, '2026-09-03 11:15:51+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1193, '2026-09-03 11:16:04+00', 'Inserción Citas paciente Se creó el Registro de Cita', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1194, '2026-09-03 11:16:08+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1195, '2026-09-03 11:16:28+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1196, '2026-09-03 11:16:55+00', 'LISTAR-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1197, '2026-09-03 11:17:29+00', 'LISTAR-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1198, '2026-09-03 11:18:25+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1199, '2026-09-03 11:18:25+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1200, '2026-09-03 11:31:03+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1201, '2026-09-03 11:31:03+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1202, '2026-09-03 11:33:34+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1203, '2026-09-03 11:37:24+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1204, '2026-09-03 11:37:24+00', 'LISTAR-Lista de Roles', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (1205, '2026-09-04 09:45:33+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1206, '2026-09-04 09:45:33+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1207, '2026-09-04 09:45:54+00', 'LISTAR-Lista de Titulares', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1208, '2026-09-04 09:45:57+00', 'LISTAR-Lista de Beneficiario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1209, '2026-09-04 09:46:13+00', 'ESTADISTICAS-BASICAS', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1210, '2026-09-04 09:46:18+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1211, '2026-09-04 09:49:30+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1212, '2026-09-04 09:49:47+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1213, '2026-09-04 09:49:50+00', 'EXCEL-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1214, '2026-09-04 09:50:24+00', 'LISTAR-Lista de Titulares', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1215, '2026-09-04 09:50:27+00', 'LISTAR-Lista de Beneficiario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1216, '2026-09-04 09:50:33+00', 'LISTAR-Lista De Base de Datos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1217, '2026-09-04 09:50:37+00', 'LISTAR-Parentescos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1218, '2026-09-04 09:50:40+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1219, '2026-09-04 09:50:59+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1220, '2026-09-04 09:51:02+00', 'LISTAR-Lista de Roles', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1221, '2026-09-04 09:51:05+00', 'LISTAR-Lista de Parámetros', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1222, '2026-09-04 09:51:09+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1223, '2026-09-04 09:51:17+00', 'LISTAR-Módulos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1224, '2026-09-04 09:51:28+00', 'LISTAR-Estados del País', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1225, '2026-09-04 09:51:33+00', 'LISTAR-Entes', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1226, '2026-09-04 09:51:36+00', 'LISTAR-Direccion General', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1227, '2026-09-04 09:51:38+00', 'LISTAR-Dirección Línea', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1228, '2026-09-04 09:51:41+00', 'LISTAR-Coordinación', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1229, '2026-09-04 09:51:45+00', 'LISTAR-Lista de Titulares', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1230, '2026-09-04 09:51:48+00', 'LISTAR-Lista de Beneficiario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1231, '2026-09-04 09:51:54+00', 'ESTADISTICAS-BASICAS', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1232, '2026-09-04 09:52:03+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1233, '2026-09-04 09:52:08+00', 'LISTAR-Beneficiario menores a 25', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1234, '2026-09-04 09:52:14+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1235, '2026-09-04 09:52:17+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1236, '2026-09-04 09:52:22+00', 'LISTAR-Beneficiario menores a 25', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1237, '2026-09-04 09:52:26+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1238, '2026-09-04 09:52:28+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1239, '2026-09-04 09:52:37+00', 'EXCEL-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1240, '2026-09-04 09:52:37+00', 'EXCEL-ERRORBeneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1241, '2026-09-04 09:53:27+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1242, '2026-09-04 09:53:29+00', 'LISTAR-Beneficiario menores a 25', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1243, '2026-09-04 09:53:31+00', 'EXCEL-Beneficiario menores a 25', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1244, '2026-09-04 09:53:34+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1245, '2026-09-04 09:53:35+00', 'EXCEL-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1246, '2026-09-04 09:53:38+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1247, '2026-09-04 09:53:39+00', 'EXCEL-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1248, '2026-09-04 09:53:39+00', 'EXCEL-ERRORBeneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1249, '2026-09-04 09:53:54+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1250, '2026-09-04 10:01:27+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1251, '2026-09-04 10:01:33+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1252, '2026-09-04 10:01:37+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1253, '2026-09-04 10:01:40+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1254, '2026-09-04 10:01:45+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1255, '2026-09-04 10:01:49+00', 'LISTAR-Lista de Roles', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1256, '2026-09-04 10:01:53+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1257, '2026-09-04 10:02:50+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1258, '2026-09-04 10:04:08+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1259, '2026-09-04 10:04:12+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1260, '2026-09-04 10:05:02+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1261, '2026-09-04 10:13:57+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1262, '2026-09-04 10:21:44+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1263, '2026-09-04 10:41:14+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1264, '2026-09-04 10:56:02+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1265, '2026-09-04 10:57:40+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1266, '2026-09-04 11:07:55+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1267, '2026-09-04 11:08:21+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1268, '2026-09-04 11:08:21+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1269, '2026-09-04 11:08:26+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1270, '2026-09-04 11:08:57+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1271, '2026-09-09 09:40:41+00', 'LOGIN', 0, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1272, '2026-09-09 09:40:41+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1273, '2026-09-09 09:40:45+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1274, '2026-09-09 09:41:28+00', 'LISTAR-Beneficiario menores a 25', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1275, '2026-09-09 09:41:38+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1276, '2026-09-09 09:41:58+00', 'LISTAR-Lista De Base de Datos', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1277, '2026-09-09 09:42:14+00', 'LISTAR-Lista de Citas', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1278, '2026-09-09 09:48:57+00', 'LOGIN', 0, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1279, '2026-09-09 09:48:57+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1280, '2026-09-09 09:50:44+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1281, '2026-09-09 09:50:44+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1282, '2026-09-09 09:52:30+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1283, '2026-09-09 10:15:52+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1284, '2026-09-09 10:15:52+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1285, '2026-09-09 10:16:09+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1286, '2026-09-09 10:16:09+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1287, '2026-09-09 10:18:54+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1288, '2026-09-09 10:18:54+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1289, '2026-09-09 10:17:11+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1290, '2026-09-09 10:17:11+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1291, '2026-09-09 10:17:39+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1292, '2026-09-09 10:17:39+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1293, '2026-09-09 10:18:05+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1294, '2026-09-09 10:18:05+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1295, '2026-09-09 10:39:28+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1296, '2026-09-09 10:39:28+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1297, '2026-09-09 10:37:37+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1298, '2026-09-09 10:37:37+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1299, '2026-09-09 10:37:43+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1300, '2026-09-09 10:37:48+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1301, '2026-09-09 10:41:13+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1302, '2026-09-09 11:11:38+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1303, '2026-09-09 11:12:19+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1304, '2026-09-09 11:15:30+00', 'LISTAR-Lista De Base de Datos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1305, '2026-09-09 11:30:59+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1306, '2026-09-09 11:31:01+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1307, '2026-09-09 11:31:20+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1308, '2026-09-09 11:31:23+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1309, '2026-09-09 11:33:04+00', 'LISTAR-Lista de Roles', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1310, '2026-09-09 11:33:08+00', 'LISTAR-Etario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1311, '2026-09-09 11:33:33+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1312, '2026-09-09 11:59:35+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1313, '2026-09-09 11:59:35+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1314, '2026-09-09 11:59:40+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1315, '2026-09-09 11:59:49+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1316, '2026-09-09 11:59:53+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1317, '2026-09-09 11:59:56+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1318, '2026-09-09 12:00:01+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1319, '2026-09-09 12:00:03+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1320, '2026-09-09 12:00:07+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1321, '2026-09-09 12:02:14+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1322, '2026-09-09 12:03:13+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1323, '2026-09-09 12:03:39+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1324, '2026-09-09 12:04:35+00', 'EXCEL-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1325, '2026-09-09 12:05:13+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1326, '2026-09-09 12:05:33+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1327, '2026-09-09 12:05:36+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1328, '2026-09-09 12:06:38+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1329, '2026-09-09 12:06:55+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1330, '2026-09-09 12:07:29+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1331, '2026-09-09 12:07:36+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1332, '2026-09-09 12:07:41+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1333, '2026-09-09 12:09:01+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1334, '2026-09-09 12:19:18+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1335, '2026-09-09 12:24:42+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1336, '2026-09-09 12:24:44+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1337, '2026-09-10 09:41:52+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1338, '2026-09-14 08:51:30+00', 'LOGIN', 0, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1339, '2026-09-14 08:51:30+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1340, '2026-09-14 08:51:34+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1341, '2026-09-14 08:51:39+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1342, '2026-09-14 08:51:41+00', 'LISTAR-Lista de Roles', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1343, '2026-09-14 08:52:58+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1344, '2026-09-14 08:55:34+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1345, '2026-09-14 09:13:21+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1346, '2026-09-14 09:13:21+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1347, '2026-09-14 09:13:32+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1348, '2026-09-14 09:13:37+00', 'LISTAR-Lista de Titulares', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1349, '2026-09-14 09:13:43+00', 'LISTAR-Lista de Beneficiario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1350, '2026-09-14 09:13:47+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1351, '2026-09-14 09:19:23+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1352, '2026-09-14 09:19:23+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1353, '2026-09-14 09:19:45+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1354, '2026-09-14 09:19:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1355, '2026-09-14 09:19:58+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1356, '2026-09-14 09:28:38+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1357, '2026-09-14 09:28:38+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1358, '2026-09-14 09:30:25+00', 'Inserción Citas paciente Se creó el Registro de Cita', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1359, '2026-09-14 09:35:23+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1360, '2026-09-14 09:51:51+00', 'LOGIN', 0, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1361, '2026-09-14 09:51:51+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1362, '2026-09-14 09:52:03+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1363, '2026-09-14 09:52:07+00', 'LISTAR-Lista de Roles', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1364, '2026-09-14 09:52:58+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1365, '2026-09-14 09:53:05+00', 'LISTAR-Lista de Citas', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1366, '2026-09-14 09:53:13+00', 'LISTAR-Lista de Roles', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1367, '2026-09-14 10:06:25+00', 'LOGIN', 0, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1368, '2026-09-14 10:06:25+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.31', NULL);
INSERT INTO public.trazabilidad VALUES (1369, '2026-09-16 08:57:22+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1370, '2026-09-16 08:57:22+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1371, '2026-09-16 08:59:59+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1372, '2026-09-16 08:59:59+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1373, '2026-09-16 10:56:36+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1374, '2026-09-16 11:09:53+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1375, '2026-09-16 13:45:32+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1376, '2026-09-16 13:45:32+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1377, '2026-09-17 09:20:02+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1378, '2026-09-17 09:20:02+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1379, '2026-09-17 09:20:07+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1380, '2026-09-17 09:28:53+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1381, '2026-09-17 12:14:43+00', 'LOGIN', 0, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1382, '2026-09-17 12:14:43+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1383, '2026-09-17 12:14:50+00', 'LISTAR-Lista de Roles', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1384, '2026-09-17 12:14:53+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1385, '2026-09-17 12:14:59+00', 'LISTAR-Lista de Roles', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1386, '2026-09-17 12:15:01+00', 'LISTAR-Lista de Titulares', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1387, '2026-09-17 12:15:06+00', 'LISTAR-Lista de Citas', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1388, '2026-09-17 12:15:13+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.11', NULL);
INSERT INTO public.trazabilidad VALUES (1389, '2026-09-17 12:56:24+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1390, '2026-09-17 12:56:35+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1391, '2026-09-17 12:57:59+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1392, '2026-09-17 13:02:53+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1393, '2026-09-17 13:02:53+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1394, '2026-09-17 13:03:07+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1395, '2026-09-17 13:03:07+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1396, '2026-09-17 13:03:25+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1397, '2026-09-17 13:03:33+00', 'LISTAR-Etario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1398, '2026-09-17 13:03:38+00', 'LISTAR-Médicos & Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1399, '2026-09-17 13:04:54+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1400, '2026-09-17 13:05:19+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1401, '2026-09-17 13:05:40+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1402, '2026-09-17 13:06:56+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1403, '2026-09-17 13:07:11+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1404, '2026-09-17 13:28:12+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1405, '2026-09-17 13:28:50+00', 'LISTAR-Lista de Usuarios', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1406, '2026-09-17 13:29:51+00', 'LISTAR-Trazabilidad de Usuario', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1407, '2026-09-18 09:13:40+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1408, '2026-09-18 09:13:40+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1409, '2026-09-18 09:15:19+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1410, '2026-09-18 09:17:00+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1411, '2026-09-18 09:17:48+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1412, '2026-09-18 09:20:22+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1413, '2026-09-18 09:21:55+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1414, '2026-09-18 09:22:34+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1415, '2026-09-18 09:22:39+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1416, '2026-09-18 09:22:48+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1417, '2026-09-18 09:22:54+00', 'LISTAR-Etario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1418, '2026-09-18 09:41:22+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1419, '2026-09-18 09:42:27+00', 'LISTAR-Lista de Roles', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1420, '2026-09-18 10:43:35+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1421, '2026-09-18 10:43:35+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1422, '2026-09-18 10:43:40+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1423, '2026-09-18 10:46:39+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1424, '2026-09-18 10:50:31+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1425, '2026-09-18 10:51:03+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1426, '2026-09-18 11:00:24+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1427, '2026-09-18 11:00:31+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1428, '2026-09-18 11:00:37+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1429, '2026-09-18 11:00:52+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1430, '2026-09-18 11:08:45+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1431, '2026-09-18 11:20:45+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1432, '2026-09-18 11:48:53+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1433, '2026-09-18 12:06:09+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1434, '2026-09-18 12:06:14+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1435, '2026-09-18 13:46:08+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1436, '2026-09-18 13:46:08+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1437, '2026-09-18 13:46:11+00', 'LISTAR-Lista de Roles', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1438, '2026-09-18 13:46:16+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1439, '2026-09-18 13:46:22+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1440, '2026-09-18 13:46:47+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1441, '2026-09-18 13:46:53+00', 'LISTAR-Beneficiario menores a 25', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1442, '2026-09-18 13:46:56+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1443, '2026-09-18 13:46:58+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1444, '2026-09-18 13:47:01+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1445, '2026-09-18 14:08:10+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1446, '2026-09-18 14:08:10+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1447, '2026-09-18 14:08:32+00', 'LISTAR-Beneficiario menores a 25', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1448, '2026-09-18 14:24:11+00', 'LOGIN', 0, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1449, '2026-09-18 14:24:11+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1450, '2026-09-18 14:25:48+00', 'LISTAR-Lista de Titulares', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1451, '2026-09-18 14:25:52+00', 'LISTAR-Lista de Citas', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1452, '2026-09-18 14:25:56+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1453, '2026-09-18 14:26:01+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1454, '2026-09-18 14:26:07+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1455, '2026-09-18 14:26:13+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1456, '2026-09-18 14:26:20+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.134', NULL);
INSERT INTO public.trazabilidad VALUES (1457, '2026-09-21 08:55:09+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1458, '2026-09-21 08:55:09+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1459, '2026-09-21 09:26:14+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1460, '2026-09-21 09:26:14+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1461, '2026-09-21 12:54:16+00', 'LOGIN', 0, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (1462, '2026-09-21 12:54:16+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (1463, '2026-09-21 12:59:01+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (1464, '2026-09-21 12:59:20+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (1465, '2026-09-21 13:01:19+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.23', NULL);
INSERT INTO public.trazabilidad VALUES (1466, '2026-09-21 13:08:36+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1467, '2026-09-21 13:08:36+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1468, '2026-09-21 13:12:46+00', 'LOGIN', 0, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1469, '2026-09-21 13:12:46+00', 'LOGIN-USUARIO-INICIO-SESION', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1470, '2026-09-21 13:14:04+00', 'ESTADISTICAS-BASICAS', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1471, '2026-09-21 13:14:37+00', 'LISTAR-Coordinación', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1472, '2026-09-21 13:17:56+00', 'LISTAR-Lista de Especialidades', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1473, '2026-09-21 13:19:03+00', 'LISTAR-Módulos', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1474, '2026-09-21 13:20:43+00', 'LISTAR-Lista de Pacientes de Cortesia', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1475, '2026-09-21 13:20:47+00', 'LISTAR-Lista de Titulares', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1476, '2026-09-21 13:20:51+00', 'LISTAR-Lista de Beneficiario', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1477, '2026-09-21 13:20:55+00', 'LISTAR-Parentescos', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1478, '2026-09-21 13:22:51+00', 'LISTAR-Lista de Usuarios', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1479, '2026-09-21 13:23:17+00', 'Modificación Usuarios Se editó el usuario  (ID: 3)', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1480, '2026-09-21 13:23:17+00', 'LISTAR-Lista de Usuarios', 3, '172.17.10.233', NULL);
INSERT INTO public.trazabilidad VALUES (1481, '2026-09-22 08:47:49+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1482, '2026-09-22 08:47:49+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1483, '2026-09-22 08:49:53+00', 'LISTAR-Beneficiario menores a 25', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1484, '2026-09-22 08:49:56+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1485, '2026-09-22 08:49:58+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1486, '2026-09-22 08:50:16+00', 'LISTAR-Lista de Parámetros', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1487, '2026-09-22 08:50:19+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1488, '2026-09-22 08:50:22+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1489, '2026-09-22 08:50:26+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1490, '2026-09-22 08:50:30+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1491, '2026-09-22 08:50:33+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1492, '2026-09-22 09:20:03+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1493, '2026-09-22 09:58:10+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1494, '2026-09-22 09:58:10+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1495, '2026-09-22 09:58:15+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1496, '2026-09-22 09:58:27+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1497, '2026-09-22 09:58:33+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1498, '2026-09-22 09:59:22+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1499, '2026-09-22 10:00:25+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1500, '2026-09-22 10:00:59+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1501, '2026-09-22 10:01:02+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1502, '2026-09-22 10:01:33+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1503, '2026-09-22 10:03:44+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1504, '2026-09-22 10:05:41+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1505, '2026-09-22 10:06:31+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1506, '2026-09-22 10:07:54+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1507, '2026-09-22 10:08:01+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1508, '2026-09-22 10:08:22+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1509, '2026-09-22 10:08:42+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1510, '2026-09-22 10:10:13+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1511, '2026-09-22 10:11:51+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1512, '2026-09-22 10:12:05+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1513, '2026-09-22 10:44:18+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1514, '2026-09-22 10:44:18+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1515, '2026-09-22 10:43:16+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1516, '2026-09-22 10:43:16+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1517, '2026-09-22 10:51:37+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1518, '2026-09-22 11:23:45+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1519, '2026-09-22 11:23:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1520, '2026-09-22 11:25:36+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1521, '2026-09-22 11:25:36+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1522, '2026-09-22 11:29:46+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1523, '2026-09-22 11:31:08+00', 'EXCEL-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1524, '2026-09-22 11:31:11+00', 'EXCEL-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1525, '2026-09-22 11:36:27+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1526, '2026-09-22 11:36:27+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1527, '2026-09-22 11:36:31+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1528, '2026-09-22 11:36:45+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1529, '2026-09-22 11:37:29+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1530, '2026-09-22 11:38:57+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1531, '2026-09-22 11:39:40+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1532, '2026-09-22 11:39:51+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1533, '2026-09-22 11:38:30+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1534, '2026-09-22 11:38:30+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1535, '2026-09-22 11:45:15+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1536, '2026-09-22 12:17:29+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1537, '2026-09-22 12:17:39+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1538, '2026-09-22 12:17:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1539, '2026-09-22 12:17:54+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1540, '2026-09-22 12:22:52+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1541, '2026-09-22 12:23:00+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1542, '2026-09-22 12:25:30+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1543, '2026-09-22 12:27:52+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1544, '2026-09-22 12:28:18+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1545, '2026-09-22 12:43:49+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1546, '2026-09-22 12:44:28+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1547, '2026-09-22 12:44:28+00', 'REGISTRO-LOG Archivo EXCEL Se cargo el archivo de Excel SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1548, '2026-09-22 12:44:28+00', 'REGISTRO-LOG ARCHIVO EXCEL Mensaje ✅ Archivo SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx subido correctamente: <strong>f8108798efb18aad.xlsx</strong>', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1549, '2026-09-22 12:46:48+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1550, '2026-09-22 12:47:20+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1551, '2026-09-22 12:47:22+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1552, '2026-09-22 12:47:22+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1553, '2026-09-22 12:47:23+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1554, '2026-09-22 12:47:57+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1555, '2026-09-22 12:48:06+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1556, '2026-09-22 12:49:35+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1557, '2026-09-22 12:51:09+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1558, '2026-09-22 12:52:40+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1559, '2026-09-22 12:53:18+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1560, '2026-09-22 12:53:56+00', 'REGISTRO-LOG Archivo EXCEL Se cargo el archivo de Excel SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1561, '2026-09-22 12:53:56+00', 'REGISTRO-LOG ARCHIVO EXCEL Mensaje ✅ Archivo SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx subido correctamente: <strong>b2b344dd3efe7914.xlsx</strong>', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1562, '2026-09-22 12:53:56+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1563, '2026-09-22 12:56:43+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1564, '2026-09-22 12:57:04+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1565, '2026-09-22 12:57:43+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1566, '2026-09-22 12:58:52+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1567, '2026-09-22 12:59:19+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1568, '2026-09-22 12:59:22+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1569, '2026-09-22 13:00:23+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1570, '2026-09-22 13:00:38+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1571, '2026-09-22 13:04:37+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1572, '2026-09-22 13:04:47+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '::1', 'Se cargo el archivo de Excel Archivos Procesados_archivo.xlsx');
INSERT INTO public.trazabilidad VALUES (1573, '2026-09-22 13:04:47+00', 'REGISTRO-LOG ARCHIVO EXCEL ', 1, '::1', 'Mensaje ✅ Archivo Archivos Procesados_archivo.xlsx subido correctamente: <strong>ab3a09c1742121ec.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1574, '2026-09-22 13:04:47+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1575, '2026-09-22 13:04:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1576, '2026-09-22 13:05:31+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1577, '2026-09-22 13:05:45+00', 'REGISTRO-LOG ARCHIVO EXCEL ', 1, '::1', 'Mensaje ❌ Extensión no permitida. Solo: xlsx');
INSERT INTO public.trazabilidad VALUES (1578, '2026-09-22 13:05:45+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1579, '2026-09-22 13:05:57+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1580, '2026-09-22 13:06:36+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1581, '2026-09-22 13:06:41+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1582, '2026-09-22 13:07:08+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1583, '2026-09-22 13:07:10+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1584, '2026-09-22 13:07:23+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1585, '2026-09-22 13:07:54+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1586, '2026-09-22 13:08:12+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1587, '2026-09-22 13:09:54+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1588, '2026-09-22 13:10:02+00', 'REGISTRO-LOG-ERROR ARCHIVO EXCEL ', 1, '::1', 'Mensaje ❌ Extensión no permitida. Solo: xlsx');
INSERT INTO public.trazabilidad VALUES (1589, '2026-09-22 13:10:02+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1590, '2026-09-22 13:10:37+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '::1', 'Se cargo el archivo de Excel SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx');
INSERT INTO public.trazabilidad VALUES (1591, '2026-09-22 13:10:37+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 1, '::1', 'Mensaje ✅ Archivo SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx subido correctamente: <strong>6bedb8fc17d45e68.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1592, '2026-09-22 13:10:37+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1593, '2026-09-22 13:10:49+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1594, '2026-09-22 13:11:14+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1595, '2026-09-22 13:11:26+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1596, '2026-09-22 13:11:32+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1597, '2026-09-22 13:11:40+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1598, '2026-09-22 13:11:43+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1599, '2026-09-22 13:34:20+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1600, '2026-09-22 13:34:28+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1601, '2026-09-22 13:34:43+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1602, '2026-09-22 13:39:42+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1603, '2026-09-22 13:39:46+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1604, '2026-09-22 13:41:25+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1605, '2026-09-22 13:41:31+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1606, '2026-09-22 13:46:29+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1607, '2026-09-22 13:47:03+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1608, '2026-09-22 13:48:05+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1609, '2026-09-22 13:49:04+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1610, '2026-09-22 13:49:39+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1611, '2026-09-22 14:18:56+00', 'LOGIN', 0, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1612, '2026-09-22 14:18:56+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1613, '2026-09-22 14:18:59+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1614, '2026-09-22 14:19:02+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1615, '2026-09-22 14:19:09+00', 'EXCEL-Archivo Cargado', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1616, '2026-09-22 14:19:42+00', 'REGISTRO-LOG-ERROR ARCHIVO EXCEL ', 1, '172.17.11.160', 'Mensaje ❌ Error al subir el archivo. Código: desconocido');
INSERT INTO public.trazabilidad VALUES (1617, '2026-09-22 14:19:42+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1618, '2026-09-22 14:20:38+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '172.17.11.160', 'Se cargo el archivo de Excel Archivos Procesados_archivo.xlsx');
INSERT INTO public.trazabilidad VALUES (1619, '2026-09-22 14:20:38+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 1, '172.17.11.160', 'Mensaje ✅ Archivo Archivos Procesados_archivo.xlsx subido correctamente: <strong>720bb64805192875.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1620, '2026-09-22 14:20:38+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1621, '2026-09-22 14:20:50+00', 'REGISTRO-LOG-ERROR ARCHIVO EXCEL ', 1, '172.17.11.160', 'Mensaje ❌ Error al subir el archivo. Código: desconocido');
INSERT INTO public.trazabilidad VALUES (1622, '2026-09-22 14:20:50+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.160', NULL);
INSERT INTO public.trazabilidad VALUES (1623, '2026-09-23 08:56:17+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1624, '2026-09-23 08:56:17+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1625, '2026-09-23 09:16:09+00', 'LOGIN', 0, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1626, '2026-09-23 09:16:09+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1627, '2026-09-23 09:20:21+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1628, '2026-09-23 09:21:15+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '172.17.11.133', 'Se cargo el archivo de Excel Archivos Procesados_archivo.xlsx');
INSERT INTO public.trazabilidad VALUES (1629, '2026-09-23 09:21:15+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 1, '172.17.11.133', 'Mensaje ✅ Archivo Archivos Procesados_archivo.xlsx subido correctamente: <strong>9f9ed593bfa8b0e2.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1630, '2026-09-23 09:21:15+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1631, '2026-09-23 09:21:40+00', 'REGISTRO-LOG-ERROR ARCHIVO EXCEL ', 1, '172.17.11.133', 'Mensaje ❌ Error al subir el archivo. Código: desconocido');
INSERT INTO public.trazabilidad VALUES (1632, '2026-09-23 09:21:40+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1633, '2026-09-23 09:22:06+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1634, '2026-09-23 09:22:16+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1635, '2026-09-23 09:23:19+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1636, '2026-09-23 09:23:19+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1637, '2026-09-23 09:40:31+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1638, '2026-09-23 09:40:44+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '172.17.11.133', 'Se cargo el archivo de Excel SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx');
INSERT INTO public.trazabilidad VALUES (1639, '2026-09-23 09:40:44+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 1, '172.17.11.133', 'Mensaje ✅ Archivo SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx subido correctamente: <strong>699bdd00f876e20e.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1640, '2026-09-23 09:40:44+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1641, '2026-09-23 09:42:11+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1642, '2026-09-23 09:42:30+00', 'REGISTRO-LOG Archivo EXCEL ', 1, '172.17.11.133', 'Se cargo el archivo de Excel SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx');
INSERT INTO public.trazabilidad VALUES (1643, '2026-09-23 09:42:30+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 1, '172.17.11.133', 'Mensaje ✅ Archivo SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx subido correctamente: <strong>379738e8bf1af16f.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1644, '2026-09-23 09:42:30+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1645, '2026-09-23 09:44:16+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1646, '2026-09-23 09:44:21+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1647, '2026-09-23 09:45:21+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1648, '2026-09-23 09:47:12+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1649, '2026-09-23 09:47:21+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1650, '2026-09-23 10:08:02+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1651, '2026-09-23 10:23:01+00', 'LISTAR-Horarios Médicos', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1652, '2026-09-23 10:25:23+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1653, '2026-09-23 10:25:24+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1654, '2026-09-23 10:31:52+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1655, '2026-09-23 10:32:08+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1656, '2026-09-23 10:32:28+00', 'LOGIN', 0, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1657, '2026-09-23 10:32:28+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1658, '2026-09-23 10:32:35+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1659, '2026-09-23 10:32:44+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1660, '2026-09-23 10:37:39+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1661, '2026-09-23 10:37:59+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1662, '2026-09-23 10:37:59+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1663, '2026-09-23 10:38:19+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1664, '2026-09-23 10:38:33+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1665, '2026-09-23 10:39:57+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1666, '2026-09-23 10:41:20+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1667, '2026-09-23 10:42:00+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1668, '2026-09-23 11:07:42+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1669, '2026-09-23 11:11:40+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1670, '2026-09-23 11:11:49+00', 'LOGIN', 0, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1671, '2026-09-23 11:11:49+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1672, '2026-09-23 11:11:54+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1673, '2026-09-23 11:27:45+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1674, '2026-09-23 11:29:01+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1675, '2026-09-23 11:31:30+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1676, '2026-09-23 11:32:23+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1677, '2026-09-23 11:40:49+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1678, '2026-09-23 11:41:00+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1679, '2026-09-23 11:57:35+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1680, '2026-09-23 12:10:36+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1681, '2026-09-23 12:50:29+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1682, '2026-09-23 12:52:34+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1683, '2026-09-23 12:56:55+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1684, '2026-09-23 13:00:05+00', 'LOGIN', 0, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1685, '2026-09-23 13:00:05+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1686, '2026-09-23 13:00:10+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1687, '2026-09-23 13:00:39+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.133', NULL);
INSERT INTO public.trazabilidad VALUES (1688, '2026-09-23 13:15:54+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1689, '2026-09-23 13:15:54+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1690, '2026-09-23 13:16:32+00', 'LISTAR-Lista de Usuarios', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1691, '2026-09-23 13:18:43+00', 'LISTAR-Archivos Procesados', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1692, '2026-09-23 13:19:18+00', 'REGISTRO-LOG Archivo EXCEL ', 5, '172.17.22.67', 'Se cargo el archivo de Excel Trazabilidad de Usuario_archivo.xlsx');
INSERT INTO public.trazabilidad VALUES (1693, '2026-09-23 13:19:18+00', 'REGISTRO-LOG-OK ARCHIVO EXCEL ', 5, '172.17.22.67', 'Mensaje ✅ Archivo Trazabilidad de Usuario_archivo.xlsx subido correctamente: <strong>4dd1638ee5d4efb5.xlsx</strong>');
INSERT INTO public.trazabilidad VALUES (1694, '2026-09-23 13:19:18+00', 'LISTAR-Archivos Procesados', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1695, '2026-09-23 13:20:21+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1696, '2026-09-23 13:23:47+00', 'LISTAR-Archivos Procesados', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1697, '2026-09-23 13:25:01+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (1698, '2026-09-24 09:24:59+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1699, '2026-09-24 09:24:59+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1700, '2026-09-24 09:29:58+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1701, '2026-09-24 09:29:58+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1702, '2026-09-24 10:08:43+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1703, '2026-09-24 10:34:00+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1704, '2026-09-24 10:38:11+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1705, '2026-09-24 10:45:03+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1706, '2026-09-24 10:45:03+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1707, '2026-09-24 10:45:10+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1708, '2026-09-24 10:45:29+00', 'LISTAR-Lista de Parámetros', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1709, '2026-09-24 10:45:47+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1710, '2026-09-24 10:46:47+00', 'LISTAR-Lista de Parámetros', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1711, '2026-09-24 10:48:35+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1712, '2026-09-24 10:50:37+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1713, '2026-09-24 10:55:40+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1714, '2026-09-24 10:56:32+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1715, '2026-09-24 11:08:39+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1716, '2026-09-24 11:08:39+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1717, '2026-09-24 11:08:55+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1718, '2026-09-24 11:10:16+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1719, '2026-09-24 11:13:31+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1720, '2026-09-24 11:13:45+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1721, '2026-09-24 11:11:51+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1722, '2026-09-24 11:12:50+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1723, '2026-09-24 11:38:00+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1724, '2026-09-24 11:45:11+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1725, '2026-09-24 11:46:00+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1726, '2026-09-24 11:48:45+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1727, '2026-09-24 11:49:44+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1728, '2026-09-24 11:51:41+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1729, '2026-09-24 11:54:34+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1730, '2026-09-24 11:54:47+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1731, '2026-09-24 11:55:46+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1732, '2026-09-24 11:56:12+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1733, '2026-09-24 11:55:50+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1734, '2026-09-24 11:56:02+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (1735, '2026-09-24 12:06:45+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1736, '2026-09-24 12:07:38+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1737, '2026-09-24 12:08:16+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1738, '2026-09-24 12:09:20+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1739, '2026-09-24 12:09:31+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1740, '2026-09-24 12:09:31+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1741, '2026-09-24 12:09:36+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1742, '2026-09-24 12:11:00+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1743, '2026-09-24 12:11:45+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1744, '2026-09-24 12:11:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1745, '2026-09-24 12:11:51+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1746, '2026-09-24 12:12:30+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1747, '2026-09-24 12:12:30+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1748, '2026-09-24 12:12:41+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1749, '2026-09-24 12:12:41+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1750, '2026-09-24 12:15:11+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1751, '2026-09-24 12:15:18+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1752, '2026-09-24 12:15:38+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1753, '2026-09-24 12:18:04+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1754, '2026-09-24 12:20:36+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1755, '2026-09-24 12:20:37+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1756, '2026-09-24 12:20:45+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1757, '2026-09-24 12:20:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1758, '2026-09-24 12:20:48+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1759, '2026-09-24 12:21:50+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1760, '2026-09-24 12:25:40+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1761, '2026-09-24 12:26:07+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1762, '2026-09-24 12:26:26+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1763, '2026-09-24 12:26:32+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1764, '2026-09-24 12:26:36+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1765, '2026-09-24 12:26:40+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1766, '2026-09-24 12:26:43+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1767, '2026-09-24 12:27:11+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1768, '2026-09-24 12:27:11+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1769, '2026-09-24 12:42:49+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1770, '2026-09-24 12:43:01+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1771, '2026-09-24 12:43:02+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1772, '2026-09-24 12:45:50+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1773, '2026-09-24 12:45:50+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1774, '2026-09-24 12:47:07+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1775, '2026-09-24 12:47:28+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1776, '2026-09-24 12:47:46+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1777, '2026-09-24 12:47:48+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1778, '2026-09-24 12:47:52+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1779, '2026-09-24 12:47:55+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1780, '2026-09-24 12:47:58+00', 'LISTAR-Lista de Pacientes de Cortesia', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1781, '2026-09-24 12:48:04+00', 'LISTAR-Lista De Base de Datos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1782, '2026-09-24 12:48:09+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1783, '2026-09-24 12:48:12+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1784, '2026-09-24 12:48:18+00', 'LISTAR-Beneficiario menores a 25', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1785, '2026-09-24 12:48:21+00', 'LISTAR-Beneficiarios Menores de Edad', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1786, '2026-09-24 12:48:23+00', 'LISTAR-Beneficiarios con Condición Especial', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1787, '2026-09-24 12:48:30+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1788, '2026-09-24 12:48:31+00', 'ESTADISTICAS-GETARIO', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1789, '2026-09-24 12:48:36+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1790, '2026-09-24 12:48:43+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1791, '2026-09-24 12:48:45+00', 'LISTAR-Lista de Titulares', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1792, '2026-09-24 12:48:47+00', 'LISTAR-Lista de Beneficiario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1793, '2026-09-24 12:48:50+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1794, '2026-09-24 12:50:24+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1795, '2026-09-24 12:50:26+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (1796, '2026-09-24 12:52:17+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);


--
-- TOC entry 3792 (class 0 OID 99885)
-- Dependencies: 265
-- Data for Name: universidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.universidad VALUES (1, 'COLEGIO UNIVERSITARIO DE ENFERMERÍA DE LA ALCALDÍA METROPOLITANA DE CARACAS', 'CUEAMC', 1);
INSERT INTO public.universidad VALUES (2, 'COLEGIO UNIVERSITARIO DE REHABILITACIÓN "MAY HAMILTON"', 'CUR', 1);
INSERT INTO public.universidad VALUES (3, 'INSTITUTO UNIVERSITARIO DE AERONÁUTICA CIVIL "MAYOR  (AV) MIGUEL RODRÍGUEZ"', 'IUAC', 1);
INSERT INTO public.universidad VALUES (4, 'INSTITUTO UNIVERSITARIO DE TECNOLOGÍA ESCUELA NACIONAL DE ADMINISTRACIÓN Y HACIENDA PÚBLICA', 'ENAHP', 1);
INSERT INTO public.universidad VALUES (5, 'INSTITUTO UNIVERSITARIO LATINOAMERICANO DE AGROECOLOGÍA PAULO FREIRE', 'IULAPF', 1);
INSERT INTO public.universidad VALUES (6, 'UNIVERSIDAD BOLIVARIANA DE VENEZUELA', 'UBV', 1);
INSERT INTO public.universidad VALUES (7, 'UNIVERSIDAD CAMPESINA DE VENEZUELA "ALGIMIRO GABALDON"', 'UCVAG', 1);
INSERT INTO public.universidad VALUES (8, 'UNIVERSIDAD CENTRAL DE VENEZUELA', 'UCV', 1);
INSERT INTO public.universidad VALUES (9, 'UNIVERSIDAD CENTRO OCCIDENTAL LISANDRO ALVARADO', 'UCLA', 1);
INSERT INTO public.universidad VALUES (10, 'UNIVERSIDAD DE CARABOBO', 'UC', 1);
INSERT INTO public.universidad VALUES (12, 'UNIVERSIDAD DE LOS ANDES', 'ULA', 1);
INSERT INTO public.universidad VALUES (11, 'UNIVERSIDAD DE LAS CIENCIAS DE LA SALUD "HUGO CHÁVEZ FRÍAS"', 'UCS', 1);
INSERT INTO public.universidad VALUES (13, 'UNIVERSIDAD DE ORIENTE', 'UDO', 1);
INSERT INTO public.universidad VALUES (14, 'UNIVERSIDAD DEL ZULIA', 'LUZ', 1);
INSERT INTO public.universidad VALUES (15, 'UNIVERSIDAD DEPORTIVA DEL SUR', 'UDS', 1);
INSERT INTO public.universidad VALUES (16, 'UNIVERSIDAD MILITAR BOLIVARIANA DE VENEZUELA', 'UMBV', 1);
INSERT INTO public.universidad VALUES (17, 'UNIVERSIDAD NACIONAL ABIERTA', 'UNA', 1);
INSERT INTO public.universidad VALUES (18, 'UNIVERSIDAD NACIONAL DEL TURISMO', 'UNATUR', 1);
INSERT INTO public.universidad VALUES (19, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE ESPECIALIDADES ELÉCTRICAS', 'UNEXEE', 1);
INSERT INTO public.universidad VALUES (20, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE GUAYANA', 'UNEG', 1);
INSERT INTO public.universidad VALUES (21, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA GRAN CARACAS', 'UNEXCA', 1);
INSERT INTO public.universidad VALUES (22, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LA SEGURIDAD', 'UNES', 1);
INSERT INTO public.universidad VALUES (23, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LARA "MARTIN LUTHER KING"', 'UNELMLK', 1);
INSERT INTO public.universidad VALUES (24, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS ARTES', 'UNEARTE', 1);
INSERT INTO public.universidad VALUES (25, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LAS TELECOMUNICACIONES E INFORMÁTICA', 'UNETI', 1);
INSERT INTO public.universidad VALUES (26, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS CENTRALES RÓMULO GALLEGOS', 'UNERG', 1);
INSERT INTO public.universidad VALUES (27, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DE LOS LLANOS OCCIDENTALES EZEQUIEL ZAMORA', 'UNELLEZ', 1);
INSERT INTO public.universidad VALUES (28, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DEL MAGISTERIO "SAMUEL ROBINSON"', 'UNEM', 1);
INSERT INTO public.universidad VALUES (29, 'UNIVERSIDAD NACIONAL EXPERIMENTAL DEL TRANSPORTE', 'UNETRANS', 1);
INSERT INTO public.universidad VALUES (30, 'UNIVERSIDAD NACIONAL EXPERIMENTAL FRANCISCO DE MIRANDA', 'UNEFM', 1);
INSERT INTO public.universidad VALUES (31, 'UNIVERSIDAD NACIONAL EXPERIMENTAL MARÍTIMA DEL CARIBE', 'UMC', 1);
INSERT INTO public.universidad VALUES (32, 'UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA ANTONIO JOSÉ DE SUCRE', 'UNEXPO ', 1);
INSERT INTO public.universidad VALUES (34, 'UNIVERSIDAD NACIONAL EXPERIMENTAL RAFAEL MARÍA BARALT', 'UNERMB', 1);
INSERT INTO public.universidad VALUES (35, 'UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN BOLÍVAR', 'USB', 1);
INSERT INTO public.universidad VALUES (36, 'UNIVERSIDAD NACIONAL EXPERIMENTAL SIMÓN RODRÍGUEZ', 'UNESR', 1);
INSERT INTO public.universidad VALUES (37, 'UNIVERSIDAD NACIONAL EXPERIMENTAL SUR DEL LAGO JESÚS MARÍA SEMPRUM', 'UNESUR', 1);
INSERT INTO public.universidad VALUES (38, 'UNIVERSIDAD PEDAGÓGICA EXPERIMENTAL LIBERTADOR', 'UPEL', 1);
INSERT INTO public.universidad VALUES (39, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL "JOSÉ ANTONIO ANZOÁTEGUI"', 'UPTJAA', 1);
INSERT INTO public.universidad VALUES (40, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS LLANOS "JUANA RAMÍREZ"', 'UPTLLJR', 1);
INSERT INTO public.universidad VALUES (41, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE BARLOVENTO "ARGELIA LAYA"', 'UPTBAL', 1);
INSERT INTO public.universidad VALUES (42, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE CARACAS "MARISCAL SUCRE"', 'UPTCMS', 1);
INSERT INTO public.universidad VALUES (43, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE FALCON "ALONSO GAMERO"', 'UPTFAG', 1);
INSERT INTO public.universidad VALUES (44, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS ALTOS MIRANDINOS "CECILIO ACOSTA"', 'UPTAMCA', 1);
INSERT INTO public.universidad VALUES (45, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE LOS VALLES DEL TUY', 'UPTVT', 1);
INSERT INTO public.universidad VALUES (46, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE PUERTO CABELLO', 'UPTPC', 1);
INSERT INTO public.universidad VALUES (47, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DE VALENCIA', 'UPTV', 1);
INSERT INTO public.universidad VALUES (48, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ALTO APURE "PEDRO CAMEJO"', 'UPTAAPC', 1);
INSERT INTO public.universidad VALUES (49, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO ARAGUA "FEDERICO BRITO FIGUEROA"', 'UPTA', 1);
INSERT INTO public.universidad VALUES (50, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BARINAS "JOSÉ FELIX RIBAS"', 'UPTJFR', 1);
INSERT INTO public.universidad VALUES (51, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO BOLÍVAR', 'UPTB', 1);
INSERT INTO public.universidad VALUES (52, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO LARA "ANDRES ELOY BLANCO"', 'UPTAEB', 1);
INSERT INTO public.universidad VALUES (53, 'UNIVERSIDAD POLITÉCNICA TERRITORIAL DEL ESTADO MÉRIDA "KLÉBER RAMÍREZ"', 'UPTMKR', 1);
INSERT INTO public.universidad VALUES (54, 'UNIVERSIDAD POPULAR DEL AMBIENTE FRUTO VIVAS', 'UPAFV', 1);
INSERT INTO public.universidad VALUES (33, 'UNIVERSIDAD NACIONAL EXPERIMENTAL POLITÉCNICA DE LA FUERZA ARMADA NACIONAL BOLIVARIANA', 'UNEFA', 1);


--
-- TOC entry 3794 (class 0 OID 99891)
-- Dependencies: 267
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.usuario VALUES (4, 'Jesús', 'Perez', 'jperez', 2, '1234567890', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (9, 'Milca', 'Pacheco', 'pmilca', 2, '4561230', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (6, 'Laura', 'Urbina', 'lurbina', 2, '7894560', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (7, 'Anabella', 'Diaz', 'danabella', 2, '8524560', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (8, 'Eduviges', 'Blanco', 'beduviges', 2, '1597530', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (5, 'Jesus', 'Salazar', 'jsalazar', 1, '1234560', '', 1, 0, 1, 1, 0);
INSERT INTO public.usuario VALUES (3, 'Jhoanna', 'Pantoja', 'jpantoja', 1, '1234567890', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (2, 'jesus', 'aquino', 'jaquino', 2, '1234', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (1, 'gabriela', 'mendez', 'gabi@gmail.com', 1, '1234', NULL, 1, 0, 1, 0, 0);


--
-- TOC entry 3844 (class 0 OID 0)
-- Dependencies: 271
-- Name: carga_masiva_id_carga_masiva_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.carga_masiva_id_carga_masiva_seq', 1671599, true);


--
-- TOC entry 3845 (class 0 OID 0)
-- Dependencies: 222
-- Name: cita_id_cita_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cita_id_cita_seq', 31, true);


--
-- TOC entry 3846 (class 0 OID 0)
-- Dependencies: 224
-- Name: coordinacion_id_coordinacion_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.coordinacion_id_coordinacion_seq', 1, false);


--
-- TOC entry 3847 (class 0 OID 0)
-- Dependencies: 226
-- Name: direccion_general_id_direccion_general_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.direccion_general_id_direccion_general_seq', 1, false);


--
-- TOC entry 3848 (class 0 OID 0)
-- Dependencies: 228
-- Name: direccion_linea_id_direccion_linea_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.direccion_linea_id_direccion_linea_seq', 1, false);


--
-- TOC entry 3849 (class 0 OID 0)
-- Dependencies: 230
-- Name: ente_id_ente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.ente_id_ente_seq', 1, false);


--
-- TOC entry 3850 (class 0 OID 0)
-- Dependencies: 232
-- Name: especialidad_id_especialidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.especialidad_id_especialidad_seq', 1, true);


--
-- TOC entry 3851 (class 0 OID 0)
-- Dependencies: 234
-- Name: estado_Venezuela_id_estado_pais_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."estado_Venezuela_id_estado_pais_seq"', 1, false);


--
-- TOC entry 3852 (class 0 OID 0)
-- Dependencies: 237
-- Name: etario_id_etario_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.etario_id_etario_seq', 13, true);


--
-- TOC entry 3853 (class 0 OID 0)
-- Dependencies: 239
-- Name: historial_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.historial_id_historial_seq', 1, false);


--
-- TOC entry 3854 (class 0 OID 0)
-- Dependencies: 241
-- Name: horarios_medicos_id_horarios_medicos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.horarios_medicos_id_horarios_medicos_seq', 20, true);


--
-- TOC entry 3855 (class 0 OID 0)
-- Dependencies: 269
-- Name: log_archivos_id_log_archivos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.log_archivos_id_log_archivos_seq', 10, true);


--
-- TOC entry 3856 (class 0 OID 0)
-- Dependencies: 243
-- Name: medico_id_medico_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.medico_id_medico_seq', 100, true);


--
-- TOC entry 3857 (class 0 OID 0)
-- Dependencies: 245
-- Name: modulos_id_modulos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.modulos_id_modulos_seq', 1, true);


--
-- TOC entry 3858 (class 0 OID 0)
-- Dependencies: 247
-- Name: motivo_consulta_id_motivo_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.motivo_consulta_id_motivo_consulta_seq', 1, false);


--
-- TOC entry 3859 (class 0 OID 0)
-- Dependencies: 249
-- Name: nacionalidad_id_nacionalidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.nacionalidad_id_nacionalidad_seq', 1, false);


--
-- TOC entry 3860 (class 0 OID 0)
-- Dependencies: 252
-- Name: parametros_general_id_parametros_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.parametros_general_id_parametros_seq', 2, true);


--
-- TOC entry 3861 (class 0 OID 0)
-- Dependencies: 254
-- Name: parentesco_id_parentesco_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.parentesco_id_parentesco_seq', 7, true);


--
-- TOC entry 3862 (class 0 OID 0)
-- Dependencies: 256
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 2, true);


--
-- TOC entry 3863 (class 0 OID 0)
-- Dependencies: 258
-- Name: sexo_id_sexo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sexo_id_sexo_seq', 1, false);


--
-- TOC entry 3864 (class 0 OID 0)
-- Dependencies: 260
-- Name: tipo_de_empleado_id_tipo_de_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tipo_de_empleado_id_tipo_de_empleado_seq', 1, false);


--
-- TOC entry 3865 (class 0 OID 0)
-- Dependencies: 261
-- Name: titular_id_titular_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.titular_id_titular_seq', 41, true);


--
-- TOC entry 3866 (class 0 OID 0)
-- Dependencies: 262
-- Name: titular_te_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.titular_te_seq', 3, true);


--
-- TOC entry 3867 (class 0 OID 0)
-- Dependencies: 264
-- Name: trazabilidad_id_trazabilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trazabilidad_id_trazabilidad_seq', 1796, true);


--
-- TOC entry 3868 (class 0 OID 0)
-- Dependencies: 266
-- Name: universidad_id_universidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.universidad_id_universidad_seq', 1, false);


--
-- TOC entry 3869 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 3, true);


--
-- TOC entry 3498 (class 2606 OID 99924)
-- Name: activo activo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.activo
    ADD CONSTRAINT activo_pkey PRIMARY KEY (id);


--
-- TOC entry 3500 (class 2606 OID 99926)
-- Name: bd_condicion bd_condicion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_condicion
    ADD CONSTRAINT bd_condicion_pkey PRIMARY KEY (id);


--
-- TOC entry 3502 (class 2606 OID 99928)
-- Name: bd_datos bd_datos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_datos
    ADD CONSTRAINT bd_datos_pkey PRIMARY KEY (id);


--
-- TOC entry 3504 (class 2606 OID 99930)
-- Name: bd_departamento bd_departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_departamento
    ADD CONSTRAINT bd_departamento_pkey PRIMARY KEY (id);


--
-- TOC entry 3506 (class 2606 OID 99932)
-- Name: bd_institucion bd_institucion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_institucion
    ADD CONSTRAINT bd_institucion_pkey PRIMARY KEY (id);


--
-- TOC entry 3508 (class 2606 OID 99934)
-- Name: bd_tipopersonal bd_tipopersonal_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_tipopersonal
    ADD CONSTRAINT bd_tipopersonal_pkey PRIMARY KEY (id);


--
-- TOC entry 3560 (class 2606 OID 114755)
-- Name: carga_masiva carga_masiva_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva
    ADD CONSTRAINT carga_masiva_pkey PRIMARY KEY (id_carga_masiva);


--
-- TOC entry 3510 (class 2606 OID 99936)
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id_cita);


--
-- TOC entry 3512 (class 2606 OID 99938)
-- Name: coordinacion coordinacion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion
    ADD CONSTRAINT coordinacion_pkey PRIMARY KEY (id_coordinacion);


--
-- TOC entry 3514 (class 2606 OID 99940)
-- Name: direccion_general direccion_general_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general
    ADD CONSTRAINT direccion_general_pkey PRIMARY KEY (id_direccion_general);


--
-- TOC entry 3516 (class 2606 OID 99942)
-- Name: direccion_linea direccion_linea_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea
    ADD CONSTRAINT direccion_linea_pkey PRIMARY KEY (id_direccion_linea);


--
-- TOC entry 3518 (class 2606 OID 99944)
-- Name: ente ente_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ente
    ADD CONSTRAINT ente_pkey PRIMARY KEY (id_ente);


--
-- TOC entry 3520 (class 2606 OID 99946)
-- Name: especialidad especialidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_pkey PRIMARY KEY (id_especialidad);


--
-- TOC entry 3522 (class 2606 OID 99948)
-- Name: estado_venezuela estado_Venezuela_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_venezuela
    ADD CONSTRAINT "estado_Venezuela_pkey" PRIMARY KEY (id_estado_pais);


--
-- TOC entry 3524 (class 2606 OID 99950)
-- Name: estado_cita estado_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_cita
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id_estado);


--
-- TOC entry 3526 (class 2606 OID 99952)
-- Name: etario etario_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.etario
    ADD CONSTRAINT etario_pkey PRIMARY KEY (id_etario);


--
-- TOC entry 3528 (class 2606 OID 99954)
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 3530 (class 2606 OID 99956)
-- Name: horarios_medicos horarios_medico_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT horarios_medico_pkey PRIMARY KEY (id_horarios_medicos);


--
-- TOC entry 3558 (class 2606 OID 114733)
-- Name: log_archivos log_archivos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos
    ADD CONSTRAINT log_archivos_pkey PRIMARY KEY (id_log_archivos);


--
-- TOC entry 3532 (class 2606 OID 99958)
-- Name: medico medico_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_pkey PRIMARY KEY (id_medico);


--
-- TOC entry 3534 (class 2606 OID 99960)
-- Name: modulos modulos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT modulos_pkey PRIMARY KEY (id_modulos);


--
-- TOC entry 3536 (class 2606 OID 99962)
-- Name: motivo_consulta motivo_consultapkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.motivo_consulta
    ADD CONSTRAINT motivo_consultapkey PRIMARY KEY (id_motivo_consulta);


--
-- TOC entry 3538 (class 2606 OID 99964)
-- Name: nacionalidad nacionalidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.nacionalidad
    ADD CONSTRAINT nacionalidad_pkey PRIMARY KEY (id_nacionalidad);


--
-- TOC entry 3542 (class 2606 OID 99966)
-- Name: parametros_general parametros_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parametros_general
    ADD CONSTRAINT parametros_pkey PRIMARY KEY (id_parametros);


--
-- TOC entry 3544 (class 2606 OID 99968)
-- Name: parentesco parentesco_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parentesco
    ADD CONSTRAINT parentesco_pkey PRIMARY KEY (id_parentesco);


--
-- TOC entry 3546 (class 2606 OID 99970)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 3548 (class 2606 OID 99972)
-- Name: sexo sexo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sexo
    ADD CONSTRAINT sexo_pkey PRIMARY KEY (id_sexo);


--
-- TOC entry 3550 (class 2606 OID 99974)
-- Name: tipo_de_empleado tipo_de_empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tipo_de_empleado
    ADD CONSTRAINT tipo_de_empleado_pkey PRIMARY KEY (id_tipo_de_empleado);


--
-- TOC entry 3540 (class 2606 OID 99976)
-- Name: paciente titular_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_pkey PRIMARY KEY (id_titular);


--
-- TOC entry 3552 (class 2606 OID 99978)
-- Name: trazabilidad trazabilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trazabilidad
    ADD CONSTRAINT trazabilidad_pkey PRIMARY KEY (id_trazabilidad);


--
-- TOC entry 3554 (class 2606 OID 99980)
-- Name: universidad universidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.universidad
    ADD CONSTRAINT universidad_pkey PRIMARY KEY (id_universidad);


--
-- TOC entry 3556 (class 2606 OID 99982)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3574 (class 2606 OID 99983)
-- Name: horarios_medicos FK_horarios_medicos_especialidad; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_especialidad" FOREIGN KEY (id_especialidad) REFERENCES public.especialidad(id_especialidad);


--
-- TOC entry 3575 (class 2606 OID 99988)
-- Name: horarios_medicos FK_horarios_medicos_medico; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico" FOREIGN KEY (lun_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3576 (class 2606 OID 99993)
-- Name: horarios_medicos FK_horarios_medicos_medico1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico1" FOREIGN KEY (lun_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3577 (class 2606 OID 99998)
-- Name: horarios_medicos FK_horarios_medicos_medico10; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico10" FOREIGN KEY (sab_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3578 (class 2606 OID 100003)
-- Name: horarios_medicos FK_horarios_medicos_medico11; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico11" FOREIGN KEY (sab_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3579 (class 2606 OID 100008)
-- Name: horarios_medicos FK_horarios_medicos_medico12; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico12" FOREIGN KEY (dom_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3580 (class 2606 OID 100013)
-- Name: horarios_medicos FK_horarios_medicos_medico13; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico13" FOREIGN KEY (dom_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3581 (class 2606 OID 100018)
-- Name: horarios_medicos FK_horarios_medicos_medico2; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico2" FOREIGN KEY (mar_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3582 (class 2606 OID 100023)
-- Name: horarios_medicos FK_horarios_medicos_medico3; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico3" FOREIGN KEY (mar_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3583 (class 2606 OID 100028)
-- Name: horarios_medicos FK_horarios_medicos_medico4; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico4" FOREIGN KEY (mar_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3584 (class 2606 OID 100033)
-- Name: horarios_medicos FK_horarios_medicos_medico44; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico44" FOREIGN KEY (mie_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3585 (class 2606 OID 100038)
-- Name: horarios_medicos FK_horarios_medicos_medico5; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico5" FOREIGN KEY (mar_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3586 (class 2606 OID 100043)
-- Name: horarios_medicos FK_horarios_medicos_medico54; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico54" FOREIGN KEY (mie_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3587 (class 2606 OID 100048)
-- Name: horarios_medicos FK_horarios_medicos_medico6; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico6" FOREIGN KEY (jue_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3588 (class 2606 OID 100053)
-- Name: horarios_medicos FK_horarios_medicos_medico7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico7" FOREIGN KEY (jue_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3589 (class 2606 OID 100058)
-- Name: horarios_medicos FK_horarios_medicos_medico8; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico8" FOREIGN KEY (vie_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3590 (class 2606 OID 100063)
-- Name: horarios_medicos FK_horarios_medicos_medico9; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico9" FOREIGN KEY (vie_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3561 (class 2606 OID 100068)
-- Name: cita cita_id_especialidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_especialidad_fkey FOREIGN KEY (id_especialidad) REFERENCES public.especialidad(id_especialidad) ON UPDATE CASCADE;


--
-- TOC entry 3562 (class 2606 OID 100073)
-- Name: cita cita_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medico(id_medico) ON UPDATE CASCADE;


--
-- TOC entry 3563 (class 2606 OID 100078)
-- Name: cita cita_id_nuevo_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_nuevo_estado_fkey FOREIGN KEY (id_estado_cita) REFERENCES public.estado_cita(id_estado) ON UPDATE CASCADE;


--
-- TOC entry 3564 (class 2606 OID 100083)
-- Name: cita cita_id_titular_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_titular_fkey FOREIGN KEY (id_titular) REFERENCES public.paciente(id_titular) ON UPDATE CASCADE;


--
-- TOC entry 3565 (class 2606 OID 100088)
-- Name: cita cita_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3566 (class 2606 OID 100093)
-- Name: cita cita_motivo_consulta_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_motivo_consulta_fk FOREIGN KEY (id_motivo_consulta) REFERENCES public.motivo_consulta(id_motivo_consulta);


--
-- TOC entry 3567 (class 2606 OID 100098)
-- Name: coordinacion coordinacion_id_direccion_linea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion
    ADD CONSTRAINT coordinacion_id_direccion_linea_fkey FOREIGN KEY (id_direccion_linea) REFERENCES public.direccion_linea(id_direccion_linea) ON UPDATE CASCADE;


--
-- TOC entry 3568 (class 2606 OID 100103)
-- Name: direccion_general direccion_general_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general
    ADD CONSTRAINT direccion_general_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3569 (class 2606 OID 100108)
-- Name: direccion_linea direccion_linea_id_direccion_general_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea
    ADD CONSTRAINT direccion_linea_id_direccion_general_fkey FOREIGN KEY (id_direccion_general) REFERENCES public.direccion_general(id_direccion_general) ON UPDATE CASCADE;


--
-- TOC entry 3570 (class 2606 OID 100113)
-- Name: historial historial_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3571 (class 2606 OID 100118)
-- Name: historial historial_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medico(id_medico) ON UPDATE CASCADE;


--
-- TOC entry 3572 (class 2606 OID 100123)
-- Name: historial historial_id_titular_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_titular_fkey FOREIGN KEY (id_titular) REFERENCES public.paciente(id_titular) ON UPDATE CASCADE;


--
-- TOC entry 3573 (class 2606 OID 100128)
-- Name: historial historial_id_universidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_universidad_fkey FOREIGN KEY (id_universidad) REFERENCES public.universidad(id_universidad) ON UPDATE CASCADE;


--
-- TOC entry 3598 (class 2606 OID 114734)
-- Name: log_archivos log_archivos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos
    ADD CONSTRAINT log_archivos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3591 (class 2606 OID 100133)
-- Name: medico medico_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3592 (class 2606 OID 100138)
-- Name: paciente titular_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3593 (class 2606 OID 100143)
-- Name: paciente titular_id_nacionalidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_nacionalidad_fkey FOREIGN KEY (id_nacionalidad) REFERENCES public.nacionalidad(id_nacionalidad) ON UPDATE CASCADE;


--
-- TOC entry 3594 (class 2606 OID 100148)
-- Name: paciente titular_id_sexo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_sexo_fkey FOREIGN KEY (id_sexo) REFERENCES public.sexo(id_sexo) ON UPDATE CASCADE;


--
-- TOC entry 3595 (class 2606 OID 100153)
-- Name: paciente titular_id_universidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_universidad_fkey FOREIGN KEY (id_universidad) REFERENCES public.universidad(id_universidad) ON UPDATE CASCADE;


--
-- TOC entry 3596 (class 2606 OID 100158)
-- Name: paciente titular_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3597 (class 2606 OID 100163)
-- Name: usuario usuario_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol) ON UPDATE CASCADE;


-- Completed on 2026-09-24 12:56:46

--
-- PostgreSQL database dump complete
--

\unrestrict vKML0CUa819y7ihvTqwyGLuAWrpf8472e0kwbozx5YbNLlQlzgBwaRegxevsPoU

