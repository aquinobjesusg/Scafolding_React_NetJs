
CREATE TABLE IF NOT EXISTS public.log_archivos
(
	id_log_archivos SERIAL PRIMARY KEY,
    fecha_de_registro information_schema.time_stamp DEFAULT NULL::timestamp with time zone,
    id_usuario integer,
    observacion character varying(250) COLLATE pg_catalog."default",
	archivo_origen character varying(250) COLLATE pg_catalog."default",
	archivo_destino character varying(250) COLLATE pg_catalog."default",
    in_procesado integer DEFAULT 0,
	in_activo integer DEFAULT 1,
    CONSTRAINT log_archivos_id_usuario_fkey FOREIGN KEY (id_usuario)
        REFERENCES public.usuario (id_usuario) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.log_archivos
    OWNER to admin;


----


CREATE TABLE IF NOT EXISTS public.carga_masiva1
(
    id_carga_masiva SERIAL PRIMARY KEY,
    id_usuario integer,
    fecha_carga_hora timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    nombre_archivo_seleccionado character varying(255) COLLATE pg_catalog."default",
    cedula_beneficiario_ref character varying(255) COLLATE pg_catalog."default",
    numero_1 character varying(255) COLLATE pg_catalog."default",
    universidad_institucion character varying(255) COLLATE pg_catalog."default",
    numero_2 character varying(255) COLLATE pg_catalog."default",
    cedula_titular character varying(255) COLLATE pg_catalog."default",
    apellidos character varying(255) COLLATE pg_catalog."default",
    nombres character varying(255) COLLATE pg_catalog."default",
    cedula_beneficiario character varying(255) COLLATE pg_catalog."default",
    parentesco character varying(255) COLLATE pg_catalog."default",
    sexo character varying(255) COLLATE pg_catalog."default",
    fecha_nacimiento character varying(255) COLLATE pg_catalog."default",
    edad character varying(255) COLLATE pg_catalog."default",
    telefono_1 character varying(255) COLLATE pg_catalog."default",
    correo character varying(20) COLLATE pg_catalog."default",
    cargo character varying(255) COLLATE pg_catalog."default",
    id_log_archivo integer
)


ALTER TABLE IF EXISTS public.carga_masiva1
    OWNER to admin;




CREATE TABLE IF NOT EXISTS public.carga_masiva
(
    id_carga_masiva SERIAL PRIMARY KEY,
    id_usuario integer,
    fecha_carga_hora timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    nombre_archivo_seleccionado character varying(255) COLLATE pg_catalog."default",
    cedula_beneficiario_ref character varying(255) COLLATE pg_catalog."default",
    numero_1 character varying(255) COLLATE pg_catalog."default",
    universidad_institucion character varying(255) COLLATE pg_catalog."default",
    numero_2 character varying(255) COLLATE pg_catalog."default",
    cedula_titular character varying(255) COLLATE pg_catalog."default",
    apellidos character varying(255) COLLATE pg_catalog."default",
    nombres character varying(255) COLLATE pg_catalog."default",
    cedula_beneficiario character varying(255) COLLATE pg_catalog."default",
    parentesco character varying(20) COLLATE pg_catalog."default",
    sexo character varying(20) COLLATE pg_catalog."default",
    fecha_nacimiento character varying(255) COLLATE pg_catalog."default",
    edad character varying(255) COLLATE pg_catalog."default",
    telefono_1 character varying(255) COLLATE pg_catalog."default",
    correo character varying(20) COLLATE pg_catalog."default",
    cargo character varying(255) COLLATE pg_catalog."default",
    id_log_archivo integer
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.carga_masiva
    OWNER to admin;
