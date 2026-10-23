<!-- formulario.html -->
<!DOCTYPE html>
<html>
<head>
    <title>Generador de PDF</title>
</head>
<body>
    <form method="POST" action="generar_pdf.php">
        <label>Título:</label>
        <input type="text" name="titulo" required><br>
        
        <label>Contenido:</label>
        <textarea name="contenido" rows="5" required></textarea><br>
        
        <label>Color del título:</label>
        <input type="color" name="color"><br>
        
        <button type="submit">Generar PDF</button>
    </form>
</body>
</html>