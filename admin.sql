-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 11, 2023 at 10:39 AM
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
  `year` varchar(30) DEFAULT NULL,
  `quantity` int(3) DEFAULT NULL
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
(2, 'John', 'jmcatamora', 'invoker123', '05:18 PM', '05:38 PM', 0, '79', 'active'),
(5, 'lorenelupango', 'lorene', 'anson', '09:56 AM', '06:25 PM', 0, '280', 'active'),
(6, 'arjelyn', 'arjelyn', 'anson', '05:58 PM', '06:05 PM', 0, '246', 'inactive'),
(7, 'floramae', 'flora', 'anson0510', '10:19 AM', '06:27 PM', 0, '270', 'inactive');

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
  `year` varchar(30) DEFAULT NULL,
  `quantity` int(3) DEFAULT NULL,
  `is_cancelled` varchar(30) DEFAULT NULL
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
  `year` varchar(4) DEFAULT NULL,
  `quantity` int(5) DEFAULT NULL
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
  `year` varchar(30) DEFAULT NULL,
  `quantity` int(3) DEFAULT NULL
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
  `stock` int(10) DEFAULT NULL,
  `section` varchar(30) DEFAULT NULL,
  `image_loc` varchar(100) DEFAULT NULL,
  `availability` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `discount`, `stock`, `section`, `image_loc`, `availability`) VALUES
(13, 'A1 (HOT)', 'HK style Milk Tea', '90', 40, NULL, 'cafe', './image/hk_milk_tea.jpg', 'available'),
(14, 'A1 (ICED)', 'HK style Milk Tea', '130', 40, NULL, 'cafe', './image/hk_milk_tea.jpg', 'available'),
(15, 'A2 (HOT)', 'Matcha Milk', '90', 40, NULL, 'cafe', './image/matcha.jpg', 'available'),
(16, 'A2 (ICED)', 'Matcha Milk', '130', 40, NULL, 'cafe', './image/matcha.jpg', 'available'),
(17, 'A3 (HOT)', 'Coffee', '90', 40, NULL, 'cafe', './image/coffee.jpg', 'available'),
(18, 'A3 (ICED)', 'Coffee', '130', 40, NULL, 'cafe', './image/coffee.jpg', 'available'),
(19, 'A4 (HOT)', 'Coffee Hazelnut', '90', 40, NULL, 'cafe', './image/coffee_hazelnut.jpg', 'available'),
(20, 'A4 (ICED)', 'Coffee Hazelnut', '130', 40, NULL, 'cafe', './image/coffee_hazelnut.jpg', 'available'),
(21, 'A5 (HOT)', 'Milo', '90', 40, NULL, 'cafe', './image/milo.png', 'available'),
(22, 'A5 (ICED)', 'Milo', '130', 40, NULL, 'cafe', './image/milo.png', 'available'),
(23, 'A6 (HOT)', 'Ovaltine', '90', 40, NULL, 'cafe', './image/coffee_ovaltine.jpg', 'available'),
(24, 'A6 (ICED)', 'Ovaltine', '130', 40, NULL, 'cafe', './image/coffee_ovaltine.jpg', 'available'),
(25, 'A7 (HOT)', 'Chocolate', '90', 40, NULL, 'cafe', './image/coffee_chocolate.webp', 'available'),
(26, 'A7 (ICED)', 'Chocolate', '130', 40, NULL, 'cafe', './image/coffee_chocolate.webp', 'available'),
(27, 'A8 (HOT)', 'Chocolate Hazelnut', '90', 40, NULL, 'cafe', './image/coffee_hazelnut_choco.jpg', 'available'),
(28, 'A8 (ICED)', 'Chocolate Hazelnut', '130', 40, NULL, 'cafe', './image/coffee_hazelnut_choco.jpg', 'available'),
(29, 'A9 (HOT)', 'Horlicks', '90', 40, NULL, 'cafe', './image/horlicks.jpg', 'available'),
(30, 'A9 (ICED)', 'Horlicks', '130', 40, NULL, 'cafe', './image/horlicks.jpg', 'available'),
(31, 'ADD ON', 'Ice cream, Toppings, Sauce', '80', 40, NULL, 'cafe', './image/add_on.jpg', 'available'),
(32, 'B1 (HOT)', 'Lemon Tea', '90', 40, NULL, 'cafe', './image/lemon_tea.jpg', 'available'),
(33, 'B1 (ICED)', 'Lemon Tea', '130', 40, NULL, 'cafe', './image/lemon_tea.jpg', 'available'),
(34, 'B2 (HOT)', 'Lemon Water', '90', 40, NULL, 'cafe', './image/lemon_water.jpeg', 'available'),
(35, 'B2 (ICED)', 'Lemon Water', '130', 40, NULL, 'cafe', './image/lemon_water.jpeg', 'available'),
(36, 'B3 (HOT)', 'Honey Lemon', '90', 40, NULL, 'cafe', './image/honey_lemon.webp', 'available'),
(37, 'B3 (ICED)', 'Honey Lemon', '130', 40, NULL, 'cafe', './image/honey_lemon.webp', 'available'),
(38, 'B4 (HOT)', 'Coke With Lemon', '90', 40, NULL, 'cafe', './image/lemon_coke.png', 'available'),
(39, 'B4 (ICED)', 'Coke With Lemon', '130', 40, NULL, 'cafe', './image/lemon_coke.png', 'available'),
(40, 'B5 (HOT)', 'Sprite With Lemon', '90', 40, NULL, 'cafe', './image/sprite_with_lemon.jpg', 'available'),
(41, 'B5 (ICED)', 'Sprite With Lemon', '130', 40, NULL, 'cafe', './image/sprite_with_lemon.jpg', 'available'),
(42, 'C1 (HOT)', 'HK style Almond Milk', '90', 40, NULL, 'cafe', './image/almondmilk.png', 'not available'),
(43, 'C1 (ICED)', 'HK style Almond Milk', '130', 40, NULL, 'cafe', './image/almondmilk.png', 'not available'),
(44, 'C2 (HOT)', 'Soya Milk', '90', 40, NULL, 'cafe', './image/soya_milk.webp', 'not available'),
(45, 'C2 (ICED)', 'Soya Milk', '130', 40, NULL, 'cafe', './image/soya_milk.webp', 'not available'),
(46, 'C3 (HOT)', 'Ginger With Honey', '90', 40, NULL, 'cafe', './image/ginger_with_honey.jpeg', 'available'),
(47, 'C3 (ICED)', 'Ginger With Honey', '130', 40, NULL, 'cafe', './image/ginger_with_honey.jpeg', 'available'),
(48, 'C4 (HOT)', 'Honey Citron Tea', '90', 40, NULL, 'cafe', './image/honey_citron.jpg', 'not available'),
(49, 'C4 (ICED)', 'Honey Citron Tea', '130', 40, NULL, 'cafe', './image/honey_citron.jpg', 'not available'),
(50, 'Water', 'Water', '30', 40, NULL, 'cafe', './image/water.webp', 'available'),
(51, 'Dinosaur Paint', 'Toys', '350', 0, NULL, 'cafe', './image/toys.jpg', 'available'),
(52, 'Spinner Girl', 'Toys', '200', 0, NULL, 'cafe', './image/toys.jpg', 'available'),
(53, 'Spinner Metal', 'Toys', '350', 0, NULL, 'cafe', './image/toys.jpg', 'available'),
(54, 'Yoyo', 'Toys', '150', 0, NULL, 'cafe', './image/toys.jpg', 'available'),
(55, 'Pop It', 'Toys', '200', 0, NULL, 'cafe', './image/toys.jpg', 'available'),
(56, 'Royal', 'Drinks', '80', 40, NULL, 'cafe', './image/royal.webp', 'available'),
(57, 'Sprite', 'Drinks', '80', 40, NULL, 'cafe', './image/sprite.jpg', 'available'),
(58, 'Beer', 'Beer', '85', 40, NULL, 'cafe', './image/beer.webp', 'available'),
(59, 'Coke', 'Drinks', '80', 40, NULL, 'cafe', './image/coke.jpg', 'available'),
(60, 'Original Waffle', 'Waffle', '100', 40, NULL, 'cafe', './image/waffle_original.webp', 'available'),
(61, 'Ice Cream Waffle', 'Waffle', '130', 40, NULL, 'cafe', './image/waffle_ice_cream.jpg', 'available'),
(62, 'Banana Waffle', 'Waffle', '130', 40, NULL, 'cafe', './image/waffle_banana.jpg', 'available'),
(63, 'Choco Waffle', 'Choco Waffle', '120', 40, NULL, 'cafe', './image/choco_waffle.jpg', 'available'),
(64, 'Ice Cream choco waffle', 'Choco Waffle', '150', 40, NULL, 'cafe', './image/choco_waffle_ice_cream.jpg', 'available'),
(65, 'Banana choco waffle', 'Choco Waffle', '150', 40, NULL, 'cafe', './image/choco_waffle_banana.webp', 'available'),
(66, 'Pizza with tuna', 'Pizza Waffle', '190', 40, NULL, 'cafe', './image/pizza_tuna.jpg', 'available'),
(67, 'Pizza with sausage', 'Pizza Waffle', '190', 40, NULL, 'cafe', './image/pizza_sausage.jpg', 'available'),
(68, 'Pizza with cheese', 'Pizza Waffle', '150', 40, NULL, 'cafe', './image/pizza_cheese.jpg', 'available'),
(69, 'Hawaiian Pizza', 'Pizza Waffle', '190', 40, NULL, 'cafe', './image/hawaiian_pizza.jpg', 'available'),
(70, 'Fries', 'Group food', '100', 40, NULL, 'cafe', './image/fries.webp', 'available'),
(71, 'Baked chicken with vege (half)', 'Group food', '280', 40, NULL, 'cafe', './image/baked_chicken.jpg', 'available'),
(72, 'Baked chicken with vege (whole', 'Group food', '550', 40, NULL, 'cafe', './image/baked_chicken.jpg', 'available'),
(73, 'Chinese style BBQ pork (10 sti', 'Group food', '280', 40, NULL, 'cafe', './image/chinese_bbq.jpeg', 'available'),
(74, 'Spaghetti', 'Group food', '400', 40, NULL, 'cafe', './image/spaghetti.jpg', 'available'),
(75, 'Carbonara', 'Group food', '450', 40, NULL, 'cafe', './image/carbonara.jpg', 'available'),
(76, 'Banana split (3 ice cream)', 'Desserts', '180', 40, NULL, 'cafe', './image/banana_split.jpg', 'available'),
(77, 'Ice cream with toppings', 'Desserts', '80', 40, NULL, 'cafe', './image/ice_cream_toppings.jpg', 'available'),
(78, 'Tuna & Cheese roll', 'Sushi Roll', '190', 40, NULL, 'cafe', './image/tuna_roll_sushi.jpg', 'available'),
(79, 'Ham & Cheese roll', 'Sushi Roll', '190', 40, NULL, 'cafe', './image/ham_cheese_roll.jpg', 'available'),
(80, 'Sausage & Cheese roll', 'Sushi Roll', '190', 40, NULL, 'cafe', './image/sausage_cheese_roll.jpg', 'available'),
(81, 'Bacon & egg noodles', 'Asian Noodles', '190', 40, NULL, 'cafe', './image/bacon_egg_noodles.jpg', 'available'),
(82, 'Sausage & egg noodles', 'Asian Noodles', '190', 40, NULL, 'cafe', './image/sausage_egg_noodles.jpg', 'available'),
(83, 'Ham & egg noodles', 'Asian Noodles', '190', 40, NULL, 'cafe', './image/ham_egg_noodles.jpg', 'available'),
(84, 'Fish ball & egg noodles', 'Asian Noodles', '190', 40, NULL, 'cafe', './image/fishball_egg_noodles.jpg', 'available'),
(86, 'Adult Pass', 'Socks', '50', 0, NULL, 'play', './image/adult_pass.webp', 'available'),
(87, 'Adult Socks', 'Socks', '40', 0, NULL, 'play', './image/adult_pass.webp', 'available'),
(88, 'Kid Socks', 'Socks', '40', 0, NULL, 'play', './image/adult_pass.webp', 'available'),
(89, '1 hour', '60 minutes', '150', 0, NULL, 'play', './image/clock.jpg', 'available'),
(90, '2 hours', '120 minutes', '200', 0, NULL, 'play', './image/clock.jpg', 'available'),
(91, 'Unlimited', 'No time', '250', 0, NULL, 'play', './image/clock.jpg', 'available'),
(92, 'KTV', '60 minutes', '200', 0, NULL, 'play', './image/ktv.jpg', 'available'),
(93, 'Vita Juice', 'Drinks', '70', 40, NULL, 'cafe', './image/vita_juice.png', 'available'),
(94, 'Cup Noodles', 'Noodles', '70', 40, NULL, 'cafe', './image/cup_noodles.png', 'available'),
(95, 'Honey Bottle', 'Large', '480', 40, NULL, 'cafe', './image/honey_bottle.png', 'available'),
(96, 'Honey Bottle', 'Small', '280', 40, NULL, 'cafe', './image/honey_bottle.png', 'available'),
(97, 'B1 Combo (Pizza Waffle)', 'Combo', '380', 40, NULL, 'cafe', './image/combo.png', 'available'),
(98, 'B2 Combo (Sushi)', 'Combo', '380', 40, NULL, 'cafe', './image/combo.png', 'available'),
(99, 'C1 Combo (Spaghetti)', 'Combo', '580', 40, NULL, 'cafe', './image/combo.png', 'available'),
(100, 'C2 Large Combo', 'Combo', '830', 40, NULL, 'cafe', './image/combo.png', 'available'),
(101, 'D1 Kid Combo', 'Combo', '220', 40, NULL, 'cafe', './image/combo.png', 'available'),
(102, 'D2 Kid Combo', 'Combo', '220', 40, NULL, 'cafe', './image/combo.png', 'available'),
(104, 'Special Menu', 'Special Menu', '199', 40, NULL, 'cafe', './image/special.webp', 'available'),
(105, 'Half hour', '30 minutes', '90', 0, NULL, 'play', './image/clock.jpg', 'available'),
(108, 'Crab Stick & Cheese Roll', 'Sushi Roll', '0', 40, NULL, 'cafe', './image/crab_stick_sushi.webp', 'not available'),
(109, 'Lo Sui Chicken', 'Chicken', '0', 40, NULL, 'cafe', './image/lo_sui_chicken.jpg', 'not available'),
(110, 'Vita Juice', 'Drinks', '80', 40, NULL, 'cafe', './image/vita_juice.png', 'available');

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
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=367;

--
-- AUTO_INCREMENT for table `cashier_auth`
--
ALTER TABLE `cashier_auth`
  MODIFY `id` int(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `detailed_report`
--
ALTER TABLE `detailed_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=681;

--
-- AUTO_INCREMENT for table `items`
--
ALTER TABLE `items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `playground_report`
--
ALTER TABLE `playground_report`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=467;

--
-- AUTO_INCREMENT for table `playground_time`
--
ALTER TABLE `playground_time`
  MODIFY `id` int(6) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=111;

--
-- AUTO_INCREMENT for table `tables`
--
ALTER TABLE `tables`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
