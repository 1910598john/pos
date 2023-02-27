-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 27, 2023 at 08:58 AM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `auth`
--

CREATE TABLE `auth` (
  `id` int(6) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `auth`
--

INSERT INTO `auth` (`id`, `username`, `password`) VALUES
(1, 'admin', 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `cafe_report`
--

CREATE TABLE `cafe_report` (
  `id` int(10) NOT NULL,
  `ticket` varchar(10) NOT NULL,
  `item` varchar(30) NOT NULL,
  `amount` int(10) NOT NULL,
  `user` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `table_id` varchar(10) NOT NULL,
  `year` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cashier_auth`
--

CREATE TABLE `cashier_auth` (
  `id` int(20) NOT NULL,
  `name` varchar(30) NOT NULL,
  `username` varchar(30) NOT NULL,
  `password` varchar(30) NOT NULL,
  `logged_in` varchar(30) NOT NULL,
  `logged_out` varchar(30) NOT NULL,
  `balance` int(30) NOT NULL,
  `last_id` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cashier_auth`
--

INSERT INTO `cashier_auth` (`id`, `name`, `username`, `password`, `logged_in`, `logged_out`, `balance`, `last_id`, `status`) VALUES
(2, 'John', 'jmcatamora', 'invoker123', '03:39 PM', '03:41 PM', 0, '79', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `detailed_report`
--

CREATE TABLE `detailed_report` (
  `id` int(10) NOT NULL,
  `section` varchar(30) NOT NULL,
  `ticketNumber` varchar(10) NOT NULL,
  `item` varchar(30) NOT NULL,
  `amount` varchar(50) NOT NULL,
  `discounted` varchar(30) NOT NULL,
  `user` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `year` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `items`
--

CREATE TABLE `items` (
  `id` int(10) NOT NULL,
  `section` varchar(30) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL,
  `price` varchar(30) NOT NULL,
  `discount` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `items`
--

INSERT INTO `items` (`id`, `section`, `name`, `description`, `price`, `discount`) VALUES
(1, '', '1 hour', '60 minutes', '150', '0'),
(2, 'play', '1 hour', '60 minutes', '150', '0'),
(3, 'play', '2 hours', '120 minutes', '200', '0'),
(4, 'play', 'Unlimited', 'No time', '250', '0'),
(5, 'play', 'Half hour', '30 minutes', '90', '0'),
(6, 'play', 'Adults pass', 'Socks', '50', '0'),
(7, 'play', 'Adult pass', 'Socks', '40', '0');

-- --------------------------------------------------------

--
-- Table structure for table `playground_report`
--

CREATE TABLE `playground_report` (
  `id` int(10) NOT NULL,
  `ticketNumber` varchar(4) NOT NULL,
  `item` varchar(30) NOT NULL,
  `amount` int(10) NOT NULL,
  `user` varchar(30) NOT NULL,
  `time` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `year` varchar(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `playground_time`
--

CREATE TABLE `playground_time` (
  `id` int(6) NOT NULL,
  `ticketID` varchar(10) NOT NULL,
  `item` varchar(30) NOT NULL,
  `remaining_time` varchar(30) NOT NULL,
  `status` varchar(30) NOT NULL,
  `date` varchar(30) NOT NULL,
  `extended` varchar(30) NOT NULL,
  `end_time` varchar(30) NOT NULL,
  `year` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(30) NOT NULL,
  `description` varchar(30) NOT NULL,
  `price` varchar(10) NOT NULL,
  `discount` int(10) NOT NULL,
  `stock` int(10) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `stock`) VALUES
(13, 'A1 (HOT)', 'HK style Milk Tea', '90', 40, NULL),
(14, 'A1 (ICED)', 'HK style Milk Tea', '130', 40, NULL),
(15, 'A2 (HOT)', 'Matcha Milk', '90', 40, NULL),
(16, 'A2 (ICED)', 'Matcha Milk', '130', 40, NULL),
(17, 'A3 (HOT)', 'Coffee', '90', 40, NULL),
(18, 'A3 (ICED)', 'Coffee', '130', 40, NULL),
(19, 'A4 (HOT)', 'Coffee Hazelnut', '90', 40, NULL),
(20, 'A4 (ICED)', 'Coffee Hazelnut', '130', 40, NULL),
(21, 'A5 (HOT)', 'Milo', '90', 40, NULL),
(22, 'A5 (ICED)', 'Milo', '130', 40, NULL),
(23, 'A6 (HOT)', 'Ovaltine', '90', 40, NULL),
(24, 'A6 (ICED)', 'Ovaltine', '130', 40, NULL),
(25, 'A7 (HOT)', 'Chocolate', '90', 40, NULL),
(26, 'A7 (ICED)', 'Chocolate', '130', 40, NULL),
(27, 'A8 (HOT)', 'Chocolate Hazelnut', '90', 40, NULL),
(28, 'A8 (ICED)', 'Chocolate Hazelnut', '130', 40, NULL),
(29, 'A9 (HOT)', 'Horlicks', '90', 40, NULL),
(30, 'A9 (ICED)', 'Horlicks', '130', 40, NULL),
(31, 'ADD ON', 'Ice cream, Toppings, Sauce', '80', 40, NULL),
(32, 'B1 (HOT)', 'Lemon Tea', '90', 40, NULL),
(33, 'B1 (ICED)', 'Lemon Tea', '130', 40, NULL),
(34, 'B2 (HOT)', 'Lemon Water', '90', 40, NULL),
(35, 'B2 (ICED)', 'Lemon Water', '130', 40, NULL),
(36, 'B3 (HOT)', 'Honey Lemon', '90', 40, NULL),
(37, 'B3 (ICED)', 'Honey Lemon', '130', 40, NULL),
(38, 'B4 (HOT)', 'Coke With Lemon', '90', 40, NULL),
(39, 'B4 (ICED)', 'Coke With Lemon', '130', 40, NULL),
(40, 'B5 (HOT)', 'Sprite With Lemon', '90', 40, NULL),
(41, 'B5 (ICED)', 'Sprite With Lemon', '130', 40, NULL),
(42, 'C1 (HOT)', 'HK style Almond Milk', '90', 40, NULL),
(43, 'C1 (ICED)', 'HK style Almond Milk', '130', 40, NULL),
(44, 'C2 (HOT)', 'Soya Milk', '90', 40, NULL),
(45, 'C2 (ICED)', 'Soya Milk', '130', 40, NULL),
(46, 'C3 (HOT)', 'Ginger With Honey', '90', 40, NULL),
(47, 'C3 (ICED)', 'Ginger With Honey', '130', 40, NULL),
(48, 'C4 (HOT)', 'Honey Citron Tea', '90', 40, NULL),
(49, 'C4 (ICED)', 'Honey Citron Tea', '130', 40, NULL),
(50, 'Water', 'Water', '30', 40, NULL),
(51, 'Dinosaur Paint', 'Toys', '350', 0, NULL),
(52, 'Spinner Girl', 'Toys', '200', 0, NULL),
(53, 'Spinner Metal', 'Toys', '350', 0, NULL),
(54, 'Yoyo', 'Toys', '150', 0, NULL),
(55, 'Pop It', 'Toys', '200', 0, NULL),
(56, 'Royal', 'Soft Drinks', '80', 40, NULL),
(57, 'Sprite', 'Soft Drinks', '80', 40, NULL),
(58, 'Beer', 'Drinks', '85', 40, NULL),
(59, 'Coke', 'Soft Drinks', '80', 40, NULL),
(60, 'Original Waffle', 'Waffle', '100', 40, NULL),
(61, 'Ice Cream Waffle', 'Waffle', '130', 40, NULL),
(62, 'Banana Waffle', 'Waffle', '130', 40, NULL),
(63, 'Choco Waffle', 'Choco Waffle', '120', 40, NULL),
(64, 'Ice Cream choco waffle', 'Choco Waffle', '150', 40, NULL),
(65, 'Banana choco waffle', 'Choco Waffle', '150', 40, NULL),
(66, 'Pizza with tuna', 'Pizza Waffle', '190', 40, NULL),
(67, 'Pizza with sausage', 'Pizza Waffle', '190', 40, NULL),
(68, 'Pizza with cheese', 'Pizza Waffle', '150', 40, NULL),
(69, 'Hawaiian Pizza', 'Pizza Waffle', '190', 40, NULL),
(70, 'Fries', 'Group food', '100', 40, NULL),
(71, 'Baked chicken with vege (half)', 'Group food', '280', 40, NULL),
(72, 'Baked chicken with vege (whole', 'Group food', '550', 40, NULL),
(73, 'Chinese style BBQ pork (10 sti', 'Group food', '280', 40, NULL),
(74, 'Spaghetti', 'Group food', '400', 40, NULL),
(75, 'Carbonara', 'Group food', '450', 40, NULL),
(76, 'Banana split (3 ice cream)', 'Desserts', '180', 40, NULL),
(77, 'Ice cream with toppings', 'Desserts', '80', 40, NULL),
(78, 'Tuna roll', 'Sushi Roll', '190', 40, NULL),
(79, 'Ham and cheese roll', 'Sushi Roll', '190', 40, NULL),
(80, 'Sausage and cheese roll', 'Sushi Roll', '190', 40, NULL),
(81, 'Bacon & egg noodles', 'Asian Noodles', '190', 40, NULL),
(82, 'Sausage & egg noodles', 'Asian Noodles', '190', 40, NULL),
(83, 'Ham & egg noodles', 'Asian Noodles', '190', 40, NULL),
(84, 'Fish ball & egg noodles', 'Asian Noodles', '190', 40, NULL),
(86, 'Adult Pass', 'Socks', '50', 0, NULL),
(87, 'Adult Pass', 'Socks', '40', 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `tables`
--

CREATE TABLE `tables` (
  `id` int(10) NOT NULL,
  `table_id` varchar(10) NOT NULL,
  `availability` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tables`
--

INSERT INTO `tables` (`id`, `table_id`, `availability`) VALUES
(1, '10', 'occupied'),
(2, '11', 'available'),
(3, '12', 'occupied'),
(4, '13', 'occupied');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `auth`
--
ALTER TABLE `auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cafe_report`
--
ALTER TABLE `cafe_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cashier_auth`
--
ALTER TABLE `cashier_auth`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `detailed_report`
--
ALTER TABLE `detailed_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playground_report`
--
ALTER TABLE `playground_report`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `playground_time`
--
ALTER TABLE `playground_time`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tables`
--
ALTER TABLE `tables`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `auth`
--
ALTER TABLE `auth`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `cafe_report`
--
ALTER TABLE `cafe_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=256;

--
-- AUTO_INCREMENT for table `cashier_auth`
--
ALTER TABLE `cashier_auth`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `detailed_report`
--
ALTER TABLE `detailed_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=245;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `playground_report`
--
ALTER TABLE `playground_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- AUTO_INCREMENT for table `playground_time`
--
ALTER TABLE `playground_time`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=88;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
