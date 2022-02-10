-- --------------------------------------------------------
-- Host:                         localhost
-- Versión del servidor:         8.0.28 - MySQL Community Server - GPL
-- SO del servidor:              Linux
-- HeidiSQL Versión:             11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para telepizza
DROP DATABASE IF EXISTS `telepizza`;
CREATE DATABASE IF NOT EXISTS `telepizza` /*!40100 DEFAULT CHARACTER SET latin1 */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `telepizza`;

-- Volcando estructura para tabla telepizza.categories
DROP TABLE IF EXISTS `categories`;
CREATE TABLE IF NOT EXISTS `categories` (
  `categoryId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `categoryName` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `description` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  PRIMARY KEY (`categoryId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.categories: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
REPLACE INTO `categories` (`categoryId`, `categoryName`, `description`) VALUES
	('102077fc-64f1-48d6-9e84-4f1c16753f1f', 'Pasta', 'Delicious pasta'),
	('96b39f84-62af-4240-bf2c-de8d2f4d7b7b', 'Pizza', 'Best Pizza, authentic Italian style, fresh ingredients'),
	('d860057c-6949-4657-8cfb-4bc73f74fe05', 'Salads', 'Descubre nuestras nuevas ensaladas VIPS hechas con ingredientes tan sabrosos como aguacate, queso de cabra, tiras de vacuno marinado o mango. Waikiki, Santorini, Los Ángeles o 5 Quesos ...');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;

-- Volcando estructura para tabla telepizza.category_items
DROP TABLE IF EXISTS `category_items`;
CREATE TABLE IF NOT EXISTS `category_items` (
  `categoryItemId` varchar(36) NOT NULL,
  `categoryItemName` varchar(36) NOT NULL,
  `description` varchar(256) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `categoryId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `price` double NOT NULL DEFAULT '0',
  PRIMARY KEY (`categoryItemId`) USING BTREE,
  KEY `FK_CATEGORIES` (`categoryId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.category_items: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `category_items` DISABLE KEYS */;
REPLACE INTO `category_items` (`categoryItemId`, `categoryItemName`, `description`, `categoryId`, `price`) VALUES
	('0d9c5c97-1267-490e-ae29-242cc6e339ca', 'Ensalada Waikiki', 'Tiras de vacuno marinado a la plancha, mango, pepino, pimiento rojo, cebolla roja, anacardos y un toque de hierbabuena, aliñada con salsa sweet chili y cilantro sobre láminas de wonton y una base de tallarines y mezcla de lechugas con brotes.', 'cecf059e-40de-4d84-9e63-77d4f54c364a', 12.5),
	('5ed2175f-8ce4-4d71-9006-4cc2c2fec717', 'Ensalada Cesar', 'Tiras de vacuno marinado a la plancha, mango, pepino, pimiento rojo, cebolla roja, anacardos y un toque de hierbabuena, aliñada con salsa sweet chili y cilantro sobre láminas de wonton y una base de tallarines y mezcla de lechugas con brotes.', '5c346d49-0d62-458f-ae6e-aef86f323014', 12.5),
	('6fde0d28-8881-4350-b754-27ac17aeb547', 'Traditional Lasagna', 'Home made pasta, ground beef, tomato sauce, bechamel sauce and parmesan', '102077fc-64f1-48d6-9e84-4f1c16753f1f', 11),
	('9c93339c-5d22-464c-b275-64f7b076e9bc', 'Spaghetti carbonara', 'Spaghetti, bacon, egg, garlic, parsley', '102077fc-64f1-48d6-9e84-4f1c16753f1f', 15),
	('c3ea34ed-9885-4908-b328-f288dbc98934', 'Pizza Margherita', 'Tomato sauce, oregano, garlic and fresh basil', '96b39f84-62af-4240-bf2c-de8d2f4d7b7b', 6.5),
	('f15383f9-a188-45b0-9873-cd8226cc4080', 'Spaghetti Pomodoro', 'Spaghetti, tomatoes, mushrooms, garlic, basil', '102077fc-64f1-48d6-9e84-4f1c16753f1f', 9),
	('f6ea36a7-221b-484f-99f8-3fad6febe476', 'Salad Los Angeles', 'Avocado, mango, strawberries, goat cheese, feta cheese, cherry tomato, red onion and walnuts, dressed with lime and coriander vinaigrette on a base of quinoa and mixed lettuce with sprouts.', '5c346d49-0d62-458f-ae6e-aef86f323014', 12.5);
/*!40000 ALTER TABLE `category_items` ENABLE KEYS */;

-- Volcando estructura para tabla telepizza.menus
DROP TABLE IF EXISTS `menus`;
CREATE TABLE IF NOT EXISTS `menus` (
  `menuId` varchar(36) NOT NULL,
  `menuName` varchar(60) NOT NULL,
  PRIMARY KEY (`menuId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.menus: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `menus` DISABLE KEYS */;
REPLACE INTO `menus` (`menuId`, `menuName`) VALUES
	('c3ea34ed-9885-4908-b328-f288dbc98934', 'Italian Menu');
/*!40000 ALTER TABLE `menus` ENABLE KEYS */;

-- Volcando estructura para tabla telepizza.menu_items
DROP TABLE IF EXISTS `menu_items`;
CREATE TABLE IF NOT EXISTS `menu_items` (
  `menuItemId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `menuId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `categoryId` varchar(36) NOT NULL,
  PRIMARY KEY (`menuItemId`) USING BTREE,
  KEY `FK_CATEGORIES` (`categoryId`) USING BTREE,
  KEY `FK_MENUS` (`menuId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.menu_items: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `menu_items` DISABLE KEYS */;
REPLACE INTO `menu_items` (`menuItemId`, `menuId`, `categoryId`) VALUES
	('4740297f-0d57-455d-b48a-f68a4ac7b7cd', 'c3ea34ed-9885-4908-b328-f288dbc98934', '96b39f84-62af-4240-bf2c-de8d2f4d7b7b'),
	('c95e8a50-c1e1-47e5-95bc-7d109a5a06d6', 'c3ea34ed-9885-4908-b328-f288dbc98934', '102077fc-64f1-48d6-9e84-4f1c16753f1f');
/*!40000 ALTER TABLE `menu_items` ENABLE KEYS */;

-- Volcando estructura para tabla telepizza.options
DROP TABLE IF EXISTS `options`;
CREATE TABLE IF NOT EXISTS `options` (
  `optionId` varchar(36) NOT NULL,
  `optionName` varchar(60) NOT NULL,
  `categoryId` varchar(36) NOT NULL,
  `price` double NOT NULL,
  KEY `PRIMARY_KEY` (`optionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.options: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `options` DISABLE KEYS */;
REPLACE INTO `options` (`optionId`, `optionName`, `categoryId`, `price`) VALUES
	('30c5beb4-e717-401c-93d3-c77e9665ac86', 'Crust', '96b39f84-62af-4240-bf2c-de8d2f4d7b7b', 0.5);
/*!40000 ALTER TABLE `options` ENABLE KEYS */;

-- Volcando estructura para tabla telepizza.option_items
DROP TABLE IF EXISTS `option_items`;
CREATE TABLE IF NOT EXISTS `option_items` (
  `optionItemId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `optionItemName` varchar(60) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `optionId` varchar(36) CHARACTER SET latin1 COLLATE latin1_swedish_ci NOT NULL,
  `price` double NOT NULL,
  PRIMARY KEY (`optionItemId`),
  KEY `FK_OPTIONS` (`optionId`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- Volcando datos para la tabla telepizza.option_items: ~0 rows (aproximadamente)
/*!40000 ALTER TABLE `option_items` DISABLE KEYS */;
REPLACE INTO `option_items` (`optionItemId`, `optionItemName`, `optionId`, `price`) VALUES
	('2c0c77a7-d032-45e6-9165-f8940daef8bf', 'Crispy', '30c5beb4-e717-401c-93d3-c77e9665ac86', 0.4),
	('e129df30-17e2-4413-b8f3-a2a52af407c1', 'Thick', '30c5beb4-e717-401c-93d3-c77e9665ac86', 0.25);
/*!40000 ALTER TABLE `option_items` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
