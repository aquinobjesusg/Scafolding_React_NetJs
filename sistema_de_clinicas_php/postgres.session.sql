select * from paciente;
SELECT t.*,
               t.fecha_nacimiento_titular,
               t.cedula_titular,
               t.nombre_titular,
               t.apellido_titular,
               t.telefono_titular,
               s.sexo,
               u.nombre_universidad,
               e.nom_ente AS nombre_ente,
               n.nombre_nacionalidad,
               dg.nom_direccion_general AS nombre_direccion_general,
               dl.nom_direccion_linea AS nombre_direccion_linea,
               c.nom_coordinacion AS nombre_coordinacion
        FROM paciente t
        LEFT JOIN sexo s ON t.id_sexo = s.id_sexo
        LEFT JOIN universidad u ON t.id_universidad = u.id_universidad
        LEFT JOIN ente e ON t.id_ente = e.id_ente
        LEFT JOIN nacionalidad n ON t.id_nacionalidad = n.id_nacionalidad
        LEFT JOIN direccion_general dg ON t.id_direccion_general = dg.id_direccion_general
        LEFT JOIN direccion_linea dl ON t.id_direccion_linea = dl.id_direccion_linea
        LEFT JOIN coordinacion c ON t.id_coordinacion = c.id_coordinacion
        WHERE in_condicion_especial = 1
        ORDER BY t.id_titular DESC

