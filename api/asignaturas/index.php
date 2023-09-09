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
if (isset($_GET["consultar_asignaturas"])){
    $sqlAsignaturas = mysqli_query($conexionBD,"SELECT * FROM asignaturas WHERE Cod_Asignatura=".$_GET["consultar_asignaturas"]);
    if(mysqli_num_rows($sqlAsignaturas) > 0){
        $asignaturas = mysqli_fetch_all($sqlAsignaturas,MYSQLI_ASSOC);
        echo json_encode($asignaturas);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_asignaturas"])){
    $sqlAsignaturas = mysqli_query($conexionBD,"DELETE FROM asignaturas WHERE Cod_Asignatura=".$_GET["borrar_asignaturas"]);
    if($sqlAsignaturas){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_asignaturas"])){
    $data = json_decode(file_get_contents("php://input"));
    $Cod_Grupo=$data->Cod_Grupo;
    $Nombre=$data->Nombre;

        if(($Cod_Grupo!="")&&($Nombre!="")){
            
    $sqlAsignaturas = mysqli_query($conexionBD,"INSERT INTO asignaturas(Cod_Grupo, Nombre) 
                                                             VALUES($Cod_Grupo, '$Nombre') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_asignaturas"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Asignatura=(isset($data->Cod_Asignatura))?$data->Cod_Asignatura:$_GET["actualizar_asignaturas"];

    $Cod_Grupo=$data->Cod_Grupo;
    $Nombre=$data->Nombre;
    
    $sqlAsignaturas = mysqli_query($conexionBD,"UPDATE asignaturas SET Cod_Grupo= $Cod_Grupo, Nombre='$Nombre' WHERE Cod_Asignatura='$Cod_Asignatura'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla docentes
$sqlAsignaturas = mysqli_query($conexionBD,"SELECT * FROM asignaturas");
if(mysqli_num_rows($sqlAsignaturas) > 0){
    $asignaturas = mysqli_fetch_all($sqlAsignaturas,MYSQLI_ASSOC);
    echo json_encode($asignaturas);
}
else{ echo json_encode([["success"=>0]]); }


?>

