-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: May 04, 2024 at 11:54 AM
-- Server version: 8.0.30
-- PHP Version: 8.1.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `smartwhoosh`
--

-- --------------------------------------------------------

--
-- Table structure for table `paket`
--

CREATE TABLE `paket` (
  `id` int NOT NULL,
  `nama_paket` varchar(255) NOT NULL,
  `harga_paket` varchar(255) NOT NULL,
  `image` varchar(255) DEFAULT NULL,
  `deskripsi` text,
  `kd_paket` varchar(255) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `paket`
--

INSERT INTO `paket` (`id`, `nama_paket`, `harga_paket`, `image`, `deskripsi`, `kd_paket`, `createdAt`, `updatedAt`) VALUES
(2, 'Express OneX', '10000', '1714820784924-laundry.jpg', 'Laundry cepat dengan hargat mantap', 'EXONE', '2024-05-04 11:06:24', '2024-05-04 11:06:24');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int NOT NULL,
  `nama_pelanggan` varchar(255) NOT NULL,
  `berat` int NOT NULL,
  `tanggal_masuk` date NOT NULL,
  `tanggal_keluar` date NOT NULL,
  `total_harga` int NOT NULL,
  `status` int NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `kasir_id` int DEFAULT NULL,
  `nama_paket` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `nama_pelanggan`, `berat`, `tanggal_masuk`, `tanggal_keluar`, `total_harga`, `status`, `createdAt`, `updatedAt`, `kasir_id`, `nama_paket`) VALUES
(1, 'Bima Sakti', 2, '2024-05-06', '2024-05-08', 200000, 1, '2024-05-04 11:30:19', '2024-05-04 11:50:08', 2, 'EXONE');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role_id` int NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL,
  `affiliate` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role_id`, `nama`, `alamat`, `affiliate`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'marsha@mail.com', '$2a$10$eh8OwueMePD3xRsZFKbD4eBiqJcJNV2WGbEsjOTfW/xoozN1mHjau', 1, 'Marsha Lenathea', 'Jepang', 'Jkt48', '1714200244716-marshal.jpg', '2024-04-27 06:44:04', '2024-04-27 06:44:04'),
(2, 'lira@mail.com', '$2a$10$HGMaBVjciLwtgkDCWtk.9OEW0IOi9pYz8NTSuPqfBcYWPEiXLM9Yy', 2, 'Kirari Lira Ihsyani', 'Jenggala Selatan', 'Carewash Laundry', '1714798597037-user2.jpg', '2024-05-04 04:56:37', '2024-05-04 04:56:37');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `paket`
--
ALTER TABLE `paket`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `paket_kd_paket` (`kd_paket`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`),
  ADD KEY `kasir_id` (`kasir_id`),
  ADD KEY `nama_paket` (`nama_paket`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_nama` (`nama`),
  ADD UNIQUE KEY `users_id` (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `paket`
--
ALTER TABLE `paket`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`kasir_id`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `transaksi_ibfk_2` FOREIGN KEY (`nama_paket`) REFERENCES `paket` (`kd_paket`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
