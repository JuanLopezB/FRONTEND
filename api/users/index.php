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
if (isset($_GET["consultar_user"])){
    $sqlUser = mysqli_query($conexionBD,"SELECT * FROM user WHERE userName=".$_GET["consultar_user"]);
    if(mysqli_num_rows($sqlUser) > 0){
        $users = mysqli_fetch_all($sqlUser,MYSQLI_ASSOC);
        echo json_encode($users);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}



//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_user"])){
    $sqlUser = mysqli_query($conexionBD,"DELETE FROM user WHERE userName=".$_GET["borrar_user"]);
    if($sqlUser){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_user"])){
    $data = json_decode(file_get_contents("php://input"));
    $userName=$data->userName;
    $pass=$data->pass;
    $roleId=$data->roleId;

        if(($userName!="")&&($pass!="")&&($roleId!="")){
            
    $sqlUser = mysqli_query($conexionBD,"INSERT INTO user(userName, pass, roleId) 
                                                             VALUES('$userName', '$pass', '$roleId') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_user"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $userName=(isset($data->userName))?$data->userName:$_GET["actualizar_user"];

    $pass=$data->pass;
    $roleId=$data->roleId;
    
    $sqlUser = mysqli_query($conexionBD,"UPDATE user SET pass='$pass', roleId= '$roleId' WHERE userName= '$userName'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla docentes
$sqlUser = mysqli_query($conexionBD,"SELECT * FROM user");
if(mysqli_num_rows($sqlUser) > 0){
    $users = mysqli_fetch_all($sqlUser,MYSQLI_ASSOC);
    echo json_encode($users);
}
else{ echo json_encode([["success"=>0]]); }


?>

