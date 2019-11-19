-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Host: classmysql.engr.oregonstate.edu:3306
-- Generation Time: Nov 19, 2019 at 03:00 PM
-- Server version: 10.3.13-MariaDB-log
-- PHP Version: 7.0.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `cs340_steelebe`
--

-- --------------------------------------------------------

--
-- Table structure for table `Articles`
--

CREATE TABLE `Articles` (
  `articleID` int(11) NOT NULL,
  `author` varchar(128) NOT NULL,
  `title` varchar(255) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `body` text NOT NULL,
  `mediaID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Comments`
--

CREATE TABLE `Comments` (
  `commentID` int(11) NOT NULL,
  `dateAdded` datetime NOT NULL DEFAULT current_timestamp(),
  `body` text NOT NULL,
  `articleID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Media`
--

CREATE TABLE `Media` (
  `type` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `creator` varchar(128) NOT NULL,
  `mediaID` int(11) NOT NULL,
  `title` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Ratings`
--

CREATE TABLE `Ratings` (
  `mediaID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `rating` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Relates`
--

CREATE TABLE `Relates` (
  `mediaID` int(11) NOT NULL,
  `tagName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Tags`
--

CREATE TABLE `Tags` (
  `tagName` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE `Users` (
  `username` varchar(255) NOT NULL,
  `hash` varchar(255) NOT NULL,
  `creationDate` timestamp NOT NULL DEFAULT current_timestamp(),
  `isAuthor` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Articles`
--
ALTER TABLE `Articles`
  ADD PRIMARY KEY (`articleID`,`mediaID`),
  ADD KEY `ARTICLES_MEDIAID_FK` (`mediaID`),
  ADD KEY `ARTICLES_USERNAME_FK` (`username`);

--
-- Indexes for table `Comments`
--
ALTER TABLE `Comments`
  ADD PRIMARY KEY (`commentID`,`articleID`),
  ADD KEY `COMMENTS_ARTICLEID_FK` (`articleID`),
  ADD KEY `COMMENTS_USERNAME_FK` (`username`);

--
-- Indexes for table `Media`
--
ALTER TABLE `Media`
  ADD PRIMARY KEY (`mediaID`);

--
-- Indexes for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD PRIMARY KEY (`username`,`mediaID`),
  ADD KEY `RATINGS_MEDIAID_FK` (`mediaID`);

--
-- Indexes for table `Relates`
--
ALTER TABLE `Relates`
  ADD PRIMARY KEY (`mediaID`,`tagName`),
  ADD KEY `RELATES_TAGNAME_FK` (`tagName`);

--
-- Indexes for table `Tags`
--
ALTER TABLE `Tags`
  ADD PRIMARY KEY (`tagName`);

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Articles`
--
ALTER TABLE `Articles`
  MODIFY `articleID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Comments`
--
ALTER TABLE `Comments`
  MODIFY `commentID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `Media`
--
ALTER TABLE `Media`
  MODIFY `mediaID` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `Articles`
--
ALTER TABLE `Articles`
  ADD CONSTRAINT `ARTICLES_MEDIAID_FK` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`mediaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ARTICLES_USERNAME_FK` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Comments`
--
ALTER TABLE `Comments`
  ADD CONSTRAINT `COMMENTS_ARTICLEID_FK` FOREIGN KEY (`articleID`) REFERENCES `Articles` (`articleID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `COMMENTS_USERNAME_FK` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Ratings`
--
ALTER TABLE `Ratings`
  ADD CONSTRAINT `RATINGS_MEDIAID_FK` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`mediaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RATINGS_USERNAME_FK` FOREIGN KEY (`username`) REFERENCES `Users` (`username`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `Relates`
--
ALTER TABLE `Relates`
  ADD CONSTRAINT `RELATES_MEDIAID_FK` FOREIGN KEY (`mediaID`) REFERENCES `Media` (`mediaID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `RELATES_TAGNAME_FK` FOREIGN KEY (`tagName`) REFERENCES `Tags` (`tagName`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
