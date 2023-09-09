CREATE DATABASE  IF NOT EXISTS `agenda` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `agenda`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: agenda
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `acudientes`
--

DROP TABLE IF EXISTS `acudientes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `acudientes` (
  `Cod_Acudiente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Genero` varchar(15) NOT NULL,
  `Fecha_Nac` date NOT NULL,
  `Parentesco` varchar(10) NOT NULL,
  `Cedula_Acudiente` varchar(10) NOT NULL,
  `Correo_Acudiente` varchar(45) NOT NULL,
  `Telefono` varchar(10) NOT NULL,
  PRIMARY KEY (`Cod_Acudiente`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `acudientes`
--

LOCK TABLES `acudientes` WRITE;
/*!40000 ALTER TABLE `acudientes` DISABLE KEYS */;
INSERT INTO `acudientes` VALUES (2,'carlos lopez','masculino','1993-04-27','padre','16457557','juan02lb05@gmail.com','3016757430'),(3,'leidy franco','femenino','2000-05-16','suegra','3525555','leidy@gmail.com','3225546685'),(4,'juan','masculino','1900-02-02','Hijo','321321','Juan@gmail.com','123456'),(5,'debbie','prueba','2000-02-02','prueba','1118283843','prueba@gmail.com','12345678');
/*!40000 ALTER TABLE `acudientes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `anotaciones`
--

DROP TABLE IF EXISTS `anotaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `anotaciones` (
  `Cod_Anotacion` int NOT NULL AUTO_INCREMENT,
  `Cod_Estudiante` int NOT NULL,
  `Asunto` varchar(45) NOT NULL,
  `Fecha_Anotacion` date NOT NULL,
  `Observaciones` varchar(250) NOT NULL,
  PRIMARY KEY (`Cod_Anotacion`),
  KEY `fk_anotaciones_estudiantes` (`Cod_Estudiante`),
  CONSTRAINT `fk_anotaciones_estudiantes` FOREIGN KEY (`Cod_Estudiante`) REFERENCES `estudiantes` (`Cod_Estudiante`)
) ENGINE=InnoDB AUTO_INCREMENT=556 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `anotaciones`
--

LOCK TABLES `anotaciones` WRITE;
/*!40000 ALTER TABLE `anotaciones` DISABLE KEYS */;
INSERT INTO `anotaciones` VALUES (1,1,'Prueba','2023-07-12','No aplica'),(2,1,'Prueba 2','2023-07-11','No hay observaciones'),(9,313128,'prueba','2023-07-02','Prueba insertar \"no deberia aparecer\"'),(13,1,'prueba f','2023-07-15','prueba f'),(14,1,'Prueba correo','2023-07-19','correo'),(15,1,'correo','2023-02-02','correo'),(16,1,'PRUEBA CORREO','2023-05-05','PRUEBA CORREO'),(555,555,'prueba anotacion docente','2023-08-03','Prueba, este no debe aparecer en docente');
/*!40000 ALTER TABLE `anotaciones` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `docentes`
--

DROP TABLE IF EXISTS `docentes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `docentes` (
  `Cod_Docente` int NOT NULL AUTO_INCREMENT,
  `Nombre` varchar(45) NOT NULL,
  `Genero` varchar(20) NOT NULL,
  `Fecha_Nac` date NOT NULL,
  `Correo_Docente` varchar(30) NOT NULL,
  `Cedula_Docente` varchar(15) NOT NULL,
  PRIMARY KEY (`Cod_Docente`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `docentes`
--

LOCK TABLES `docentes` WRITE;
/*!40000 ALTER TABLE `docentes` DISABLE KEYS */;
INSERT INTO `docentes` VALUES (1,'juan carlos','1','2000-02-02','789456','789456'),(2,'jenny botero','femenino','2000-03-04','jenny@gmail.com','1118283843'),(3,'sofia diaz','femenino','2020-05-05','jasiaosjdads@gmail.com','1111222');
/*!40000 ALTER TABLE `docentes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `estudiantes`
--

DROP TABLE IF EXISTS `estudiantes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `estudiantes` (
  `Cod_Estudiante` int NOT NULL AUTO_INCREMENT,
  `Cod_Grupo` int NOT NULL,
  `Cod_Acudiente` int NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Genero` varchar(45) NOT NULL,
  `Fecha_Ingreso` date NOT NULL,
  `Fecha_Nac` date NOT NULL,
  `EPS` varchar(45) NOT NULL,
  `Estado` varchar(45) NOT NULL,
  `Direccion_Residencia` varchar(45) NOT NULL,
  `Nombre_Madre` varchar(45) NOT NULL,
  `Nombre_Padre` varchar(45) NOT NULL,
  PRIMARY KEY (`Cod_Estudiante`),
  KEY `fk_estudiantes_grupos` (`Cod_Grupo`),
  KEY `fk_estudiantes_acudientes` (`Cod_Acudiente`),
  CONSTRAINT `fk_estudiantes_acudientes` FOREIGN KEY (`Cod_Acudiente`) REFERENCES `acudientes` (`Cod_Acudiente`),
  CONSTRAINT `fk_estudiantes_grupos` FOREIGN KEY (`Cod_Grupo`) REFERENCES `grupos` (`Cod_Grupo`)
) ENGINE=InnoDB AUTO_INCREMENT=313140 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `estudiantes`
--

LOCK TABLES `estudiantes` WRITE;
/*!40000 ALTER TABLE `estudiantes` DISABLE KEYS */;
INSERT INTO `estudiantes` VALUES (1,1,2,'Samu','Masculino','2023-06-30','2014-02-14','SOS','Activo','Calle 16 #15n30','Jenny Botero','Juan'),(555,5,2,'prueba anotacion docente','masculino','2023-05-04','2002-12-28','SOS','soltero','prueba','prueba','prueba'),(313128,1,3,'sofia','Femenino','2023-04-05','2007-02-04','SURA','activo','Calle 2 # 2-15','leidy','Milton'),(313133,3,5,'juan','masculino','2002-02-02','2002-02-02','sos','activo','jusdadad','dasdas','dasdasd'),(313134,3,5,'Prueba de estudiante a docente','masculino','2023-05-05','2023-05-05','sos','activo','sdada','dasdas','dsadas');
/*!40000 ALTER TABLE `estudiantes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupos`
--

DROP TABLE IF EXISTS `grupos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupos` (
  `Cod_Grupo` int NOT NULL AUTO_INCREMENT,
  `Cod_Docente` int NOT NULL,
  `Grado` varchar(45) NOT NULL,
  `Periodo` int NOT NULL,
  PRIMARY KEY (`Cod_Grupo`),
  KEY `fk_grupos_docentes` (`Cod_Docente`),
  CONSTRAINT `fk_grupos_docentes` FOREIGN KEY (`Cod_Docente`) REFERENCES `docentes` (`Cod_Docente`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupos`
--

LOCK TABLES `grupos` WRITE;
/*!40000 ALTER TABLE `grupos` DISABLE KEYS */;
INSERT INTO `grupos` VALUES (1,2,'Jardin',2023),(3,2,'Pre-Jardin',2023),(5,1,'Parvulos',2022),(11,2,'prueba22',2002);
/*!40000 ALTER TABLE `grupos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userName` varchar(10) NOT NULL,
  `pass` varchar(45) NOT NULL,
  `roleId` varchar(45) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES ('1006436048','123','admin'),('16457557','123','acudiente'),('1118283843','123','docente');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'agenda'
--

--
-- Dumping routines for database 'agenda'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-09-09  1:28:59
