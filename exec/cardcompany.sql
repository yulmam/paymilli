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
INSERT INTO `card` VALUES (0,_binary '\0','2024-10-07 16:09:23.142516','2024-10-07 16:09:23.142542',_binary '3\�dk�H]��לX\�','0018952659833229','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-credit.png','루비 오늘은 치팅데이 카드','1002111771224656','8030','522','0929','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-07 15:58:18.715383','2024-10-07 15:58:18.715410',_binary '�u��DN���N�]\�\�','0011719572553239','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-credit.png','토파즈 오늘도 출근 카드','3249183119914279','8030','716','0830','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-04 13:08:10.941581','2024-10-04 13:08:10.941611',_binary '�<�\��@����dR#\�','0012477502750521','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile 체크 카드','1232321135537890','8030','633','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(0,_binary '\0','2024-10-04 10:20:05.029825','2024-10-04 10:20:05.029859',_binary ' m��F\�D��\\}\�x�R','0018494492834720','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile 카드','1002321135537890','8030','633','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(1,_binary '\0','2024-10-06 15:49:12.729355','2024-10-06 15:49:12.729388',_binary '=JbljnE5��\�br*�','0012200497043118','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile 체크 카드','5107371881564421','8030','626','0830','738415b7-9bdf-4077-9841-7c85278a9e28'),(1,_binary '\0','2024-10-07 12:39:43.229127','2024-10-07 12:39:43.229157',_binary 'G\�0iRBD��\�\�~T�','0018339864245975','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-check.png','Topaz 오늘도 화이팅 카드','7245282054804725','8030','385','0629','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-04 10:19:59.275265','2024-10-04 10:19:59.275299',_binary 'djH�|%Jږ0�+\��&�','0017565632531105','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Diamond 트래블 Y 체크카드','5829081046713523','8030','425','0830','5fd49eef-9b5a-484a-bec0-623af309d071'),(1,_binary '\0','2024-10-06 16:16:44.574365','2024-10-06 16:16:44.574398',_binary '�;��\'\�A��|��\�M2','0018561714115925','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Ruby Every Mile 체크 카드','6123732459152321','8030','425','0828','738415b7-9bdf-4077-9841-7c85278a9e28'),(0,_binary '\0','2024-10-07 12:45:19.053494','2024-10-07 12:45:19.053524',_binary '�\�3���D\r���Z�&u','0013796517131508','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/ruby-check.png','Ruby Every Mile 카드','1002495314465242','8030','824','2910','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-07 16:12:39.008334','2024-10-07 16:12:39.008360',_binary '�\�M\���Cʦ\�[�Qr','0011114653966815','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-check.png','다이아몬드 행복한 반려생활 카드','3145173019423197','8030','416','0830','803b2858-1984-4b22-9f87-25b3fc7f6f0c'),(1,_binary '\0','2024-10-07 13:36:31.675144','2024-10-07 13:36:31.675174',_binary '�\�/C4�G���\���l','0019180504316120','TaeHyeon Lee','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/diamond-credit.png','Diamond 트래블 X 카드','5249182054913713','8030','725','0828','c552fd7c-784c-4c88-af42-8670012c7cf8'),(1,_binary '\0','2024-10-04 10:19:53.914604','2024-10-04 10:19:53.914679',_binary '\�\�H`O錤�\�oj��','0018494492834720','Haneol Kim','https://cardcompany-bucket.s3.ap-northeast-2.amazonaws.com/topaz-check.png','Topaz 오늘도 화이팅 체크카드','5389083056812503','1234','325','0830','5fd49eef-9b5a-484a-bec0-623af309d071');
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
INSERT INTO `installment` VALUES ('2025-03-07',1,1846,_binary '9_OO����5i\�g',_binary '��\'hv�J��@V\�i�',NULL),('2024-10-04',1,1751160,_binary '	�\�-3\nF��\�<��',_binary '�4��a�I����\�n�\�',NULL),('2024-11-07',1,233777,_binary '��\��\�@\"�Bx\�ꇊ�',_binary '��?S�\�IϮڝ\���4',NULL),('2025-09-07',1,1846,_binary '�ݮ�GNu���ʣ:\�K',_binary '��\'hv�J��@V\�i�',NULL),('2024-10-07',1,12852000,_binary '#���(]D�O\�SN��',_binary 'h\�\�\�\�eC�|`\�\�o',NULL),('2024-10-07',1,2358,_binary '$@�ּoNe�O5\Z(Sa',_binary '2A����E��\�vl�\�',NULL),('2024-10-04',1,1751160,_binary '/�esMG�\�f\�k�^\�',_binary 'U\r\�S��Aډ�G��+\�',NULL),('2024-10-04',1,15760500,_binary '1S���Hl��\�;7',_binary '�_5\�B\Z�`9��\�B�',NULL),('2024-11-07',1,2358,_binary '5\"?\�\�HK��\�Ԝ\�',_binary '2A����E��\�vl�\�',NULL),('2025-09-07',1,2358,_binary '5��E�LM��6$��=��',_binary '2A����E��\�vl�\�',NULL),('2025-01-07',1,2358,_binary 'B\�ɽC܊FB\�li��',_binary '2A����E��\�vl�\�',NULL),('2025-07-07',1,2358,_binary 'D\�d1nO긭2R\�\\ʶ',_binary '2A����E��\�vl�\�',NULL),('2025-08-07',1,2358,_binary 'H�Ѡ��IC�]o\�[?',_binary '2A����E��\�vl�\�',NULL),('2024-10-07',1,233777,_binary 'I�i�*5NڀYF�P�\�',_binary '��?S�\�IϮڝ\���4',NULL),('2025-05-07',1,1846,_binary 'L\�k�k�An���o�\��',_binary '��\'hv�J��@V\�i�',NULL),('2024-10-07',1,3532500,_binary 'S\�\n�o^Lж}\�ȸ���',_binary 'os\r\�^Cq��aկ:�\�',NULL),('2025-08-07',1,1846,_binary 'Tf�)�\�A俇��z\�L',_binary '��\'hv�J��@V\�i�',NULL),('2025-04-07',1,1846,_binary 'X���\�Ae��3��x',_binary '��\'hv�J��@V\�i�',NULL),('2025-06-07',1,2358,_binary '][\�\�=Gf�I{r���',_binary '2A����E��\�vl�\�',NULL),('2025-04-07',1,2358,_binary 'miMq��Do��1M5��\�',_binary '2A����E��\�vl�\�',NULL),('2024-10-04',1,1751160,_binary 'o*8\�CB\Z��T\�,��',_binary '�:�\�BǠ jȲ',NULL),('2024-12-07',1,233777,_binary 'q*t\�\�JĦ4�����',_binary '��?S�\�IϮڝ\���4',NULL),('2024-10-07',1,1846,_binary 'r�\�\�P\�J率\00�#\\�',_binary '��\'hv�J��@V\�i�',NULL),('2025-02-07',1,2358,_binary 'x�\0F\�\�B�M��\�\�v',_binary '2A����E��\�vl�\�',NULL),('2024-10-07',1,803250,_binary 'y\'\�\�F��E۱gJAi',_binary '\�,!�\�D��\r\�#��o~',NULL),('2025-01-10',1,2645,_binary '~.4\�E��@)\�\�]&',_binary 'C�t\�K��Ҧ\�U',NULL),('2024-10-04',1,1751160,_binary '�+�oюM\��d\�\�\��:',_binary 'L�j�\�,L��rL�p\� �',NULL),('2025-06-07',1,233777,_binary '��a\�\�G!�	sȦ\�\�',_binary '��?S�\�IϮڝ\���4',NULL),('2025-02-07',1,233777,_binary '��P�Gތ{&�|od\�',_binary '��?S�\�IϮڝ\���4',NULL),('2024-11-10',1,2645,_binary '�t\�e@��\�Ւ�\�',_binary 'C�t\�K��Ҧ\�U',NULL),('2024-10-07',1,31521000,_binary '�ۘ-�*A\�f���Q',_binary '`X��[KC���x�r\�',NULL),('2025-07-07',1,1846,_binary '�(2\�AEݲ\�6��I�',_binary '��\'hv�J��@V\�i�',NULL),('2025-05-07',1,233777,_binary '�WY��3N0���_/B�\�',_binary '��?S�\�IϮڝ\���4',NULL),('2024-10-10',1,2645,_binary '�\�L*�N��0�񬨜',_binary 'C�t\�K��Ҧ\�U',NULL),('2024-12-07',1,2358,_binary '�� \�z�K�@�`>���',_binary '2A����E��\�vl�\�',NULL),('2024-10-04',1,0,_binary '�\�\��\0EԎ��U]C\�\�',_binary '�Jd`1C\r�\�4}�M�',NULL),('2025-02-07',1,1846,_binary '�U���Mf��\�\�O\�\�',_binary '��\'hv�J��@V\�i�',NULL),('2024-10-04',1,1751180,_binary '�)�єE�������',_binary '���:P�AƝ�\���=',NULL),('2024-10-04',1,2861330,_binary '�\�O��\�EZ���͹��',_binary 't#8_�DJ��\�+)�P',NULL),('2025-03-07',1,233777,_binary '��\\�\�B̓ˉ�%\�|�',_binary '��?S�\�IϮڝ\���4',NULL),('2025-03-10',1,2645,_binary '�\�\��XrJ��\��\�˽4',_binary 'C�t\�K��Ҧ\�U',NULL),('2024-11-07',1,1846,_binary '�v�r�_K��\��N�M�n',_binary '��\'hv�J��@V\�i�',NULL),('2025-01-07',1,1846,_binary '�p����J\0�}\"\�*\�\�\�',_binary '��\'hv�J��@V\�i�',NULL),('2024-10-04',1,13837500,_binary '\�pز�FDx��%k�&U]',_binary 'n�G��\nD��%��U\n\�',NULL),('2025-01-07',1,233777,_binary 'Ίcߐ�FW�؀l���T',_binary '��?S�\�IϮڝ\���4',NULL),('2025-06-07',1,1846,_binary 'ΰ\�\�n�L���e�\�\�',_binary '��\'hv�J��@V\�i�',NULL),('2024-12-10',1,2645,_binary '״ˆ.@��H\�K�\�',_binary 'C�t\�K��Ҧ\�U',NULL),('2024-10-05',1,10712000,_binary '\�D?��I��H���j',_binary 'QQ�>rB��\�\��`�A',NULL),('2025-02-10',1,2645,_binary '\��\�Q�%K�����\�]',_binary 'C�t\�K��Ҧ\�U',NULL),('2025-05-07',1,2358,_binary '\���Ad���\Z��7�',_binary '2A����E��\�vl�\�',NULL),('2024-12-07',1,1846,_binary '\�љ9:\�E@�H3��a�',_binary '��\'hv�J��@V\�i�',NULL),('2025-04-07',1,233777,_binary '�1\��\�HGո0�$��',_binary '��?S�\�IϮڝ\���4',NULL),('2025-03-07',1,2358,_binary '�2�k��I^��\\B���',_binary '2A����E��\�vl�\�',NULL),('2024-10-04',1,30010,_binary '�ˤ�ƍE��\Z�4e\�',_binary '\�8ը�\�J+�>d \�T�',NULL);
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
INSERT INTO `payment` VALUES (_binary '\0',0,'2024-10-04 12:34:18.830824',1751180,'2024-10-04 12:34:18.830851',_binary 'djH�|%Jږ0�+\��&�',_binary '\�\�-�M���aQ\r','CH20241004168509','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.604643',1751180,'2024-10-04 12:36:01.604669',_binary 'djH�|%Jږ0�+\��&�',_binary '\�?\�\�Iء\��PFp ','CH20241004375567','Samsung Mall'),(_binary '\0',0,'2024-10-04 13:27:02.109561',0,'2024-10-04 13:27:02.109582',_binary ' m��F\�D��\\}\�x�R',_binary '�Jd`1C\r�\�4}�M�','CR20241004355705','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:24:31.927495',10000000,'2024-10-05 15:24:31.927515',_binary 'djH�|%Jږ0�+\��&�',_binary '\�\�1��H��gI��x�','CH20241005397791','무신사'),(_binary '\0',0,'2024-10-07 13:38:31.492652',60000,'2024-10-07 13:38:31.492681',_binary '=JbljnE5��\�br*�',_binary 'h\��@\�C-�M�\�2��','CH20241007529420','무신사'),(_binary '\0',0,'2024-10-07 16:53:29.850477',28300,'2024-10-07 16:53:29.850495',_binary '3\�dk�H]��לX\�',_binary '2A����E��\�vl�\�','CR20241007239791','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 11:57:31.173379',2861330,'2024-10-04 11:57:31.173438',_binary 'djH�|%Jږ0�+\��&�',_binary '2\���\�F���\�V��','CH20241004840744','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:48:27.865264',100000000,'2024-10-04 12:48:27.865287',_binary 'djH�|%Jږ0�+\��&�',_binary '3.�D\�G����ơ��','CH20241004861522','무신사'),(_binary '\0',0,'2024-10-04 12:39:19.618240',1751160,'2024-10-04 12:39:19.618263',_binary 'djH�|%Jږ0�+\��&�',_binary '4���aMNƠ\�6$/{KK','CH20241004156006','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:33:05.023946',1751160,'2024-10-04 12:33:05.023970',_binary '\�\�H`O錤�\�oj��',_binary '6\��){\�C�/\�\Z\r��','CH20241004766494','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.475195',1751160,'2024-10-04 12:36:01.475217',_binary '\�\�H`O錤�\�oj��',_binary ';�\�\�YAٔ\�:�\�:��','CH20241004628704','Samsung Mall'),(_binary '\0',0,'2024-10-04 10:26:24.528196',60000,'2024-10-04 10:26:24.528233',_binary 'djH�|%Jږ0�+\��&�',_binary '?�F\�(�H�A�1���)','CH20241004490666','무신사'),(_binary '\0',0,'2024-10-10 09:53:24.853800',15870,'2024-10-10 09:53:24.853817',_binary ' m��F\�D��\\}\�x�R',_binary 'C�t\�K��Ҧ\�U','CR20241010964019','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:46:19.510126',10000000,'2024-10-04 12:46:19.510148',_binary '\�\�H`O錤�\�oj��',_binary 'I\�\�\�L��\Z-�Uj@\�','CH20241004135456','무신사'),(_binary '\0',0,'2024-10-04 12:34:51.981706',1751160,'2024-10-04 12:34:51.981731',_binary ' m��F\�D��\\}\�x�R',_binary 'L�j�\�,L��rL�p\� �','CR20241004484896','Samsung Mall'),(_binary '\0',0,'2024-10-05 17:31:01.172971',10712000,'2024-10-05 17:31:01.173001',_binary ' m��F\�D��\\}\�x�R',_binary 'QQ�>rB��\�\��`�A','CR20241005923747','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:18:56.612274',57480,'2024-10-07 17:18:56.612298',_binary '�<�\��@����dR#\�',_binary 'R㋟�\\AH�>\�u��\�','CH20241007854636','SHOP TAGLINE'),(_binary '\0',0,'2024-10-06 16:53:22.795864',4000000,'2024-10-06 16:53:22.795897',_binary '=JbljnE5��\�br*�',_binary 'R\�\�I{�\�DIV\�X','CH20241006654233','무신사'),(_binary '\0',0,'2024-10-04 12:39:19.489339',1751160,'2024-10-04 12:39:19.489365',_binary '\�\�H`O錤�\�oj��',_binary 'S\n�JX�C����\�A��','CH20241004552058','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:18.676320',1751160,'2024-10-04 12:34:18.676344',_binary ' m��F\�D��\\}\�x�R',_binary 'U\r\�S��Aډ�G��+\�','CR20241004754882','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:52.130393',1751180,'2024-10-04 12:34:52.130418',_binary 'djH�|%Jږ0�+\��&�',_binary 'VUAl�Ou�&\�\�\��;','CH20241004767382','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:22.942091',4000000,'2024-10-06 16:53:22.942149',_binary '�;��\'\�A��|��\�M2',_binary '`W5�\��IΠ^��5','CH20241006998197','무신사'),(_binary '\0',0,'2024-10-07 15:34:00.544914',31521000,'2024-10-07 15:34:00.544933',_binary ' m��F\�D��\\}\�x�R',_binary '`X��[KC���x�r\�','CR20241007919260','Samsung Mall'),(_binary '\0',0,'2024-10-07 15:39:17.042072',12852000,'2024-10-07 15:39:17.042090',_binary ' m��F\�D��\\}\�x�R',_binary 'h\�\�\�\�eC�|`\�\�o','CR20241007307083','Samsung Mall'),(_binary '\0',0,'2024-10-04 11:58:15.135184',13837500,'2024-10-04 11:58:15.135207',_binary ' m��F\�D��\\}\�x�R',_binary 'n�G��\nD��%��U\n\�','CR20241004988847','SHOP TAGLINE'),(_binary '\0',0,'2024-10-07 12:47:35.413267',3532500,'2024-10-07 12:47:35.413290',_binary ' m��F\�D��\\}\�x�R',_binary 'os\r\�^Cq��aկ:�\�','CR20241007257239','Samsung Mall'),(_binary '\0',0,'2024-10-07 16:53:29.833247',28300,'2024-10-07 16:53:29.833273',_binary '�\�M\���Cʦ\�[�Qr',_binary 'r\��íF턛Mڴ��a','CH20241007265913','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 11:57:30.957219',2861330,'2024-10-04 11:57:30.957254',_binary ' m��F\�D��\\}\�x�R',_binary 't#8_�DJ��\�+)�P','CR20241004810097','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 12:34:18.704125',1751160,'2024-10-04 12:34:18.704150',_binary '\�\�H`O錤�\�oj��',_binary '~�)XW�Bo��	-��F','CH20241004191897','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:06.249519',4000000,'2024-10-06 16:53:06.249552',_binary '�;��\'\�A��|��\�M2',_binary '�\0�\0B7���O�\0�','CH20241006825942','무신사'),(_binary '\0',0,'2024-10-04 13:06:16.359308',15760500,'2024-10-04 13:06:16.359354',_binary ' m��F\�D��\\}\�x�R',_binary '�_5\�B\Z�`9��\�B�','CR20241004349944','Samsung Mall'),(_binary '\0',0,'2024-10-06 16:53:06.116401',4000000,'2024-10-06 16:53:06.116434',_binary '=JbljnE5��\�br*�',_binary '�ð6�L���tX6s��','CH20241006879249','무신사'),(_binary '\0',0,'2024-10-04 12:33:05.159242',1751180,'2024-10-04 12:33:05.159267',_binary 'djH�|%Jږ0�+\��&�',_binary '�55\r\�)M۟7\�7�kr','CH20241004883227','Samsung Mall'),(_binary '\0',0,'2024-10-04 10:30:43.178377',60000,'2024-10-04 10:30:43.178403',_binary 'djH�|%Jږ0�+\��&�',_binary '�ovWl�A���#9\�\�?','CH20241004720996','무신사'),(_binary '\0',0,'2024-10-04 13:01:37.911263',100000000,'2024-10-04 13:01:37.911285',_binary 'djH�|%Jږ0�+\��&�',_binary '�\�T�isOۇ\��\n#���','CH20241004700178','무신사'),(_binary '\0',0,'2024-10-04 12:39:19.462729',1751180,'2024-10-04 12:39:19.462752',_binary ' m��F\�D��\\}\�x�R',_binary '���:P�AƝ�\���=','CR20241004206999','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:36:01.448807',1751160,'2024-10-04 12:36:01.448841',_binary ' m��F\�D��\\}\�x�R',_binary '�4��a�I����\�n�\�','CR20241004367731','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:37:24.460213',9000,'2024-10-05 15:37:24.460280',_binary 'djH�|%Jږ0�+\��&�',_binary '�ț{\�Em�Ǚ�\�T�|','CH20241005544586','무신사'),(_binary '\0',0,'2024-10-04 13:09:26.970534',1606500,'2024-10-04 13:09:26.970556',_binary '�<�\��@����dR#\�',_binary '�\�n\�.�Hg��Q�Kφ','CH20241004569812','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:34:52.010062',1751160,'2024-10-04 12:34:52.010086',_binary '\�\�H`O錤�\�oj��',_binary '��µ�WKx�\�|7D�','CH20241004678016','Samsung Mall'),(_binary '\0',0,'2024-10-04 12:47:26.039045',100000000,'2024-10-04 12:47:26.039069',_binary '\�\�H`O錤�\�oj��',_binary '�T:s*K�\�\�\�\\�\�B','CH20241004677474','무신사'),(_binary '\0',0,'2024-10-04 12:33:04.996990',1751160,'2024-10-04 12:33:04.997013',_binary ' m��F\�D��\\}\�x�R',_binary '�:�\�BǠ jȲ','CR20241004250893','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:22:02.616906',2104000,'2024-10-07 17:22:02.616922',_binary '3\�dk�H]��לX\�',_binary '��?S�\�IϮڝ\���4','CR20241007328959','Samsung Mall'),(_binary '\0',0,'2024-10-07 17:03:17.335844',22160,'2024-10-07 17:03:17.335861',_binary '3\�dk�H]��לX\�',_binary '��\'hv�J��@V\�i�','CR20241007676917','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 13:27:02.133786',1606500,'2024-10-04 13:27:02.133806',_binary '�<�\��@����dR#\�',_binary '�=Ȩ\��N����\�}�k\�','CH20241004439690','Samsung Mall'),(_binary '\0',0,'2024-10-05 14:59:31.674989',60000,'2024-10-05 14:59:31.675010',_binary '\�\�H`O錤�\�oj��',_binary '��\0j&C��Hӆ\�\�}�','CH20241005316494','무신사'),(_binary '\0',0,'2024-10-05 15:53:08.792967',3000,'2024-10-05 15:53:08.793004',_binary '\�\�H`O錤�\�oj��',_binary '\����J\Z�$7�\�˷','CH20241005771823','무신사'),(_binary '\0',0,'2024-10-10 09:53:24.836401',15870,'2024-10-10 09:53:24.836427',_binary '\�\�H`O錤�\�oj��',_binary '\�g�<�rI���_\�Mz','CH20241010378742','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 10:25:30.728716',60000,'2024-10-04 10:25:30.728744',_binary 'djH�|%Jږ0�+\��&�',_binary '\�BҚ1JJ��\'˟��9M','CH20241004948311','무신사'),(_binary '\0',0,'2024-10-04 10:24:50.086834',60000,'2024-10-04 10:24:50.086860',_binary 'djH�|%Jږ0�+\��&�',_binary 'ׯ�\�y\�B����\�C�\�','CH20241004293546','무신사'),(_binary '\0',0,'2024-10-07 16:48:25.883546',803250,'2024-10-07 16:48:25.883570',_binary '�\�M\���Cʦ\�[�Qr',_binary '\��2�eO��7ޑ�\�;','CH20241007222294','Samsung Mall'),(_binary '\0',0,'2024-10-04 11:57:31.037045',2861340,'2024-10-04 11:57:31.037069',_binary '\�\�H`O錤�\�oj��',_binary '߾K�w*L<�\�,jQ��\'','CH20241004269543','SHOP TAGLINE'),(_binary '\0',0,'2024-10-04 10:29:40.789390',30010,'2024-10-04 10:29:40.789455',_binary ' m��F\�D��\\}\�x�R',_binary '\�8ը�\�J+�>d \�T�','CR20241004844439','SHOP TAGLINE'),(_binary '\0',0,'2024-10-07 16:48:25.901268',803250,'2024-10-07 16:48:25.901285',_binary '3\�dk�H]��לX\�',_binary '\�,!�\�D��\r\�#��o~','CR20241007944997','Samsung Mall'),(_binary '\0',0,'2024-10-05 15:53:08.949815',7000,'2024-10-05 15:53:08.949863',_binary 'djH�|%Jږ0�+\��&�',_binary '\�\�\�h�F��@\�\0C��','CH20241005307035','무신사'),(_binary '\0',0,'2024-10-05 15:26:34.553183',20000000,'2024-10-05 15:26:34.553203',_binary 'djH�|%Jږ0�+\��&�',_binary '���>4E���\�Z6�','CH20241005219073','무신사');
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
