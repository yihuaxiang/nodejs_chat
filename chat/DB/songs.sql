-- phpMyAdmin SQL Dump
-- version 4.0.10deb1
-- http://www.phpmyadmin.net
--
-- 主机: localhost
-- 生成日期: 2014-08-24 01:30:23
-- 服务器版本: 5.5.38-0ubuntu0.14.04.1
-- PHP 版本: 5.5.9-1ubuntu4.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- 数据库: `songs`
--

-- --------------------------------------------------------

--
-- 表的结构 `songs`
--

CREATE TABLE IF NOT EXISTS `songs` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `song` varchar(50) DEFAULT NULL,
  `by_` varchar(50) DEFAULT NULL,
  `album` varchar(50) DEFAULT NULL,
  `rating` int(11) DEFAULT NULL,
  `name` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 AUTO_INCREMENT=4 ;

--
-- 转存表中的数据 `songs`
--

INSERT INTO `songs` (`id`, `song`, `by_`, `album`, `rating`, `name`) VALUES
(2, 'Moon River', 'johnny', 'moon river', 4, '1'),
(3, 'Sound Of Silence', 'Paul Simon', 'Sound Of Silence', 4, '2');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
