-- MySQL dump 10.13  Distrib 8.0.46, for Linux (x86_64)
--
-- Host: 172.27.0.1    Database: legalbridge_test
-- ------------------------------------------------------
-- Server version	8.4.11

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `legalbridge_test`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `legalbridge_test` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `legalbridge_test`;

--
-- Table structure for table `avocats`
--

DROP TABLE IF EXISTS `avocats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `avocats` (
  `id_avocat` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  `prenom` varchar(100) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `ville` varchar(100) DEFAULT NULL,
  `portable` varchar(20) DEFAULT NULL,
  `adresse` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `description` text,
  `traducteur_disponible` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`id_avocat`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `avocats`
--

LOCK TABLES `avocats` WRITE;
/*!40000 ALTER TABLE `avocats` DISABLE KEYS */;
INSERT INTO `avocats` VALUES (1,'Dupont','Jean','jean.dupont@example.com','Paris','0612345678','10 rue de Paris, 75001 Paris','img/jean-dupont.jpg','Avocat spécialisé en droit des étrangers à Paris',1),(2,'Laurent','Marie',NULL,'paris',NULL,NULL,'img/marie-laurent.jpg',NULL,NULL),(3,'Mendez','Carlos',NULL,'Marseille',NULL,NULL,'img/Carlos-Mendez.jpg',NULL,NULL),(4,'Martin','Sophie',NULL,'Paris',NULL,NULL,'img/sophie-martin.jpg',NULL,NULL),(5,'Ben Salah','Ahmed',NULL,'Paris',NULL,NULL,'img/ahmed-ben-salah.jpg',NULL,NULL),(6,'Bernard','Claire',NULL,'Toulouse',NULL,NULL,'img/claire-bernard.jpg',NULL,NULL),(7,'Moreau','Lucas',NULL,'Nice',NULL,NULL,'img/lucas-moreau.jpg',NULL,NULL),(8,'Zahra','Fatima',NULL,'Lille',NULL,NULL,'img/fatima-zahra.jpg',NULL,NULL),(9,'Robert','Thomas',NULL,'Bordeaux',NULL,NULL,'img/thomas-robert.jpg',NULL,NULL),(10,'Karim','Nadia',NULL,'Paris',NULL,NULL,'img/nadia-karim.jpg',NULL,NULL),(11,'Petit','Julien',NULL,'Nantes',NULL,NULL,'img/Julien-Petit.jpg',NULL,NULL),(12,'Haddad','Amine',NULL,'Strasbourg',NULL,NULL,'img/Amine-Haddad.jpg',NULL,NULL),(13,'Dubois','Isabelle',NULL,'Montpellier',NULL,NULL,'img/Isabelle-Dubois.jpg',NULL,NULL),(14,'Lefevre','Pierre',NULL,'Rennes',NULL,NULL,'img/Pierre-Lefevre.jpg',NULL,NULL),(15,'El Amrani','Amina',NULL,'Lyon',NULL,NULL,'img/Amina-Amrani.jpg',NULL,NULL);
/*!40000 ALTER TABLE `avocats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercer`
--

DROP TABLE IF EXISTS `exercer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercer` (
  `id_avocat` int NOT NULL,
  `id_specialisation` int NOT NULL,
  PRIMARY KEY (`id_avocat`,`id_specialisation`),
  KEY `id_specialisation` (`id_specialisation`),
  CONSTRAINT `exercer_ibfk_1` FOREIGN KEY (`id_avocat`) REFERENCES `avocats` (`id_avocat`),
  CONSTRAINT `exercer_ibfk_2` FOREIGN KEY (`id_specialisation`) REFERENCES `specialisations` (`id_specialisation`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercer`
--

LOCK TABLES `exercer` WRITE;
/*!40000 ALTER TABLE `exercer` DISABLE KEYS */;
INSERT INTO `exercer` VALUES (1,1),(6,1),(10,1),(13,1),(2,2),(5,2),(11,2),(15,2),(3,3),(4,3),(9,3),(4,4),(8,4),(12,4),(14,4),(7,5);
/*!40000 ALTER TABLE `exercer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `langues`
--

DROP TABLE IF EXISTS `langues`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `langues` (
  `id_langue` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id_langue`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `langues`
--

LOCK TABLES `langues` WRITE;
/*!40000 ALTER TABLE `langues` DISABLE KEYS */;
INSERT INTO `langues` VALUES (5,'allemand'),(3,'anglais'),(2,'arabe'),(4,'espagnol'),(1,'français');
/*!40000 ALTER TABLE `langues` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `parler`
--

DROP TABLE IF EXISTS `parler`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `parler` (
  `id_avocat` int NOT NULL,
  `id_langue` int NOT NULL,
  PRIMARY KEY (`id_avocat`,`id_langue`),
  KEY `id_langue` (`id_langue`),
  CONSTRAINT `parler_ibfk_1` FOREIGN KEY (`id_avocat`) REFERENCES `avocats` (`id_avocat`),
  CONSTRAINT `parler_ibfk_2` FOREIGN KEY (`id_langue`) REFERENCES `langues` (`id_langue`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `parler`
--

LOCK TABLES `parler` WRITE;
/*!40000 ALTER TABLE `parler` DISABLE KEYS */;
INSERT INTO `parler` VALUES (1,1),(2,1),(3,1),(4,1),(5,1),(6,1),(7,1),(8,1),(9,1),(10,1),(11,1),(12,1),(13,1),(14,1),(15,1),(1,2),(5,2),(8,2),(10,2),(12,2),(15,2),(2,3),(6,3),(10,3),(13,3),(3,4),(4,5);
/*!40000 ALTER TABLE `parler` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rendez_vous`
--

DROP TABLE IF EXISTS `rendez_vous`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rendez_vous` (
  `id_rendez_vous` int NOT NULL AUTO_INCREMENT,
  `id_utilisateur` int NOT NULL,
  `id_avocat` int NOT NULL,
  `date_rendez_vous` date NOT NULL,
  `heure_rendez_vous` time NOT NULL,
  `statut` varchar(20) NOT NULL DEFAULT 'en_attente',
  `motif` text,
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_rendez_vous`),
  KEY `fk_rendez_vous_utilisateur` (`id_utilisateur`),
  KEY `fk_rendez_vous_avocat` (`id_avocat`),
  CONSTRAINT `fk_rendez_vous_avocat` FOREIGN KEY (`id_avocat`) REFERENCES `avocats` (`id_avocat`),
  CONSTRAINT `fk_rendez_vous_utilisateur` FOREIGN KEY (`id_utilisateur`) REFERENCES `utilisateurs` (`id_utilisateur`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rendez_vous`
--

LOCK TABLES `rendez_vous` WRITE;
/*!40000 ALTER TABLE `rendez_vous` DISABLE KEYS */;
INSERT INTO `rendez_vous` VALUES (1,1,4,'2026-09-22','14:00:00','confirme','Besoin d\'un conseil juridique','2026-09-17 10:09:13'),(2,1,4,'2026-09-24','03:55:00','confirme','hello','2026-09-18 11:55:10'),(3,1,4,'2026-09-09','16:19:00','confirme','','2026-09-18 12:19:09'),(4,1,4,'2026-09-09','16:19:00','confirme','','2026-09-18 12:19:15'),(5,1,4,'2026-09-08','22:00:00','en_attente','hello','2026-09-25 17:00:29'),(6,1,4,'2026-09-08','22:00:00','en_attente','hello','2026-09-25 17:00:35'),(7,1,1,'2026-09-30','13:13:00','confirme','HELLO ','2026-09-25 19:08:23'),(8,1,1,'2026-09-30','13:13:00','annule','HELLO ','2026-09-25 19:08:27'),(9,1,1,'2026-09-30','23:16:00','en_attente','hello','2026-09-25 19:11:58'),(10,1,1,'2026-09-30','13:05:00','annule','','2026-09-25 20:06:00'),(11,1,4,'2026-09-30','15:11:00','confirme','hello','2026-09-25 21:11:20'),(12,1,4,'2026-09-30','14:22:00','confirme','','2026-09-25 21:22:31'),(13,1,1,'2026-10-22','04:31:00','confirme','HELLO ','2026-10-07 00:25:40'),(14,1,10,'2026-10-29','12:56:00','annule','y a rien','2026-10-27 19:51:13'),(15,1,10,'2026-10-31','02:12:00','annule','HELLO','2026-10-30 09:06:56');
/*!40000 ALTER TABLE `rendez_vous` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `specialisations`
--

DROP TABLE IF EXISTS `specialisations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `specialisations` (
  `id_specialisation` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id_specialisation`),
  UNIQUE KEY `nom` (`nom`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `specialisations`
--

LOCK TABLES `specialisations` WRITE;
/*!40000 ALTER TABLE `specialisations` DISABLE KEYS */;
INSERT INTO `specialisations` VALUES (4,'demande d\'asile'),(5,'droit pénal'),(1,'immigration'),(3,'logement'),(2,'travail');
/*!40000 ALTER TABLE `specialisations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `utilisateurs`
--

DROP TABLE IF EXISTS `utilisateurs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `utilisateurs` (
  `id_utilisateur` int NOT NULL AUTO_INCREMENT,
  `nom` varchar(100) NOT NULL,
  `prenom` varchar(100) NOT NULL,
  `email` varchar(250) NOT NULL,
  `mot_de_passe` varchar(255) NOT NULL,
  `telephone` varchar(15) DEFAULT NULL,
  `role` varchar(20) NOT NULL DEFAULT 'client',
  `date_creation` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id_utilisateur`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `utilisateurs`
--

LOCK TABLES `utilisateurs` WRITE;
/*!40000 ALTER TABLE `utilisateurs` DISABLE KEYS */;
INSERT INTO `utilisateurs` VALUES (1,'Test','Utilisateur','test@legalbridge.fr','$2b$10$aeZRaB62Cu3UKc60TURtyuQlXeuzCIZhmhDaKyzdMxAdisavINSae','0612345678','client','2026-09-14 10:32:35'),(3,'Admin','LegalBridge','admin@legalbridge.fr','$2b$10$c9bASIBfr/hnHrHnQ1gtruDk81IzCyLHS5QdwngfkiyOO3H8VwG/.','0600000000','admin','2026-10-09 19:15:00'),(4,'sajjad','Alanzy','alanzy.sajjad@gmail.com','$2b$10$319bUqOZGH0lUUqY4Qn5/.LY9yx8AvkHVfGy1vIpBnJTUZOB.JX0e',NULL,'client','2026-10-22 21:53:16'),(5,'sajjad','Alanzy','alanzysajjad@gmail.com','$2b$10$q1he4gRiNSmyhGstbICvMuMIaF2TNZZXQ7OdpVbIqrpM4Yx0C4ni6',NULL,'client','2026-10-22 21:54:34'),(6,'sajjad','Alanzy','alanzy.sajjad1@gmail.com','$2b$10$vJAq2VMl7xz/z32lnPWSVOIS3UJbWeK9QvbtVR0hnwRX6ALTCnjzC',NULL,'client','2026-10-22 22:08:28'),(7,'sajjad','Alanzy','alanzy.sajjad11@gmail.com','$2b$10$dTyHwCNvDGSuc6ELw.27GewH0fYyI9caWlKcdfOsLZXwEgq83jDam',NULL,'client','2026-10-22 22:13:35');
/*!40000 ALTER TABLE `utilisateurs` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-11-07 13:55:10
