/*M!999999\- enable the sandbox mode */ 
-- MariaDB dump 10.19  Distrib 10.11.11-MariaDB, for debian-linux-gnu (x86_64)
--
-- Host: localhost    Database: proyecto_db
-- ------------------------------------------------------
-- Server version	10.11.11-MariaDB-ubu2004

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `Diario`
--

DROP TABLE IF EXISTS `Diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Diario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `titulo` varchar(255) NOT NULL,
  `fecha` timestamp NULL DEFAULT current_timestamp(),
  `texto` text NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_diario_user` (`userId`),
  CONSTRAINT `fk_diario_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Diario`
--

LOCK TABLES `Diario` WRITE;
/*!40000 ALTER TABLE `Diario` DISABLE KEYS */;
INSERT INTO `Diario` VALUES
(9,'DIA 1','2025-06-03 00:00:00','Hoy he conseguido hacer que funcione correctamente la aplicación',1),
(12,'DIA 2','2025-06-04 00:00:00','Cambiamos los estilos de la página y completamos todas sus funcionalidades\n',1);
/*!40000 ALTER TABLE `Diario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Nutricion`
--

DROP TABLE IF EXISTS `Nutricion`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Nutricion` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` date NOT NULL,
  `calorias_ingeridas` int(11) NOT NULL,
  `calorias_gastadas` int(11) NOT NULL,
  `km_caminados` decimal(5,2) NOT NULL,
  `cardio_realizado1` varchar(100) DEFAULT NULL,
  `tiempo_cardio1` int(11) DEFAULT NULL,
  `distancia_cardio1` decimal(5,2) DEFAULT NULL,
  `cardio_realizado2` varchar(100) DEFAULT NULL,
  `tiempo_cardio2` int(11) DEFAULT NULL,
  `distancia_cardio2` decimal(5,2) DEFAULT NULL,
  `carbohidratos` decimal(6,2) DEFAULT NULL,
  `proteinas` decimal(6,2) DEFAULT NULL,
  `grasas` decimal(6,2) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_nutricion_user` (`userId`),
  CONSTRAINT `fk_nutricion_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Nutricion`
--

LOCK TABLES `Nutricion` WRITE;
/*!40000 ALTER TABLE `Nutricion` DISABLE KEYS */;
/*!40000 ALTER TABLE `Nutricion` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Objetivos`
--

DROP TABLE IF EXISTS `Objetivos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Objetivos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(255) NOT NULL,
  `fechaFin` datetime NOT NULL,
  `importancia` enum('alta','media','baja') DEFAULT 'media',
  `cumplido` tinyint(1) DEFAULT 0,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `descripcion` text DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_objetivos_user` (`userId`),
  CONSTRAINT `fk_objetivos_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Objetivos`
--

LOCK TABLES `Objetivos` WRITE;
/*!40000 ALTER TABLE `Objetivos` DISABLE KEYS */;
INSERT INTO `Objetivos` VALUES
(4,'100kg en banca','2025-06-30 00:00:00','media',0,1,'2025-06-04 08:38:22','2025-06-04 08:47:48','Levantar 100kg en banca a finales de mes'),
(5,'Ahorrar','2025-07-08 00:00:00','alta',0,1,'2025-06-04 08:48:19','2025-06-04 08:48:19','Ahorrar 100€ para Fuengirola');
/*!40000 ALTER TABLE `Objetivos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Rutina`
--

DROP TABLE IF EXISTS `Rutina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Rutina` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` enum('lunes','martes','miércoles','jueves','viernes','sábado','domingo') NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `enfoque` varchar(100) NOT NULL,
  `cardio` tinyint(1) NOT NULL,
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_rutina_user` (`userId`),
  CONSTRAINT `fk_rutina_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Rutina`
--

LOCK TABLES `Rutina` WRITE;
/*!40000 ALTER TABLE `Rutina` DISABLE KEYS */;
/*!40000 ALTER TABLE `Rutina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `Users`
--

DROP TABLE IF EXISTS `Users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8mb4 */;
CREATE TABLE `Users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `lastname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `credential` varchar(255) NOT NULL,
  `status` int(11) NOT NULL,
  `creation` datetime DEFAULT current_timestamp(),
  PRIMARY KEY (`id`),
  UNIQUE KEY `email` (`email`),
  UNIQUE KEY `credential` (`credential`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Pablo','De Abajo Plans','pablo.deabajo.plans@gmail.com','$2b$12$zWS9CT5SVyXm4abTbYLAuOfrPMZOV0grcjZN5EI0QeGK0k8cBoG0y','Pablitoda',1,'2025-06-03 20:12:59');
/*!40000 ALTER TABLE `Users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2025-06-04 11:04:42
