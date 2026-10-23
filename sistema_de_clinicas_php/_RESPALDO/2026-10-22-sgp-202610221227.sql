--
-- PostgreSQL database dump
--

\restrict mqr0QLuxNkRXz54jzf9HGqPXWEaOJyPkQFPuhPYTVtdCn4Vva0TieiAZGgjdqJv

-- Dumped from database version 16.11 (Ubuntu 16.11-0ubuntu0.24.04.1)
-- Dumped by pg_dump version 17.6

-- Started on 2026-10-22 12:27:47

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
-- TOC entry 278 (class 1255 OID 99724)
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
-- TOC entry 309 (class 1255 OID 123073)
-- Name: f_parentesco(character varying); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.f_parentesco(p_codigo character varying) RETURNS text
    LANGUAGE plpgsql
    AS $$
DECLARE
    v_resultado TEXT; -- Variable para guardar el resultado
BEGIN

    -- 1. Evaluamos el parámetro usando un CASE y lo guardamos en la variable
    v_resultado := CASE TRIM(UPPER(p_codigo))
                        WHEN 'HIJO' THEN '5'
                        WHEN 'HIJO(A)' THEN '5'
                        WHEN 'MADRE' THEN '3'
                        WHEN 'TITULAR' THEN '1'
                        WHEN 'TITULAR ' THEN '1'
                        WHEN '18' THEN '9'
                        WHEN '19' THEN '9'
                        WHEN '20' THEN '9'
                        WHEN '26' THEN '9'
                        WHEN '43' THEN '9'
                        WHEN '46' THEN '9'
                        WHEN '56' THEN '9'
                        WHEN '60' THEN '9'
                        WHEN '8' THEN '9'
                        WHEN '9' THEN '9'
                        WHEN 'ADRE' THEN '3'
                        WHEN 'CONCUBINO' THEN '6'
                        WHEN 'CONCUBINO(A)' THEN '6'
                        WHEN 'CONSIGUE' THEN '2'
                        WHEN 'CONTUGUE' THEN '2'
                        WHEN 'conyuge' THEN '2'
                        WHEN 'CONYUGE' THEN '2'
                        WHEN 'CÓNYUGE' THEN '2'
                        WHEN 'CONYUGE ' THEN '2'
                        WHEN 'CÓNYUGE ' THEN '2'
                        WHEN 'CONYUGE  ' THEN '2'
                        WHEN 'CÓNYUGE  ' THEN '2'
                        WHEN 'CONYUGUE' THEN '2'
                        WHEN 'CONYUGUE ' THEN '2'
                        WHEN 'EDAD' THEN '9'
                        WHEN 'ESPOSA' THEN '2'
                        WHEN 'ESPOSA ' THEN '2'
                        WHEN 'ESPOSO' THEN '2'
                        WHEN 'HIJA' THEN '5'
                        WHEN 'HIJA ' THEN '5'
                        WHEN 'HIJA CON DISCAPACIDAD' THEN '5'
                        WHEN 'HIJA CON DISCAPACIDAD ' THEN '5'
                        WHEN 'HIJA NECESIDADES ESPECIALES' THEN '5'
                        WHEN 'HIJAS' THEN '5'
                        WHEN 'HIJO' THEN '5'
                        WHEN 'HIJO ' THEN '5'
                        WHEN 'HIJO (A)' THEN '5'
                        WHEN 'HIJO (A)  ' THEN '5'
                        WHEN 'HIJO CON DISCAPACIDAD' THEN '5'
                        WHEN 'HIJO CON DISCAPACIDAD ' THEN '5'
                        WHEN 'HIJO NECESIDADES ESPECIALES' THEN '5'
                        WHEN 'HIJO (TUTELA)' THEN '5'
                        WHEN 'hiJO(A)' THEN '5'
                        WHEN 'Hijo(a)' THEN '5'
                        WHEN 'HIJO(a)' THEN '5'
                        WHEN 'HIJO(A)' THEN '5'
                        WHEN 'HIJO(A) ' THEN '5'
                        WHEN 'HIJO(A)  ' THEN '5'
                        WHEN 'Madre' THEN '3'
                        WHEN 'MADRE' THEN '3'
                        WHEN 'MADRE ' THEN '3'
                        WHEN 'MADRE  ' THEN '3'
                        WHEN 'NIETA' THEN '7'
                        WHEN 'NIETO (A) (TUTELA DE LOPNA)' THEN '7'
                        WHEN 'Padre' THEN '4'
                        WHEN 'PADRE' THEN '4'
                        WHEN 'PÁDRE' THEN '4'
                        WHEN 'PADRE ' THEN '4'
                        WHEN 'SOBRINO' THEN '8'
                        WHEN 'TIRULAR' THEN '1'
                        WHEN 'TITLAR ' THEN '1'
                        WHEN 'tITULAR' THEN '1'
                        WHEN 'Titular' THEN '1'
                        WHEN 'TiTULAR' THEN '1'
                        WHEN 'TITUlAR' THEN '1'
                        WHEN 'TITULAR' THEN '1'
                        WHEN 'TITuLAR ' THEN '1'
                        WHEN 'TITULAR ' THEN '1'
                        WHEN 'TITULAR  ' THEN '1'
                        WHEN 'TITULAR   ' THEN '1'
                        WHEN 'TITULLAR' THEN '1'
                        WHEN 'TUTELA' THEN '5'
                        WHEN 'TUTULAR' THEN '1'
                        ELSE '9'
                   END;

    -- 2. Retornamos el resultado final en MAYÚSCULAS
    RETURN UPPER(v_resultado);
END;
$$;


ALTER FUNCTION public.f_parentesco(p_codigo character varying) OWNER TO admin;

--
-- TOC entry 279 (class 1255 OID 99725)
-- Name: ver_activo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_activo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT activo.nombre FROM activo WHERE activo.id = p_id_usuario;$$;


ALTER FUNCTION public.ver_activo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 296 (class 1255 OID 106508)
-- Name: ver_ente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ente.siglas_ente FROM ente WHERE ente.id_ente = p_id_usuario;$$;


ALTER FUNCTION public.ver_ente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 280 (class 1255 OID 99726)
-- Name: ver_especialidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_especialidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT especialidad.nombre_especialidad FROM especialidad WHERE especialidad.id_especialidad = p_id_usuario;$$;


ALTER FUNCTION public.ver_especialidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 281 (class 1255 OID 99727)
-- Name: ver_estado_cita(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_estado_cita(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_cita.descripción_estado FROM estado_cita WHERE estado_cita.id_estado = p_id_usuario$$;


ALTER FUNCTION public.ver_estado_cita(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 305 (class 1255 OID 106511)
-- Name: ver_estado_pais(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_estado_pais(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE estado_venezuela.id_estado_pais = p_id_usuario$$;


ALTER FUNCTION public.ver_estado_pais(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 310 (class 1255 OID 123090)
-- Name: ver_medico(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_medico(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$
SELECT medico.nombre_medico || CASE medico.in_labora WHEN 0 THEN ' (No Labora)' ELSE '' END AS nombre_medico  FROM medico WHERE medico.id_medico = p_id_usuario
$$;


ALTER FUNCTION public.ver_medico(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 282 (class 1255 OID 99729)
-- Name: ver_modulo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_modulo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT modulos.nombre_modulos FROM modulos WHERE modulos.id_modulos = p_id_usuario$$;


ALTER FUNCTION public.ver_modulo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 283 (class 1255 OID 99730)
-- Name: ver_motivo_consulta(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_motivo_consulta(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT motivo_consulta.nombre_motivo_consulta  FROM motivo_consulta WHERE motivo_consulta.id_motivo_consulta = p_id_usuario;$$;


ALTER FUNCTION public.ver_motivo_consulta(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 284 (class 1255 OID 99731)
-- Name: ver_nacionalidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_nacionalidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.nombre_nacionalidad FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;


ALTER FUNCTION public.ver_nacionalidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 285 (class 1255 OID 99732)
-- Name: ver_nacionalidada(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_nacionalidada(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.abreviatura FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;


ALTER FUNCTION public.ver_nacionalidada(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 286 (class 1255 OID 99733)
-- Name: ver_paciente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_nacionalidada(paciente.id_nacionalidad) || ' ' || paciente.cedula_titular || ' '  || paciente.nombre_titular || ' '  || paciente.apellido_titular  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 297 (class 1255 OID 106509)
-- Name: ver_paciente_ente(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_ente(paciente.id_ente)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_ente(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 307 (class 1255 OID 106521)
-- Name: ver_paciente_estado(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_estado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_estado_pais(paciente.id_estado_pais)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_estado(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 308 (class 1255 OID 106522)
-- Name: ver_paciente_universidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_paciente_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_universidad(paciente.id_universidad)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


ALTER FUNCTION public.ver_paciente_universidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 291 (class 1255 OID 100170)
-- Name: ver_parentesco(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_parentesco(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT parentesco.nombre_parentesco FROM parentesco WHERE parentesco.id_parentesco = p_id_usuario;$$;


ALTER FUNCTION public.ver_parentesco(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 287 (class 1255 OID 99734)
-- Name: ver_rol(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_rol(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT rol.nombre FROM rol WHERE rol.id_rol = p_id_usuario$$;


ALTER FUNCTION public.ver_rol(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 288 (class 1255 OID 99735)
-- Name: ver_sexo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_sexo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT sexo.sexo FROM sexo WHERE sexo.id_sexo = p_id_usuario$$;


ALTER FUNCTION public.ver_sexo(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 289 (class 1255 OID 99736)
-- Name: ver_tipo_de_empleado(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_tipo_de_empleado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT tipo_de_empleado.nombre_tipo_de_empleado FROM tipo_de_empleado WHERE tipo_de_empleado.id_tipo_de_empleado = p_id_usuario$$;


ALTER FUNCTION public.ver_tipo_de_empleado(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 306 (class 1255 OID 106519)
-- Name: ver_universidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT universidad.nombre_universidad FROM universidad WHERE universidad.id_universidad = p_id_usuario$$;


ALTER FUNCTION public.ver_universidad(p_id_usuario integer, OUT v_texto character varying) OWNER TO admin;

--
-- TOC entry 290 (class 1255 OID 99737)
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
-- TOC entry 275 (class 1259 OID 114871)
-- Name: carga_masiva1; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.carga_masiva1 (
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
    parentesco character varying(255),
    sexo character varying(255),
    fecha_nacimiento character varying(255),
    edad character varying(255),
    telefono_1 character varying(255),
    correo character varying(255) DEFAULT NULL::character varying,
    cargo character varying(255),
    id_log_archivo integer,
    campo15 character varying(255),
    campo16 character varying(255)
);


ALTER TABLE public.carga_masiva1 OWNER TO admin;

--
-- TOC entry 274 (class 1259 OID 114870)
-- Name: carga_masiva1_id_carga_masiva_seq; Type: SEQUENCE; Schema: public; Owner: admin
--

CREATE SEQUENCE public.carga_masiva1_id_carga_masiva_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.carga_masiva1_id_carga_masiva_seq OWNER TO admin;

--
-- TOC entry 3836 (class 0 OID 0)
-- Dependencies: 274
-- Name: carga_masiva1_id_carga_masiva_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.carga_masiva1_id_carga_masiva_seq OWNED BY public.carga_masiva1.id_carga_masiva;


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
-- TOC entry 3837 (class 0 OID 0)
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
-- TOC entry 3838 (class 0 OID 0)
-- Dependencies: 221
-- Name: TABLE cita; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.cita IS 'tabla que muestra la siguiente consulta de los pacientes';


--
-- TOC entry 3839 (class 0 OID 0)
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
-- TOC entry 3840 (class 0 OID 0)
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
-- TOC entry 3841 (class 0 OID 0)
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
-- TOC entry 3842 (class 0 OID 0)
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
-- TOC entry 3843 (class 0 OID 0)
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
-- TOC entry 3844 (class 0 OID 0)
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
-- TOC entry 3845 (class 0 OID 0)
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
-- TOC entry 3846 (class 0 OID 0)
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
-- TOC entry 3847 (class 0 OID 0)
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
-- TOC entry 3848 (class 0 OID 0)
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
-- TOC entry 3849 (class 0 OID 0)
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
-- TOC entry 3850 (class 0 OID 0)
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
-- TOC entry 3851 (class 0 OID 0)
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
-- TOC entry 3852 (class 0 OID 0)
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
    in_activo integer DEFAULT 1,
    id_medico integer
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
-- TOC entry 3853 (class 0 OID 0)
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
-- TOC entry 3854 (class 0 OID 0)
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
    id_especialidad integer,
    in_labora integer DEFAULT 1,
    fecha_desde_vacaciones timestamp with time zone,
    fecha_hasta_vacaciones timestamp with time zone
);


ALTER TABLE public.medico OWNER TO admin;

--
-- TOC entry 3855 (class 0 OID 0)
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
-- TOC entry 3856 (class 0 OID 0)
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
-- TOC entry 3857 (class 0 OID 0)
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
-- TOC entry 3858 (class 0 OID 0)
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
-- TOC entry 3859 (class 0 OID 0)
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
-- TOC entry 3860 (class 0 OID 0)
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
    id_tipo_de_empleado integer,
    observacion1 character varying(255),
    observcion2 character varying(255),
    cargo character varying(255),
    parentesco character varying(255),
    universidad_institucion character varying(255),
    in_condicion_legal integer DEFAULT 0
);


ALTER TABLE public.paciente OWNER TO admin;

--
-- TOC entry 3861 (class 0 OID 0)
-- Dependencies: 250
-- Name: TABLE paciente; Type: COMMENT; Schema: public; Owner: admin
--

COMMENT ON TABLE public.paciente IS 'esta tabla es para registrar los datos del titular';


--
-- TOC entry 273 (class 1259 OID 114865)
-- Name: paciente_respaldo; Type: TABLE; Schema: public; Owner: admin
--

CREATE TABLE public.paciente_respaldo (
    id_titular integer,
    id_usuario integer,
    fecha_registro_titular timestamp with time zone,
    fecha_nacimiento_titular date,
    cedula_titular character varying(255),
    nombre_titular character varying(255),
    apellido_titular character varying(255),
    telefono_titular character varying(255),
    id_sexo integer,
    id_universidad integer,
    id_ente integer,
    id_nacionalidad integer,
    id_direccion_general integer,
    id_direccion_linea integer,
    id_coordinacion integer,
    correo_titular character varying(255),
    edad_titular integer,
    telefono2_titular character varying,
    direccion_corta_casa_titular character varying(250),
    id_estado integer,
    in_activo integer,
    id_paciente_titular integer,
    in_condicion_especial integer,
    in_cortesia integer,
    id_parentesco integer,
    tipo_de_empleado integer,
    id_estado_pais integer,
    id_tipo_de_empleado integer,
    observacion1 character varying(255),
    observcion2 character varying(255)
);


ALTER TABLE public.paciente_respaldo OWNER TO admin;

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
-- TOC entry 3862 (class 0 OID 0)
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
-- TOC entry 3863 (class 0 OID 0)
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
-- TOC entry 3864 (class 0 OID 0)
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
-- TOC entry 3865 (class 0 OID 0)
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
-- TOC entry 3866 (class 0 OID 0)
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
-- TOC entry 3867 (class 0 OID 0)
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
-- TOC entry 3868 (class 0 OID 0)
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
-- TOC entry 3869 (class 0 OID 0)
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
-- TOC entry 3870 (class 0 OID 0)
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
-- TOC entry 3871 (class 0 OID 0)
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
-- TOC entry 3872 (class 0 OID 0)
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
-- TOC entry 3873 (class 0 OID 0)
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
    in_activo integer DEFAULT 1 NOT NULL,
    in_cambiar_clave integer DEFAULT 0 NOT NULL,
    id_modulo integer,
    in_autoriza integer DEFAULT 0,
    in_cita_autorizacion integer DEFAULT 0
);


ALTER TABLE public.usuario OWNER TO admin;

--
-- TOC entry 3874 (class 0 OID 0)
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
-- TOC entry 3875 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuario_id_usuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: admin
--

ALTER SEQUENCE public.usuario_id_usuario_seq OWNED BY public.usuario.id_usuario;


--
-- TOC entry 276 (class 1259 OID 123074)
-- Name: v_condicion_especial; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.v_condicion_especial AS
 SELECT id_carga_masiva
   FROM public.carga_masiva ca
  WHERE (((campo15)::text ~~ '%DISCA%'::text) OR ((campo16)::text ~~ '%DISCA%'::text) OR ((campo15)::text ~~ '%TRAST%'::text) OR ((campo15)::text ~~ '%MENTAL%'::text) OR ((campo15)::text ~~ '%RETRA%'::text) OR ((campo15)::text ~~ '%SIND%'::text));


ALTER VIEW public.v_condicion_especial OWNER TO admin;

--
-- TOC entry 277 (class 1259 OID 123078)
-- Name: v_condicion_legal; Type: VIEW; Schema: public; Owner: admin
--

CREATE VIEW public.v_condicion_legal AS
 SELECT id_carga_masiva
   FROM public.carga_masiva ca
  WHERE (((campo16)::text ~~ '%LOPNNA%'::text) OR ((campo16)::text ~~ '%TRIBU%'::text) OR ((campo16)::text ~~ '%CUST%'::text) OR ((campo16)::text ~~ '%DEPEN%'::text) OR ((campo16)::text ~~ '%VIVIE%'::text) OR ((campo16)::text ~~ 'EXP%'::text));


ALTER VIEW public.v_condicion_legal OWNER TO admin;

--
-- TOC entry 3510 (class 2604 OID 114750)
-- Name: carga_masiva id_carga_masiva; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva ALTER COLUMN id_carga_masiva SET DEFAULT nextval('public.carga_masiva_id_carga_masiva_seq'::regclass);


--
-- TOC entry 3517 (class 2604 OID 114874)
-- Name: carga_masiva1 id_carga_masiva; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva1 ALTER COLUMN id_carga_masiva SET DEFAULT nextval('public.carga_masiva1_id_carga_masiva_seq'::regclass);


--
-- TOC entry 3444 (class 2604 OID 99899)
-- Name: cita id_cita; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita ALTER COLUMN id_cita SET DEFAULT nextval('public.cita_id_cita_seq'::regclass);


--
-- TOC entry 3446 (class 2604 OID 99900)
-- Name: coordinacion id_coordinacion; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion ALTER COLUMN id_coordinacion SET DEFAULT nextval('public.coordinacion_id_coordinacion_seq'::regclass);


--
-- TOC entry 3448 (class 2604 OID 99901)
-- Name: direccion_general id_direccion_general; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general ALTER COLUMN id_direccion_general SET DEFAULT nextval('public.direccion_general_id_direccion_general_seq'::regclass);


--
-- TOC entry 3450 (class 2604 OID 99902)
-- Name: direccion_linea id_direccion_linea; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea ALTER COLUMN id_direccion_linea SET DEFAULT nextval('public.direccion_linea_id_direccion_linea_seq'::regclass);


--
-- TOC entry 3452 (class 2604 OID 99903)
-- Name: ente id_ente; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ente ALTER COLUMN id_ente SET DEFAULT nextval('public.ente_id_ente_seq'::regclass);


--
-- TOC entry 3454 (class 2604 OID 99904)
-- Name: especialidad id_especialidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.especialidad ALTER COLUMN id_especialidad SET DEFAULT nextval('public.especialidad_id_especialidad_seq'::regclass);


--
-- TOC entry 3458 (class 2604 OID 99905)
-- Name: estado_venezuela id_estado_pais; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_venezuela ALTER COLUMN id_estado_pais SET DEFAULT nextval('public."estado_Venezuela_id_estado_pais_seq"'::regclass);


--
-- TOC entry 3461 (class 2604 OID 99906)
-- Name: etario id_etario; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.etario ALTER COLUMN id_etario SET DEFAULT nextval('public.etario_id_etario_seq'::regclass);


--
-- TOC entry 3465 (class 2604 OID 99907)
-- Name: historial id_historial; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial ALTER COLUMN id_historial SET DEFAULT nextval('public.historial_id_historial_seq'::regclass);


--
-- TOC entry 3466 (class 2604 OID 99908)
-- Name: horarios_medicos id_horarios_medicos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos ALTER COLUMN id_horarios_medicos SET DEFAULT nextval('public.horarios_medicos_id_horarios_medicos_seq'::regclass);


--
-- TOC entry 3506 (class 2604 OID 114726)
-- Name: log_archivos id_log_archivos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos ALTER COLUMN id_log_archivos SET DEFAULT nextval('public.log_archivos_id_log_archivos_seq'::regclass);


--
-- TOC entry 3468 (class 2604 OID 99909)
-- Name: medico id_medico; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico ALTER COLUMN id_medico SET DEFAULT nextval('public.medico_id_medico_seq'::regclass);


--
-- TOC entry 3471 (class 2604 OID 99910)
-- Name: modulos id_modulos; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modulos ALTER COLUMN id_modulos SET DEFAULT nextval('public.modulos_id_modulos_seq'::regclass);


--
-- TOC entry 3473 (class 2604 OID 99911)
-- Name: motivo_consulta id_motivo_consulta; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.motivo_consulta ALTER COLUMN id_motivo_consulta SET DEFAULT nextval('public.motivo_consulta_id_motivo_consulta_seq'::regclass);


--
-- TOC entry 3475 (class 2604 OID 99912)
-- Name: nacionalidad id_nacionalidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.nacionalidad ALTER COLUMN id_nacionalidad SET DEFAULT nextval('public.nacionalidad_id_nacionalidad_seq'::regclass);


--
-- TOC entry 3476 (class 2604 OID 99913)
-- Name: paciente id_titular; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente ALTER COLUMN id_titular SET DEFAULT nextval('public.titular_id_titular_seq'::regclass);


--
-- TOC entry 3485 (class 2604 OID 99915)
-- Name: parametros_general id_parametros; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parametros_general ALTER COLUMN id_parametros SET DEFAULT nextval('public.parametros_general_id_parametros_seq'::regclass);


--
-- TOC entry 3487 (class 2604 OID 99916)
-- Name: parentesco id_parentesco; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parentesco ALTER COLUMN id_parentesco SET DEFAULT nextval('public.parentesco_id_parentesco_seq'::regclass);


--
-- TOC entry 3489 (class 2604 OID 99917)
-- Name: rol id_rol; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.rol ALTER COLUMN id_rol SET DEFAULT nextval('public.rol_id_rol_seq'::regclass);


--
-- TOC entry 3491 (class 2604 OID 99918)
-- Name: sexo id_sexo; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sexo ALTER COLUMN id_sexo SET DEFAULT nextval('public.sexo_id_sexo_seq'::regclass);


--
-- TOC entry 3492 (class 2604 OID 99919)
-- Name: tipo_de_empleado id_tipo_de_empleado; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tipo_de_empleado ALTER COLUMN id_tipo_de_empleado SET DEFAULT nextval('public.tipo_de_empleado_id_tipo_de_empleado_seq'::regclass);


--
-- TOC entry 3494 (class 2604 OID 99920)
-- Name: trazabilidad id_trazabilidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trazabilidad ALTER COLUMN id_trazabilidad SET DEFAULT nextval('public.trazabilidad_id_trazabilidad_seq'::regclass);


--
-- TOC entry 3499 (class 2604 OID 99921)
-- Name: universidad id_universidad; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.universidad ALTER COLUMN id_universidad SET DEFAULT nextval('public.universidad_id_universidad_seq'::regclass);


--
-- TOC entry 3501 (class 2604 OID 99922)
-- Name: usuario id_usuario; Type: DEFAULT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario ALTER COLUMN id_usuario SET DEFAULT nextval('public.usuario_id_usuario_seq'::regclass);


--
-- TOC entry 3770 (class 0 OID 99738)
-- Dependencies: 215
-- Data for Name: activo; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.activo VALUES (1, 'SI');
INSERT INTO public.activo VALUES (0, 'NO');


--
-- TOC entry 3771 (class 0 OID 99742)
-- Dependencies: 216
-- Data for Name: bd_condicion; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.bd_condicion VALUES (1, 'Activo');
INSERT INTO public.bd_condicion VALUES (2, 'Jubilado');
INSERT INTO public.bd_condicion VALUES (3, 'Pensinado');


--
-- TOC entry 3772 (class 0 OID 99746)
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
-- TOC entry 3773 (class 0 OID 99754)
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
-- TOC entry 3774 (class 0 OID 99757)
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
-- TOC entry 3775 (class 0 OID 99761)
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
-- TOC entry 3827 (class 0 OID 114747)
-- Dependencies: 272
-- Data for Name: carga_masiva; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3830 (class 0 OID 114871)
-- Dependencies: 275
-- Data for Name: carga_masiva1; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3776 (class 0 OID 99765)
-- Dependencies: 221
-- Data for Name: cita; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.cita VALUES (40, 50, 50, '2026-10-16 21:09:53.06+00', '2026-10-16', 5, 1, 96, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (41, 51, 51, '2026-10-19 13:06:36.55+00', '2026-10-19', 1, 1, 80, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (42, 52, 52, '2026-10-19 13:08:21.99+00', '2026-10-19', 5, 1, 96, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (43, 53, 53, '2026-10-19 13:10:03.05+00', '2026-10-19', 1, 1, 80, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (44, 54, 54, '2026-10-20 13:45:40.47+00', '2026-10-20', 1, 2, 80, NULL, 1, NULL, 0);
INSERT INTO public.cita VALUES (45, 55, 55, '2026-10-20 13:45:43.7+00', '2026-10-20', 1, 2, 80, NULL, 1, NULL, 0);


--
-- TOC entry 3778 (class 0 OID 99769)
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
-- TOC entry 3780 (class 0 OID 99773)
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
-- TOC entry 3782 (class 0 OID 99779)
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
-- TOC entry 3784 (class 0 OID 99783)
-- Dependencies: 229
-- Data for Name: ente; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.ente VALUES (9, 'MINISTERIO DEL PODER POPULAR PARA LA EDUCACIÓN UNIVERSITARIA', 'MPPEU', 1);
INSERT INTO public.ente VALUES (10, 'CONSEJO NACIONAL DE UNIVERSIDADES', 'CNU', 1);


--
-- TOC entry 3786 (class 0 OID 99787)
-- Dependencies: 231
-- Data for Name: especialidad; Type: TABLE DATA; Schema: public; Owner: admin
--

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
INSERT INTO public.especialidad VALUES (3, 'PEDIATRIA', 6, 6, NULL, 1, NULL);
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
INSERT INTO public.especialidad VALUES (4, 'GINECOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (2, 'MED. INTERNA', 1, 1, '', 1, '');
INSERT INTO public.especialidad VALUES (5, 'CARDIOLOGIA', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (17, 'LABORATORIO', 6, 6, NULL, 1, NULL);
INSERT INTO public.especialidad VALUES (16, 'ODONTOLOGIA', 6, 6, NULL, 0, NULL);
INSERT INTO public.especialidad VALUES (1, 'MED. GENERAL', 6, 6, NULL, 1, NULL);


--
-- TOC entry 3790 (class 0 OID 99800)
-- Dependencies: 235
-- Data for Name: estado_cita; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.estado_cita VALUES (5, 'Atendida', 1);
INSERT INTO public.estado_cita VALUES (1, 'Pendiente', 1);
INSERT INTO public.estado_cita VALUES (2, 'Cancelada', 1);
INSERT INTO public.estado_cita VALUES (3, 'Reprogramada', 1);
INSERT INTO public.estado_cita VALUES (4, 'Anulada', 1);


--
-- TOC entry 3788 (class 0 OID 99796)
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
-- TOC entry 3791 (class 0 OID 99803)
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
-- TOC entry 3793 (class 0 OID 99810)
-- Dependencies: 238
-- Data for Name: historial; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3795 (class 0 OID 99816)
-- Dependencies: 240
-- Data for Name: horarios_medicos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.horarios_medicos VALUES (31, NULL, 96, 96, NULL, NULL, 96, NULL, 96, NULL, NULL, NULL, 96, NULL, NULL, 5, 1, 96);
INSERT INTO public.horarios_medicos VALUES (33, 80, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, 1, 1, 80);


--
-- TOC entry 3825 (class 0 OID 114723)
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
INSERT INTO public.log_archivos VALUES (11, '2026-10-01 12:37:06+00', 1, 'Se cargo el archivo de Excel', 'SEPTIEMBRE 2026 Consulta Seguros Miranda.xlsx', '55ff684fa266e4c8.xlsx', 0, 1);
INSERT INTO public.log_archivos VALUES (12, '2026-10-01 13:45:23+00', 3, 'Se cargo el archivo de Excel', 'Libro3.xlsx', '21ac15564d3acdad.xlsx', 0, 1);


--
-- TOC entry 3797 (class 0 OID 99820)
-- Dependencies: 242
-- Data for Name: medico; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.medico VALUES (52, 'Matilde Anes', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL);
INSERT INTO public.medico VALUES (53, 'Karla Graterol', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4, 1, NULL, NULL);
INSERT INTO public.medico VALUES (54, 'Gledys González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO public.medico VALUES (56, 'Dayana Campos', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 18, 1, NULL, NULL);
INSERT INTO public.medico VALUES (57, 'Yasmin Gavidia', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 7, 1, NULL, NULL);
INSERT INTO public.medico VALUES (60, 'Estrella Márquez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL);
INSERT INTO public.medico VALUES (61, 'Freddy Lugo', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4, 1, NULL, NULL);
INSERT INTO public.medico VALUES (62, 'Jessica Velásquez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO public.medico VALUES (63, 'Katherine Laviera', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 12, 1, NULL, NULL);
INSERT INTO public.medico VALUES (64, 'Daniel La Concha', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 8, 1, NULL, NULL);
INSERT INTO public.medico VALUES (72, 'Cesar Osorio', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL);
INSERT INTO public.medico VALUES (73, 'Lourdes Solórzano', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4, 1, NULL, NULL);
INSERT INTO public.medico VALUES (74, 'Catherine Faria', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO public.medico VALUES (75, 'Luis Valecillos', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 6, 1, NULL, NULL);
INSERT INTO public.medico VALUES (76, 'Suhail Falcón', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 19, 1, NULL, NULL);
INSERT INTO public.medico VALUES (77, 'Yosmar González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 11, 1, NULL, NULL);
INSERT INTO public.medico VALUES (78, 'Deivys Chuyen', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 9, 1, NULL, NULL);
INSERT INTO public.medico VALUES (79, 'Ana González', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 22, 1, NULL, NULL);
INSERT INTO public.medico VALUES (82, 'Ricardo León', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 2, 1, NULL, NULL);
INSERT INTO public.medico VALUES (83, 'Dessire Torrez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4, 1, NULL, NULL);
INSERT INTO public.medico VALUES (84, 'Yemileth Ysaya', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO public.medico VALUES (85, 'Asdrúbal Rodríguez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 25, 1, NULL, NULL);
INSERT INTO public.medico VALUES (65, 'Sahully Tovar', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 4, 1, NULL, NULL);
INSERT INTO public.medico VALUES (90, 'Yoselin Rodríguez', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 3, 1, NULL, NULL);
INSERT INTO public.medico VALUES (91, 'Marlin Meza', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 15, 1, NULL, NULL);
INSERT INTO public.medico VALUES (95, 'Luis Arraiz', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 9, 1, NULL, NULL);
INSERT INTO public.medico VALUES (97, 'Belkis Morale', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 23, 1, NULL, NULL);
INSERT INTO public.medico VALUES (99, 'Dayana', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 13, 1, NULL, NULL);
INSERT INTO public.medico VALUES (98, 'Stefany', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 13, 1, NULL, NULL);
INSERT INTO public.medico VALUES (55, 'Gioconda Tineo', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 21, 1, NULL, NULL);
INSERT INTO public.medico VALUES (70, 'Glenys', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (69, 'Milagel Padilla', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 35, 1, NULL, NULL);
INSERT INTO public.medico VALUES (58, 'Jeiser', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (86, 'Verushcka', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (50, 'Vicdeney', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (94, 'María Fabiola', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 10, 1, NULL, NULL);
INSERT INTO public.medico VALUES (100, 'Cledimar', '', NULL, NULL, 1, '', '', '', NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (102, 'JESUS', 'AQUINO', 12312313, 1, 1, '', '', '', 1, 1, 26, 1, NULL, NULL);
INSERT INTO public.medico VALUES (51, 'Solangel', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, NULL, NULL);
INSERT INTO public.medico VALUES (96, 'María Espinoza', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 5, 1, NULL, NULL);
INSERT INTO public.medico VALUES (80, 'Adriana', NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, NULL, 1, 1, '2026-10-10 16:13:40+00', '2026-10-14 16:13:49+00');


--
-- TOC entry 3799 (class 0 OID 99827)
-- Dependencies: 244
-- Data for Name: modulos; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.modulos VALUES (1, 'DAS', 'PC', 1);


--
-- TOC entry 3801 (class 0 OID 99833)
-- Dependencies: 246
-- Data for Name: motivo_consulta; Type: TABLE DATA; Schema: public; Owner: admin
--



--
-- TOC entry 3803 (class 0 OID 99837)
-- Dependencies: 248
-- Data for Name: nacionalidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.nacionalidad VALUES (1, 'Venezolano', 'V');
INSERT INTO public.nacionalidad VALUES (2, 'Extranjero', 'E');


--
-- TOC entry 3805 (class 0 OID 99841)
-- Dependencies: 250
-- Data for Name: paciente; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.paciente VALUES (50, 1, '2026-10-16 21:09:53.061066+00', '2008-10-08', '33386550', 'SAUL ENRIQUE', 'RAMIREZ GONZALEZ', '4248523335', 1, NULL, NULL, 1, NULL, NULL, NULL, 'rjrlapelota57@gmail.com', 18, NULL, NULL, NULL, 1, NULL, 0, 0, 5, NULL, 8, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (51, 1, '2026-10-19 13:06:36.548275+00', '1973-07-14', '11550591', 'JESUS GUILLERMO', 'AQUINO BETANCOURT', '4120102628', 1, NULL, NULL, 1, NULL, NULL, NULL, 'AQUINOBJESUSG@GMAIL.COM', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 14, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (52, 1, '2026-10-19 13:08:21.988027+00', '2000-11-13', '29659101', 'GENDER ALEXANDER', 'CARRASQUEL CEBALLA', '0424-3966467', 1, NULL, NULL, 1, NULL, NULL, NULL, 'GABIMEND67@GMAIL.COM', 25, NULL, NULL, NULL, 1, NULL, 0, 0, 2, NULL, 11, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (53, 1, '2026-10-19 13:10:03.054906+00', '2008-10-08', '33386550', 'SAUL ENRIQUE', 'RAMIREZ GONZALEZ', '4248523335', 1, NULL, NULL, 1, NULL, NULL, NULL, 'rjrlapelota57@gmail.com', 18, NULL, NULL, NULL, 1, NULL, 0, 0, 5, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (54, 2, '2026-10-20 13:45:40.469116+00', '2004-02-20', '30831617', 'GABRIELA ALEJANDRA', 'MÉNDEZ ARANGUREN', '0424-3966467', 2, NULL, NULL, 1, NULL, NULL, NULL, 'GABIMEND67@GMAIL.COM', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (55, 2, '2026-10-20 13:45:43.702876+00', '2004-02-20', '30831617', 'GABRIELA ALEJANDRA', 'MÉNDEZ ARANGUREN', '0424-3966467', 2, NULL, NULL, 1, NULL, NULL, NULL, 'GABIMEND67@GMAIL.COM', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (48, 2, '2026-10-14 20:47:22.411142+00', '1973-07-14', '11550591', 'JESUS GUILLERMO', 'AQUINO BETANCOURT', '4120102628', 1, NULL, NULL, 1, NULL, NULL, NULL, 'AQUINOBJESUSG@GMAIL.COM', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 1, 3, NULL, NULL, NULL, NULL, NULL, 0);
INSERT INTO public.paciente VALUES (49, 2, '2026-10-14 20:48:57.970874+00', '2010-04-16', '34287400', 'VALERIA SOFIA', 'AQUINO TORREALBA', NULL, 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, 1, NULL, 0, 0, 5, NULL, 2, 3, NULL, NULL, NULL, NULL, NULL, 0);


--
-- TOC entry 3828 (class 0 OID 114865)
-- Dependencies: 273
-- Data for Name: paciente_respaldo; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.paciente_respaldo VALUES (18, 3, '2026-09-02 14:16:34.610539+00', '1960-12-12', '2131233', 'Maria', 'Rodriguez', '04147895623', 2, NULL, NULL, 1, NULL, NULL, NULL, NULL, 65, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 19, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (19, 1, '2026-09-02 14:40:25.931203+00', '2000-04-02', '29369258', 'zdff', 'zdgg', '04241475869', 1, NULL, 9, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04147418596', 'Av. Antimano', NULL, 1, NULL, 0, 0, 1, NULL, 18, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (20, 1, '2026-09-02 14:47:16.660853+00', '2000-02-20', '29369258', 'gfj', 'fgj', '04241475869', 2, 54, NULL, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04148526947', 'Av. Antimano', NULL, 1, NULL, 0, 0, 2, NULL, 19, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (21, 1, '2026-09-02 14:57:06.818463+00', '2000-04-02', '29201147', 'Victoria', 'c', '04241475869', 2, 47, NULL, 1, NULL, NULL, NULL, 'ejemplo@gmail.com', 26, '04148526947', 'Av. Antimano', NULL, 1, NULL, 0, 0, 2, NULL, 17, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (15, 3, '2026-08-31 16:07:11.426681+00', '1979-05-14', '12487657', 'Alberto', 'Rodriguez', '04129873641', 1, NULL, 9, 1, 24, 38, 50, NULL, 47, NULL, NULL, 16, 1, NULL, 0, 0, 7, 1, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (11, NULL, '2026-06-05 04:00:00+00', '2004-02-20', '30831617', 'Gabriela Alejandra', 'Méndez Aranguren', '04243966467', 2, NULL, 9, 1, 24, 38, 60, 'correo@correo.com', 22, '1', NULL, 2, 1, 12, 0, 1, 1, 2, 2, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (17, 1, '2026-09-02 12:08:46.719341+00', '2011-09-02', '12121212', 'Alberto', 'Rodriguez', '04129873641', 2, NULL, 10, 1, 24, 38, 50, 'gabi@gmail.com', 15, NULL, NULL, NULL, 1, NULL, 0, 0, 7, 3, 18, 3, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (16, 3, '2026-08-31 16:12:38.735616+00', '1960-12-12', '121314156', 'Maria', 'Rodriguez', '04147895623', 2, NULL, 9, 1, 24, 38, 50, NULL, 65, NULL, NULL, NULL, 1, NULL, 0, 0, 9, 3, 19, 3, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (12, NULL, '2026-08-24 12:13:20+00', '1988-08-24', '12456789', 'Alberto', 'Martinez', '123112', 1, NULL, 10, 2, 24, 38, 50, 'correo@correo.com', 38, '2', NULL, 3, 1, 12, 0, 0, NULL, 1, 3, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (13, NULL, '2026-08-24 16:26:35.027293+00', '2010-08-24', '32432341', 'Andrés', 'Quintero', '55542234', 1, NULL, 9, 1, 24, 38, 50, 'correo@correo.com', 16, '3', NULL, 1, 1, 12, 0, 0, 2, 1, 1, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (14, NULL, '2026-08-26 10:20:28+00', '2012-08-26', '54645656', 'Josefina', 'Quintero', '443112', 2, NULL, 10, 1, 24, 38, 50, 'correo@gmail.com', 12, '12341', NULL, 1, 1, 12, 1, 0, 3, 1, 1, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (22, 1, '2026-09-02 16:09:05.379222+00', '1963-02-03', '6481975', 'LUIS', 'YANEZ', '04127343276', 1, NULL, 10, 1, NULL, NULL, NULL, NULL, 63, NULL, NULL, NULL, 1, NULL, 0, 0, 7, NULL, 24, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (23, 1, '2026-09-03 13:25:54.581228+00', '1960-12-12', '12123321', 'Maria', 'Rodriguez', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg123123@gmail.com', 65, '04120005689', NULL, NULL, 1, NULL, 0, 0, 9, NULL, 19, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (24, 1, '2026-09-03 13:59:49.268797+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (25, 1, '2026-09-03 14:25:24.676329+00', '1973-07-14', '12345123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 18, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (26, 1, '2026-09-03 14:32:44.389528+00', '1973-07-14', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, NULL, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 18, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (27, 1, '2026-09-03 14:45:25.937772+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (28, 1, '2026-09-03 14:50:51.926725+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, NULL, 16, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (29, 1, '2026-09-03 14:51:34.144626+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 5, NULL, 16, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (30, 1, '2026-09-03 14:52:53.098127+00', '1973-07-14', '12123', 'Jesus', 'Aquino', NULL, 1, NULL, 9, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 18, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (31, 1, '2026-09-03 14:58:24.976134+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (32, 5, '2026-09-03 15:16:04.155396+00', '1994-02-02', '24592043', 'JESUS ALEJANDRO', 'SALAZAR GONZALEZ', '0412-1353143', 1, NULL, NULL, 1, NULL, NULL, NULL, 'direcciondesaludmppeu2026@gmail.com', 32, NULL, 'AV. SAN MARTIN', NULL, 1, NULL, 0, 0, 10, NULL, 24, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (33, 1, '2026-09-03 15:33:34.915748+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 7, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (34, 1, '2026-09-03 15:35:08.188561+00', '2010-09-03', '12123123', 'Jesus', 'Aquino', NULL, 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 16, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 17, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (35, 1, '2026-09-04 14:58:22.284421+00', '2004-02-20', '30831617', 'gabriela', 'mendez', NULL, 2, NULL, NULL, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 24, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (36, 1, '2026-09-09 13:52:33.347899+00', '2010-12-12', '1231', 'Gabi', 'Gabi2', '04147895623', 2, NULL, 10, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 15, NULL, NULL, NULL, 1, NULL, 0, 0, 6, NULL, 17, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (37, 1, '2026-09-09 14:41:17.035958+00', '2026-09-08', '12123', 'Jesus', 'Aquino', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'kronavikingo@gmail.com', 0, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 16, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (38, 1, '2026-09-10 13:41:50.462737+00', '1990-01-01', '98134150', 'Prueba', 'CorreoGerencia', '04120000000', 1, 1, NULL, 1, NULL, NULL, NULL, 'gerencia.op.oti@gmail.com', 36, '04120000001', 'Prueba de correo en produccion', NULL, 1, NULL, 0, 0, 1, NULL, 1, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (39, 1, '2026-09-14 12:52:56.774788+00', '1973-07-14', '123123213', 'Jesus', 'Aquino', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'aquinobjesusg@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 13, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (40, 1, '2026-09-14 12:55:32.002098+00', '1973-07-14', '12123123', 'Victor', 'Diaz', '04147895623', 1, NULL, 10, 1, NULL, NULL, NULL, 'vbernaiz@mppu.gov.ve', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 8, NULL, 13, 2, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (41, 1, '2026-09-14 13:32:51.268912+00', '2004-02-20', '30831617', 'gabriela', 'mendez', '04123695825', 2, NULL, 9, 1, NULL, NULL, NULL, 'gabimend67@gmail.com', 22, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 15, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (42, 1, '2026-09-25 12:36:33.833621+00', '2004-02-20', '30831617', 'gabriela', 'mendez', '04243966467', 2, NULL, 9, 1, NULL, NULL, NULL, NULL, 22, NULL, NULL, NULL, 1, NULL, 0, 0, 10, NULL, 9, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (43, 1, '2026-10-01 13:10:47.677841+00', '1976-07-14', '1212331', 'jesus', 'aquino', '04120105656', 1, NULL, 10, 1, NULL, NULL, NULL, 'sistema.mppue@gmail.com', 50, NULL, NULL, NULL, 1, NULL, 0, 0, 8, NULL, 16, 3, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (44, 1, '2026-10-01 16:01:55.876848+00', '2026-07-14', '21443324', 'jesus', 'Chaustre', '12333312', 1, NULL, 10, 1, NULL, NULL, NULL, 'sistema.mppue@gmail.com', 0, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 15, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (45, 1, '2026-10-01 16:27:04.120619+00', '1973-07-14', '1234412', 'jesus', 'Chaustre', '04120102626', 1, NULL, 10, 1, NULL, NULL, NULL, 'sistema.mppue@gmail.com', 53, NULL, NULL, NULL, 1, NULL, 0, 0, 9, NULL, 16, 1, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (46, 1, '2026-10-02 13:55:46.161421+00', '1973-07-14', '4564', 'Jessica', 'aquino', '12313', 2, NULL, 10, 1, NULL, NULL, NULL, NULL, 53, NULL, NULL, NULL, 1, NULL, 0, 0, 1, NULL, 19, 3, NULL, NULL);
INSERT INTO public.paciente_respaldo VALUES (47, 2, '2026-10-02 15:23:40.501169+00', '1973-07-14', NULL, 'jose', 'jose', '234234', 1, NULL, 10, 1, NULL, NULL, NULL, NULL, 53, '234234', NULL, NULL, 1, NULL, 0, 0, 1, NULL, 11, 3, NULL, NULL);


--
-- TOC entry 3806 (class 0 OID 99850)
-- Dependencies: 251
-- Data for Name: parametros_general; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.parametros_general VALUES (1, 'Edad para Beneficiarios', '25', 1);
INSERT INTO public.parametros_general VALUES (2, 'Beneficiarios Menores de Edad', '9', 1);


--
-- TOC entry 3808 (class 0 OID 99856)
-- Dependencies: 253
-- Data for Name: parentesco; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.parentesco VALUES (1, 'TITULAR ', 1);
INSERT INTO public.parentesco VALUES (2, 'CONYUGE', 1);
INSERT INTO public.parentesco VALUES (3, 'MADRE', 1);
INSERT INTO public.parentesco VALUES (4, 'PADRE', 1);
INSERT INTO public.parentesco VALUES (5, 'HIJO(A)', 1);
INSERT INTO public.parentesco VALUES (6, 'CONCUBINO(A)', 1);
INSERT INTO public.parentesco VALUES (7, 'NIETO(A)', 1);
INSERT INTO public.parentesco VALUES (8, 'SOBRINO(A)', 1);
INSERT INTO public.parentesco VALUES (9, 'SIN ESPECIFICAR', 1);


--
-- TOC entry 3810 (class 0 OID 99860)
-- Dependencies: 255
-- Data for Name: rol; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.rol VALUES (2, 'CITAS', 1);
INSERT INTO public.rol VALUES (1, 'ADMINISTRADOR', 1);
INSERT INTO public.rol VALUES (3, 'CONSULTA', 1);


--
-- TOC entry 3812 (class 0 OID 99864)
-- Dependencies: 257
-- Data for Name: sexo; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.sexo VALUES (1, 'Masculino');
INSERT INTO public.sexo VALUES (2, 'Femenino');


--
-- TOC entry 3814 (class 0 OID 99868)
-- Dependencies: 259
-- Data for Name: tipo_de_empleado; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.tipo_de_empleado VALUES (1, 'Activo', NULL, 1);
INSERT INTO public.tipo_de_empleado VALUES (2, 'Jubilado-Pensionado', NULL, 1);
INSERT INTO public.tipo_de_empleado VALUES (3, 'Sin Especificar', NULL, 1);


--
-- TOC entry 3818 (class 0 OID 99876)
-- Dependencies: 263
-- Data for Name: trazabilidad; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.trazabilidad VALUES (2485, '2026-10-05 09:54:28+00', 'ESTADISTICAS-BASICAS', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2486, '2026-10-05 09:54:33+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2487, '2026-10-05 09:54:58+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2488, '2026-10-05 09:55:32+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2489, '2026-10-05 09:56:12+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2490, '2026-10-05 09:56:26+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2491, '2026-10-05 09:57:50+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2492, '2026-10-05 09:57:57+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2493, '2026-10-05 09:58:22+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2494, '2026-10-05 10:01:35+00', 'LISTAR-Lista de Citas', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2495, '2026-10-05 10:01:55+00', 'LISTAR-Lista de Citas', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2496, '2026-10-05 10:02:07+00', 'LISTAR-Lista de Citas', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2497, '2026-10-05 10:03:02+00', 'LISTAR-Lista de Citas', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2498, '2026-10-05 10:03:14+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2499, '2026-10-05 10:03:23+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2500, '2026-10-05 10:03:30+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2501, '2026-10-05 10:03:41+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2502, '2026-10-05 10:03:51+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2503, '2026-10-05 10:04:54+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2504, '2026-10-05 10:04:57+00', 'LISTAR-Archivos Procesados', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2505, '2026-10-05 10:04:59+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2506, '2026-10-05 10:05:18+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2507, '2026-10-05 10:08:25+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2508, '2026-10-05 10:11:39+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2509, '2026-10-05 10:12:30+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2510, '2026-10-05 10:12:47+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2511, '2026-10-05 10:13:50+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2512, '2026-10-05 10:18:49+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2513, '2026-10-05 10:18:59+00', 'LISTAR-Parentescos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2514, '2026-10-05 10:19:03+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2515, '2026-10-05 10:19:09+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2516, '2026-10-05 10:20:50+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2517, '2026-10-05 10:20:54+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2518, '2026-10-05 10:20:58+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2519, '2026-10-05 10:23:33+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2520, '2026-10-05 10:23:33+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2521, '2026-10-05 10:23:39+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2522, '2026-10-05 10:24:07+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2523, '2026-10-05 10:24:22+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2524, '2026-10-05 10:24:53+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2525, '2026-10-05 10:27:00+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2526, '2026-10-05 10:27:00+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2527, '2026-10-05 10:27:40+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2528, '2026-10-05 10:28:10+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2529, '2026-10-05 10:28:41+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2530, '2026-10-05 10:28:41+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2531, '2026-10-05 10:35:45+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2532, '2026-10-05 10:39:50+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2533, '2026-10-05 10:42:40+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2534, '2026-10-05 10:45:28+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2535, '2026-10-05 10:45:55+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2536, '2026-10-05 10:46:10+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2537, '2026-10-05 10:46:14+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2538, '2026-10-05 10:46:22+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2539, '2026-10-05 10:46:46+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2540, '2026-10-05 10:52:33+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2541, '2026-10-05 10:56:28+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2542, '2026-10-05 11:30:52+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2543, '2026-10-05 11:31:26+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2544, '2026-10-05 11:34:03+00', 'Modificación Horarios Médicos ', 1, '127.0.0.1', 'Se actualizó el horario ID: 7');
INSERT INTO public.trazabilidad VALUES (2545, '2026-10-05 11:34:03+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2546, '2026-10-05 11:44:20+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2547, '2026-10-05 12:51:20+00', 'LOGIN', 0, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2548, '2026-10-05 12:51:20+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.192', NULL);
INSERT INTO public.trazabilidad VALUES (2549, '2026-10-06 08:34:50+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2550, '2026-10-06 08:34:50+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2551, '2026-10-06 08:34:57+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2552, '2026-10-06 08:35:01+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2553, '2026-10-06 08:46:50+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2554, '2026-10-06 08:49:04+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2555, '2026-10-06 08:51:41+00', 'Inserción Médicos ', 1, '127.0.0.1', 'Se creó el médico Jorge Rodriguez');
INSERT INTO public.trazabilidad VALUES (2556, '2026-10-06 08:51:41+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2557, '2026-10-06 08:52:49+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2558, '2026-10-06 08:55:12+00', 'Modificación Médicos ', 1, '127.0.0.1', 'Se editó el médico Cledimar Marinez Espinoza (ID: 100)');
INSERT INTO public.trazabilidad VALUES (2559, '2026-10-06 08:55:12+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2560, '2026-10-06 08:56:33+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2561, '2026-10-06 08:56:36+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2562, '2026-10-06 08:57:01+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2563, '2026-10-06 08:57:04+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2564, '2026-10-06 08:58:32+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2565, '2026-10-06 09:19:38+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2566, '2026-10-06 09:19:50+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2567, '2026-10-06 09:21:15+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2568, '2026-10-06 09:22:16+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2569, '2026-10-06 09:22:18+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2570, '2026-10-06 09:22:39+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2571, '2026-10-06 09:23:21+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2572, '2026-10-06 09:40:34+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2573, '2026-10-06 09:43:00+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2574, '2026-10-06 09:44:10+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2575, '2026-10-06 09:44:10+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2576, '2026-10-06 09:44:36+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2577, '2026-10-06 09:44:36+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2578, '2026-10-06 09:45:14+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2579, '2026-10-06 09:45:19+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2580, '2026-10-06 09:50:22+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2581, '2026-10-06 09:50:55+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2582, '2026-10-06 09:50:55+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2583, '2026-10-06 09:54:23+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2584, '2026-10-06 09:56:16+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2585, '2026-10-06 09:56:29+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2586, '2026-10-06 09:56:37+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2587, '2026-10-06 09:56:53+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2588, '2026-10-06 10:13:49+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2589, '2026-10-06 10:13:49+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2590, '2026-10-06 10:15:42+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2591, '2026-10-06 10:15:42+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2592, '2026-10-06 10:16:22+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2593, '2026-10-06 10:16:22+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2594, '2026-10-06 10:18:55+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2595, '2026-10-06 10:19:35+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2596, '2026-10-06 10:20:17+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2597, '2026-10-06 10:54:21+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2598, '2026-10-06 10:55:27+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2599, '2026-10-06 11:06:45+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2600, '2026-10-06 11:06:59+00', 'Inserción Horarios Médicos ', 1, '127.0.0.1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2601, '2026-10-06 11:06:59+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2602, '2026-10-06 11:13:54+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2603, '2026-10-06 11:17:47+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2604, '2026-10-06 11:18:21+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2605, '2026-10-06 11:18:57+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2606, '2026-10-06 11:19:10+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2607, '2026-10-06 11:19:33+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2608, '2026-10-06 11:19:36+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2609, '2026-10-06 11:19:41+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2610, '2026-10-06 11:19:45+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2611, '2026-10-06 11:19:51+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2612, '2026-10-06 14:22:45+00', 'LOGIN', 0, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2613, '2026-10-06 14:22:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2614, '2026-10-06 14:22:49+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2615, '2026-10-06 14:22:50+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2616, '2026-10-06 14:23:30+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2617, '2026-10-06 14:31:32+00', 'Inserción Médicos ', 1, '172.17.11.151', 'Se creó el médico JESUS AQUINO');
INSERT INTO public.trazabilidad VALUES (2618, '2026-10-06 14:31:32+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.151', NULL);
INSERT INTO public.trazabilidad VALUES (2619, '2026-10-07 08:37:40+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2620, '2026-10-07 08:37:40+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2621, '2026-10-07 08:37:44+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2622, '2026-10-07 08:37:47+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2623, '2026-10-07 08:37:54+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2624, '2026-10-07 08:40:52+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2625, '2026-10-07 08:40:56+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2626, '2026-10-07 08:43:50+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2627, '2026-10-07 08:43:54+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2628, '2026-10-07 08:44:01+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2629, '2026-10-07 08:44:07+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2630, '2026-10-07 08:44:43+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2631, '2026-10-07 08:48:19+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2632, '2026-10-07 09:01:43+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2633, '2026-10-07 09:01:45+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2634, '2026-10-07 09:01:49+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2635, '2026-10-07 09:11:32+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2636, '2026-10-07 09:11:46+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2637, '2026-10-07 09:12:38+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2638, '2026-10-07 09:15:08+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2639, '2026-10-07 09:15:12+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2640, '2026-10-07 09:17:10+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2641, '2026-10-07 09:19:17+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2642, '2026-10-07 09:19:45+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2643, '2026-10-07 09:19:50+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2644, '2026-10-07 09:19:55+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2645, '2026-10-07 09:20:04+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2646, '2026-10-07 09:20:10+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2647, '2026-10-07 09:20:16+00', 'LISTAR-Parentescos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2648, '2026-10-07 09:25:03+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2649, '2026-10-07 09:27:00+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2650, '2026-10-07 09:27:02+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2651, '2026-10-07 09:28:23+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2652, '2026-10-07 09:28:58+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2653, '2026-10-07 09:29:09+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2654, '2026-10-07 09:33:52+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2655, '2026-10-07 09:33:52+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2656, '2026-10-07 09:32:57+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2657, '2026-10-07 09:33:11+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2658, '2026-10-07 09:33:19+00', 'EXCEL-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2659, '2026-10-07 09:34:13+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2660, '2026-10-07 09:34:30+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2661, '2026-10-07 09:34:45+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2662, '2026-10-07 09:35:05+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2663, '2026-10-07 09:35:59+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2664, '2026-10-07 09:53:28+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2665, '2026-10-07 10:03:58+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2666, '2026-10-07 10:04:07+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2667, '2026-10-07 10:04:09+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2668, '2026-10-07 10:04:34+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2669, '2026-10-07 10:07:06+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2670, '2026-10-07 10:07:09+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2671, '2026-10-07 11:00:22+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2672, '2026-10-07 11:00:22+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2673, '2026-10-07 11:00:34+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2674, '2026-10-07 11:12:05+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2675, '2026-10-07 11:12:11+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2676, '2026-10-07 13:34:08+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2677, '2026-10-07 13:34:09+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2678, '2026-10-07 13:34:20+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2679, '2026-10-07 13:34:25+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2680, '2026-10-07 13:34:29+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2681, '2026-10-07 13:34:31+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2682, '2026-10-07 13:35:45+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2683, '2026-10-07 13:35:48+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2684, '2026-10-07 13:35:54+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2685, '2026-10-07 13:35:59+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2686, '2026-10-07 13:36:05+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2687, '2026-10-07 13:36:28+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2688, '2026-10-07 13:36:40+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2689, '2026-10-07 13:37:53+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2690, '2026-10-07 13:38:45+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2691, '2026-10-07 13:42:57+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2692, '2026-10-07 13:43:21+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2693, '2026-10-07 13:45:02+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2694, '2026-10-07 13:53:18+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2695, '2026-10-07 13:55:06+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2696, '2026-10-08 14:10:36+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2697, '2026-10-08 14:10:36+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2698, '2026-10-08 14:10:43+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2699, '2026-10-08 14:10:52+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2700, '2026-10-08 14:11:05+00', 'LISTAR-Archivos Procesados', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2701, '2026-10-08 14:11:16+00', 'LISTAR-Archivos Procesados', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2702, '2026-10-08 14:11:21+00', 'LISTAR-Trazabilidad de Usuario', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2703, '2026-10-08 14:11:34+00', 'LISTAR-Trazabilidad de Usuario', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2704, '2026-10-08 14:11:41+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2705, '2026-10-08 14:11:45+00', 'LISTAR-Parentescos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2706, '2026-10-08 14:11:49+00', 'LISTAR-Lista de Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2707, '2026-10-08 14:28:17+00', 'LISTAR-Lista de Usuarios', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2708, '2026-10-08 14:33:06+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2709, '2026-10-08 14:33:13+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2710, '2026-10-08 15:17:28+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2711, '2026-10-08 15:18:26+00', 'LISTAR-Lista De Base de Datos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2712, '2026-10-08 15:20:01+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2713, '2026-10-08 15:20:05+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2714, '2026-10-08 15:20:51+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2715, '2026-10-08 15:21:03+00', 'LISTAR-Lista De Base de Datos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2716, '2026-10-09 09:43:51+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2717, '2026-10-09 09:43:51+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2718, '2026-10-09 09:43:59+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2719, '2026-10-09 10:21:17+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2720, '2026-10-09 10:30:15+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2721, '2026-10-09 10:30:15+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2722, '2026-10-09 10:57:24+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2723, '2026-10-09 11:02:39+00', 'Modificación Horarios Médicos ', 1, '127.0.0.1', 'Se actualizó el horario ID: 28');
INSERT INTO public.trazabilidad VALUES (2724, '2026-10-09 11:02:39+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2725, '2026-10-09 11:02:58+00', 'Modificación Horarios Médicos ', 1, '127.0.0.1', 'Se actualizó el horario ID: 28');
INSERT INTO public.trazabilidad VALUES (2726, '2026-10-09 11:02:58+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2727, '2026-10-09 11:13:58+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2728, '2026-10-09 11:15:01+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2729, '2026-10-09 11:15:10+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2730, '2026-10-09 11:15:22+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2731, '2026-10-09 11:26:40+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2732, '2026-10-09 11:25:53+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2733, '2026-10-09 11:31:55+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2734, '2026-10-09 11:33:36+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2735, '2026-10-09 11:35:20+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2736, '2026-10-09 11:41:42+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2737, '2026-10-09 11:43:59+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2738, '2026-10-09 11:45:24+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2739, '2026-10-09 11:49:08+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2740, '2026-10-09 11:58:47+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2741, '2026-10-09 11:58:47+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2742, '2026-10-09 11:58:52+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2743, '2026-10-09 11:58:58+00', 'LISTAR-Archivos Procesados', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2744, '2026-10-09 11:59:06+00', 'LISTAR-Trazabilidad de Usuario', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2745, '2026-10-09 12:56:28+00', 'LOGIN', 0, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2746, '2026-10-09 12:56:28+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2747, '2026-10-09 12:56:40+00', 'LISTAR-Parentescos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2748, '2026-10-09 12:56:45+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2749, '2026-10-09 12:56:50+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2750, '2026-10-09 12:56:56+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2751, '2026-10-09 12:57:10+00', 'LISTAR-Lista de Citas', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2752, '2026-10-09 12:57:19+00', 'LISTAR-Lista de Citas', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2753, '2026-10-09 13:00:07+00', 'LOGIN', 0, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2754, '2026-10-09 13:00:07+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2755, '2026-10-09 13:00:36+00', 'LISTAR-Parentescos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2756, '2026-10-09 13:01:29+00', 'LISTAR-Parentescos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2757, '2026-10-09 13:01:35+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2758, '2026-10-09 13:01:41+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2759, '2026-10-09 13:02:55+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2760, '2026-10-09 13:03:10+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2761, '2026-10-09 13:03:17+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2762, '2026-10-09 13:03:24+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2763, '2026-10-09 13:03:33+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2764, '2026-10-09 13:03:51+00', 'Inserción Horarios Médicos ', 1, '172.17.11.156', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2765, '2026-10-09 13:03:51+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2766, '2026-10-09 13:04:19+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2767, '2026-10-09 13:49:54+00', 'LOGIN', 0, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2768, '2026-10-09 13:49:54+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2769, '2026-10-09 13:54:56+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2770, '2026-10-09 13:55:05+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2771, '2026-10-09 13:55:20+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2772, '2026-10-09 13:56:56+00', 'LISTAR-Lista de Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2773, '2026-10-09 13:57:04+00', 'LISTAR-Médicos & Especialidades', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2774, '2026-10-09 13:57:23+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2775, '2026-10-09 13:58:23+00', 'Inserción Horarios Médicos ', 1, '172.17.11.156', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2776, '2026-10-09 13:58:23+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2777, '2026-10-09 13:59:44+00', 'LISTAR-Horarios Médicos', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2778, '2026-10-09 13:59:57+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2779, '2026-10-09 14:00:19+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2780, '2026-10-09 14:00:48+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2781, '2026-10-09 14:01:11+00', 'Inserción Horarios Médicos ', 2, '::1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2782, '2026-10-09 14:01:11+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2783, '2026-10-09 14:14:12+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2784, '2026-10-09 14:14:19+00', 'LISTAR-Archivo Cargado', 1, '172.17.11.156', NULL);
INSERT INTO public.trazabilidad VALUES (2785, '2026-10-09 14:51:44+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2786, '2026-10-09 14:54:56+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2787, '2026-10-09 14:55:39+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2788, '2026-10-09 14:56:04+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2789, '2026-10-09 15:29:24+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2790, '2026-10-09 15:29:33+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2791, '2026-10-14 08:34:36+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2792, '2026-10-14 08:34:36+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2793, '2026-10-14 08:34:43+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2794, '2026-10-14 08:34:49+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2795, '2026-10-14 08:36:22+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2796, '2026-10-14 08:36:43+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2797, '2026-10-14 08:36:49+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2798, '2026-10-14 08:40:07+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2799, '2026-10-14 08:40:17+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2800, '2026-10-14 08:40:34+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2801, '2026-10-14 08:40:43+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2802, '2026-10-14 09:02:49+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2803, '2026-10-14 09:02:50+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2804, '2026-10-14 09:05:48+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2805, '2026-10-14 09:06:18+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2806, '2026-10-14 09:07:13+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2807, '2026-10-14 09:07:44+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2808, '2026-10-14 09:09:09+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2809, '2026-10-14 09:09:53+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2810, '2026-10-14 09:11:36+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2811, '2026-10-14 09:11:55+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2812, '2026-10-14 09:12:10+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2813, '2026-10-14 09:12:15+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2814, '2026-10-14 09:12:45+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2815, '2026-10-14 09:28:19+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2816, '2026-10-14 09:28:25+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2817, '2026-10-14 09:28:40+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2818, '2026-10-14 09:28:48+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2819, '2026-10-14 09:29:04+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2820, '2026-10-14 09:29:52+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2821, '2026-10-14 09:30:04+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2822, '2026-10-14 09:30:16+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2823, '2026-10-14 09:30:51+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2824, '2026-10-14 09:32:24+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2825, '2026-10-14 09:37:36+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2826, '2026-10-14 09:39:38+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2827, '2026-10-14 09:55:53+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2828, '2026-10-14 09:56:29+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2829, '2026-10-14 09:56:51+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2830, '2026-10-14 09:59:57+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2831, '2026-10-14 10:00:04+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2832, '2026-10-14 10:00:17+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2833, '2026-10-14 10:03:22+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2834, '2026-10-14 10:03:34+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2835, '2026-10-14 10:03:43+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2836, '2026-10-14 10:04:13+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2837, '2026-10-14 10:09:51+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2838, '2026-10-14 11:38:27+00', 'LOGIN', 0, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2839, '2026-10-14 11:38:27+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2840, '2026-10-14 11:41:22+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2841, '2026-10-14 11:41:22+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2842, '2026-10-14 11:41:38+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2843, '2026-10-14 11:41:52+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2844, '2026-10-14 11:42:34+00', 'LISTAR-Archivos Procesados', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2845, '2026-10-14 11:44:11+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2846, '2026-10-14 11:45:06+00', 'LISTAR-Parentescos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2847, '2026-10-14 11:46:09+00', 'LISTAR-Lista de Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2848, '2026-10-14 11:46:29+00', 'LISTAR-Médicos & Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2849, '2026-10-14 11:48:12+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2850, '2026-10-14 11:48:51+00', 'Inserción Horarios Médicos ', 5, '172.17.22.67', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2851, '2026-10-14 11:48:51+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2852, '2026-10-14 11:49:21+00', 'LISTAR-Médicos & Especialidades', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2853, '2026-10-14 11:49:25+00', 'LISTAR-Horarios Médicos', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2854, '2026-10-14 11:58:26+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2855, '2026-10-14 11:58:30+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2856, '2026-10-14 12:00:40+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2857, '2026-10-14 12:00:52+00', 'LISTAR-Archivo Cargado', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2858, '2026-10-14 12:04:10+00', 'ESTADISTICAS-BASICAS', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2859, '2026-10-14 12:04:45+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2860, '2026-10-14 12:04:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2861, '2026-10-14 12:04:50+00', 'LISTAR-Lista de Usuarios', 1, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2862, '2026-10-14 12:06:11+00', 'LISTAR-Lista de Citas', 1, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (2863, '2026-10-14 12:09:33+00', 'LOGIN', 0, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2864, '2026-10-14 12:09:33+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2865, '2026-10-14 12:09:59+00', 'LISTAR-Médicos & Especialidades', 2, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2866, '2026-10-14 12:10:04+00', 'LISTAR-Horarios Médicos', 2, '172.17.11.130', NULL);
INSERT INTO public.trazabilidad VALUES (2867, '2026-10-14 12:10:41+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2868, '2026-10-14 12:10:41+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2869, '2026-10-14 12:10:50+00', 'LISTAR-Lista de Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2870, '2026-10-14 12:10:55+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2871, '2026-10-14 12:11:52+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2872, '2026-10-14 12:28:19+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2873, '2026-10-14 12:28:33+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2874, '2026-10-14 12:29:15+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2875, '2026-10-14 12:29:46+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2876, '2026-10-14 12:30:06+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2877, '2026-10-14 12:31:53+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2878, '2026-10-14 12:31:56+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2879, '2026-10-14 12:32:41+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2880, '2026-10-14 12:32:46+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2881, '2026-10-14 12:36:10+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2882, '2026-10-14 12:36:33+00', 'Modificación Horarios Médicos ', 2, '::1', 'Se actualizó el horario ID: 32');
INSERT INTO public.trazabilidad VALUES (2883, '2026-10-14 12:36:33+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2884, '2026-10-14 12:36:57+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2885, '2026-10-14 12:37:17+00', 'LISTAR-Lista de Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2886, '2026-10-14 12:37:25+00', 'LISTAR-Lista de Usuarios', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2887, '2026-10-14 15:01:58+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2888, '2026-10-14 15:02:05+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2889, '2026-10-14 15:02:43+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2890, '2026-10-14 15:03:28+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2891, '2026-10-14 15:03:32+00', 'LISTAR-Lista de Usuarios', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2892, '2026-10-14 15:03:37+00', 'LISTAR-Parentescos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2893, '2026-10-14 15:31:24+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2894, '2026-10-14 15:31:24+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2895, '2026-10-14 15:31:47+00', 'LISTAR-Lista de Usuarios', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2896, '2026-10-14 15:33:20+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2897, '2026-10-14 15:33:20+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2898, '2026-10-14 15:35:03+00', 'LISTAR-Lista de Usuarios', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2899, '2026-10-14 15:35:23+00', 'LISTAR-Lista de Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2900, '2026-10-14 15:35:40+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2901, '2026-10-14 15:36:04+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2902, '2026-10-14 15:36:29+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2903, '2026-10-14 15:36:49+00', 'LISTAR-Parentescos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2904, '2026-10-14 15:38:12+00', 'ESTADISTICAS-BASICAS', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2905, '2026-10-14 15:38:32+00', 'LISTAR-Trazabilidad de Usuario', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2906, '2026-10-14 15:38:49+00', 'LISTAR-Archivos Procesados', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2907, '2026-10-14 15:39:11+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2908, '2026-10-14 15:56:23+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2909, '2026-10-14 15:56:23+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2910, '2026-10-14 15:57:46+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2911, '2026-10-14 15:57:57+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2912, '2026-10-14 15:58:30+00', 'Inserción Horarios Médicos ', 2, '::1', 'Se creó una nueva grilla de horario');
INSERT INTO public.trazabilidad VALUES (2913, '2026-10-14 15:58:30+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2914, '2026-10-14 16:21:21+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2915, '2026-10-14 16:21:29+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2916, '2026-10-14 16:26:21+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2917, '2026-10-14 16:28:23+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2918, '2026-10-14 16:36:10+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2919, '2026-10-14 16:38:37+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2920, '2026-10-14 16:38:37+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2921, '2026-10-14 16:42:13+00', 'LISTAR-Médicos & Especialidades', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2922, '2026-10-14 16:42:31+00', 'LISTAR-Horarios Médicos', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2923, '2026-10-14 16:47:25+00', 'Inserción Citas paciente ', 2, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2924, '2026-10-14 16:47:35+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2925, '2026-10-14 16:47:42+00', 'ESTADISTICAS-BASICAS', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2926, '2026-10-14 16:47:53+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2927, '2026-10-14 16:48:57+00', 'Inserción Citas paciente ', 2, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2928, '2026-10-14 16:49:05+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2929, '2026-10-14 16:49:37+00', 'ESTADISTICAS-BASICAS', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2930, '2026-10-14 16:50:36+00', 'LISTAR-Lista de Citas', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2931, '2026-10-15 09:16:06+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2932, '2026-10-15 09:16:06+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2933, '2026-10-15 14:06:37+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2934, '2026-10-15 14:06:37+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2935, '2026-10-15 16:52:05+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2936, '2026-10-15 16:52:05+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2937, '2026-10-15 17:14:18+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2938, '2026-10-15 17:14:18+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2939, '2026-10-15 17:14:51+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2940, '2026-10-15 17:15:06+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2941, '2026-10-15 17:15:20+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2942, '2026-10-15 17:34:32+00', 'LISTAR-Archivo Cargado', 2, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2943, '2026-10-16 17:03:08+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2944, '2026-10-16 17:03:08+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2945, '2026-10-16 17:03:21+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2946, '2026-10-16 17:03:38+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2947, '2026-10-16 17:04:11+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2948, '2026-10-16 17:09:55+00', 'Inserción Citas paciente ', 1, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2949, '2026-10-16 17:09:59+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2950, '2026-10-19 09:02:58+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2951, '2026-10-19 09:02:59+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2952, '2026-10-19 09:04:13+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2953, '2026-10-19 09:06:38+00', 'Inserción Citas paciente ', 1, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2954, '2026-10-19 09:08:22+00', 'Inserción Citas paciente ', 1, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2955, '2026-10-19 09:10:03+00', 'Inserción Citas paciente ', 1, '::1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (2956, '2026-10-19 09:15:10+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2957, '2026-10-19 09:15:15+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2958, '2026-10-19 09:40:19+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2959, '2026-10-19 09:40:19+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2960, '2026-10-19 09:40:27+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2961, '2026-10-19 09:40:33+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2962, '2026-10-19 09:40:38+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2963, '2026-10-19 09:40:42+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2964, '2026-10-19 09:40:49+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2965, '2026-10-19 09:40:53+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2966, '2026-10-19 09:41:01+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2967, '2026-10-19 09:41:03+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2968, '2026-10-19 09:41:11+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2969, '2026-10-19 09:41:20+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2970, '2026-10-19 09:41:28+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2971, '2026-10-19 09:41:35+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2972, '2026-10-19 09:41:51+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2973, '2026-10-19 09:42:12+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2974, '2026-10-19 09:42:20+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2975, '2026-10-19 09:42:29+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2976, '2026-10-19 09:42:33+00', 'LISTAR-Parentescos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2977, '2026-10-19 09:43:11+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2978, '2026-10-19 09:43:21+00', 'ESTADISTICAS-BASICAS', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2979, '2026-10-19 09:43:38+00', 'ESTADISTICAS-BASICAS', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2980, '2026-10-19 09:43:41+00', 'ESTADISTICAS-GETARIO', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2981, '2026-10-19 09:46:05+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2982, '2026-10-19 09:46:39+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2983, '2026-10-19 09:46:54+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2984, '2026-10-19 09:46:58+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2985, '2026-10-19 10:15:01+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2986, '2026-10-19 10:15:13+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2987, '2026-10-19 10:18:30+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2988, '2026-10-19 10:23:39+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2989, '2026-10-19 10:24:13+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2990, '2026-10-19 10:23:56+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2991, '2026-10-19 10:24:58+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2992, '2026-10-19 10:25:03+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2993, '2026-10-19 10:30:23+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2994, '2026-10-19 10:31:39+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2995, '2026-10-19 10:34:32+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2996, '2026-10-19 10:41:08+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2997, '2026-10-19 10:50:04+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (2998, '2026-10-19 11:02:44+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (2999, '2026-10-19 11:03:23+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3000, '2026-10-19 11:04:04+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3001, '2026-10-19 11:04:54+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3002, '2026-10-19 11:05:12+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3003, '2026-10-19 11:05:22+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3004, '2026-10-19 11:16:13+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3005, '2026-10-19 11:23:03+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3006, '2026-10-19 11:23:07+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3007, '2026-10-19 11:23:39+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3008, '2026-10-19 11:25:29+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3009, '2026-10-19 11:25:53+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3010, '2026-10-19 11:26:01+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3011, '2026-10-19 11:26:08+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3012, '2026-10-19 11:31:21+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3013, '2026-10-19 11:31:21+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3014, '2026-10-19 11:32:15+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3015, '2026-10-19 11:31:37+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3016, '2026-10-19 11:31:46+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3017, '2026-10-19 11:31:56+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3018, '2026-10-19 11:32:10+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3019, '2026-10-19 11:32:48+00', 'LISTAR-Parentescos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3020, '2026-10-19 11:33:08+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3021, '2026-10-19 11:33:12+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3022, '2026-10-19 11:35:18+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3023, '2026-10-19 11:39:15+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3024, '2026-10-19 11:39:23+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3025, '2026-10-19 11:40:12+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3026, '2026-10-19 11:43:06+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3027, '2026-10-19 11:43:06+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3028, '2026-10-19 11:40:23+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3029, '2026-10-19 11:52:55+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3030, '2026-10-19 11:53:40+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3031, '2026-10-19 11:54:01+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3032, '2026-10-19 11:55:08+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3033, '2026-10-19 11:55:30+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3034, '2026-10-19 11:55:39+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3035, '2026-10-19 12:26:22+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3036, '2026-10-19 12:26:51+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3037, '2026-10-19 12:29:21+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3038, '2026-10-19 12:45:36+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3039, '2026-10-19 12:45:43+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3040, '2026-10-19 12:45:47+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3041, '2026-10-19 12:46:00+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3042, '2026-10-19 12:47:20+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3043, '2026-10-19 12:47:29+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3044, '2026-10-19 12:47:51+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3045, '2026-10-19 12:48:02+00', 'Modificación Horarios Médicos ', 1, '::1', 'Se actualizó el horario ID: 33');
INSERT INTO public.trazabilidad VALUES (3046, '2026-10-19 12:48:02+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3047, '2026-10-19 12:48:10+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3048, '2026-10-19 12:48:19+00', 'Modificación Horarios Médicos ', 1, '::1', 'Se actualizó el horario ID: 33');
INSERT INTO public.trazabilidad VALUES (3049, '2026-10-19 12:48:20+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3050, '2026-10-19 13:14:49+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3051, '2026-10-19 13:14:49+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3052, '2026-10-19 13:14:55+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3053, '2026-10-19 13:16:03+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3054, '2026-10-19 13:21:29+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3055, '2026-10-19 13:21:33+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3056, '2026-10-19 13:21:37+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3057, '2026-10-19 13:21:49+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3058, '2026-10-19 13:21:54+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3059, '2026-10-19 13:23:10+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3060, '2026-10-19 13:23:13+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3061, '2026-10-19 13:23:29+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3062, '2026-10-19 13:23:44+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3063, '2026-10-19 13:23:51+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3064, '2026-10-19 13:23:54+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3065, '2026-10-19 13:23:56+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3066, '2026-10-19 13:24:00+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3067, '2026-10-19 13:24:07+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3068, '2026-10-19 13:24:12+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3069, '2026-10-19 13:24:17+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3070, '2026-10-19 13:24:38+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3071, '2026-10-19 13:24:58+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3072, '2026-10-19 13:25:05+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3073, '2026-10-19 13:29:22+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3074, '2026-10-19 13:31:30+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3075, '2026-10-19 13:31:43+00', 'ESTADISTICAS-BASICAS', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3076, '2026-10-19 13:31:46+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3077, '2026-10-19 13:33:27+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3078, '2026-10-19 13:33:32+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3079, '2026-10-19 13:33:37+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3080, '2026-10-19 13:35:41+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3081, '2026-10-19 13:36:26+00', 'LISTAR-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3082, '2026-10-19 13:36:29+00', 'EXCEL-Lista de Citas', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3083, '2026-10-19 14:32:29+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3084, '2026-10-19 14:33:09+00', 'LISTAR-Lista de Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3085, '2026-10-19 14:35:47+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3086, '2026-10-19 14:36:07+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3087, '2026-10-19 14:39:47+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3088, '2026-10-19 14:40:04+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3089, '2026-10-19 14:40:08+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3090, '2026-10-19 14:40:24+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3091, '2026-10-19 14:40:29+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3092, '2026-10-19 14:40:48+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3093, '2026-10-19 14:41:14+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3094, '2026-10-19 14:42:38+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3095, '2026-10-19 14:43:23+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3096, '2026-10-19 14:43:29+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3097, '2026-10-19 14:43:53+00', 'LISTAR-Archivo Cargado', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3098, '2026-10-19 14:44:46+00', 'LISTAR-Horarios Médicos', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3099, '2026-10-19 14:44:53+00', 'LISTAR-Médicos & Especialidades', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3100, '2026-10-19 14:45:15+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3101, '2026-10-19 14:45:50+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3102, '2026-10-19 14:46:19+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3103, '2026-10-19 14:47:07+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3104, '2026-10-19 15:40:38+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3105, '2026-10-20 08:35:11+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3106, '2026-10-20 08:35:11+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3107, '2026-10-20 09:24:47+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3108, '2026-10-20 09:24:47+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3109, '2026-10-20 09:24:49+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3110, '2026-10-20 09:25:55+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3111, '2026-10-20 09:26:42+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3112, '2026-10-20 09:31:30+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3113, '2026-10-20 09:31:34+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3114, '2026-10-20 09:31:34+00', 'LOGIN-USUARIO-INACTIVO', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3115, '2026-10-20 09:31:35+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3116, '2026-10-20 09:31:35+00', 'LOGIN-USUARIO-INACTIVO', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3117, '2026-10-20 09:31:44+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3118, '2026-10-20 09:31:44+00', 'LOGIN-USUARIO-DATOS-SESION', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3119, '2026-10-20 09:31:57+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3120, '2026-10-20 09:31:57+00', 'LOGIN-USUARIO-INICIO-SESION', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3121, '2026-10-20 09:32:04+00', 'LISTAR-Lista de Usuarios', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3122, '2026-10-20 09:32:11+00', 'LISTAR-Lista de Usuarios', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3123, '2026-10-20 09:33:12+00', 'LISTAR-Lista de Usuarios', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3124, '2026-10-20 09:33:14+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3125, '2026-10-20 09:33:27+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3126, '2026-10-20 09:33:41+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3127, '2026-10-20 09:34:18+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3128, '2026-10-20 09:35:04+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3129, '2026-10-20 09:35:18+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3130, '2026-10-20 09:35:21+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3131, '2026-10-20 09:35:34+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3132, '2026-10-20 09:35:37+00', 'LISTAR-Médicos & Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3133, '2026-10-20 09:35:42+00', 'LISTAR-Horarios Médicos', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3134, '2026-10-20 09:35:47+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3135, '2026-10-20 09:35:49+00', 'LISTAR-Lista de Especialidades', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3136, '2026-10-20 09:36:26+00', 'LISTAR-Lista de Usuarios', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3137, '2026-10-20 09:37:26+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3138, '2026-10-20 09:37:29+00', 'LISTAR-Archivos Procesados', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3139, '2026-10-20 09:37:32+00', 'LISTAR-Archivo Cargado', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3140, '2026-10-20 09:37:53+00', 'LISTAR-Archivo Cargado', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3141, '2026-10-20 09:37:59+00', 'LISTAR-Archivos Procesados', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3142, '2026-10-20 09:38:01+00', 'LISTAR-Archivo Cargado', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3143, '2026-10-20 09:38:14+00', 'LISTAR-Horarios Médicos', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3144, '2026-10-20 09:42:47+00', 'Inserción Citas paciente ', 2, '127.0.0.1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (3145, '2026-10-20 09:42:50+00', 'Inserción Citas paciente ', 2, '127.0.0.1', 'Se creó el Registro de Cita');
INSERT INTO public.trazabilidad VALUES (3146, '2026-10-20 09:48:28+00', 'ESTADISTICAS-BASICAS', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3147, '2026-10-20 09:48:35+00', 'ESTADISTICAS-GETARIO', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3148, '2026-10-20 09:48:51+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3149, '2026-10-20 09:49:03+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3150, '2026-10-20 09:49:21+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3151, '2026-10-20 09:53:27+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3152, '2026-10-20 09:54:30+00', 'LISTAR-Trazabilidad de Usuario', 2, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3153, '2026-10-20 09:59:02+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3154, '2026-10-20 09:59:02+00', 'LOGIN-USUARIO-INICIO-SESION', 9, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3155, '2026-10-20 09:59:45+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3156, '2026-10-20 09:59:45+00', 'LOGIN-USUARIO-INICIO-SESION', 9, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3157, '2026-10-20 09:59:53+00', 'LISTAR-Lista de Citas', 9, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3158, '2026-10-20 10:00:09+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3159, '2026-10-20 10:00:09+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3160, '2026-10-20 10:01:23+00', 'LISTAR-Archivos Procesados', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3161, '2026-10-20 10:21:28+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3162, '2026-10-20 10:32:25+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3163, '2026-10-20 10:32:28+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3164, '2026-10-20 10:32:34+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3165, '2026-10-20 10:32:37+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3197, '2026-10-20 10:41:22+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3198, '2026-10-20 10:41:29+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3199, '2026-10-20 10:41:38+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3200, '2026-10-20 10:41:47+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3201, '2026-10-20 10:41:58+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3202, '2026-10-20 10:42:10+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3203, '2026-10-20 10:42:27+00', 'Modificación Usuarios ', 1, '127.0.0.1', 'Se editó el usuario  (ID: 1)');
INSERT INTO public.trazabilidad VALUES (3204, '2026-10-20 10:42:27+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3205, '2026-10-20 10:42:42+00', 'Modificación Usuarios ', 1, '127.0.0.1', 'Se editó el usuario  (ID: 1)');
INSERT INTO public.trazabilidad VALUES (3206, '2026-10-20 10:42:42+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3207, '2026-10-20 10:46:12+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3208, '2026-10-20 10:50:30+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3209, '2026-10-20 10:50:37+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3210, '2026-10-20 10:50:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3211, '2026-10-20 10:51:55+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3212, '2026-10-20 10:52:36+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3213, '2026-10-20 10:54:26+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3214, '2026-10-20 10:54:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3215, '2026-10-20 10:55:55+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3216, '2026-10-20 10:55:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3217, '2026-10-20 10:57:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3218, '2026-10-20 10:58:10+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3219, '2026-10-20 10:58:23+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3220, '2026-10-20 10:58:35+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3221, '2026-10-20 10:58:48+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3222, '2026-10-20 10:59:07+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3223, '2026-10-20 11:00:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3224, '2026-10-20 11:00:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3225, '2026-10-20 11:02:10+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3226, '2026-10-20 11:02:10+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3227, '2026-10-20 11:02:13+00', 'LISTAR-Trazabilidad de Usuario', 5, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3228, '2026-10-20 11:02:33+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3229, '2026-10-20 11:02:33+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3230, '2026-10-20 11:03:55+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3231, '2026-10-20 11:06:02+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3232, '2026-10-20 11:08:56+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3233, '2026-10-20 11:08:59+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3234, '2026-10-20 11:09:03+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3235, '2026-10-20 11:09:06+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3236, '2026-10-20 11:09:09+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3237, '2026-10-20 11:09:13+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3238, '2026-10-20 11:09:16+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3239, '2026-10-20 11:09:20+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3240, '2026-10-20 11:13:31+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3241, '2026-10-20 11:17:42+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3242, '2026-10-20 11:17:42+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3243, '2026-10-20 11:18:02+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3244, '2026-10-20 11:18:02+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3245, '2026-10-20 11:18:54+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3246, '2026-10-20 11:18:55+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3247, '2026-10-20 11:18:59+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3248, '2026-10-20 11:19:32+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3249, '2026-10-20 11:21:48+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3250, '2026-10-20 11:21:52+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3251, '2026-10-20 11:22:31+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3252, '2026-10-20 11:23:46+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3253, '2026-10-20 11:23:56+00', 'Modificación Horarios Médicos ', 1, '127.0.0.1', 'Se actualizó el horario ID: 33');
INSERT INTO public.trazabilidad VALUES (3254, '2026-10-20 11:23:56+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3255, '2026-10-20 11:24:02+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3256, '2026-10-20 11:25:15+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3257, '2026-10-20 11:25:21+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3258, '2026-10-20 11:25:23+00', 'LISTAR-Lista de Usuarios', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3259, '2026-10-20 11:25:49+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3260, '2026-10-20 11:25:55+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3261, '2026-10-20 11:26:40+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3262, '2026-10-20 11:27:42+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3263, '2026-10-20 11:27:56+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3264, '2026-10-20 11:33:08+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3265, '2026-10-20 11:33:21+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3266, '2026-10-20 11:33:45+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3267, '2026-10-20 11:34:55+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3268, '2026-10-20 11:40:02+00', 'LOGIN', 0, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (3269, '2026-10-20 11:40:02+00', 'LOGIN-USUARIO-INICIO-SESION', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (3270, '2026-10-20 11:37:51+00', 'LISTAR-Trazabilidad de Usuario', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3271, '2026-10-20 11:41:36+00', 'LISTAR-Lista de Citas', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (3272, '2026-10-20 11:38:48+00', 'LISTAR-Archivo Cargado', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3273, '2026-10-20 11:42:07+00', 'ESTADISTICAS-BASICAS', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (3274, '2026-10-20 11:43:20+00', 'ESTADISTICAS-GETARIO', 5, '172.17.22.67', NULL);
INSERT INTO public.trazabilidad VALUES (3275, '2026-10-20 11:41:34+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3276, '2026-10-20 11:41:38+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3277, '2026-10-20 11:42:04+00', 'LISTAR-Lista de Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3278, '2026-10-20 11:45:36+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3279, '2026-10-20 11:45:42+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3280, '2026-10-20 11:47:02+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3281, '2026-10-20 11:47:09+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3282, '2026-10-20 11:47:16+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3283, '2026-10-20 11:47:23+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3284, '2026-10-20 11:47:26+00', 'LISTAR-Horarios Médicos', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3285, '2026-10-20 11:47:40+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3286, '2026-10-20 11:47:46+00', 'LISTAR-Médicos & Especialidades', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3287, '2026-10-20 12:20:10+00', 'LOGIN', 0, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3288, '2026-10-20 12:20:10+00', 'LOGIN-USUARIO-INACTIVO', 0, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3289, '2026-10-20 12:20:17+00', 'LOGIN', 0, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3290, '2026-10-20 12:20:17+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3291, '2026-10-20 12:20:22+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3292, '2026-10-20 12:20:35+00', 'LISTAR-Lista de Citas', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3293, '2026-10-20 12:20:58+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3294, '2026-10-20 12:21:45+00', 'LISTAR-Lista de Usuarios', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3295, '2026-10-20 12:25:45+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3296, '2026-10-20 12:25:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3297, '2026-10-20 12:25:52+00', 'ESTADISTICAS-BASICAS', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3298, '2026-10-20 12:25:57+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3299, '2026-10-20 12:26:06+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3300, '2026-10-20 12:30:16+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3301, '2026-10-20 12:30:16+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3302, '2026-10-20 12:35:48+00', 'LISTAR-Lista de Citas', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3303, '2026-10-20 12:36:28+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3304, '2026-10-20 12:36:28+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3305, '2026-10-20 12:36:32+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3306, '2026-10-20 13:26:33+00', 'LOGIN', 0, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3307, '2026-10-20 13:26:33+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.115', NULL);
INSERT INTO public.trazabilidad VALUES (3308, '2026-10-22 09:24:44+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3309, '2026-10-22 09:24:45+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3310, '2026-10-22 10:46:48+00', 'LOGIN', 0, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3311, '2026-10-22 10:46:48+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '127.0.0.1', NULL);
INSERT INTO public.trazabilidad VALUES (3312, '2026-10-22 11:23:13+00', 'LOGIN', 0, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (3313, '2026-10-22 11:23:13+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (3314, '2026-10-22 11:23:31+00', 'LISTAR-Trazabilidad de Usuario', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (3315, '2026-10-22 11:23:34+00', 'EXCEL-Trazabilidad de Usuario', 1, '172.17.11.103', NULL);
INSERT INTO public.trazabilidad VALUES (3316, '2026-10-22 11:46:54+00', 'LOGIN', 0, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3317, '2026-10-22 11:46:54+00', 'LOGIN-USUARIO-INICIO-SESION', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3318, '2026-10-22 11:46:57+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3319, '2026-10-22 11:47:12+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3320, '2026-10-22 11:47:16+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3321, '2026-10-22 12:05:11+00', 'LISTAR-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3322, '2026-10-22 12:05:13+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3323, '2026-10-22 12:12:11+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3324, '2026-10-22 12:14:37+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3325, '2026-10-22 12:15:01+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3326, '2026-10-22 12:15:50+00', 'EXCEL-Trazabilidad de Usuario', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3327, '2026-10-22 12:16:06+00', 'LISTAR-Lista de Usuarios', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3328, '2026-10-22 12:16:13+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);
INSERT INTO public.trazabilidad VALUES (3329, '2026-10-22 12:16:53+00', 'REGISTRO-LOG-ERROR ARCHIVO EXCEL ', 1, '::1', 'Mensaje ❌ Error al subir el archivo. Código: desconocido');
INSERT INTO public.trazabilidad VALUES (3330, '2026-10-22 12:16:53+00', 'LISTAR-Archivos Procesados', 1, '::1', NULL);


--
-- TOC entry 3820 (class 0 OID 99885)
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
-- TOC entry 3822 (class 0 OID 99891)
-- Dependencies: 267
-- Data for Name: usuario; Type: TABLE DATA; Schema: public; Owner: admin
--

INSERT INTO public.usuario VALUES (9, 'Milca', 'Pacheco', 'pmilca', 2, '4561230', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (6, 'Laura', 'Urbina', 'lurbina', 2, '7894560', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (7, 'Anabella', 'Diaz', 'danabella', 2, '8524560', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (8, 'Eduviges', 'Blanco', 'beduviges', 2, '1597530', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (4, 'Jesús', 'Perez', 'jperez', 2, '1234567890', '', 1, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (5, 'Jesus', 'Salazar', 'jsalazar', 1, '1234560', '', 1, 0, 1, 1, 0);
INSERT INTO public.usuario VALUES (2, 'jesus', 'aquino', 'jaquino', 1, '1234', '', 1, 0, 1, 0, 1);
INSERT INTO public.usuario VALUES (3, 'Jhoanna', 'Pantoja', 'jpantoja', 1, '1234567890', '', 0, 0, 1, 0, 0);
INSERT INTO public.usuario VALUES (1, 'gabriela', 'mendez', 'gabi@gmail.com', 1, '1234', '', 1, 0, 1, 0, 1);


--
-- TOC entry 3876 (class 0 OID 0)
-- Dependencies: 274
-- Name: carga_masiva1_id_carga_masiva_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.carga_masiva1_id_carga_masiva_seq', 2925836, true);


--
-- TOC entry 3877 (class 0 OID 0)
-- Dependencies: 271
-- Name: carga_masiva_id_carga_masiva_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.carga_masiva_id_carga_masiva_seq', 7128934, true);


--
-- TOC entry 3878 (class 0 OID 0)
-- Dependencies: 222
-- Name: cita_id_cita_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.cita_id_cita_seq', 45, true);


--
-- TOC entry 3879 (class 0 OID 0)
-- Dependencies: 224
-- Name: coordinacion_id_coordinacion_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.coordinacion_id_coordinacion_seq', 1, false);


--
-- TOC entry 3880 (class 0 OID 0)
-- Dependencies: 226
-- Name: direccion_general_id_direccion_general_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.direccion_general_id_direccion_general_seq', 1, false);


--
-- TOC entry 3881 (class 0 OID 0)
-- Dependencies: 228
-- Name: direccion_linea_id_direccion_linea_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.direccion_linea_id_direccion_linea_seq', 1, false);


--
-- TOC entry 3882 (class 0 OID 0)
-- Dependencies: 230
-- Name: ente_id_ente_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.ente_id_ente_seq', 1, false);


--
-- TOC entry 3883 (class 0 OID 0)
-- Dependencies: 232
-- Name: especialidad_id_especialidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.especialidad_id_especialidad_seq', 2, true);


--
-- TOC entry 3884 (class 0 OID 0)
-- Dependencies: 234
-- Name: estado_Venezuela_id_estado_pais_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public."estado_Venezuela_id_estado_pais_seq"', 1, false);


--
-- TOC entry 3885 (class 0 OID 0)
-- Dependencies: 237
-- Name: etario_id_etario_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.etario_id_etario_seq', 13, true);


--
-- TOC entry 3886 (class 0 OID 0)
-- Dependencies: 239
-- Name: historial_id_historial_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.historial_id_historial_seq', 1, false);


--
-- TOC entry 3887 (class 0 OID 0)
-- Dependencies: 241
-- Name: horarios_medicos_id_horarios_medicos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.horarios_medicos_id_horarios_medicos_seq', 33, true);


--
-- TOC entry 3888 (class 0 OID 0)
-- Dependencies: 269
-- Name: log_archivos_id_log_archivos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.log_archivos_id_log_archivos_seq', 12, true);


--
-- TOC entry 3889 (class 0 OID 0)
-- Dependencies: 243
-- Name: medico_id_medico_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.medico_id_medico_seq', 102, true);


--
-- TOC entry 3890 (class 0 OID 0)
-- Dependencies: 245
-- Name: modulos_id_modulos_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.modulos_id_modulos_seq', 1, true);


--
-- TOC entry 3891 (class 0 OID 0)
-- Dependencies: 247
-- Name: motivo_consulta_id_motivo_consulta_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.motivo_consulta_id_motivo_consulta_seq', 1, false);


--
-- TOC entry 3892 (class 0 OID 0)
-- Dependencies: 249
-- Name: nacionalidad_id_nacionalidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.nacionalidad_id_nacionalidad_seq', 1, false);


--
-- TOC entry 3893 (class 0 OID 0)
-- Dependencies: 252
-- Name: parametros_general_id_parametros_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.parametros_general_id_parametros_seq', 2, true);


--
-- TOC entry 3894 (class 0 OID 0)
-- Dependencies: 254
-- Name: parentesco_id_parentesco_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.parentesco_id_parentesco_seq', 7, true);


--
-- TOC entry 3895 (class 0 OID 0)
-- Dependencies: 256
-- Name: rol_id_rol_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.rol_id_rol_seq', 2, true);


--
-- TOC entry 3896 (class 0 OID 0)
-- Dependencies: 258
-- Name: sexo_id_sexo_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.sexo_id_sexo_seq', 1, false);


--
-- TOC entry 3897 (class 0 OID 0)
-- Dependencies: 260
-- Name: tipo_de_empleado_id_tipo_de_empleado_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.tipo_de_empleado_id_tipo_de_empleado_seq', 1, false);


--
-- TOC entry 3898 (class 0 OID 0)
-- Dependencies: 261
-- Name: titular_id_titular_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.titular_id_titular_seq', 55, true);


--
-- TOC entry 3899 (class 0 OID 0)
-- Dependencies: 262
-- Name: titular_te_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.titular_te_seq', 3, true);


--
-- TOC entry 3900 (class 0 OID 0)
-- Dependencies: 264
-- Name: trazabilidad_id_trazabilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.trazabilidad_id_trazabilidad_seq', 3330, true);


--
-- TOC entry 3901 (class 0 OID 0)
-- Dependencies: 266
-- Name: universidad_id_universidad_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.universidad_id_universidad_seq', 1, false);


--
-- TOC entry 3902 (class 0 OID 0)
-- Dependencies: 268
-- Name: usuario_id_usuario_seq; Type: SEQUENCE SET; Schema: public; Owner: admin
--

SELECT pg_catalog.setval('public.usuario_id_usuario_seq', 3, true);


--
-- TOC entry 3521 (class 2606 OID 99924)
-- Name: activo activo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.activo
    ADD CONSTRAINT activo_pkey PRIMARY KEY (id);


--
-- TOC entry 3523 (class 2606 OID 99926)
-- Name: bd_condicion bd_condicion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_condicion
    ADD CONSTRAINT bd_condicion_pkey PRIMARY KEY (id);


--
-- TOC entry 3525 (class 2606 OID 99928)
-- Name: bd_datos bd_datos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_datos
    ADD CONSTRAINT bd_datos_pkey PRIMARY KEY (id);


--
-- TOC entry 3527 (class 2606 OID 99930)
-- Name: bd_departamento bd_departamento_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_departamento
    ADD CONSTRAINT bd_departamento_pkey PRIMARY KEY (id);


--
-- TOC entry 3529 (class 2606 OID 99932)
-- Name: bd_institucion bd_institucion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_institucion
    ADD CONSTRAINT bd_institucion_pkey PRIMARY KEY (id);


--
-- TOC entry 3531 (class 2606 OID 99934)
-- Name: bd_tipopersonal bd_tipopersonal_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.bd_tipopersonal
    ADD CONSTRAINT bd_tipopersonal_pkey PRIMARY KEY (id);


--
-- TOC entry 3586 (class 2606 OID 114879)
-- Name: carga_masiva1 carga_masiva1_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva1
    ADD CONSTRAINT carga_masiva1_pkey PRIMARY KEY (id_carga_masiva);


--
-- TOC entry 3584 (class 2606 OID 114755)
-- Name: carga_masiva carga_masiva_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.carga_masiva
    ADD CONSTRAINT carga_masiva_pkey PRIMARY KEY (id_carga_masiva);


--
-- TOC entry 3533 (class 2606 OID 99936)
-- Name: cita cita_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_pkey PRIMARY KEY (id_cita);


--
-- TOC entry 3535 (class 2606 OID 99938)
-- Name: coordinacion coordinacion_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion
    ADD CONSTRAINT coordinacion_pkey PRIMARY KEY (id_coordinacion);


--
-- TOC entry 3537 (class 2606 OID 99940)
-- Name: direccion_general direccion_general_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general
    ADD CONSTRAINT direccion_general_pkey PRIMARY KEY (id_direccion_general);


--
-- TOC entry 3539 (class 2606 OID 99942)
-- Name: direccion_linea direccion_linea_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea
    ADD CONSTRAINT direccion_linea_pkey PRIMARY KEY (id_direccion_linea);


--
-- TOC entry 3541 (class 2606 OID 99944)
-- Name: ente ente_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.ente
    ADD CONSTRAINT ente_pkey PRIMARY KEY (id_ente);


--
-- TOC entry 3543 (class 2606 OID 99946)
-- Name: especialidad especialidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.especialidad
    ADD CONSTRAINT especialidad_pkey PRIMARY KEY (id_especialidad);


--
-- TOC entry 3545 (class 2606 OID 99948)
-- Name: estado_venezuela estado_Venezuela_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_venezuela
    ADD CONSTRAINT "estado_Venezuela_pkey" PRIMARY KEY (id_estado_pais);


--
-- TOC entry 3547 (class 2606 OID 99950)
-- Name: estado_cita estado_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.estado_cita
    ADD CONSTRAINT estado_pkey PRIMARY KEY (id_estado);


--
-- TOC entry 3549 (class 2606 OID 99952)
-- Name: etario etario_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.etario
    ADD CONSTRAINT etario_pkey PRIMARY KEY (id_etario);


--
-- TOC entry 3551 (class 2606 OID 99954)
-- Name: historial historial_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_pkey PRIMARY KEY (id_historial);


--
-- TOC entry 3553 (class 2606 OID 99956)
-- Name: horarios_medicos horarios_medico_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT horarios_medico_pkey PRIMARY KEY (id_horarios_medicos);


--
-- TOC entry 3582 (class 2606 OID 114733)
-- Name: log_archivos log_archivos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos
    ADD CONSTRAINT log_archivos_pkey PRIMARY KEY (id_log_archivos);


--
-- TOC entry 3556 (class 2606 OID 99958)
-- Name: medico medico_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_pkey PRIMARY KEY (id_medico);


--
-- TOC entry 3558 (class 2606 OID 99960)
-- Name: modulos modulos_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.modulos
    ADD CONSTRAINT modulos_pkey PRIMARY KEY (id_modulos);


--
-- TOC entry 3560 (class 2606 OID 99962)
-- Name: motivo_consulta motivo_consultapkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.motivo_consulta
    ADD CONSTRAINT motivo_consultapkey PRIMARY KEY (id_motivo_consulta);


--
-- TOC entry 3562 (class 2606 OID 99964)
-- Name: nacionalidad nacionalidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.nacionalidad
    ADD CONSTRAINT nacionalidad_pkey PRIMARY KEY (id_nacionalidad);


--
-- TOC entry 3566 (class 2606 OID 99966)
-- Name: parametros_general parametros_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parametros_general
    ADD CONSTRAINT parametros_pkey PRIMARY KEY (id_parametros);


--
-- TOC entry 3568 (class 2606 OID 99968)
-- Name: parentesco parentesco_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.parentesco
    ADD CONSTRAINT parentesco_pkey PRIMARY KEY (id_parentesco);


--
-- TOC entry 3570 (class 2606 OID 99970)
-- Name: rol rol_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.rol
    ADD CONSTRAINT rol_pkey PRIMARY KEY (id_rol);


--
-- TOC entry 3572 (class 2606 OID 99972)
-- Name: sexo sexo_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.sexo
    ADD CONSTRAINT sexo_pkey PRIMARY KEY (id_sexo);


--
-- TOC entry 3574 (class 2606 OID 99974)
-- Name: tipo_de_empleado tipo_de_empleado_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.tipo_de_empleado
    ADD CONSTRAINT tipo_de_empleado_pkey PRIMARY KEY (id_tipo_de_empleado);


--
-- TOC entry 3564 (class 2606 OID 99976)
-- Name: paciente titular_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_pkey PRIMARY KEY (id_titular);


--
-- TOC entry 3576 (class 2606 OID 99978)
-- Name: trazabilidad trazabilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.trazabilidad
    ADD CONSTRAINT trazabilidad_pkey PRIMARY KEY (id_trazabilidad);


--
-- TOC entry 3578 (class 2606 OID 99980)
-- Name: universidad universidad_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.universidad
    ADD CONSTRAINT universidad_pkey PRIMARY KEY (id_universidad);


--
-- TOC entry 3580 (class 2606 OID 99982)
-- Name: usuario usuario_pkey; Type: CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (id_usuario);


--
-- TOC entry 3554 (class 1259 OID 114940)
-- Name: horarios_medicos_id_especialidad_idx; Type: INDEX; Schema: public; Owner: admin
--

CREATE UNIQUE INDEX horarios_medicos_id_especialidad_idx ON public.horarios_medicos USING btree (id_especialidad, id_medico);


--
-- TOC entry 3600 (class 2606 OID 99983)
-- Name: horarios_medicos FK_horarios_medicos_especialidad; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_especialidad" FOREIGN KEY (id_especialidad) REFERENCES public.especialidad(id_especialidad);


--
-- TOC entry 3601 (class 2606 OID 99988)
-- Name: horarios_medicos FK_horarios_medicos_medico; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico" FOREIGN KEY (lun_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3602 (class 2606 OID 99993)
-- Name: horarios_medicos FK_horarios_medicos_medico1; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico1" FOREIGN KEY (lun_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3603 (class 2606 OID 99998)
-- Name: horarios_medicos FK_horarios_medicos_medico10; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico10" FOREIGN KEY (sab_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3604 (class 2606 OID 100003)
-- Name: horarios_medicos FK_horarios_medicos_medico11; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico11" FOREIGN KEY (sab_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3605 (class 2606 OID 100008)
-- Name: horarios_medicos FK_horarios_medicos_medico12; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico12" FOREIGN KEY (dom_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3606 (class 2606 OID 100013)
-- Name: horarios_medicos FK_horarios_medicos_medico13; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico13" FOREIGN KEY (dom_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3607 (class 2606 OID 100018)
-- Name: horarios_medicos FK_horarios_medicos_medico2; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico2" FOREIGN KEY (mar_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3608 (class 2606 OID 100023)
-- Name: horarios_medicos FK_horarios_medicos_medico3; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico3" FOREIGN KEY (mar_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3609 (class 2606 OID 100028)
-- Name: horarios_medicos FK_horarios_medicos_medico4; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico4" FOREIGN KEY (mar_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3610 (class 2606 OID 100033)
-- Name: horarios_medicos FK_horarios_medicos_medico44; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico44" FOREIGN KEY (mie_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3611 (class 2606 OID 100038)
-- Name: horarios_medicos FK_horarios_medicos_medico5; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico5" FOREIGN KEY (mar_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3612 (class 2606 OID 100043)
-- Name: horarios_medicos FK_horarios_medicos_medico54; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico54" FOREIGN KEY (mie_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3613 (class 2606 OID 100048)
-- Name: horarios_medicos FK_horarios_medicos_medico6; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico6" FOREIGN KEY (jue_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3614 (class 2606 OID 100053)
-- Name: horarios_medicos FK_horarios_medicos_medico7; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico7" FOREIGN KEY (jue_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3615 (class 2606 OID 100058)
-- Name: horarios_medicos FK_horarios_medicos_medico8; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico8" FOREIGN KEY (vie_t1) REFERENCES public.medico(id_medico);


--
-- TOC entry 3616 (class 2606 OID 100063)
-- Name: horarios_medicos FK_horarios_medicos_medico9; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.horarios_medicos
    ADD CONSTRAINT "FK_horarios_medicos_medico9" FOREIGN KEY (vie_t2) REFERENCES public.medico(id_medico);


--
-- TOC entry 3587 (class 2606 OID 100068)
-- Name: cita cita_id_especialidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_especialidad_fkey FOREIGN KEY (id_especialidad) REFERENCES public.especialidad(id_especialidad) ON UPDATE CASCADE;


--
-- TOC entry 3588 (class 2606 OID 100073)
-- Name: cita cita_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medico(id_medico) ON UPDATE CASCADE;


--
-- TOC entry 3589 (class 2606 OID 100078)
-- Name: cita cita_id_nuevo_estado_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_nuevo_estado_fkey FOREIGN KEY (id_estado_cita) REFERENCES public.estado_cita(id_estado) ON UPDATE CASCADE;


--
-- TOC entry 3590 (class 2606 OID 100083)
-- Name: cita cita_id_titular_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_titular_fkey FOREIGN KEY (id_titular) REFERENCES public.paciente(id_titular) ON UPDATE CASCADE;


--
-- TOC entry 3591 (class 2606 OID 100088)
-- Name: cita cita_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3592 (class 2606 OID 100093)
-- Name: cita cita_motivo_consulta_fk; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.cita
    ADD CONSTRAINT cita_motivo_consulta_fk FOREIGN KEY (id_motivo_consulta) REFERENCES public.motivo_consulta(id_motivo_consulta);


--
-- TOC entry 3593 (class 2606 OID 100098)
-- Name: coordinacion coordinacion_id_direccion_linea_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.coordinacion
    ADD CONSTRAINT coordinacion_id_direccion_linea_fkey FOREIGN KEY (id_direccion_linea) REFERENCES public.direccion_linea(id_direccion_linea) ON UPDATE CASCADE;


--
-- TOC entry 3594 (class 2606 OID 100103)
-- Name: direccion_general direccion_general_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_general
    ADD CONSTRAINT direccion_general_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3595 (class 2606 OID 100108)
-- Name: direccion_linea direccion_linea_id_direccion_general_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.direccion_linea
    ADD CONSTRAINT direccion_linea_id_direccion_general_fkey FOREIGN KEY (id_direccion_general) REFERENCES public.direccion_general(id_direccion_general) ON UPDATE CASCADE;


--
-- TOC entry 3596 (class 2606 OID 100113)
-- Name: historial historial_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3597 (class 2606 OID 100118)
-- Name: historial historial_id_medico_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_medico_fkey FOREIGN KEY (id_medico) REFERENCES public.medico(id_medico) ON UPDATE CASCADE;


--
-- TOC entry 3598 (class 2606 OID 100123)
-- Name: historial historial_id_titular_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_titular_fkey FOREIGN KEY (id_titular) REFERENCES public.paciente(id_titular) ON UPDATE CASCADE;


--
-- TOC entry 3599 (class 2606 OID 100128)
-- Name: historial historial_id_universidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.historial
    ADD CONSTRAINT historial_id_universidad_fkey FOREIGN KEY (id_universidad) REFERENCES public.universidad(id_universidad) ON UPDATE CASCADE;


--
-- TOC entry 3624 (class 2606 OID 114734)
-- Name: log_archivos log_archivos_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.log_archivos
    ADD CONSTRAINT log_archivos_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3617 (class 2606 OID 100133)
-- Name: medico medico_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.medico
    ADD CONSTRAINT medico_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3618 (class 2606 OID 100138)
-- Name: paciente titular_id_ente_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_ente_fkey FOREIGN KEY (id_ente) REFERENCES public.ente(id_ente) ON UPDATE CASCADE;


--
-- TOC entry 3619 (class 2606 OID 100143)
-- Name: paciente titular_id_nacionalidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_nacionalidad_fkey FOREIGN KEY (id_nacionalidad) REFERENCES public.nacionalidad(id_nacionalidad) ON UPDATE CASCADE;


--
-- TOC entry 3620 (class 2606 OID 100148)
-- Name: paciente titular_id_sexo_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_sexo_fkey FOREIGN KEY (id_sexo) REFERENCES public.sexo(id_sexo) ON UPDATE CASCADE;


--
-- TOC entry 3621 (class 2606 OID 100153)
-- Name: paciente titular_id_universidad_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_universidad_fkey FOREIGN KEY (id_universidad) REFERENCES public.universidad(id_universidad) ON UPDATE CASCADE;


--
-- TOC entry 3622 (class 2606 OID 100158)
-- Name: paciente titular_id_usuario_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.paciente
    ADD CONSTRAINT titular_id_usuario_fkey FOREIGN KEY (id_usuario) REFERENCES public.usuario(id_usuario) ON UPDATE CASCADE;


--
-- TOC entry 3623 (class 2606 OID 100163)
-- Name: usuario usuario_id_rol_fkey; Type: FK CONSTRAINT; Schema: public; Owner: admin
--

ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_id_rol_fkey FOREIGN KEY (id_rol) REFERENCES public.rol(id_rol) ON UPDATE CASCADE;


-- Completed on 2026-10-22 12:27:47

--
-- PostgreSQL database dump complete
--

\unrestrict mqr0QLuxNkRXz54jzf9HGqPXWEaOJyPkQFPuhPYTVtdCn4Vva0TieiAZGgjdqJv

