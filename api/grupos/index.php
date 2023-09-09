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
if (isset($_GET["consultar_grupos"])){
    $sqlGrupos = mysqli_query($conexionBD,"SELECT * FROM grupos WHERE Cod_Grupo=".$_GET["consultar_grupos"]);
    if(mysqli_num_rows($sqlGrupos) > 0){
        $grupos = mysqli_fetch_all($sqlGrupos,MYSQLI_ASSOC);
        echo json_encode($grupos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultar_grupos_estudiante"])){
    $sqlGrupos = mysqli_query($conexionBD,"SELECT g.*
    FROM estudiantes e
    JOIN acudientes a ON e.Cod_Acudiente = a.Cod_Acudiente
    JOIN grupos g ON e.Cod_Grupo = g.Cod_Grupo
    WHERE a.Cedula_Acudiente = ".$_GET["consultar_grupos_estudiante"]);
    
    if(mysqli_num_rows($sqlGrupos) > 0){
        $grupos = mysqli_fetch_all($sqlGrupos,MYSQLI_ASSOC);
        echo json_encode($grupos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultar_grupos_docente"])){
    $sqlGrupos = mysqli_query($conexionBD,"SELECT g.*
    FROM grupos g
    INNER JOIN docentes d ON g.Cod_Docente = d.Cod_Docente
    WHERE d.Cedula_Docente = ".$_GET["consultar_grupos_docente"]);
    
    if(mysqli_num_rows($sqlGrupos) > 0){
        $grupos = mysqli_fetch_all($sqlGrupos,MYSQLI_ASSOC);
        echo json_encode($grupos);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}


//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_grupos"])){
    $sqlGrupos = mysqli_query($conexionBD,"DELETE FROM grupos WHERE Cod_Grupo=".$_GET["borrar_grupos"]);
    if($sqlGrupos){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_grupos"])){
    $data = json_decode(file_get_contents("php://input"));
    $Cod_Docente=$data->Cod_Docente;
    $Grado=$data->Grado;
    $Periodo=$data->Periodo;

        if(($Cod_Docente!="")&&($Grado!="")&&($Periodo!="")){
            
    $sqlGrupos = mysqli_query($conexionBD,"INSERT INTO grupos(Cod_Docente, Grado, Periodo) 
                                                             VALUES($Cod_Docente, '$Grado', $Periodo) ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_grupos"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Grupo=(isset($data->Cod_Grupo))?$data->Cod_Grupo:$_GET["actualizar_grupos"];

    $Cod_Docente=$data->Cod_Docente;
    $Grado=$data->Grado;
    $Periodo=$data->Periodo;
    
    $sqlGrupos = mysqli_query($conexionBD,"UPDATE grupos SET Cod_Docente= $Cod_Docente, Grado='$Grado', Periodo= $Periodo WHERE Cod_Grupo='$Cod_Grupo'");
    echo json_encode(["success"=>1]);
    exit();
}
// Consulta todos los registros de la tabla docentes
$sqlGrupos = mysqli_query($conexionBD,"SELECT * FROM grupos");
if(mysqli_num_rows($sqlGrupos) > 0){
    $grupos = mysqli_fetch_all($sqlGrupos,MYSQLI_ASSOC);
    echo json_encode($grupos);
}
else{ echo json_encode([["success"=>0]]); }


?>

