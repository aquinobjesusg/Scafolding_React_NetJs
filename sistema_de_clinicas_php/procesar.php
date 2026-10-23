<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // 1. Verificar si el token de reCAPTCHA llegó en el POST
    if (isset($_POST['g-recaptcha-response']) && !empty($_POST['g-recaptcha-response'])) {
        
        // Tu clave secreta provista por Google
        $secretKey = "6LdGqLAtAAAAABzScdTzCj1_dDhZSB7cKU0zwAKK";
        // El token enviado desde el formulario
        $userResponse = $_POST['g-recaptcha-response'];
        // IP del visitante
        $userIp = $_SERVER['REMOTE_ADDR'];

        // 2. Construir la URL de verificación de Google
        $url = "https://google.com" . $secretKey . "&response=" . $userResponse . "&remoteip=" . $userIp;

        // 3. Realizar la solicitud a Google utilizando file_get_contents
        $response = file_get_contents($url);
        $responseKeys = json_decode($response, true);

        // 4. Evaluar la respuesta final de Google
        if ($responseKeys["success"]) {
            // El captcha es correcto
            $nombre = htmlspecialchars($_POST['nombre']);
            echo "¡Éxito! El formulario se envió correctamente. Hola, " . $nombre;
            // Aquí procesas tu base de datos o envías tus correos
        } else {
            echo "Error: La verificación de reCAPTCHA falló. Inténtalo de nuevo.";
        }
        
    } else {
        echo "Por favor, marca la casilla de verificación 'No soy un robot'.";
    }
} else {
    // Si intentan entrar directo al archivo sin usar POST
    header("Location: index.php");
    exit();
}
?>