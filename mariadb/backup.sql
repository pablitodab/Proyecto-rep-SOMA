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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Diario`
--

LOCK TABLES `Diario` WRITE;
/*!40000 ALTER TABLE `Diario` DISABLE KEYS */;
INSERT INTO `Diario` VALUES
(1,'DIA','2025-06-03 12:43:26','9ueghvWEIUGB',1),
(2,'DIA 1 pepe','2025-06-03 12:45:23','funciona',4),
(3,'DIA 2','2025-06-03 13:16:06','hola',1),
(4,'Dia2','2025-06-03 00:00:00','Esto es una prueba',1);
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
INSERT INTO `Nutricion` VALUES
(1,'2025-06-03',3000,2500,15.00,NULL,NULL,NULL,NULL,NULL,NULL,200.00,160.00,50.00,1);
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
  KEY `fk_objetivos_user` (`userId`),
  CONSTRAINT `fk_objetivos_user` FOREIGN KEY (`userId`) REFERENCES `Users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Objetivos`
--

LOCK TABLES `Objetivos` WRITE;
/*!40000 ALTER TABLE `Objetivos` DISABLE KEYS */;
INSERT INTO `Objetivos` VALUES
(1,'100 en banca','2025-06-07 00:00:00','alta',0,4,'2025-06-03 12:45:54','2025-06-03 12:45:54');
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
INSERT INTO `Rutina` VALUES
(1,'lunes','Pecho, Hombro, Tríceps','Pecho superior',1,1),
(2,'martes','Espalda, Hombro, Bíceps','Espalda',1,1),
(3,'miércoles','Pierna y Lumbar','Cuadriceps',1,1),
(4,'jueves','Pecho, Hombro, Tríceps','Hombros laterales',1,1),
(5,'viernes','Espalda, Hombro, Bíceps','Bíceps',0,1),
(6,'sábado','Pierna y Glúteos','Femoral',1,1),
(7,'domingo','Día de descanso, caminar','Descansar',1,1);
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Users`
--

LOCK TABLES `Users` WRITE;
/*!40000 ALTER TABLE `Users` DISABLE KEYS */;
INSERT INTO `Users` VALUES
(1,'Pablo','De Abajo Plans','pablo.deabajo.plans@gmail.com','$2b$10$3IVBfD25c/1CWT0cWi.OseeJjQ0CpasvvVAD3Sn0iKvaWCmnRgbX6','pablitoda',1,'2025-06-03 10:46:08'),
(2,'Alvaro','De Abajo Plans','alvaro.deabajo.plans@gmail.com','$2b$10$/l3Kk5Ylk9w1WwmZno3h9upIvfiurnL3k909CWYtRQyUdEb3PnmpS','Varo',1,'2025-06-03 12:04:54'),
(3,'Alejandro','De Abajo Sanz','adeabajo@gmail.com','$2b$10$DBqYpT8uVd9JyVRfxDJQIObNmFPnnaNjQ.hBZrt2AyLW/yeZtIvBG','adeabajo',1,'2025-06-03 12:23:52'),
(4,'pepe','pepe','pepe@gmail.com','$2b$12$YZafvJFzSAGwsPLYEYEl5uhr29Av8/lW2yE8oKslV7fPKictAnbFm','pepe',1,'2025-06-03 12:44:45');
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

-- Dump completed on 2025-06-03 14:10:21
