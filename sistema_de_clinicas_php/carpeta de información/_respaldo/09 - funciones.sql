--
-- PostgreSQL database dump complete
--

INSERT INTO "public"."parentesco" ("nombre_parentesco") VALUES ('Titular');

UPDATE especialidad SET turno_manana = 6, turno_tarde = 6;





CREATE OR REPLACE FUNCTION public.ver_paciente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying)
 RETURNS character varying
 LANGUAGE sql
AS $function$SELECT ver_nacionalidada(paciente.id_nacionalidad) || ' ' || paciente.cedula_titular || ' '  || paciente.nombre_titular || ' '  || paciente.apellido_titular  FROM paciente WHERE paciente.id_titular = p_id_usuario;$function$
;



CREATE OR REPLACE FUNCTION public.ver_parentesco(p_id_usuario integer DEFAULT 0, OUT v_texto character varying)
 RETURNS character varying
 LANGUAGE sql
AS $function$SELECT parentesco.nombre_parentesco FROM parentesco WHERE parentesco.id_parentesco = p_id_usuario;$function$
;




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



--
-- TOC entry 274 (class 1255 OID 34369)
-- Name: ver_activo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_activo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT activo.nombre FROM activo WHERE activo.id = p_id_usuario;$$;




CREATE FUNCTION public.ver_usuario(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT usuario.correo FROM usuario WHERE usuario.id_usuario = p_id_usuario;$$;




CREATE FUNCTION public.ver_paciente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_nacionalidada(paciente.id_nacionalidad) || ' ' || paciente.cedula_titular || ' '  || paciente.nombre_titular || ' '  || paciente.apellido_titular  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;





CREATE FUNCTION public.ver_motivo_consulta(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT motivo_consulta.nombre_motivo_consulta  FROM motivo_consulta WHERE motivo_consulta.id_motivo_consulta = p_id_usuario;$$;





CREATE FUNCTION public.ver_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ente.siglas_ente FROM ente WHERE ente.id_ente = p_id_usuario;$$;


CREATE FUNCTION public.ver_paciente_ente(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_ente(paciente.id_ente)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;

CREATE FUNCTION public.ver_estado_pais(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_venezuela.nombre_estado_pais FROM estado_venezuela WHERE estado_venezuela.id_estado_pais = p_id_usuario$$;


CREATE FUNCTION public.ver_paciente_estado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_estado_pais(paciente.id_estado_pais)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


CREATE FUNCTION public.ver_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT universidad.nombre_universidad FROM universidad WHERE universidad.id_universidad = p_id_usuario$$;


CREATE FUNCTION public.ver_paciente_universidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT ver_universidad(paciente.id_universidad)  FROM paciente WHERE paciente.id_titular = p_id_usuario;$$;


--
-- TOC entry 271 (class 1255 OID 34359)
-- Name: ver_especialidad(integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.ver_especialidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT especialidad.nombre_especialidad FROM especialidad WHERE especialidad.id_especialidad = p_id_usuario;$$;



--
-- TOC entry 279 (class 1255 OID 34374)
-- Name: ver_estado_cita(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_estado_cita(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT estado_cita.descripción_estado FROM estado_cita WHERE estado_cita.id_estado = p_id_usuario$$;



--
-- TOC entry 272 (class 1255 OID 34360)
-- Name: ver_medico(integer); Type: FUNCTION; Schema: public; Owner: postgres
--


CREATE OR REPLACE FUNCTION public.ver_medico(
	p_id_usuario integer DEFAULT 0,
	OUT v_texto character varying)
    RETURNS character varying
    LANGUAGE 'sql'
    COST 100
    VOLATILE PARALLEL UNSAFE
AS $BODY$
SELECT medico.nombre_medico || CASE medico.in_labora WHEN 0 THEN ' (No Labora)' ELSE '' END AS nombre_medico  FROM medico WHERE medico.id_medico = p_id_usuario
$BODY$;

ALTER FUNCTION public.ver_medico(integer)
    OWNER TO admin;



--
-- TOC entry 275 (class 1255 OID 34370)
-- Name: ver_modulo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_modulo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT modulos.nombre_modulos FROM modulos WHERE modulos.id_modulos = p_id_usuario$$;



--
-- TOC entry 280 (class 1255 OID 34375)
-- Name: ver_nacionalidad(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_nacionalidad(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.nombre_nacionalidad FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;



--
-- TOC entry 276 (class 1255 OID 34371)
-- Name: ver_rol(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_rol(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT rol.nombre FROM rol WHERE rol.id_rol = p_id_usuario$$;



--
-- TOC entry 277 (class 1255 OID 34372)
-- Name: ver_sexo(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_sexo(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT sexo.sexo FROM sexo WHERE sexo.id_sexo = p_id_usuario$$;



--
-- TOC entry 278 (class 1255 OID 34373)
-- Name: ver_tipo_de_empleado(integer); Type: FUNCTION; Schema: public; Owner: admin
--

CREATE FUNCTION public.ver_tipo_de_empleado(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT tipo_de_empleado.nombre_tipo_de_empleado FROM tipo_de_empleado WHERE tipo_de_empleado.id_tipo_de_empleado = p_id_usuario$$;




CREATE FUNCTION public.ver_nacionalidada(p_id_usuario integer DEFAULT 0, OUT v_texto character varying) RETURNS character varying
    LANGUAGE sql
    AS $$SELECT nacionalidad.abreviatura FROM nacionalidad WHERE nacionalidad.id_nacionalidad = p_id_usuario$$;


