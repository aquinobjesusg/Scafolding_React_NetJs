SELECT '*ESPECIALIDAD*' AS campo, '' AS campo2, '' AS campo3;

SELECT '' AS campo, ver_especialidad(id_especialidad), COUNT(id_especialidad) FROM cita GROUP BY id_especialidad ORDER BY 1;

SELECT '' as campo, ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_sexo ORDER BY 1;

SELECT ver_especialidad(id_especialidad), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_especialidad, paciente.id_sexo ORDER BY 1,2;


SELECT '*TIPO DE EMPLEADO*' AS campo, '' AS campo2, '' AS campo3;

SELECT '' as campo, ver_tipo_de_empleado(paciente.tipo_de_empleado), COUNT(paciente.tipo_de_empleado) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado ORDER BY 1,2;

SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, paciente.id_sexo ORDER BY 1,2;

SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, cita.id_especialidad ORDER BY 1,2;

SELECT '*ESPECIALIDAD*' AS campo, '' AS campo2, '' AS campo3;

SELECT '' as campo, ver_estado_cita(id_estado_cita), COUNT(id_estado_cita) FROM cita GROUP BY id_estado_cita ORDER BY 1;

SELECT ver_estado_cita(id_estado_cita), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_estado_cita, paciente.id_sexo ORDER BY 1,2;

SELECT ver_estado_cita(id_estado_cita), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita GROUP BY cita.id_estado_cita, cita.id_especialidad ORDER BY 1,2;







SELECT '*ESPECIALIDAD*' AS campo, '' AS campo2, '' AS campo3;
SELECT '' AS campo, ver_especialidad(id_especialidad), COUNT(id_especialidad) FROM cita GROUP BY id_especialidad;
SELECT '' AS campo, ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.id_sexo;
SELECT ver_especialidad(id_especialidad), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_especialidad, paciente.id_sexo;

SELECT '*TIPO DE EMPLEADO*' AS campo, '' AS campo2, '' AS campo3;
SELECT '' AS campo, ver_tipo_de_empleado(paciente.tipo_de_empleado), COUNT(paciente.tipo_de_empleado) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado;
SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, paciente.id_sexo;
SELECT ver_tipo_de_empleado(paciente.tipo_de_empleado), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY paciente.tipo_de_empleado, cita.id_especialidad;

SELECT '*ESTADO DE CITA*' AS campo, '' AS campo2, '' AS campo3;
SELECT '' AS campo, ver_estado_cita(id_estado_cita), COUNT(id_estado_cita) FROM cita GROUP BY id_estado_cita;
SELECT ver_estado_cita(id_estado_cita), ver_sexo(paciente.id_sexo), COUNT(paciente.id_sexo) FROM cita, paciente WHERE paciente.id_titular = cita.id_paciente GROUP BY cita.id_estado_cita, paciente.id_sexo;
SELECT ver_estado_cita(id_estado_cita), ver_especialidad(id_especialidad), COUNT(cita.id_especialidad) FROM cita GROUP BY cita.id_estado_cita, cita.id_especialidad;




SELECT * 
FROM cita 
WHERE cita.fecha_de_cita BETWEEN '2026-01-01' AND '2028-01-31';


CREATE TABLE TmpParentesco AS
SELECT parentesco.nombre_parentesco FROM parentesco;