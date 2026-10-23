<?php
session_start();

//ini_set('memory_limit', '2024M');
//ini_set('max_execution_time', '600');

ini_set('memory_limit', '-1');
ini_set('max_execution_time', '-1');

error_reporting(E_ALL);
ini_set('display_errors', 1);

// include("include/header_php.php");

// // Conexión con la base de datos
//     try {
//         $conexion_bd = new PDO("pgsql:host=$dbhost; port=$dbport; dbname=$dbdatabase; user=$dbuser; password=$dbpasswd");
//         $conexion_bd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
//         } catch (PDOException $e) {
//         die("Error de conexión: " . $e->getMessage());
//         }

require 'vendor/autoload.php';

use OpenSpout\Reader\XLSX\Reader;

try {
    $reader = new Reader();
    $reader->open('descarga/hoja1.xlsx');
} catch (Exception $e) {
    die("Error al Leer El archivo: " . $e->getMessage());
}

//$pdo->beginTransaction();
//$stmt = $pdo->prepare("INSERT INTO mi_tabla (col1, col2, col3) VALUES (?, ?, ?)");

foreach ($reader->getSheetIterator() as $sheet) {
    //        echo $sheet->getName();
//        echo "<br>";

    //$numRow = 0;
    $primeraFila = true;
    foreach ($sheet->getRowIterator() as $row) {

        if ($primeraFila) {
            $primeraFila = false;
            continue;
        } // saltar encabezados

        //        $celdas = $row->getCells();
//        $row->getNumCells();

        //echo $row->getNumCells();
        //$numRow++;
        //echo $numRow;
        //echo "<br>";

        //echo $celdas[0]->getValue();
        //echo "<br>";
        //echo $celdas[1]->getValue();
        //echo "<br>";
        //echo $celdas[2]->getValue();
        //echo "<br>";

        /*$stmt->execute([
            $celdas[0]->getValue(),
            $celdas[1]->getValue(),
            $celdas[2]->getValue(),
        ]);*/
    }
}

$reader->close();

//$pdo->commit();


//use PhpOffice\PhpSpreadsheet\IOFactory;

/*
// 1. Conexión a la base de datos con PDO
$host = 'localhost';
$db   = 'mi_base_de_datos';
$user = 'usuario';
$pass = 'contraseña';
$charset = 'utf8mb4';
*/


// //$dsn = "mysql:host=$localhost;dbname=$sgp;charset=$charset";
// $opciones = [
//     PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
//     PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
//     PDO::ATTR_EMULATE_PREPARES   => false,
// ];

// try {
//   //  $pdo = new PDO($dsn, $user, $pass, $opciones);
// } catch (\PDOException $e) {
//     throw new \PDOException($e->getMessage(), (int)$e->getCode());
// }

/*
try {
    // 2. Cargar el archivo Excel
    $spreadsheet = IOFactory::load('descarga/hoja.xlsx');
} catch (Exception $e) {
    die("Error al Cargar el Archivo: " . $e->getMessage());
}

try {
    $hoja = $spreadsheet->getActiveSheet();
} catch (Exception $e) {
    die("Error al Leer la hoja: " . $e->getMessage());
}


try {
    $filaMaxima = $hoja->getHighestRow();
} catch (Exception $e) {
    die("Error al Leer la Fila Maxima: " . $e->getMessage());
}

*/
//echo "<br>";
//print_r( $spreadsheet);
//echo "<br>";
//print_r( $hoja);
//echo "<br>";
//print_r( $filaMaxima);
//die();


/*
// 3. Preparar la sentencia INSERT para eficiencia
$sql = "INSERT INTO carga_masiva (
columna1, columna2, columna3,
columna4,columna5,columna6,
columna7, columna8,columna9,
columna10,columna11,columna12,
columna13,columna14,columna15,
columna16,columna17) VALUES (?, ?, ?)";
$stmt = $pdo->prepare($sql);
*/
// 4. Recorrer las filas del Excel e insertarlas en la BD
// Se empieza en la fila 2 asumiendo que la fila 1 son los encabezados
/*
for ($fila = 1; $fila <= $filaMaxima; $fila++) {
    $val1 = $hoja->getCell('A' . $fila)->getValue();
    $val2 = $hoja->getCell('B' . $fila)->getValue();
    $val3 = $hoja->getCell('C' . $fila)->getValue();
    $val4 = $hoja->getCell('D' . $fila)->getValue();
    $val5 = $hoja->getCell('E' . $fila)->getValue();
    $val6 = $hoja->getCell('F' . $fila)->getValue();
    $val7 = $hoja->getCell('G' . $fila)->getValue();
    $val8 = $hoja->getCell('H' . $fila)->getValue();
    $val9 = $hoja->getCell('I' . $fila)->getValue();
    $val10 = $hoja->getCell('J' . $fila)->getValue();
    $val11 = $hoja->getCell('K' . $fila)->getValue();
    $val12 = $hoja->getCell('L' . $fila)->getValue();
    $val13 = $hoja->getCell('M' . $fila)->getValue();
    $val14 = $hoja->getCell('N' . $fila)->getValue();
    $val15 = $hoja->getCell('O' . $fila)->getValue();
    $val16 = $hoja->getCell('P' . $fila)->getValue();
    $val17 = $hoja->getCell('Q' . $fila)->getValue();
    
    echo $fila;
    echo "<br>";
    
    echo $val1;
    echo "<br>";
    echo $val2;
    echo "<br>";
    echo $val3;
    echo "<br>";
    echo $val4;
    echo "<br>";
    echo $val5;
    echo "<br>";
    echo $val6;
    echo "<br>";
    echo $val7;
    echo "<br>";
    echo $val8;
    echo "<br>";
    echo $val9;
    echo "<br>";
    echo $val10;
    echo "<br>";
    echo $val11;
    echo "<br>";
    echo $val12;
    echo "<br>";
    echo $val13;
    echo "<br>";
    echo $val14;
    echo "<br>";
    echo $val15;
    echo "<br>";
    echo $val16;
    echo "<br>";
    echo $val17;
    echo "<br>";
    
    
    // Omitir filas completamente vacías
    if ($val1 === null && $val2 === null && $val3 === null) {
        //continue;
    }
    
    if( $fila >10 ) {
//        echo "finm";
//        die();
    }
    // Ejecutar la inserción
  //  $stmt->execute([$val1, $val2, $val3]);
  
    
    echo "<hr>";
    
    
}
*/
echo "<br>";
echo "Importación completada correctamente.";
echo "<br>";