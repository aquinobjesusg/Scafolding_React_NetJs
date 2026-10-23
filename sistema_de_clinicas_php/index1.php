<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Formulario con Google reCAPTCHA</title>
    <!-- 1. Incluir el script de Google de manera asíncrona -->
    <script src="https://www.google.com/recaptcha/api.js" async defer></script>
</head>
<body>

    <h2>Formulario de Contacto</h2>
    <form action="procesar.php" method="POST">
        <label for="nombre">Nombre:</label><br>
        <input type="text" name="nombre" id="nombre" required><br><br>

        <!-- 2. Contenedor del reCAPTCHA (Sustituye TU_CLAVE_DE_SITIO) -->
        <div class="g-recaptcha" data-sitekey="6Lemn7AtAAAAAMfJHDHhSW0SsxKR9eWi8w52Lv1r"></div>
        <br>

        <button type="submit">Enviar</button>
    </form>

</body>
</html>