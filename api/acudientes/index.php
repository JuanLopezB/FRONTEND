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
if (isset($_GET["consultar_acudientes"])){
    $sqlAcudientes = mysqli_query($conexionBD,"SELECT * FROM acudientes WHERE Cod_Acudiente=".$_GET["consultar_acudientes"]);
    if(mysqli_num_rows($sqlAcudientes) > 0){
        $acudientes = mysqli_fetch_all($sqlAcudientes,MYSQLI_ASSOC);
        echo json_encode($acudientes);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_acudientes"])){
    $sqlAcudientes = mysqli_query($conexionBD,"DELETE FROM acudientes WHERE Cod_Acudiente=".$_GET["borrar_acudientes"]);
    if($sqlAcudientes){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_acudientes"])){
    $data = json_decode(file_get_contents("php://input"));
    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Nac=$data->Fecha_Nac;
    $Parentesco=$data->Parentesco;
    $Cedula_Acudiente=$data->Cedula_Acudiente;
    $Correo_Acudiente=$data->Correo_Acudiente;
    $Telefono=$data->Telefono;

        if(($Nombre!="")&&($Genero!="")&&($Fecha_Nac!="")&&($Parentesco!="")&&($Cedula_Acudiente!="")&&($Correo_Acudiente!="")&&($Telefono!="")){
            
    $sqlAcudientes = mysqli_query($conexionBD,"INSERT INTO acudientes(Nombre, Genero, Fecha_Nac, Parentesco, Cedula_Acudiente, Correo_Acudiente, Telefono) 
                                                             VALUES('$Nombre', '$Genero', '$Fecha_Nac', '$Parentesco', '$Cedula_Acudiente', '$Correo_Acudiente', '$Telefono') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_acudientes"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Acudiente=(isset($data->Cod_Acudiente))?$data->Cod_Acudiente:$_GET["actualizar_acudientes"];

    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Nac=$data->Fecha_Nac;
    $Parentesco=$data->Parentesco;
    $Cedula_Acudiente=$data->Cedula_Acudiente;
    $Correo_Acudiente=$data->Correo_Acudiente;
    $Telefono=$data->Telefono;
    
    $sqlAcudientes = mysqli_query($conexionBD,"UPDATE acudientes SET Nombre='$Nombre',Genero='$Genero', Fecha_Nac='$Fecha_Nac', Parentesco='$Parentesco', Cedula_Acudiente='$Cedula_Acudiente', Correo_Acudiente='$Correo_Acudiente', Telefono='$Telefono' WHERE Cod_Acudiente='$Cod_Acudiente'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla acudientes
$sqlAcudientes = mysqli_query($conexionBD,"SELECT * FROM acudientes");
if(mysqli_num_rows($sqlAcudientes) > 0){
    $acudientes = mysqli_fetch_all($sqlAcudientes,MYSQLI_ASSOC);
    echo json_encode($acudientes);
}
else{ echo json_encode([["success"=>0]]); }



//--------------------------TABLA DOCENTE------------------------------------ 


if(isset($_GET["insertar_docentes"])){
    $data = json_decode(file_get_contents("php://input"));
    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Nac=$data->Fecha_Nac;
    $Correo_Docente=$data->Correo_Docente;
    $Cedula_Docente=$data->Cedula_Docente;

        if(($Nombre!="")&&($Genero!="")&&($Fecha_Nac!="")&&($Correo_Docente!="")&&($Cedula_Docente!="")){
            
    $sqlDocentes = mysqli_query($conexionBD,"INSERT INTO docentes(Nombre, Genero, Fecha_Nac, Correo_Acudiente, Cedula_Acudiente) 
                                                             VALUES('$Nombre', '$Genero', '$Fecha_Nac', '$Correo_Acudiente', '$Cedula_Acudiente') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}


?>

