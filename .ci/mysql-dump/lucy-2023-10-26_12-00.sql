-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия сервера:               5.7.43 - MySQL Community Server (GPL)
-- Операционная система:         Linux
-- HeidiSQL Версия:              11.2.0.6213
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дамп структуры базы данных lucy
CREATE DATABASE IF NOT EXISTS `lucy` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `lucy`;

-- Дамп структуры для таблица lucy.goods
CREATE TABLE IF NOT EXISTS `goods` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы lucy.goods: ~1 rows (приблизительно)
DELETE FROM `goods`;
/*!40000 ALTER TABLE `goods` DISABLE KEYS */;
INSERT INTO `goods` (`id`, `title`) VALUES
	(1, 'L42321 SM'),
	(2, 'L5555 SM');
/*!40000 ALTER TABLE `goods` ENABLE KEYS */;

-- Дамп структуры для таблица lucy.logs
CREATE TABLE IF NOT EXISTS `logs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `method` varchar(10) NOT NULL,
  `url` varchar(255) NOT NULL,
  `request` text NOT NULL,
  `response` text NOT NULL,
  `status` varchar(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- Дамп данных таблицы lucy.logs: ~0 rows (приблизительно)
DELETE FROM `logs`;
/*!40000 ALTER TABLE `logs` DISABLE KEYS */;
/*!40000 ALTER TABLE `logs` ENABLE KEYS */;

-- Дамп структуры для таблица lucy.placements
CREATE TABLE IF NOT EXISTS `placements` (
  `id` int(7) NOT NULL AUTO_INCREMENT,
  `good_id` int(5) NOT NULL,
  `section_id` int(5) NOT NULL,
  `quantity` int(5) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы lucy.placements: ~5 rows (приблизительно)
DELETE FROM `placements`;
/*!40000 ALTER TABLE `placements` DISABLE KEYS */;
INSERT INTO `placements` (`id`, `good_id`, `section_id`, `quantity`) VALUES
	(1, 1, 1, 5),
	(2, 1, 20, 7),
	(3, 2, 35, 1),
	(4, 1, 37, 3);
/*!40000 ALTER TABLE `placements` ENABLE KEYS */;

-- Дамп структуры для таблица lucy.racks
CREATE TABLE IF NOT EXISTS `racks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы lucy.racks: ~6 rows (приблизительно)
DELETE FROM `racks`;
/*!40000 ALTER TABLE `racks` DISABLE KEYS */;
INSERT INTO `racks` (`id`, `title`) VALUES
	(1, 'AA'),
	(2, 'AB'),
	(3, 'BA'),
	(4, 'BB'),
	(5, 'CA'),
	(6, 'CB');
/*!40000 ALTER TABLE `racks` ENABLE KEYS */;

-- Дамп структуры для таблица lucy.sections
CREATE TABLE IF NOT EXISTS `sections` (
  `id` int(5) NOT NULL AUTO_INCREMENT,
  `rack_id` tinyint(2) NOT NULL,
  `title` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;

-- Дамп данных таблицы lucy.sections: ~42 rows (приблизительно)
DELETE FROM `sections`;
/*!40000 ALTER TABLE `sections` DISABLE KEYS */;
INSERT INTO `sections` (`id`, `rack_id`, `title`) VALUES
	(1, 1, '1'),
	(2, 1, '2'),
	(3, 1, '3'),
	(4, 1, '4'),
	(5, 1, '5'),
	(6, 1, '6'),
	(7, 1, '7'),
	(8, 1, '8'),
	(9, 1, '9'),
	(10, 1, '10'),
	(11, 2, '1'),
	(12, 2, '2'),
	(13, 2, '3'),
	(14, 2, '4'),
	(15, 2, '5'),
	(16, 2, '6'),
	(17, 2, '7'),
	(18, 2, '8'),
	(19, 3, '1'),
	(20, 3, '2'),
	(21, 3, '3'),
	(22, 3, '4'),
	(23, 3, '5'),
	(24, 3, '6'),
	(25, 4, '1'),
	(26, 4, '2'),
	(27, 4, '3'),
	(28, 4, '4'),
	(29, 5, '1'),
	(30, 5, '2'),
	(31, 5, '3'),
	(32, 5, '4'),
	(33, 5, '5'),
	(34, 5, '6'),
	(35, 6, '1'),
	(36, 6, '2'),
	(37, 6, '3'),
	(38, 6, '4'),
	(39, 6, '5'),
	(40, 6, '6'),
	(41, 6, '7'),
	(42, 6, '8');
/*!40000 ALTER TABLE `sections` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
