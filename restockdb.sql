-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Creato il: Ott 04, 2021 alle 09:23
-- Versione del server: 10.4.21-MariaDB
-- Versione PHP: 8.0.10

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restockdb`
--

-- --------------------------------------------------------

--
-- Struttura della tabella `has`
--

CREATE TABLE `has` (
  `idO` int(5) DEFAULT NULL,
  `idPromotion` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `has`
--

INSERT INTO `has` (`idO`, `idPromotion`) VALUES
(1, 2),
(4, 2),
(2, 1),
(5, 3),
(5, 4),
(5, 5),
(6, 5),
(7, 6),
(8, 7),
(8, 8),
(9, 6),
(9, 10);

-- --------------------------------------------------------

--
-- Struttura della tabella `owned`
--

CREATE TABLE `owned` (
  `idO` int(5) NOT NULL,
  `idS` int(5) DEFAULT NULL,
  `idSt` int(5) DEFAULT NULL,
  `quantity` int(4) NOT NULL,
  `price` int(5) NOT NULL,
  `shippingTime` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `owned`
--

INSERT INTO `owned` (`idO`, `idS`, `idSt`, `quantity`, `price`, `shippingTime`) VALUES
(1, 1, 1, 5, 2500, 7),
(2, 1, 2, 55, 700, 6),
(4, 3, 3, 67, 500, 4),
(5, 3, 4, 10, 800, 4),
(6, 1, 4, 8, 899, 8),
(7, 4, 18, 8, 120, 5),
(8, 5, 18, 15, 128, 7),
(9, 6, 18, 23, 129, 4);

-- --------------------------------------------------------

--
-- Struttura della tabella `promotion`
--

CREATE TABLE `promotion` (
  `idPromotion` int(5) NOT NULL,
  `orderValue` int(5) DEFAULT -1,
  `minPiece` int(5) DEFAULT -1,
  `startPromotion` date NOT NULL,
  `endPromotion` date NOT NULL,
  `discount` int(3) NOT NULL,
  `function` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `promotion`
--

INSERT INTO `promotion` (`idPromotion`, `orderValue`, `minPiece`, `startPromotion`, `endPromotion`, `discount`, `function`) VALUES
(1, 0, 0, '1000-01-01', '9999-12-31', 0, 0),
(2, 100, 10, '2021-09-15', '2021-12-31', 10, 0),
(3, -1, 2, '2021-09-24', '2021-09-30', 5, 0),
(4, 0, 0, '2021-09-24', '2021-09-30', 30, 0),
(5, 0, 0, '2021-09-24', '2021-09-30', 12, 0),
(6, 1000, 0, '1000-01-01', '9999-12-31', 5, 0),
(7, 0, 5, '1000-01-01', '9999-12-31', 3, 1),
(8, 0, 10, '1000-01-01', '9999-12-31', 5, 1),
(10, 0, 0, '2021-09-01', '2021-09-30', 2, 0);

-- --------------------------------------------------------

--
-- Struttura della tabella `stock`
--

CREATE TABLE `stock` (
  `idSt` int(5) NOT NULL,
  `productName` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `stock`
--

INSERT INTO `stock` (`idSt`, `productName`) VALUES
(1, 'Asus rog Strix RTX 3090'),
(2, 'Asus rog Strix RTX 3070'),
(3, 'Asus rog Strix RTX 3060'),
(4, 'Asus rog Strix RTX 3080'),
(17, 'iphone 14'),
(18, 'Philips monitor 17”');

-- --------------------------------------------------------

--
-- Struttura della tabella `supplier`
--

CREATE TABLE `supplier` (
  `idS` int(5) NOT NULL,
  `name` varchar(100) NOT NULL,
  `street` varchar(100) NOT NULL,
  `pro` varchar(100) NOT NULL,
  `city` varchar(100) NOT NULL,
  `nation` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dump dei dati per la tabella `supplier`
--

INSERT INTO `supplier` (`idS`, `name`, `street`, `pro`, `city`, `nation`) VALUES
(1, 'drako.it', 'milan', 'ms', 'milano', 'italy'),
(3, 'GIno', 'j', 'j', 'j', 'k'),
(4, 'supplier1', 'supplier1', 'supplier1', 'supplier1', 'italy'),
(5, 'supplier2', 'supplier2', 'supplier2', 'supplier2', 'italy'),
(6, 'supplier3', 'supplier3', 'supplier3', 'supplier3', 'italy');

--
-- Indici per le tabelle scaricate
--

--
-- Indici per le tabelle `has`
--
ALTER TABLE `has`
  ADD KEY `idO` (`idO`),
  ADD KEY `idPromotion` (`idPromotion`);

--
-- Indici per le tabelle `owned`
--
ALTER TABLE `owned`
  ADD PRIMARY KEY (`idO`),
  ADD KEY `idS` (`idS`),
  ADD KEY `idSt` (`idSt`);

--
-- Indici per le tabelle `promotion`
--
ALTER TABLE `promotion`
  ADD PRIMARY KEY (`idPromotion`);

--
-- Indici per le tabelle `stock`
--
ALTER TABLE `stock`
  ADD PRIMARY KEY (`idSt`);

--
-- Indici per le tabelle `supplier`
--
ALTER TABLE `supplier`
  ADD PRIMARY KEY (`idS`);

--
-- AUTO_INCREMENT per le tabelle scaricate
--

--
-- AUTO_INCREMENT per la tabella `owned`
--
ALTER TABLE `owned`
  MODIFY `idO` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `promotion`
--
ALTER TABLE `promotion`
  MODIFY `idPromotion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT per la tabella `stock`
--
ALTER TABLE `stock`
  MODIFY `idSt` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT per la tabella `supplier`
--
ALTER TABLE `supplier`
  MODIFY `idS` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Limiti per le tabelle scaricate
--

--
-- Limiti per la tabella `has`
--
ALTER TABLE `has`
  ADD CONSTRAINT `has_ibfk_1` FOREIGN KEY (`idO`) REFERENCES `owned` (`idO`),
  ADD CONSTRAINT `has_ibfk_2` FOREIGN KEY (`idPromotion`) REFERENCES `promotion` (`idPromotion`);

--
-- Limiti per la tabella `owned`
--
ALTER TABLE `owned`
  ADD CONSTRAINT `owned_ibfk_1` FOREIGN KEY (`idS`) REFERENCES `supplier` (`idS`),
  ADD CONSTRAINT `owned_ibfk_2` FOREIGN KEY (`idSt`) REFERENCES `stock` (`idSt`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
