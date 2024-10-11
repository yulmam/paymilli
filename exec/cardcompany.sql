-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: j11a702.p.ssafy.io    Database: cardcompanydb
-- ------------------------------------------------------
-- Server version	9.0.1

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
-- Table structure for table `card`
--

DROP TABLE IF EXISTS `card`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `card` (
  `card_type` tinyint NOT NULL,
  `deleted` bit(1) DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `account` varchar(255) DEFAULT NULL,
  `card_holder_name` varchar(255) NOT NULL,
  `card_image` varchar(255) DEFAULT NULL,
  `card_name` varchar(255) NOT NULL,
  `card_number` varchar(255) NOT NULL,
  `card_password` varchar(255) NOT NULL,
  `cvc` varchar(255) NOT NULL,
  `expiration_date` varchar(255) NOT NULL,
  `user_key` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `card`
--

LOCK TABLES `card` WRITE;
/*!40000 ALTER TABLE `card` DISABLE KEYS */;
INSERT INTO `card` VALUES (0,_binary '\0','2024-10-07 16:09:23.142516','2024-10-07 16:09:23.142542',_binary '3\ÁdkîH]™æ◊úX\„','0018952659833229','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-credit.png','Î£®ÎπÑ Ïò§ÎäòÏùÄ ÏπòÌåÖÎç∞Ïù¥ Ïπ¥Îìú','1002111771224656','8030','522','0929','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-07 15:58:18.715383','2024-10-07 15:58:18.715410',_binary 'ÚuÇ˙DNª˜¯NÙ]\Œ\‡','0011719572553239','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-credit.png','ÌÜ†ÌååÏ¶à Ïò§ÎäòÎèÑ Ï∂úÍ∑º Ïπ¥Îìú','3249183119914279','8030','716','0830','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-04 13:08:10.941581','2024-10-04 13:08:10.941611',_binary 'µ<õ\»ı@˛ô¢òdR#\⁄','0012477502750521','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile Ï≤¥ÌÅ¨ Ïπ¥Îìú','1232321135537890','8030','633','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(0,_binary '\0','2024-10-04 10:20:05.029825','2024-10-04 10:20:05.029859',_binary ' m˝êF\ÈD°π\\}\ÏxΩR','0018494492834720','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile Ïπ¥Îìú','1002321135537890','8030','633','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(1,_binary '\0','2024-10-06 15:49:12.729355','2024-10-06 15:49:12.729388',_binary '=JbljnE5Ñø\‚br*è','0012200497043118','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile Ï≤¥ÌÅ¨ Ïπ¥Îìú','5107371881564421','8030','626','0830','738415b7-9bdf-4077-9841-7c85278a9e28'),(1,_binary '\0','2024-10-07 12:39:43.229127','2024-10-07 12:39:43.229157',_binary 'G\”0iRBDÄÅ\—\ﬂ~Tà','0018339864245975','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-check.png','Topaz Ïò§ÎäòÎèÑ ÌôîÏù¥ÌåÖ Ïπ¥Îìú','7245282054804725','8030','385','0629','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-04 10:19:59.275265','2024-10-04 10:19:59.275299',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝','0017565632531105','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Diamond Ìä∏ÎûòÎ∏î Y Ï≤¥ÌÅ¨Ïπ¥Îìú','5829081046713523','8030','425','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(1,_binary '\0','2024-10-06 16:16:44.574365','2024-10-06 16:16:44.574398',_binary 'ç;Ø°\'\÷AπÜ|Öø\ÏçM2','0018561714115925','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Ruby Every Mile Ï≤¥ÌÅ¨ Ïπ¥Îìú','6123732459152321','8030','425','0828','738415b7-9bdf-4077-9841-7c85278a9e28'),(0,_binary '\0','2024-10-07 12:45:19.053494','2024-10-07 12:45:19.053524',_binary '¢\‡3Ù©˙D\r∞£ëZ˝&u','0013796517131508','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile Ïπ¥Îìú','1002495314465242','8030','824','2910','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-07 16:12:39.008334','2024-10-07 16:12:39.008360',_binary '∂\ÓM\Í˛ˇC ¶\œ[∏Qr','0011114653966815','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-check.png','Îã§Ïù¥ÏïÑÎ™¨Îìú ÌñâÎ≥µÌïú Î∞òÎ†§ÏÉùÌôú Ïπ¥Îìú','3145173019423197','8030','416','0830','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-07 13:36:31.675144','2024-10-07 13:36:31.675174',_binary 'ª\ /C4óG≥¢≥\‹¶ûl','0019180504316120','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Diamond Ìä∏ÎûòÎ∏î X Ïπ¥Îìú','5249182054913713','8030','725','0828','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-04 10:19:53.914604','2024-10-04 10:19:53.914679',_binary '\»\«H`OÈå§ä\»ojê´','0018494492834720','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-check.png','Topaz Ïò§ÎäòÎèÑ ÌôîÏù¥ÌåÖ Ï≤¥ÌÅ¨Ïπ¥Îìú','5389083056812503','1234','325','0830','5fd49eef-9b5a-484a-bec0-623af309d071');
/*!40000 ALTER TABLE `card` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `installment`
--

DROP TABLE IF EXISTS `installment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `installment` (
  `installment_date` date NOT NULL,
  `installment_status` tinyint NOT NULL,
  `price` bigint NOT NULL,
  `id` binary(16) NOT NULL,
  `payment_id` binary(16) DEFAULT NULL,
  `transaction_unique_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK81050v2kmhq5itffxv0o9qe1h` (`payment_id`),
  CONSTRAINT `FK81050v2kmhq5itffxv0o9qe1h` FOREIGN KEY (`payment_id`) REFERENCES `payment` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `installment`
--

LOCK TABLES `installment` WRITE;
/*!40000 ALTER TABLE `installment` DISABLE KEYS */;
INSERT INTO `installment` VALUES ('2025-03-07',1,1846,_binary '9_OO∫Åπô5i\‚g',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-10-04',1,1751160,_binary '	\Á-3\nF¢ø\⁄<ÙÒã',_binary 'ù4≤¿a˝Iúü±\‘nç\÷',NULL),('2024-11-07',1,233777,_binary 'Ä∂\‰˜\‚@\"ÅBx\ÀÍáäÛ',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-09-07',1,1846,_binary '°›ÆÛGNuñµ¥ £:\”K',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-10-07',1,12852000,_binary '#°ßı(]DõO\ÌSNé°',_binary 'h\Í\∆\»\‹eCç|`\Í\Áo',NULL),('2024-10-07',1,2358,_binary '$@õ÷ºoNe¶O5\Z(Sa',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-04',1,1751160,_binary '/˝esMGä\Ïf\÷kµ^\ƒ',_binary 'U\r\ÈS¡˜A⁄â£Gí§+\Î',NULL),('2024-10-04',1,15760500,_binary '1Sø¢ØHl∑≥\È;7',_binary 'â_5\ÕB\ZØ`9¥ó\ÎBú',NULL),('2024-11-07',1,2358,_binary '5\"?\∆\»HKìÇ\ÂΩ‘ú\·',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2025-09-07',1,2358,_binary '5ÑûE£LMÉÅ6$Æî=Åê',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2025-01-07',1,2358,_binary 'B\À…ΩC‹äFB\‘li∂ç',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2025-07-07',1,2358,_binary 'D\Ÿd1nOÍ∏≠2R\ÿ\\ ∂',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2025-08-07',1,2358,_binary 'H¶—†˘≠ICñ]o\Êì[?',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-07',1,233777,_binary 'I˛iã*5N⁄ÄYFÖPß\«',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-05-07',1,1846,_binary 'L\Ák˚k≥AnàéÄoÆ\œè',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-10-07',1,3532500,_binary 'S\›\nîo^L–∂}\Á»∏ÚÚÒ',_binary 'os\r\…^Cqêäa’Ø:µ\‡',NULL),('2025-08-07',1,1846,_binary 'Tf°)ì\ÕA‰øáûΩz\‡L',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-04-07',1,1846,_binary 'Xé¯í\‰AeÅì3Øïx',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-06-07',1,2358,_binary '][\≈\ƒ=GføI{rÇˆÆ',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2025-04-07',1,2358,_binary 'miMqûüDoß≤1M5¥Ü\≈',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-04',1,1751160,_binary 'o*8\‚≠CB\Zµ±T\Õ,ˇç',_binary '≥:∏\·éB«† j»≤',NULL),('2024-12-07',1,233777,_binary 'q*t\≈\»Jƒ¶4û∑ù´Ø',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2024-10-07',1,1846,_binary 'rß\‡\‹P\ËJÁéá\00Æ#\\é',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-02-07',1,2358,_binary 'xΩ\0F\»\√B∞M∫º\≈\⁄v',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-07',1,803250,_binary 'y\'\ËÆ\ÊFñéE€±gJAi',_binary '\„Ä,!˘\ÃDòû\r\·#ûöo~',NULL),('2025-01-10',1,2645,_binary '~.4\ÓE˘ä@)\Ï\‚]&',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2024-10-04',1,1751160,_binary 'Å+∞o—éM\‡ád\ÍÉ\—\Õ:',_binary 'L¨jÒ\Î,LõårL˛p\Ì É',NULL),('2025-06-07',1,233777,_binary 'Å∑a\⁄\ÈòG!µ	s»¶\Ã\À',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-02-07',1,233777,_binary 'Ç˘PªGﬁå{&ñ|od\÷',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2024-11-10',1,2645,_binary 'Çt\Ôüe@´Ä\Ó’íî\ÁÅ',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2024-10-07',1,31521000,_binary 'Ö€ò-†*A\‚£f∑˜§Q',_binary '`Xèû[KCàß•x•r\‰',NULL),('2025-07-07',1,1846,_binary 'ä(2\◊AE›≤\Ë6Æ˘Iª',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-05-07',1,233777,_binary 'íWYçû3N0öæ¶_/BÆ\∆',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2024-10-10',1,2645,_binary 'í\»L*ˇNä±0∏Ò¨®ú',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2024-12-07',1,2358,_binary 'ì´ \√zúK≥@õ`>©î¿',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-04',1,0,_binary 'ô\Ì\’ß\0E‘é¶õU]C\√\¬',_binary 'ôJd`1C\rî\◊4}ˆMÉ',NULL),('2025-02-07',1,1846,_binary '°U≠ö°Mf∞•\ﬂ\Â™O\—\Ê',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-10-04',1,1751180,_binary '®)∑—îEúôùÜ§óú',_binary 'ïéã:PñA∆ù¨\“ÜÚ=',NULL),('2024-10-04',1,2861330,_binary 'Ø\ËO∫Æ\›EZ∂ÜºÕπˇÜ',_binary 't#8_åDJÆ´\Â+)îP',NULL),('2025-03-07',1,233777,_binary '∑è\\∑\›BÕÉÀâÚ%\œ|ù',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-03-10',1,2645,_binary 'π\∆\√¿XrJ¨ù\Êæ\≈ÀΩ4',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2024-11-07',1,1846,_binary 'øv˜r≠_K§ë\√˘NöM˙n',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-01-07',1,1846,_binary '¡pô¶Ö£J\0º}\"\€*\«\Ÿ\Ÿ',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-10-04',1,13837500,_binary '\ƒpÿ≤¶FDxµ•%kà&U]',_binary 'nÙGˆÅ\nD©±%ß¯U\n\Ë',NULL),('2025-01-07',1,233777,_binary 'ŒäcﬂêóFWüÿÄlôúºT',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-06-07',1,1846,_binary 'Œ∞\ÿ\Ân≤Lì¢µeÖ\Ï\‚',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2024-12-10',1,2645,_binary '◊¥ÀÜ.@¡óH\ÍèKò\Â',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2024-10-05',1,10712000,_binary '\€D?˙ìI˜äHãäÚj',_binary 'QQ∞>rBÖÑ\‘\ƒ¿`ÑA',NULL),('2025-02-10',1,2645,_binary '\€\…Qà%K¸õÆ˙û\‚]',_binary 'C∫t\ÀKî∞“¶\ÓU',NULL),('2025-05-07',1,2358,_binary '\‹ÆõAdπã\Z˙à7ø',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-12-07',1,1846,_binary '\‡—ô9:\ÎE@ôH3Åµa¯',_binary '∂±\'hvùJä˘@V\‡iÖ',NULL),('2025-04-07',1,233777,_binary 'Ú1\–¡\ﬁHG’∏0û$öπ',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4',NULL),('2025-03-07',1,2358,_binary 'Ú2åkÚ¿I^∫Ò\\BÄ∏ò',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—',NULL),('2024-10-04',1,30010,_binary '¯À§ë∆çE˘ú\Z±4e\Î',_binary '\‡8’®Û\ÔJ+°>d \€Tï',NULL);
/*!40000 ALTER TABLE `installment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `member`
--

DROP TABLE IF EXISTS `member`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `member` (
  `created_at` datetime(6) DEFAULT NULL,
  `member_id` bigint NOT NULL AUTO_INCREMENT,
  `updated_at` datetime(6) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`member_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `member`
--

LOCK TABLES `member` WRITE;
/*!40000 ALTER TABLE `member` DISABLE KEYS */;
/*!40000 ALTER TABLE `member` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `deleted` bit(1) DEFAULT NULL,
  `payment_status` tinyint DEFAULT NULL,
  `created_at` datetime(6) DEFAULT NULL,
  `price` bigint NOT NULL,
  `updated_at` datetime(6) DEFAULT NULL,
  `card_id` binary(16) DEFAULT NULL,
  `id` binary(16) NOT NULL,
  `approve_number` varchar(255) NOT NULL,
  `store_name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `FK3p7dcrcs9vjpl7trql112tfh6` (`card_id`),
  CONSTRAINT `FK3p7dcrcs9vjpl7trql112tfh6` FOREIGN KEY (`card_id`) REFERENCES `card` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
INSERT INTO `payment` VALUES (_binary '\0',0,'2024-10-04 12:34:18.830824',1751180,'2024-10-04 12:34:18.830851',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '\…\–-≤M±ÇÙaQ\r','CH20241004168509','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.604643',1751180,'2024-10-04 12:36:01.604669',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '\‡?\Ï\ﬂIÿ°\„äˇPFp ','CH20241004375567','Samsung Mall'),(_binary '\0',0,'2024-10-04 13:27:02.109561',0,'2024-10-04 13:27:02.109582',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'ôJd`1C\rî\◊4}ˆMÉ','CR20241004355705','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:24:31.927495',10000000,'2024-10-05 15:24:31.927515',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '\∆\œ1ª˜HÖÖgI∏èxú','CH20241005397791','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-07 13:38:31.492652',60000,'2024-10-07 13:38:31.492681',_binary '=JbljnE5Ñø\‚br*è',_binary 'h\–˝@\‚C-îM£\ÌÜ2Ωı','CH20241007529420','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-07 16:53:29.850477',28300,'2024-10-07 16:53:29.850495',_binary '3\ÁdkîH]™æ◊úX\„',_binary '2A∫âÙÒE¶£\Ì∫vlæ\—','CR20241007239791','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 11:57:31.173379',2861330,'2024-10-04 11:57:31.173438',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '2\∆˛•\‚óFê≤Ö\ÂVÙ¥','CH20241004840744','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:48:27.865264',100000000,'2024-10-04 12:48:27.865287',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '3.´D\‚Gö´˘É∆°∂®','CH20241004861522','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:39:19.618240',1751160,'2024-10-04 12:39:19.618263',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '4á£˘aMN∆†\–6$/{KK','CH20241004156006','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:33:05.023946',1751160,'2024-10-04 12:33:05.023970',_binary '\»\«H`OÈå§ä\»ojê´',_binary '6\”Ú){\’CÅ/\–\Z\rÛ˛','CH20241004766494','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.475195',1751160,'2024-10-04 12:36:01.475217',_binary '\»\«H`OÈå§ä\»ojê´',_binary ';∏\Óâ\ÓYAŸî\Í:≠\Ë:≠å','CH20241004628704','Samsung Mall'),(_binary '\0',0,'2024-10-04 10:26:24.528196',60000,'2024-10-04 10:26:24.528233',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '?≥F\„(ıHöAé1®é˝)','CH20241004490666','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-10 09:53:24.853800',15870,'2024-10-10 09:53:24.853817',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'C∫t\ÀKî∞“¶\ÓU','CR20241010964019','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:46:19.510126',10000000,'2024-10-04 12:46:19.510148',_binary '\»\«H`OÈå§ä\»ojê´',_binary 'I\€\Ôå\ÏL¶©\Z-öUj@\Ë','CH20241004135456','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:34:51.981706',1751160,'2024-10-04 12:34:51.981731',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'L¨jÒ\Î,LõårL˛p\Ì É','CR20241004484896','Samsung Mall'),(_binary '\0',0,'2024-10-05 17:31:01.172971',10712000,'2024-10-05 17:31:01.173001',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'QQ∞>rBÖÑ\‘\ƒ¿`ÑA','CR20241005923747','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:18:56.612274',57480,'2024-10-07 17:18:56.612298',_binary 'µ<õ\»ı@˛ô¢òdR#\⁄',_binary 'R„ãü˙\\AHÑ>\Õuº£\≈','CH20241007854636','SHOP TAGLINE'),(_binary '\0',0,'2024-10-06 16:53:22.795864',4000000,'2024-10-06 16:53:22.795897',_binary '=JbljnE5Ñø\‚br*è',_binary 'R\ÌØ¥\‰I{õ\ÊDIV\ÂΩX','CH20241006654233','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:39:19.489339',1751160,'2024-10-04 12:39:19.489365',_binary '\»\«H`OÈå§ä\»ojê´',_binary 'S\n°JX†Cûñ©ü\ÀA¨©','CH20241004552058','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:18.676320',1751160,'2024-10-04 12:34:18.676344',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'U\r\ÈS¡˜A⁄â£Gí§+\Î','CR20241004754882','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:52.130393',1751180,'2024-10-04 12:34:52.130418',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary 'VUAlâOuå&\Ë\Ëé\Õ¿;','CH20241004767382','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:22.942091',4000000,'2024-10-06 16:53:22.942149',_binary 'ç;Ø°\'\÷AπÜ|Öø\ÏçM2',_binary '`W5§\Ì¸IŒ†^Ú¢ê5','CH20241006998197','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-07 15:34:00.544914',31521000,'2024-10-07 15:34:00.544933',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary '`Xèû[KCàß•x•r\‰','CR20241007919260','Samsung Mall'),(_binary '\0',0,'2024-10-07 15:39:17.042072',12852000,'2024-10-07 15:39:17.042090',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'h\Í\∆\»\‹eCç|`\Í\Áo','CR20241007307083','Samsung Mall'),(_binary '\0',0,'2024-10-04 11:58:15.135184',13837500,'2024-10-04 11:58:15.135207',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'nÙGˆÅ\nD©±%ß¯U\n\Ë','CR20241004988847','SHOP TAGLINE'),(_binary '\0',0,'2024-10-07 12:47:35.413267',3532500,'2024-10-07 12:47:35.413290',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'os\r\…^Cqêäa’Ø:µ\‡','CR20241007257239','Samsung Mall'),(_binary '\0',0,'2024-10-07 16:53:29.833247',28300,'2024-10-07 16:53:29.833273',_binary '∂\ÓM\Í˛ˇC ¶\œ[∏Qr',_binary 'r\Ïõ¡√≠FÌÑõM⁄¥∞Öa','CH20241007265913','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 11:57:30.957219',2861330,'2024-10-04 11:57:30.957254',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 't#8_åDJÆ´\Â+)îP','CR20241004810097','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:34:18.704125',1751160,'2024-10-04 12:34:18.704150',_binary '\»\«H`OÈå§ä\»ojê´',_binary '~¸)XWıBoÖï	-åˆF','CH20241004191897','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:06.249519',4000000,'2024-10-06 16:53:06.249552',_binary 'ç;Ø°\'\÷AπÜ|Öø\ÏçM2',_binary 'á\0´\0B7øüõOâ\0ç','CH20241006825942','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 13:06:16.359308',15760500,'2024-10-04 13:06:16.359354',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'â_5\ÕB\ZØ`9¥ó\ÎBú','CR20241004349944','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:06.116401',4000000,'2024-10-06 16:53:06.116434',_binary '=JbljnE5Ñø\‚br*è',_binary 'ä√∞6ñLïó†tX6s±ˇ','CH20241006879249','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:33:05.159242',1751180,'2024-10-04 12:33:05.159267',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary 'ç55\r\ﬁ)M€ü7\Ÿ7Økr','CH20241004883227','Samsung Mall'),(_binary '\0',0,'2024-10-04 10:30:43.178377',60000,'2024-10-04 10:30:43.178403',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary 'çovWl∫AÙëö#9\ÿ\≈?','CH20241004720996','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 13:01:37.911263',100000000,'2024-10-04 13:01:37.911285',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary 'ê\„TÇisO€á\“˛\n#ÖÚˇ','CH20241004700178','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:39:19.462729',1751180,'2024-10-04 12:39:19.462752',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'ïéã:PñA∆ù¨\“ÜÚ=','CR20241004206999','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.448807',1751160,'2024-10-04 12:36:01.448841',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary 'ù4≤¿a˝Iúü±\‘nç\÷','CR20241004367731','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:37:24.460213',9000,'2024-10-05 15:37:24.460280',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary 'ü»õ{\‹Emª«ô¨\ÿTä|','CH20241005544586','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 13:09:26.970534',1606500,'2024-10-04 13:09:26.970556',_binary 'µ<õ\»ı@˛ô¢òdR#\⁄',_binary '•\∆n\”.®HgíπQ˙KœÜ','CH20241004569812','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:52.010062',1751160,'2024-10-04 12:34:52.010086',_binary '\»\«H`OÈå§ä\»ojê´',_binary '©§¬µöWKxø\Ô|7D´','CH20241004678016','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:47:26.039045',100000000,'2024-10-04 12:47:26.039069',_binary '\»\«H`OÈå§ä\»ojê´',_binary '™T:s*Kü\Ì\Ó\‰\\π\„B','CH20241004677474','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 12:33:04.996990',1751160,'2024-10-04 12:33:04.997013',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary '≥:∏\·éB«† j»≤','CR20241004250893','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:22:02.616906',2104000,'2024-10-07 17:22:02.616922',_binary '3\ÁdkîH]™æ◊úX\„',_binary '¥è?Sá\ŒIœÆ⁄ù\ ¢ã4','CR20241007328959','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:03:17.335844',22160,'2024-10-07 17:03:17.335861',_binary '3\ÁdkîH]™æ◊úX\„',_binary '∂±\'hvùJä˘@V\‡iÖ','CR20241007676917','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 13:27:02.133786',1606500,'2024-10-04 13:27:02.133806',_binary 'µ<õ\»ı@˛ô¢òdR#\⁄',_binary 'π=»®\Â¡N˛µ∑∏\÷}úk\Ê','CH20241004439690','Samsung Mall'),(_binary '\0',0,'2024-10-05 14:59:31.674989',60000,'2024-10-05 14:59:31.675010',_binary '\»\«H`OÈå§ä\»ojê´',_binary 'øπ\0j&Cë´H”Ü\¬\Ÿ}®','CH20241005316494','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-05 15:53:08.792967',3000,'2024-10-05 15:53:08.793004',_binary '\»\«H`OÈå§ä\»ojê´',_binary '\“öÄÆJ\Zí$7©\“À∑','CH20241005771823','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-10 09:53:24.836401',15870,'2024-10-10 09:53:24.836427',_binary '\»\«H`OÈå§ä\»ojê´',_binary '\’g≤<ïrIØçë_\√Mz','CH20241010378742','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 10:25:30.728716',60000,'2024-10-04 10:25:30.728744',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '\◊B“ö1JJ£á\'Àü≥µ9M','CH20241004948311','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-04 10:24:50.086834',60000,'2024-10-04 10:24:50.086860',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '◊Øµ\Õy\œBπ°â´\ÓCÄ\Ó','CH20241004293546','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-07 16:48:25.883546',803250,'2024-10-07 16:48:25.883570',_binary '∂\ÓM\Í˛ˇC ¶\œ[∏Qr',_binary '\€ı2íeOâü7ﬁë£\Ê;','CH20241007222294','Samsung Mall'),(_binary '\0',0,'2024-10-04 11:57:31.037045',2861340,'2024-10-04 11:57:31.037069',_binary '\»\«H`OÈå§ä\»ojê´',_binary 'ﬂæKΩw*L<ó\‡,jQππ\'','CH20241004269543','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 10:29:40.789390',30010,'2024-10-04 10:29:40.789455',_binary ' m˝êF\ÈD°π\\}\ÏxΩR',_binary '\‡8’®Û\ÔJ+°>d \€Tï','CR20241004844439','SHOP TAGLINE'),(_binary '\0',0,'2024-10-07 16:48:25.901268',803250,'2024-10-07 16:48:25.901285',_binary '3\ÁdkîH]™æ◊úX\„',_binary '\„Ä,!˘\ÃDòû\r\·#ûöo~','CR20241007944997','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:53:08.949815',7000,'2024-10-05 15:53:08.949863',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '\Á\‚é\∆húFÑá@\Î\0Cªø','CH20241005307035','Î¨¥Ïã†ÏÇ¨'),(_binary '\0',0,'2024-10-05 15:26:34.553183',20000000,'2024-10-05 15:26:34.553203',_binary 'djHÚ|%J⁄ñ0Ñ+\‡Ò&˝',_binary '¸•¸>4E˘≠ñ\»Z6≤','CH20241005219073','Î¨¥Ïã†ÏÇ¨');
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-10-10 10:31:53
