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
if (isset($_GET["consultar_estudiantes"])){
    $sqlEstudiantes = mysqli_query($conexionBD,"SELECT * FROM estudiantes WHERE Cod_Estudiante=".$_GET["consultar_estudiantes"]);
    if(mysqli_num_rows($sqlEstudiantes) > 0){
        $estudiantes = mysqli_fetch_all($sqlEstudiantes,MYSQLI_ASSOC);
        echo json_encode($estudiantes);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//para consultar solo estudiante al cual corresponde al acudiente

if (isset($_GET["consultar_estudiantes_acudiente"])){
    $sqlEstudiantes = mysqli_query($conexionBD,"SELECT e.*
    FROM estudiantes e
    JOIN acudientes a ON e.Cod_Acudiente = a.Cod_Acudiente
    WHERE a.Cedula_Acudiente = ".$_GET["consultar_estudiantes_acudiente"]);
    
    if(mysqli_num_rows($sqlEstudiantes) > 0){
        $estudiantes = mysqli_fetch_all($sqlEstudiantes,MYSQLI_ASSOC);
        echo json_encode($estudiantes);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

if (isset($_GET["consultar_estudiantes_docente"])){
    $sqlEstudiantes = mysqli_query($conexionBD,"SELECT e.*
    FROM estudiantes e
    INNER JOIN grupos g ON e.Cod_Grupo = g.Cod_Grupo
    INNER JOIN docentes d ON g.Cod_Docente = d.Cod_Docente
    WHERE d.Cod_Docente = ".$_GET["consultar_estudiantes_docente"]);
    
    if(mysqli_num_rows($sqlEstudiantes) > 0){
        $estudiantes = mysqli_fetch_all($sqlEstudiantes,MYSQLI_ASSOC);
        echo json_encode($estudiantes);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}

//borrar pero se le debe de enviar una clave ( para borrado )
if (isset($_GET["borrar_estudiantes"])){
    $sqlEstudiantes = mysqli_query($conexionBD,"DELETE FROM estudiantes WHERE Cod_Estudiante=".$_GET["borrar_estudiantes"]);
    if($sqlEstudiantes){
        echo json_encode(["success"=>1]);
        exit();
    }
    else{  echo json_encode(["success"=>0]); }
}
//Inserta un nuevo registro y recepciona en método post los datos de nombre y correo
if(isset($_GET["insertar_estudiantes"])){
    $data = json_decode(file_get_contents("php://input"));
    $Cod_Grupo=$data->Cod_Grupo;
    $Cod_Acudiente=$data->Cod_Acudiente;
    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Ingreso=$data->Fecha_Ingreso;
    $Fecha_Nac=$data->Fecha_Nac;
    $EPS=$data->EPS;
    $Estado=$data->Estado;
    $Direccion_Residencia=$data->Direccion_Residencia;
    $Nombre_Madre=$data->Nombre_Madre;
    $Nombre_Padre=$data->Nombre_Padre;

   

        if(($Cod_Grupo!="")&&($Cod_Acudiente!="")&&($Nombre!="")&&($Genero!="")&&($Fecha_Ingreso!="")&&($Fecha_Nac!="")&&($EPS!="")&&($Estado!="")&&($Direccion_Residencia!="")&&($Nombre_Madre!="")&&($Nombre_Padre!="")){
            
    $sqlEstudiantes = mysqli_query($conexionBD,"INSERT INTO estudiantes(Cod_Grupo, Cod_Acudiente, Nombre, Genero, Fecha_Ingreso, Fecha_Nac, EPS, Estado, Direccion_Residencia, Nombre_Madre, Nombre_Padre) 
                                                             VALUES($Cod_Grupo, $Cod_Acudiente, '$Nombre', '$Genero', '$Fecha_Ingreso', '$Fecha_Nac', '$EPS', '$Estado', '$Direccion_Residencia', '$Nombre_Madre', '$Nombre_Padre') ");
    echo json_encode(["success"=>1]);
        } else {
            echo "Error al insertar los datos: " . $conn->error;
        }
    exit();
}
// Actualiza datos pero recepciona datos de nombre, correo y una clave para realizar la actualización
if(isset($_GET["actualizar_estudiantes"])){
    
    $data = json_decode(file_get_contents("php://input"));

    $Cod_Estudiante=(isset($data->Cod_Estudiante))?$data->Cod_Estudiante:$_GET["actualizar_estudiantes"];

    $Cod_Grupo=$data->Cod_Grupo;
    $Cod_Acudiente=$data->Cod_Acudiente;
    $Nombre=$data->Nombre;
    $Genero=$data->Genero;
    $Fecha_Ingreso=$data->Fecha_Ingreso;
    $Fecha_Nac=$data->Fecha_Nac;
    $EPS=$data->EPS;
    $Estado=$data->Estado;
    $Direccion_Residencia=$data->Direccion_Residencia;
    $Nombre_Madre=$data->Nombre_Madre;
    $Nombre_Padre=$data->Nombre_Padre;
    
    $sqlEstudiantes = mysqli_query($conexionBD,"UPDATE estudiantes SET Cod_Grupo=$Cod_Grupo,Cod_Acudiente=$Cod_Acudiente, Nombre='$Nombre' , Genero='$Genero', Fecha_Ingreso='$Fecha_Ingreso', Fecha_Nac='$Fecha_Nac', EPS='$EPS', Estado='$Estado', Direccion_Residencia='$Direccion_Residencia', Nombre_Madre='$Nombre_Madre', Nombre_Padre='$Nombre_Padre' WHERE Cod_Estudiante=$Cod_Estudiante");
    echo json_encode(["success"=>1]);
    exit();
}   
// Consulta todos los registros de la tabla acudientes
$sqlEstudiantes = mysqli_query($conexionBD,"SELECT * FROM estudiantes");
if(mysqli_num_rows($sqlEstudiantes) > 0){
    $estudiantes = mysqli_fetch_all($sqlEstudiantes,MYSQLI_ASSOC);
    echo json_encode($estudiantes);
}
else{ echo json_encode([["success"=>0]]); }



?>

