CREATE DATABASE  IF NOT EXISTS `mt1m454p8rtbi7pg` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `mt1m454p8rtbi7pg`;
-- MySQL dump 10.13  Distrib 8.0.16, for Win64 (x86_64)
--
-- Host: clwxydcjair55xn0.chr7pe7iynqr.eu-west-1.rds.amazonaws.com    Database: mt1m454p8rtbi7pg
-- ------------------------------------------------------
-- Server version	8.0.23


 SET NAMES utf8 ;

SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `categ_occ`
--

DROP TABLE IF EXISTS `categ_occ`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categ_occ` (
  `categ_occ_id` int NOT NULL AUTO_INCREMENT,
  `occasion` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`categ_occ_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categ_occ`
--

LOCK TABLES `categ_occ` WRITE;
/*!40000 ALTER TABLE `categ_occ` DISABLE KEYS */;
INSERT INTO `categ_occ` VALUES (1,'Reggeli'),(2,'Ebéd'),(3,'Vacsora'),(4,'Tízórai'),(5,'Uzsonna'),(6,'Desszert');
/*!40000 ALTER TABLE `categ_occ` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categ_special`
--

DROP TABLE IF EXISTS `categ_special`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categ_special` (
  `categ_special_id` int NOT NULL AUTO_INCREMENT,
  `diet` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`categ_special_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categ_special`
--

LOCK TABLES `categ_special` WRITE;
/*!40000 ALTER TABLE `categ_special` DISABLE KEYS */;
INSERT INTO `categ_special` VALUES (7,'nem'),(8,'gluténmentes'),(9,'tejmentes'),(10,'tojásmentes'),(11,'cukomentes'),(12,'vegetáriánus'),(13,'vegán');
/*!40000 ALTER TABLE `categ_special` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categ_types`
--

DROP TABLE IF EXISTS `categ_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `categ_types` (
  `categ_types_id` int NOT NULL AUTO_INCREMENT,
  `type` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`categ_types_id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categ_types`
--

LOCK TABLES `categ_types` WRITE;
/*!40000 ALTER TABLE `categ_types` DISABLE KEYS */;
INSERT INTO `categ_types` VALUES (1,'püré'),(2,'előétel'),(3,'leves'),(4,'főétel'),(5,'desszert'),(6,'saláta'),(7,'vendégváró'),(8,'szendvics'),(9,'ital');
/*!40000 ALTER TABLE `categ_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ingredients`
--

DROP TABLE IF EXISTS `ingredients`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `ingredients` (
  `ingr_id` int NOT NULL AUTO_INCREMENT,
  `ingredient` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `measurement` varchar(30) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`ingr_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ingredients`
--

LOCK TABLES `ingredients` WRITE;
/*!40000 ALTER TABLE `ingredients` DISABLE KEYS */;
INSERT INTO `ingredients` VALUES (1,'tojás','db'),(2,'tej','ml'),(3,'spenót','g'),(4,'tejföl','g'),(5,'sajt','g'),(6,'só','csipet'),(7,'bors','csipet'),(8,'olivaolaj','ml'),(9,'csirkecomb','g'),(10,'cékla','g'),(11,'édesburgonya','g'),(12,'burgonya','g'),(13,'sárgarépa','g'),(14,'cukkini','g'),(15,'rozmaring','csipet'),(16,'fokhagymasó','csipet'),(17,'füstölt paprika','csipet'),(18,'kömény','csipet'),(19,'zabliszt','g'),(20,'vaj','g'),(21,'nádcukor','g'),(22,'natúr joghurt','g'),(23,'víz','ml'),(24,'cseresznye','g'),(25,'mandulaforgács','g'),(26,'szilva','g');
/*!40000 ALTER TABLE `ingredients` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes`
--

DROP TABLE IF EXISTS `recipes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recipes` (
  `recipes_id` int NOT NULL AUTO_INCREMENT,
  `user_id` int NOT NULL,
  `title` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `body` text CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `categ_occ_id` int NOT NULL,
  `categ_types_id` int DEFAULT NULL,
  `categ_spec_id` int DEFAULT NULL,
  `image_url` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT NULL,
  `image_id` varchar(256) COLLATE utf8_hungarian_ci NOT NULL,
  PRIMARY KEY (`recipes_id`),
  KEY `categ_occ_id` (`categ_occ_id`),
  KEY `categ_spec_id` (`categ_spec_id`),
  KEY `categ_types_id` (`categ_types_id`),
  KEY `user_id` (`user_id`),
  CONSTRAINT `recipes_ibfk_1` FOREIGN KEY (`categ_occ_id`) REFERENCES `categ_occ` (`categ_occ_id`),
  CONSTRAINT `recipes_ibfk_2` FOREIGN KEY (`categ_spec_id`) REFERENCES `categ_special` (`categ_special_id`),
  CONSTRAINT `recipes_ibfk_3` FOREIGN KEY (`categ_types_id`) REFERENCES `categ_types` (`categ_types_id`),
  CONSTRAINT `recipes_ibfk_5` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes`
--

LOCK TABLES `recipes` WRITE;
/*!40000 ALTER TABLE `recipes` DISABLE KEYS */;
INSERT INTO `recipes` VALUES (1,1,'Spenótos omlett','2 tojást verjünk fel egy kis tejjel, amilyen habosra csak tudjuk, a maréknyi spenótot pedig szabadítsuk meg a szárától és szűrőbe téve jól öblítsük át. Egy tapadásmentes serpenyőt pici olívaolajjal hevítsünk fel és öntsük bele a tojásos keveréket. A tetejét szórjuk meg a levelekkel és sózzuk-borsozzuk. Amikor már kezd elválni a serpenyőtől a széle, ideje megfordítanunk (én műanyag spatulával szoktam alányúlni nagyjából a feléig, de tányérra is boríthatjuk, majd onnan visszacsúsztatjuk a serpenyőbe). 1-2 perc alatt ezt az oldalát is átsütjük - attól függ átsülten szeretnénk-e vagy inkább kicsit remegősen. Amikor kész kiborítjuk egy tányérra és még melegen megkenjük tejföllel és sajtot reszelünk rá. Fontos, hogy az ujjainkat szétégetve feltekerjük amilyen gyorsan csak tudjuk, hogy biztosan megolvadjon belül a sajt. Azon melegében fogyasszuk!',1,4,7,'https://res.cloudinary.com/hqjmiezd2/image/upload/v1651276156/spen%C3%B3tos-omlett_xngxzl.jpg','2022-04-11 22:00:00','2022-04-11 22:00:00','spenótos-omlett_xngxzl'),(28,42,'Zöldségágyon sült csirke','Ez a recept bármilyen húsból elkészíthető, én ezúttal a csirkecombokat választottam.\r\n\r\nA hús fajtája és mennyisége szabja meg a sütési időt.\r\n\r\nA combokon ízlés szerint rajtahagyható a bőrük, én mindenképpen meghagyom, mert a kisfiam még azon melegében leeszi őket, amíg még ropogósak.\r\n\r\nA húsokat megmossuk és egy rögtönzött fűszerkeverékkel alaposan bedörzsöljük. A keverékhez ezúttal sót, borsot, köményt,füstölt piros paprikát és fokhagymasót használtam fel. Ezután a csirkét félretesszük, hogy picit átjárják a fűszerek.\r\n\r\nA zöldségek szintén tetszőlegesen variálhatóak, ki mit szeret vagy mit kell megmentenie a hűtőből. A burgonya másnapra nekem mindig kicsit kiszárad, így én abból például kevesebbet teszek, hogy még aznap elfogyjon az összes.\r\n\r\nMiután a zöldségeket megmostuk és meghámoztuk, nagyjából 1x1 centiméretes kockákra vágjuk őket. Vegyük figyelembe, hogy a keményebb zöldségeknek több idő kell a sütőben, ezért azokat vágjuk a többinél kisebb méretűre (pl.: cékla, burgonya, sárgarépa).\r\n\r\nA tepsit béleljük ki sütőpapírral és erre halmozzuk rá a zöldségeket. Sózzuk-borsozzuk és olajjal locsoljuk meg őket, majd alaposan keverjük össze az egészet. Úgy rendezzük el végül a zöldségeket, hogy lehetőleg egy rétegben feküdjenek a tepsiben és ne fedjék egymást.\r\n\r\nMost jöhetnek a combok a zöldségekre, ezeket is masszírozzuk át egy kis olajjal és helyezzük rá zöldség ágyra.\r\n\r\nElőször takarjuk le fóliával a tepsit és úgy toljuk be a 180 fokra előmelegített sütőbe (légkeveréses vagy alsó-felső sütés). Nagyjából háromnegyed, maximum egy óra elteltével vegyük ki a sütőből és szurkáljuk meg a húsokat és zöldségeket. Ha már mindegyikbe nagyjából akadálymentesen bele tudjuk szúrni a villánkat, akkor még fólia nélkül tegyük vissza őket, míg a bőrök ropogósra nem pirulnak. Ha van lehetőségünk, ilyenkor jöhet a grill funkció, de vigyázzunk mert akkor tényleg hamar megpirulnak a csirkék.\r\n\r\nAmint készre sült a hús bőre vehetjük  ki a sütőből és még forrón ehetjük le róla! Jó étvágyat!',2,NULL,NULL,'http://res.cloudinary.com/hqjmiezd2/image/upload/v1651428004/ias7gcn0k8q2fjoxirgr.jpg','2022-05-01 18:00:04','2022-05-01 18:00:56','ias7gcn0k8q2fjoxirgr'),(29,42,'Szilvás galette','Egy tálban kézzel összemorzsoltam 200 gramm vajat és 350 gramm zablisztet. Hozzáadtam a teljes értékű nádcukrot, a natúr joghurtot és a hideg vizet. Homogén masszává gyúrtam, majd hűtőbe tettem pihenni kb. 20 percre. Közben kimagoztam 300 gramm szilvát.\r\nA tésztát 3 részre osztottam, és sütőpapíron 5-6mm vastagságúra nyújtottam, a közepébe szilvát szórtam (a széleken kb. 2-3 cm-t szabadon hagyva). Felhajtottam a szélét a tésztának, kevés nádcukrot szórtam a tetejére és meghintettem  mandulaforgáccsal. A tésztát megkentem tojással. 200 fokon 25 perc alatt megsütöttem.',6,NULL,NULL,'http://res.cloudinary.com/hqjmiezd2/image/upload/v1651529519/xvhlrpdl90l0odymqluq.jpg','2022-05-02 00:12:00',NULL,'xvhlrpdl90l0odymqluq');
/*!40000 ALTER TABLE `recipes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `recipes_ingr`
--

DROP TABLE IF EXISTS `recipes_ingr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `recipes_ingr` (
  `recipes_ingr_id` int NOT NULL AUTO_INCREMENT,
  `ingr_id` int NOT NULL,
  `recipes_id` int NOT NULL,
  `amount` int NOT NULL,
  PRIMARY KEY (`recipes_ingr_id`),
  KEY `ingr_id` (`ingr_id`),
  KEY `recipes_id` (`recipes_id`),
  CONSTRAINT `recipes_ingr_ibfk_1` FOREIGN KEY (`ingr_id`) REFERENCES `ingredients` (`ingr_id`),
  CONSTRAINT `recipes_ingr_ibfk_2` FOREIGN KEY (`recipes_id`) REFERENCES `recipes` (`recipes_id`)
) ENGINE=InnoDB AUTO_INCREMENT=58 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `recipes_ingr`
--

LOCK TABLES `recipes_ingr` WRITE;
/*!40000 ALTER TABLE `recipes_ingr` DISABLE KEYS */;
INSERT INTO `recipes_ingr` VALUES (1,1,1,4),(2,2,1,2),(3,3,1,200),(4,4,1,20),(5,5,1,15),(6,6,1,1),(7,7,1,1),(8,8,1,2),(38,9,28,1000),(39,10,28,200),(40,11,28,400),(41,12,28,200),(42,13,28,200),(43,14,28,200),(44,15,28,5),(45,16,28,5),(46,17,28,2),(47,18,28,3),(48,6,28,10),(49,7,28,8),(50,8,28,100),(51,19,29,350),(52,20,29,200),(53,21,29,5),(54,22,29,15),(55,23,29,10),(56,26,29,300),(57,25,29,100);
/*!40000 ALTER TABLE `recipes_ingr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_name` varchar(50) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `email` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `role` enum('user','admin') CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT 'user',
  `password` varchar(255) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL,
  `created_at` date DEFAULT NULL,
  `updated_at` date DEFAULT NULL,
  `avatar` varchar(200) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  `status` varchar(15) CHARACTER SET utf8 COLLATE utf8_hungarian_ci NOT NULL DEFAULT 'pending',
  `confirmationCode` varchar(256) CHARACTER SET utf8 COLLATE utf8_hungarian_ci DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  UNIQUE KEY `user_name_2` (`user_name`),
  KEY `email` (`email`),
  KEY `confirmationCode` (`confirmationCode`),
  KEY `user_name` (`user_name`)
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8 COLLATE=utf8_hungarian_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'agneshori','horiagnes@gmail.com','admin','$2a$10$WubZ/hzT3DKvPLgg.fcF.OwOVUZoPDHCcZx89kFazMfBOaM9mlP62','2022-04-11','2022-04-11',NULL,'active',NULL),(42,'Pixel','pixelcatslife@gmail.com','user','$2a$10$16HG5HL6NIp2g94wNY2F1eimA8dnnIkOL8Z7fx71VB7EInQlfqdky','2022-04-30',NULL,NULL,'active','zBWfHRBn1areG1laWVLjr68ea'),(44,'maggot','maggot0504@gmail.com','user','$2a$10$j.D36OlkqPNoAh4XT0LSIuYK1TYiS3Es1XTgkUvnIdD4CzzlCdx6q','2022-05-01',NULL,NULL,'active','ZhgbDYK6ZGsYTjSQAnRfhSAD7');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
