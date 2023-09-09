<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

// Conecta a la base de datos  con usuario, contraseña y nombre de la BD
$servidor = "localhost"; 
$usuario = "root"; 
$contrasenia = "admin123"; 
$nombreBaseDatos = "agenda";
$conexionBD = mysqli_connect($servidor, $usuario, $contrasenia, $nombreBaseDatos);


// Consulta datos y recepciona una clave para consultar dichos datos con dicha clave
if (isset($_GET["consultar_anotaciones"])){
    $sqlAnotaciones = mysqli_query($conexionBD,"SELECT * FROM anotaciones WHERE Cod_Anotacion=".$_GET["consultar_anotaciones"]);
    if(mysqli_num_rows($sqlAnotaciones) > 0){
        $anotaciones = mysqli_fetch_all($sqlAnotaciones,MYSQLI_ASSOC);
        echo json_encode($anotaciones);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultar_anotaciones_estudiante"])){
    $sqlAnotaciones = mysqli_query($conexionBD,"SELECT a.*
    FROM anotaciones a
    JOIN estudiantes e ON a.Cod_Estudiante = e.Cod_Estudiante
    JOIN acudientes ac ON e.Cod_Acudiente = ac.Cod_Acudiente
    WHERE ac.Cedula_Acudiente = ".$_GET["consultar_anotaciones_estudiante"]);

    if(mysqli_num_rows($sqlAnotaciones) > 0){
        $anotaciones = mysqli_fetch_all($sqlAnotaciones,MYSQLI_ASSOC);
        echo json_encode($anotaciones);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultar_anotaciones_docente"])){
    $sqlAnotaciones = mysqli_query($conexionBD,"SELECT a.*
    FROM anotaciones a
    INNER JOIN estudiantes e ON a.Cod_Estudiante = e.Cod_Estudiante
    INNER JOIN grupos g ON e.Cod_Grupo = g.Cod_Grupo
    INNER JOIN docentes d ON g.Cod_Docente = d.Cod_Docente
    WHERE d.Cod_Docente = ".$_GET["consultar_anotaciones_docente"]);

    if(mysqli_num_rows($sqlAnotaciones) > 0){
        $anotaciones = mysqli_fetch_all($sqlAnotaciones,MYSQLI_ASSOC);
        echo json_encode($anotaciones);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_anotaciones"])){
    $sqlAnotaciones = mysqli_query($conexionBD,"DELETE FROM anotaciones WHERE Cod_Anotacion=".$_GET["borrar_anotaciones"]);
    if($sqlAnotaciones){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_anotaciones"])){
    $data = json_decode(file_get_contents("php://input"));
    $Cod_Estudiante=$data->Cod_Estudiante;
    $Asunto=$data->Asunto;
    $Fecha_Anotacion=$data->Fecha_Anotacion;
    $Observaciones=$data->Observaciones;

        if(($Cod_Estudiante!="")&&($Asunto!="")&&($Fecha_Anotacion!="")&&($Observaciones!="")){
            
    $sqlAnotaciones = mysqli_query($conexionBD,"INSERT INTO anotaciones(Cod_Estudiante, Asunto, Fecha_Anotacion, Observaciones) 
                                                             VALUES($Cod_Estudiante, '$Asunto', '$Fecha_Anotacion', '$Observaciones') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_anotaciones"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Anotacion=(isset($data->Cod_Anotacion))?$data->Cod_Anotacion:$_GET["actualizar_anotaciones"];

    $Cod_Estudiante=$data->Cod_Estudiante;
    $Asunto=$data->Asunto;
    $Fecha_Anotacion=$data->Fecha_Anotacion;
    $Observaciones=$data->Observaciones;
    
    $sqlAnotaciones = mysqli_query($conexionBD,"UPDATE anotaciones SET Cod_Estudiante= $Cod_Estudiante, Asunto='$Asunto', Fecha_Anotacion= '$Fecha_Anotacion', Observaciones='$Observaciones' WHERE Cod_Anotacion=$Cod_Anotacion");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla de anotaciones
$sqlAnotaciones = mysqli_query($conexionBD,"SELECT * FROM anotaciones");
if(mysqli_num_rows($sqlAnotaciones) > 0){
    $anotaciones = mysqli_fetch_all($sqlAnotaciones,MYSQLI_ASSOC);
    echo json_encode($anotaciones);
}
else{ echo json_encode([["success"=>0]]); }


?>