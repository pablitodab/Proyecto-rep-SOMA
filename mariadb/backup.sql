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
  KEY `userId` (`userId`),
  CONSTRAINT `Diario_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Diario`
--

LOCK TABLES `Diario` WRITE;
/*!40000 ALTER TABLE `Diario` DISABLE KEYS */;
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
  `tiempo_cardio1` int(11) DEFAULT NULL COMMENT 'tiempo en minutos',
  `distancia_cardio1` decimal(5,2) DEFAULT NULL COMMENT 'distancia en km',
  `cardio_realizado2` varchar(100) DEFAULT NULL,
  `tiempo_cardio2` int(11) DEFAULT NULL COMMENT 'tiempo en minutos',
  `distancia_cardio2` decimal(5,2) DEFAULT NULL COMMENT 'distancia en km',
  `carbohidratos` decimal(6,2) DEFAULT NULL COMMENT 'gramos',
  `proteinas` decimal(6,2) DEFAULT NULL COMMENT 'gramos',
  `grasas` decimal(6,2) DEFAULT NULL COMMENT 'gramos',
  `userId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Nutricion_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  PRIMARY KEY (`id`),
  KEY `userId` (`userId`),
  CONSTRAINT `Objetivos_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Objetivos`
--

LOCK TABLES `Objetivos` WRITE;
/*!40000 ALTER TABLE `Objetivos` DISABLE KEYS */;
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
  KEY `userId` (`userId`),
  CONSTRAINT `Rutina_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
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
  UNIQUE KEY `users_email_unique` (`email`),
  UNIQUE KEY `users_credential_unique` (`credential`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Pablo','De Abajo Plans','pablo.deabajo.plans@gmail.com','$2b$10$gz9WGxApZThQIkZT5WEtdOyHuFpExxN3CztRTKEyJ4LwUtHk7cWsu','Pablitoda',1,'2025-05-13 14:31:09'),
(2,'Alejandro','de Abajo Sanz','adeabajo@gmail.com','$2b$10$zr2ZkXcK2pEvcsPaLlWK5.7VqiItMMMzSKikpiGUDo1up7l7y4plK','adeabajo2',1,'2025-05-13 14:29:05'),
(3,'Vanesa','Plans','pepe@gmail.com','$2b$10$h5x4wQilMKuiZHCQ8RRoh.ZLtbHI1WMupOk7zD6.zgwg.GqxLRu5e','Vane',1,'2025-05-13 19:17:14');
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

-- Dump completed on 2025-05-28 13:08:04
