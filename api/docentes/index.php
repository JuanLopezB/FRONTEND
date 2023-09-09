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
if (isset($_GET["consultar_docentes"])){
    $sqlDocentes = mysqli_query($conexionBD,"SELECT * FROM docentes WHERE Cod_Docente=".$_GET["consultar_docentes"]);
    if(mysqli_num_rows($sqlDocentes) > 0){
        $docentes = mysqli_fetch_all($sqlDocentes,MYSQLI_ASSOC);
        echo json_encode($docentes);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_docentes"])){
    $sqlDocentes = mysqli_query($conexionBD,"DELETE FROM docentes WHERE Cod_Docente=".$_GET["borrar_docentes"]);
    if($sqlDocentes){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_docente"])){
    $data = json_decode(file_get_contents("php://input"));
    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Nac=$data->Fecha_Nac;
    $Correo_Docente=$data->Correo_Docente;
    $Cedula_Docente=$data->Cedula_Docente;

    

        if(($Nombre!="")&&($Genero!="")&&($Fecha_Nac!="")&&($Correo_Docente!="")&&($Cedula_Docente!="")){
            
    $sqlDocentes = mysqli_query($conexionBD,"INSERT INTO docentes(Nombre, Genero, Fecha_Nac, Correo_Docente, Cedula_Docente) 
                                                             VALUES('$Nombre', '$Genero', '$Fecha_Nac', '$Correo_Docente', '$Cedula_Docente') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_docentes"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Docente=(isset($data->Cod_Docente))?$data->Cod_Docente:$_GET["actualizar_docentes"];

    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Nac=$data->Fecha_Nac;
    $Correo_Docente=$data->Correo_Docente;
    $Cedula_Docente=$data->Cedula_Docente;
    
    $sqlDocentes = mysqli_query($conexionBD,"UPDATE docentes SET Nombre='$Nombre', Fecha_Nac='$Fecha_Nac', Correo_Docente='$Cedula_Docente', Cedula_Docente='$Cedula_Docente' WHERE Cod_Docente='$Cod_Docente'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla docentes
$sqlDocentes = mysqli_query($conexionBD,"SELECT * FROM docentes");
if(mysqli_num_rows($sqlDocentes) > 0){
    $docentes = mysqli_fetch_all($sqlDocentes,MYSQLI_ASSOC);
    echo json_encode($docentes);
}
else{ echo json_encode([["success"=>0]]); }


?>

