-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3307
-- Время создания: Июн 24 2024 г., 22:58
-- Версия сервера: 5.7.39-log
-- Версия PHP: 8.1.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `djovattyshop_db`
--

DELIMITER $$
--
-- Процедуры
--
CREATE DEFINER=`root`@`%` PROCEDURE `BackItemStorage` (IN `item_size_id` BIGINT, IN `storage_id` BIGINT, IN `amount` BIGINT)   BEGIN
                DECLARE current_sended BIGINT;
                SELECT total_sended INTO current_sended
                FROM storage_itemsize_list
                WHERE item_size_id = item_size_id AND storage_id = storage_id;

                IF current_sended < amount THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Cannot return more items than were sent.";
                ELSE
                    UPDATE storage_itemsize_list
                    SET count = count + amount, total_sended = total_sended - amount
                    WHERE item_size_id = item_size_id AND storage_id = storage_id;
                END IF;
            END$$

CREATE DEFINER=`root`@`%` PROCEDURE `SendItemStorage` (IN `item_size_id` BIGINT, IN `storage_id` BIGINT, IN `amount` BIGINT)   BEGIN
                DECLARE current_count BIGINT;
                SELECT count INTO current_count
                FROM storage_itemsize_list
                WHERE item_size_id = item_size_id AND storage_id = storage_id;

                IF current_count < amount THEN
                    SIGNAL SQLSTATE "45000" SET MESSAGE_TEXT = "Not enough items in storage.";
                ELSE
                    UPDATE storage_itemsize_list
                    SET count = count - amount, total_sended = total_sended + amount
                    WHERE item_size_id = item_size_id AND storage_id = storage_id;
                END IF;
            END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `actions`
--

CREATE TABLE `actions` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `foto_img_id` smallint(5) UNSIGNED DEFAULT NULL,
  `state_link_id` bigint(20) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `start_day` datetime NOT NULL,
  `end_day` datetime NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `action_fotos`
--

CREATE TABLE `action_fotos` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `foto_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `action_fotos`
--

INSERT INTO `action_fotos` (`id`, `foto_url`, `title`, `search_title`) VALUES
(1, 'путь_к_фото_1', 'новое', 'new'),
(2, 'путь_к_фото_2', 'акция', 'sale'),
(3, 'путь_к_фото_3', 'школа', 'school');

-- --------------------------------------------------------

--
-- Структура таблицы `action_item_list`
--

CREATE TABLE `action_item_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `action_id` bigint(20) UNSIGNED NOT NULL,
  `discount_percent` double NOT NULL,
  `total_clicks` int(11) NOT NULL,
  `total_in_orders` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `brends`
--

CREATE TABLE `brends` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(80) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `urlimg_logo` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `totalcount` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `brends`
--

INSERT INTO `brends` (`id`, `title`, `search_title`, `description`, `urlimg_logo`, `totalcount`) VALUES
(5, 'Dart', 'Dart', 'Dart - бренд, у которого каждая модель разработана для оптимальной поддержки и комфорта, что делает их идеальными для спортивных и повседневных нужд.', '/storage/images/brands/dart.jpg', 0),
(6, 'Balanse', 'Balanse', 'Balanse - бренд, предлагающий обувь, сочетающую в себе функциональность и модные тенденции. С их обувью вы получите отличную поддержку и уникальный дизайн для любого вида повседневного ношения.', '/storage/images/brands/balanse.png', 0),
(7, 'Galant', 'Galant', 'Galant -  бренд обуви, сочетающую в себе элегантность и удобность. С их туфлями вы получите отличную поддержку и уникальный дизайн для любого вида повседневного времяпрепровождения.', '/storage/images/brands/galant.jpg', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `childcategories`
--

CREATE TABLE `childcategories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mail_foto_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `total_clicks` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `childcategories`
--

INSERT INTO `childcategories` (`id`, `mail_foto_url`, `title`, `search_title`, `description`, `total_clicks`) VALUES
(1, 'https://via.placeholder.com/640x480.png/00ddbb?text=alias', 'Босоножки', 'sandals', 'Quasi autem exercitationem rerum vitae. Quia quia optio eos in quis. Provident aut nostrum explicabo itaque odio consequatur aut. Iure ut iusto excepturi dolorem odit.', 366),
(2, 'https://via.placeholder.com/640x480.png/002200?text=et', 'Кроссовки', 'sneakers', 'Aliquam adipisci in reprehenderit error saepe est. Vel distinctio soluta consequatur aut et. Quae nostrum et qui aliquid ex nobis reiciendis. Iste in ut debitis.', 343),
(3, 'https://via.placeholder.com/640x480.png/002266?text=voluptas', 'Сандали', 'sandals', 'Quam architecto est porro occaecati maiores. Occaecati praesentium fugiat voluptatum eos ducimus soluta nam. Expedita ut soluta tenetur nulla. In ipsum eaque asperiores corporis.', 875),
(4, 'https://via.placeholder.com/640x480.png/00ee11?text=sit', 'Сланцы', 'flip-flops', 'Vel architecto ipsum aut et accusantium nesciunt. Earum autem reiciendis ut fuga eum. Ipsum nulla omnis reiciendis dolor.', 554),
(5, 'https://via.placeholder.com/640x480.png/007788?text=consequatur', 'П/ботинки', 'half-boots', 'Maxime consequatur veniam sit. Autem nemo asperiores excepturi. Eos ut deserunt veritatis. Ullam repudiandae sint repellendus sequi.', 533),
(6, 'https://via.placeholder.com/640x480.png/00cc11?text=rerum', 'Ботинки', 'boots', 'Earum minus aut aut alias assumenda modi quasi. Veniam doloremque natus saepe sit quod. Aliquam culpa sint voluptas suscipit vel. Unde ut sint doloremque voluptas placeat.', 341),
(7, 'https://via.placeholder.com/640x480.png/002255?text=cum', 'Туфли', 'shoes', 'Accusantium facere laboriosam esse molestias non. Rerum occaecati recusandae officiis aut quas consequatur. Vero doloribus minima nobis ipsam esse fuga animi. Amet ut pariatur at laudantium soluta rerum.', 803),
(8, 'https://via.placeholder.com/640x480.png/0055ff?text=voluptatibus', 'Пантолеты', 'mules', 'Mollitia qui ut deleniti dolor. Dolor harum magni inventore eos aut sed eos. Suscipit ratione voluptatem est rerum autem. Minus quo et voluptatem modi et vel sequi.', 684),
(9, 'https://via.placeholder.com/640x480.png/009955?text=quos', 'Мокасины', 'moccasins', 'Molestiae ipsum velit perferendis in quaerat accusantium qui veniam. Ut hic explicabo et suscipit est. Est quos neque molestiae saepe. Eius illo dicta vitae doloribus maxime veritatis.', 106),
(10, 'https://via.placeholder.com/640x480.png/0099aa?text=autem', 'Ботильоны', 'booties', 'Debitis possimus reprehenderit perferendis iusto illo libero. Accusamus illo nihil animi enim amet. Vel ad alias qui fugiat sint.', 785),
(11, 'https://via.placeholder.com/640x480.png/00ff33?text=tempora', 'Балетки', 'flats', 'Et fugiat quis aliquam esse. Nostrum neque vero dolorum pariatur enim. Occaecati odit nobis blanditiis provident nam voluptas facilis. Iure consequatur quasi nulla et dolores veritatis.', 542),
(12, 'https://via.placeholder.com/640x480.png/006688?text=voluptas', 'Чешки', 'gym-shoes', 'Numquam totam ut assumenda. Exercitationem ut dolore sit explicabo voluptatibus et adipisci. Sint cumque nesciunt necessitatibus exercitationem unde nesciunt. Dolor sint pariatur est.', 65),
(13, 'https://via.placeholder.com/640x480.png/002200?text=et', 'Дутики', 'padded-boots', 'Hic illo aut praesentium. Est libero et perferendis maiores laudantium nihil ratione.', 539),
(14, 'https://via.placeholder.com/640x480.png/000022?text=fuga', 'Сноубутсы', 'snow-boots', 'Id quasi sapiente laborum. Aliquam sapiente iste optio nihil. Expedita veritatis blanditiis reiciendis libero.', 796),
(15, 'https://via.placeholder.com/640x480.png/0022cc?text=qui', 'Слипоны', 'slip-ons', 'Tenetur fuga ut debitis quidem. Repellat ab magni quo provident sed dolores molestiae. Voluptatem fugit quisquam doloribus omnis.', 762),
(16, 'https://via.placeholder.com/640x480.png/00ffff?text=quam', 'Сапоги', 'high-boots', 'Aut accusamus officia unde nam. Nemo perferendis in ut perspiciatis. Sint libero porro quae non ut. Quo est suscipit cum non pariatur amet facere et.', 369),
(17, 'https://via.placeholder.com/640x480.png/00dd99?text=voluptates', 'Кеды', 'plimsolls', 'Est perferendis fugiat modi non velit voluptate. Voluptatem sunt eos aperiam possimus quo sed velit ab. Ipsum est autem dolores quia. Vel vel incidunt et perspiciatis.', 759);

-- --------------------------------------------------------

--
-- Структура таблицы `clasp_types`
--

CREATE TABLE `clasp_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `clasp_types`
--

INSERT INTO `clasp_types` (`id`, `title`, `search_title`) VALUES
(1, 'Без регулировки', 'No adjustment'),
(2, 'Велкро', 'Velcro'),
(3, 'Комбинированная', 'Combined'),
(4, 'Молния', 'Zipper'),
(5, 'Пряжка', 'Buckle'),
(6, 'Резинка', 'Elastic'),
(7, 'Шнурок', 'Lace'),
(8, 'Липучка', 'lipuchka');

-- --------------------------------------------------------

--
-- Структура таблицы `colors`
--

CREATE TABLE `colors` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `color_code` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `colors`
--

INSERT INTO `colors` (`id`, `title`, `search_title`, `color_code`) VALUES
(1, 'Красный', 'red', '#FF0000'),
(2, 'Зелёный', 'green', '#008000'),
(3, 'Белый', 'white', '#FFFFFF'),
(4, 'Черный', 'black', '#000000'),
(5, 'Яркий серый', 'bright gray', '#E0E0E0'),
(6, 'Темный серый', 'dark gray', '#A9A9A9'),
(7, 'Синий', 'blue', '#0000FF'),
(8, 'Коричневый', 'brown', '#A52A2A'),
(9, 'Бежевый', 'beige', '#F5F5DC'),
(10, 'Жёлтый', 'yellow', '#FFFF00'),
(11, 'Фиолетовый', 'purple', '#800080'),
(12, 'Бордовый', 'burgundy', '#800020'),
(13, 'Рыжий', 'ginger', '#FF4500'),
(14, 'Разноцветный', 'multicolored', 'multicolored');

-- --------------------------------------------------------

--
-- Структура таблицы `delivery_types`
--

CREATE TABLE `delivery_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `delivery_types`
--

INSERT INTO `delivery_types` (`id`, `title`, `search_title`, `description`) VALUES
(1, 'В обработке', 'processing', 'Заказ находится в обработке'),
(2, 'На складе', 'in_warehouse', 'Заказ находится на складе'),
(3, 'В пути', 'in_transit', 'Заказ находится в пути'),
(4, 'На пункте выдачи', 'at_pickup_point', 'Заказ находится на пункте выдачи'),
(5, 'Выдано', 'delivered', 'Заказ выдан получателю');

-- --------------------------------------------------------

--
-- Структура таблицы `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `connection` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `queue` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `payload` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `exception` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `heepiece_types`
--

CREATE TABLE `heepiece_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `heepiece_types`
--

INSERT INTO `heepiece_types` (`id`, `title`, `search_title`) VALUES
(1, 'Танкетка', 'Wedge'),
(2, 'Шпилька', 'Stiletto'),
(3, 'Платформа', 'Platform'),
(4, 'Без каблука', 'Flat'),
(5, 'Стандартный', 'Standard'),
(6, 'Рюмка', 'Cup'),
(7, 'Трапеция', 'Trapeze'),
(8, 'Столбик', 'Column'),
(9, 'Фигурный', 'Figured');

-- --------------------------------------------------------

--
-- Структура таблицы `items`
--

CREATE TABLE `items` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `model_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `maincategory_id` smallint(5) UNSIGNED DEFAULT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `season_id` smallint(5) UNSIGNED DEFAULT NULL,
  `brend_id` smallint(5) UNSIGNED DEFAULT NULL,
  `material_sole_id` smallint(5) UNSIGNED DEFAULT NULL,
  `heelpiece_id` smallint(5) UNSIGNED DEFAULT NULL,
  `heelpiace` int(11) NOT NULL DEFAULT '0',
  `urlimages` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` double NOT NULL,
  `total_clicks` bigint(20) NOT NULL,
  `total_ordered` bigint(20) NOT NULL,
  `total_in_busket` bigint(20) NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `items`
--

INSERT INTO `items` (`id`, `model_name`, `title`, `maincategory_id`, `category_id`, `season_id`, `brend_id`, `material_sole_id`, `heelpiece_id`, `heelpiace`, `urlimages`, `description`, `price`, `total_clicks`, `total_ordered`, `total_in_busket`, `deleted_at`) VALUES
(1, '3456', 'Туфли женские', 1, 7, 4, 6, 6, 8, 0, '/storage/images/items/12062024/3456.jpg', '', 125.44, 0, 0, 0, NULL),
(2, '3456-2', 'Туфли женские', 1, 7, 4, 6, 6, 8, 0, '/storage/images/items/12062024/3456-2.jpg', '', 125.44, 0, 0, 0, NULL),
(3, '3456-3', 'Туфли женские', 1, 7, 4, 7, 6, 8, 0, '/storage/images/items/12062024/3456-3.jpg', '', 125.44, 0, 0, 0, NULL),
(5, '13456-2', 'Кроссовки мужские', 2, 2, 2, 5, 6, 4, 0, '/storage/images/items/12062024/13456-2.jpg', '', 175.44, 0, 0, 0, NULL),
(6, '13433', 'Кроссовки мужские', 2, 2, 2, 5, 5, 4, 0, '/storage/images/items/12062024/13433.jpg', '', 125.6, 0, 0, 0, NULL),
(7, '134334', 'Туфли мужские', 2, 7, 4, 5, 7, 5, 0, '/storage/images/items/12062024/134334.jpg', '', 125.44, 0, 0, 0, NULL),
(8, '34156', 'Сандалии мужские', 2, 3, 4, 6, 5, 4, 0, '/storage/images/items/12062024/34156.jpg', '', 55, 0, 0, 0, NULL),
(9, '34555', 'Полуботинки мужские', 2, 5, 4, 5, 8, 5, 0, '/storage/images/items/12062024/34555.jpg', '', 125.6, 0, 0, 0, '2024-06-12 05:12:37'),
(10, '13456-232', 'Кроссовки на девочку', 4, 2, 1, 6, 5, 4, 0, '/storage/images/items/12062024/13456-232.jpg', '', 65.6, 0, 0, 0, NULL),
(11, '1203456', 'Кроссовки на мальчика', 3, 2, 1, 5, 5, 4, 0, '/storage/images/items/12062024/1203456.jpg', '', 125.44, 0, 0, 0, NULL),
(12, '22222112132', 'Кроссовки для девочки', 4, 2, 1, 6, 5, 5, 0, '/storage/images/items/12062024/22222112132.jpg', '', 120.33, 0, 0, 0, NULL),
(13, 'ren-55', 'Туфли на девочку', 4, 7, 4, 6, 5, 5, 0, '/storage/images/items/12062024/ren-55.jpg', '', 120, 0, 0, 0, NULL),
(14, '22222-5442', 'Кроссовки мужские', 2, 2, 1, 6, 3, 4, 0, '/storage/images/items/22062024/22222-5442-20240622185333.jpg', '', 120, 0, 0, 0, NULL),
(15, '333', 'Туфли на мальчика', 3, 7, 2, 6, 6, 5, 0, '/storage/images/items/22062024/333-20240622185546.jpg', '', 120, 0, 0, 0, NULL),
(16, '22222', 'Туфли женские', 1, 7, 4, 6, 4, 6, 0, '/storage/images/items/22062024/22222-20240622185727.jpg', '', 200, 0, 0, 0, NULL),
(17, 'eq3rwrth', 'we23fr', 4, 12, 4, 6, 6, 7, 0, '/storage/images/items/23062024/eq3rwrth-20240623184217.jpg', '', 222, 0, 0, 0, '2024-06-23 15:42:21'),
(18, 'rem-19872345', 'Ботинки на девочку', 4, 6, 2, 6, 7, 5, 0, '/storage/images/items/23062024/rem-19872345-20240623201002.jpg', '', 120, 0, 0, 0, NULL),
(19, 'rem-19872342', 'Ботинки на девочку', 4, 6, 2, 6, 7, 5, 0, '/storage/images/items/23062024/rem-19872342-20240623201111.jpg', '', 160, 0, 0, 0, NULL),
(20, 'rem-187656', 'Кроссовки для девочки', 4, 2, 2, 7, 4, 4, 0, '/storage/images/items/23062024/rem-187656-20240623201235.jpg', '', 96, 0, 0, 0, NULL),
(21, 'rem-198723222', 'Кроссовки для мальчика', 3, 2, 1, 6, 5, 5, 0, '/storage/images/items/23062024/rem-198723222-20240623201518.jpg', '', 96.33, 0, 0, 0, NULL),
(22, 'rem-198722700', 'Кроссовки для мальчика', 3, 2, 2, 6, 4, 4, 0, '/storage/images/items/23062024/rem-198722700-20240623202308.jpg', '', 96, 0, 0, 0, NULL),
(23, '435576', 'Полуботинки для мальчика', 3, 5, 2, 5, 7, 4, 0, '/storage/images/items/23062024/435576-20240623202419.jpg', '', 120, 0, 0, 0, NULL),
(24, '356522', 'Женские туфли', 1, 7, 4, 7, 4, 5, 0, '/storage/images/items/23062024/356522-20240623202939.jpg', '', 120.88, 0, 0, 0, NULL),
(25, '34567-679', 'Кроссовки для мальчика', 3, 2, 1, 5, 4, 4, 0, '/storage/images/items/24062024/34567-679-20240624064731.jpg', '', 98, 0, 0, 0, NULL);

-- --------------------------------------------------------

--
-- Структура таблицы `item_clasptype_list`
--

CREATE TABLE `item_clasptype_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `clasptype_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_clasptype_list`
--

INSERT INTO `item_clasptype_list` (`id`, `item_id`, `clasptype_id`) VALUES
(1, 1, 1),
(2, 2, 1),
(3, 3, 1),
(5, 5, 7),
(6, 6, 7),
(7, 7, 7),
(8, 8, 1),
(9, 9, 7),
(10, 10, 7),
(11, 11, 3),
(12, 12, 1),
(13, 13, 1),
(14, 14, 7),
(15, 15, 7),
(16, 16, 1),
(17, 17, 2),
(18, 18, 7),
(19, 19, 7),
(21, 20, 7),
(20, 20, 8),
(22, 21, 8),
(23, 22, 8),
(24, 23, 8),
(25, 24, 1),
(26, 25, 8);

-- --------------------------------------------------------

--
-- Структура таблицы `item_color_list`
--

CREATE TABLE `item_color_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `color_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_color_list`
--

INSERT INTO `item_color_list` (`id`, `item_id`, `color_id`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 1),
(6, 5, 2),
(5, 5, 14),
(8, 6, 13),
(7, 6, 14),
(9, 7, 8),
(10, 8, 4),
(11, 9, 8),
(14, 10, 7),
(13, 10, 10),
(12, 10, 14),
(15, 11, 4),
(16, 11, 7),
(17, 12, 14),
(19, 13, 3),
(18, 13, 4),
(21, 14, 1),
(20, 14, 4),
(22, 15, 4),
(23, 16, 3),
(24, 17, 3),
(25, 18, 4),
(26, 19, 9),
(27, 20, 14),
(28, 21, 14),
(29, 22, 14),
(30, 23, 2),
(31, 24, 4),
(32, 25, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `item_materialins_list`
--

CREATE TABLE `item_materialins_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `materialin_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_materialins_list`
--

INSERT INTO `item_materialins_list` (`id`, `item_id`, `materialin_id`) VALUES
(1, 1, 8),
(2, 2, 8),
(3, 3, 8),
(5, 5, 2),
(6, 6, 2),
(7, 7, 8),
(8, 8, 8),
(9, 9, 8),
(10, 10, 2),
(11, 11, 2),
(12, 11, 7),
(13, 12, 9),
(14, 13, 8),
(15, 14, 2),
(16, 15, 8),
(17, 16, 8),
(18, 17, 2),
(19, 18, 4),
(20, 19, 4),
(21, 20, 2),
(22, 21, 2),
(23, 22, 2),
(24, 23, 12),
(25, 24, 8),
(26, 25, 2);

-- --------------------------------------------------------

--
-- Структура таблицы `item_materialout_list`
--

CREATE TABLE `item_materialout_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `materialout_id` smallint(5) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_materialout_list`
--

INSERT INTO `item_materialout_list` (`id`, `item_id`, `materialout_id`) VALUES
(1, 1, 4),
(2, 2, 3),
(3, 3, 3),
(5, 5, 5),
(6, 6, 4),
(7, 7, 3),
(8, 8, 4),
(9, 9, 3),
(12, 10, 4),
(10, 10, 7),
(11, 10, 8),
(14, 11, 2),
(13, 11, 3),
(15, 12, 4),
(16, 13, 3),
(17, 14, 4),
(18, 14, 11),
(19, 15, 3),
(20, 16, 3),
(21, 17, 2),
(23, 18, 2),
(24, 18, 3),
(22, 18, 4),
(25, 19, 3),
(26, 20, 4),
(27, 21, 4),
(28, 22, 4),
(29, 23, 5),
(30, 24, 5),
(31, 25, 4);

-- --------------------------------------------------------

--
-- Структура таблицы `item_sizes_lists`
--

CREATE TABLE `item_sizes_lists` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `size_id` smallint(5) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `total_count` bigint(20) NOT NULL DEFAULT '0',
  `total_ordered` bigint(20) NOT NULL DEFAULT '0',
  `total_in_storage` bigint(20) NOT NULL DEFAULT '0',
  `total_delivered` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `item_sizes_lists`
--

INSERT INTO `item_sizes_lists` (`id`, `size_id`, `item_id`, `total_count`, `total_ordered`, `total_in_storage`, `total_delivered`) VALUES
(1, 20, 1, 10, 0, 10, 0),
(2, 21, 1, 5, 0, 5, 0),
(3, 22, 1, 5, 0, 5, 0),
(4, 23, 1, 6, 0, 6, 0),
(5, 24, 1, 7, 0, 7, 0),
(6, 25, 1, 8, 0, 8, 0),
(7, 26, 1, 8, 0, 8, 0),
(8, 20, 2, 6, 0, 6, 0),
(9, 21, 2, 5, 0, 5, 0),
(10, 22, 2, 5, 0, 5, 0),
(11, 23, 2, 6, 0, 6, 0),
(12, 24, 2, 5, 0, 5, 0),
(13, 25, 2, 5, 0, 5, 0),
(14, 20, 3, 7, 0, 7, 0),
(15, 21, 3, 7, 0, 7, 0),
(16, 22, 3, 6, 0, 6, 0),
(17, 23, 3, 6, 0, 6, 0),
(18, 24, 3, 6, 0, 6, 0),
(19, 25, 3, 6, 0, 6, 0),
(20, 26, 3, 7, 0, 7, 0),
(27, 30, 5, 8, 0, 8, 0),
(28, 29, 5, 10, 0, 10, 0),
(29, 28, 5, 7, 0, 7, 0),
(30, 27, 5, 7, 0, 7, 0),
(31, 26, 5, 5, 0, 5, 0),
(32, 25, 5, 5, 0, 5, 0),
(33, 24, 5, 8, 0, 8, 0),
(34, 23, 6, 6, 0, 6, 0),
(35, 22, 6, 7, 0, 7, 0),
(36, 21, 6, 6, 0, 6, 0),
(37, 24, 6, 6, 0, 6, 0),
(38, 25, 6, 6, 0, 6, 0),
(39, 26, 6, 3, 4, 7, 0),
(40, 30, 7, 6, 0, 6, 0),
(41, 29, 7, 7, 0, 7, 0),
(42, 28, 7, 8, 0, 8, 0),
(43, 31, 7, 6, 0, 6, 0),
(44, 27, 7, 6, 0, 6, 0),
(45, 26, 7, 8, 0, 8, 0),
(46, 20, 8, 5, 0, 5, 0),
(47, 21, 8, 7, 0, 7, 0),
(48, 22, 8, 8, 0, 8, 0),
(49, 23, 8, 7, 0, 7, 0),
(50, 24, 8, 6, 0, 6, 0),
(51, 25, 8, 6, 0, 6, 0),
(52, 21, 9, 0, 0, 0, 0),
(53, 22, 9, 0, 0, 0, 0),
(54, 23, 9, 0, 0, 0, 0),
(55, 24, 9, 0, 0, 0, 0),
(56, 26, 9, 0, 0, 0, 0),
(57, 27, 9, 0, 0, 0, 0),
(58, 25, 9, 0, 0, 0, 0),
(59, 12, 10, 1, 0, 1, 0),
(60, 13, 10, 1, 0, 1, 0),
(61, 11, 10, 1, 0, 1, 0),
(62, 14, 10, 1, 0, 1, 0),
(63, 15, 10, 1, 0, 1, 0),
(64, 16, 10, 2, 0, 2, 0),
(65, 4, 11, 6, 0, 6, 0),
(66, 5, 11, 6, 0, 6, 0),
(67, 6, 11, 6, 0, 6, 0),
(68, 7, 11, 5, 0, 5, 0),
(69, 8, 11, 6, 0, 6, 0),
(70, 9, 11, 6, 0, 6, 0),
(71, 11, 11, 5, 0, 5, 0),
(72, 10, 11, 6, 0, 6, 0),
(73, 3, 11, 4, 0, 4, 0),
(74, 8, 12, 6, 0, 6, 0),
(75, 9, 12, 8, 0, 8, 0),
(76, 10, 12, 7, 0, 7, 0),
(77, 11, 12, 6, 0, 6, 0),
(78, 12, 12, 7, 0, 7, 0),
(79, 13, 12, 7, 0, 7, 0),
(80, 13, 13, 6, 0, 6, 0),
(81, 12, 13, 6, 0, 6, 0),
(82, 11, 13, 5, 0, 5, 0),
(83, 10, 13, 3, 0, 3, 0),
(84, 9, 13, 6, 0, 6, 0),
(85, 8, 13, 8, 0, 8, 0),
(86, 23, 14, 6, 0, 6, 0),
(87, 22, 14, 6, 0, 6, 0),
(88, 21, 14, 7, 0, 7, 0),
(89, 20, 14, 7, 0, 7, 0),
(90, 24, 14, 8, 0, 8, 0),
(91, 25, 14, 9, 0, 9, 0),
(92, 17, 15, 7, 0, 7, 0),
(93, 18, 15, 6, 0, 6, 0),
(94, 19, 15, 8, 0, 8, 0),
(95, 20, 15, 9, 0, 9, 0),
(96, 21, 15, 8, 0, 8, 0),
(97, 22, 15, 8, 0, 8, 0),
(98, 20, 16, 6, 0, 6, 0),
(99, 21, 16, 7, 0, 7, 0),
(100, 22, 16, 7, 0, 7, 0),
(101, 23, 16, 6, 0, 6, 0),
(102, 24, 16, 6, 0, 6, 0),
(103, 25, 16, 5, 0, 5, 0),
(104, 5, 17, 0, 0, 0, 0),
(105, 23, 17, 0, 0, 0, 0),
(106, 25, 17, 0, 0, 0, 0),
(107, 12, 17, 0, 0, 0, 0),
(108, 16, 18, 4, 0, 4, 0),
(109, 17, 18, 4, 0, 4, 0),
(110, 18, 18, 5, 0, 5, 0),
(111, 19, 18, 6, 0, 6, 0),
(112, 20, 18, 5, 0, 5, 0),
(113, 21, 18, 6, 0, 6, 0),
(114, 21, 19, 4, 0, 4, 0),
(115, 20, 19, 3, 0, 3, 0),
(116, 19, 19, 4, 0, 4, 0),
(117, 18, 19, 4, 0, 4, 0),
(118, 17, 19, 4, 0, 4, 0),
(119, 16, 19, 4, 0, 4, 0),
(120, 15, 20, 5, 0, 5, 0),
(121, 16, 20, 6, 0, 6, 0),
(122, 14, 20, 6, 0, 6, 0),
(123, 12, 20, 5, 0, 5, 0),
(124, 13, 20, 5, 0, 5, 0),
(125, 11, 20, 3, 0, 3, 0),
(126, 16, 21, 3, 0, 3, 0),
(127, 15, 21, 3, 0, 3, 0),
(128, 14, 21, 4, 0, 4, 0),
(129, 13, 21, 3, 0, 3, 0),
(130, 12, 21, 3, 0, 3, 0),
(131, 11, 21, 4, 0, 4, 0),
(132, 20, 22, 3, 0, 3, 0),
(133, 19, 22, 3, 0, 3, 0),
(134, 18, 22, 3, 0, 3, 0),
(135, 17, 22, 3, 0, 3, 0),
(136, 16, 22, 2, 0, 2, 0),
(137, 15, 22, 4, 0, 4, 0),
(138, 20, 23, 5, 0, 5, 0),
(139, 19, 23, 4, 0, 4, 0),
(140, 18, 23, 5, 0, 5, 0),
(141, 17, 23, 5, 0, 5, 0),
(142, 16, 23, 5, 0, 5, 0),
(143, 15, 23, 5, 0, 5, 0),
(144, 22, 24, 4, 0, 4, 0),
(145, 21, 24, 4, 0, 4, 0),
(146, 20, 24, 5, 0, 5, 0),
(147, 23, 24, 4, 0, 4, 0),
(148, 24, 24, 0, 0, 0, 0),
(149, 25, 24, 3, 0, 3, 0),
(150, 10, 25, 3, 0, 3, 0),
(151, 11, 25, 4, 0, 4, 0),
(152, 12, 25, 4, 0, 4, 0),
(153, 13, 25, 5, 0, 5, 0),
(154, 14, 25, 0, 0, 0, 0),
(155, 15, 25, 5, 0, 5, 0);

-- --------------------------------------------------------

--
-- Структура таблицы `maincategories`
--

CREATE TABLE `maincategories` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `mail_foto_url` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `maincategories`
--

INSERT INTO `maincategories` (`id`, `title`, `search_title`, `description`, `mail_foto_url`) VALUES
(1, 'Женская', 'womens', 'Всё для женщин', 'path/to/womens.jpg'),
(2, 'Мужская', 'mens', 'Всё для мужчин', 'path/to/mens.jpg'),
(3, 'Для мальчиков', 'boys', 'Всё для мальчиков', 'path/to/boys.jpg'),
(4, 'Для девочек', 'girls', 'Всё для девочек', 'path/to/girls.jpg'),
(5, 'Все для обуви', 'shoes', 'Обувь для всех', 'path/to/shoes.jpg');

-- --------------------------------------------------------

--
-- Структура таблицы `material_insides`
--

CREATE TABLE `material_insides` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `material_insides`
--

INSERT INTO `material_insides` (`id`, `title`, `search_title`) VALUES
(1, 'Без подкладки', 'No lining'),
(2, 'Текстиль', 'Textile'),
(3, 'Искусственный мех', 'Faux fur'),
(4, 'Натуральный мех', 'Natural fur'),
(5, 'Искусственная шерсть', 'Synthetic wool'),
(6, 'Натуральная шерсть', 'Natural wool'),
(7, 'Шерсть', 'Wool'),
(8, 'Натуральная кожа', 'Genuine leather'),
(9, 'Комбинированная кожа', 'Combined leather'),
(10, 'Искусственная кожа', 'Synthetic leather'),
(11, 'Кожзам', 'Faux leather'),
(12, 'Байка', 'Flannel'),
(13, 'Микрофибра', 'Microfiber');

-- --------------------------------------------------------

--
-- Структура таблицы `material_outsides`
--

CREATE TABLE `material_outsides` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `material_outsides`
--

INSERT INTO `material_outsides` (`id`, `title`, `search_title`) VALUES
(1, 'Замша', 'Suede'),
(2, 'Искусственная кожа', 'Synthetic leather'),
(3, 'Натуральная кожа', 'Genuine leather'),
(4, 'Комбинированная кожа', 'Combined leather'),
(5, 'Кожзам', 'Faux leather'),
(6, 'Войлок', 'Felt'),
(7, 'Нубук искусственный', 'Synthetic nubuck'),
(8, 'Нубук натуральный', 'Natural nubuck'),
(9, 'Велюр', 'Velour'),
(10, 'Резина', 'Rubber'),
(11, 'Текстиль', 'Textile');

-- --------------------------------------------------------

--
-- Структура таблицы `material_soles`
--

CREATE TABLE `material_soles` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `material_soles`
--

INSERT INTO `material_soles` (`id`, `title`, `search_title`) VALUES
(1, 'Другое', 'Other'),
(2, 'Комбинированный', 'Combined'),
(3, 'ПВХ (поливинилхлорид)', 'PVC'),
(4, 'ПУ (полиуретан)', 'PU'),
(5, 'Резина', 'Rubber'),
(6, 'ТПУ (термопластичный полиуретан)', 'TPU'),
(7, 'ТЭП (термоэластопласт)', 'TPE'),
(8, 'ЭВА (этиленвинилацетат)', 'EVA');

-- --------------------------------------------------------

--
-- Структура таблицы `messages`
--

CREATE TABLE `messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `sendtime` datetime NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0',
  `adressee_id` bigint(20) UNSIGNED NOT NULL,
  `adresser_id` bigint(20) UNSIGNED NOT NULL,
  `for_answer_id` bigint(20) UNSIGNED DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '2014_10_12_000000_create_users_table', 1),
(2, '2014_10_12_100000_create_password_reset_tokens_table', 1),
(3, '2019_08_19_000000_create_failed_jobs_table', 1),
(4, '2019_12_14_000001_create_personal_access_tokens_table', 1),
(5, '2024_04_08_132130_create_userdelivery_types_table', 1),
(6, '2024_04_08_132205_create_payment_types_table', 1),
(7, '2024_05_05_202632_create_sizes_table', 1),
(8, '2024_05_05_202805_create_maincategories_table', 1),
(9, '2024_05_05_202850_create_childcategories_table', 1),
(10, '2024_05_05_202922_create_brends_table', 1),
(11, '2024_05_05_202953_create_seasons_table', 1),
(12, '2024_05_05_203033_create_material_soles_table', 1),
(13, '2024_05_05_203239_create_heepiece_types_table', 1),
(14, '2024_05_05_203455_create_colors_table', 1),
(15, '2024_05_05_203555_create_clasp_types_table', 1),
(16, '2024_05_05_203630_create_material_insides_table', 1),
(17, '2024_05_05_203657_create_material_outsides_table', 1),
(18, '2024_05_05_203735_create_items_table', 1),
(19, '2024_05_05_203826_create_storage_types_table', 1),
(20, '2024_05_05_203900_create_storages_table', 1),
(21, '2024_05_05_203955_create_states_table', 1),
(22, '2024_05_05_204117_create_action_fotos_table', 1),
(23, '2024_05_05_204231_create_actions_table', 1),
(24, '2024_05_05_204309_create_order_statuses_table', 1),
(25, '2024_05_05_204350_create_delivery_types_table', 1),
(26, '2024_05_05_204606_create_orders_table', 1),
(27, '2024_05_05_204633_create_notifications_table', 1),
(28, '2024_05_05_204716_create_reviews_table', 1),
(29, '2024_05_05_204756_create_user_workers_table', 1),
(30, '2024_05_05_204916_create_messages_table', 1),
(31, '2024_05_05_205054_create_item_sizes_lists_table', 1),
(32, '2024_05_11_171835_create_item_color_list_table', 1),
(33, '2024_05_11_173210_create_item_clasptype_list_table', 1),
(34, '2024_05_11_173234_create_item_materialout_list_table', 1),
(35, '2024_05_11_173245_create_item_materialins_list_table', 1),
(36, '2024_05_11_173335_create_order_item_list_table', 1),
(37, '2024_05_11_173417_create_storage_worker_list_table', 1),
(38, '2024_05_11_173647_create_storage_itemsize_list_table', 1),
(39, '2024_05_11_173807_create_action_item_list_table', 1),
(40, '2024_05_15_115229_create_user_roles_table', 1),
(41, '2024_05_15_115400_add_fk_roles_to_users_table', 1),
(42, '2024_06_05_155651_add_triggers_and_functions', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `inner_text` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `addressee_id` bigint(20) UNSIGNED NOT NULL,
  `sendtime` datetime NOT NULL,
  `is_read` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `delivery_id` smallint(5) UNSIGNED DEFAULT NULL,
  `status_id` smallint(5) UNSIGNED DEFAULT NULL,
  `created_at` datetime NOT NULL,
  `last_change` datetime NOT NULL,
  `first_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `last_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `middle_name` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `address` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `userdelivery_type_id` smallint(5) UNSIGNED DEFAULT NULL,
  `payment_type_id` smallint(5) UNSIGNED DEFAULT NULL,
  `total_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `total_items` int(10) UNSIGNED NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `user_id`, `delivery_id`, `status_id`, `created_at`, `last_change`, `first_name`, `last_name`, `middle_name`, `address`, `phone`, `userdelivery_type_id`, `payment_type_id`, `total_price`, `total_items`) VALUES
(5, 6, 1, 1, '2024-06-24 06:38:16', '2024-06-24 06:38:16', 'Никита', 'Ярмак', 'Андреевич', 'Самовывоз с Притыцкого 10', '+375445556777', 2, 2, '125.60', 1),
(6, 7, 1, 2, '2024-06-24 06:44:24', '2024-06-24 06:44:24', 'Никита', 'Ярмак', 'Андреевич', 'Самовывоз с Притыцкого 10', '+375296495555', 2, 2, '125.60', 1);

-- --------------------------------------------------------

--
-- Структура таблицы `order_item_list`
--

CREATE TABLE `order_item_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `count` int(10) UNSIGNED NOT NULL,
  `this_price` decimal(10,2) NOT NULL,
  `total_price` decimal(10,2) NOT NULL,
  `item_size_id` bigint(20) UNSIGNED NOT NULL,
  `order_id` bigint(20) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_item_list`
--

INSERT INTO `order_item_list` (`id`, `count`, `this_price`, `total_price`, `item_size_id`, `order_id`) VALUES
(5, 1, '125.60', '125.60', 39, 5),
(6, 1, '125.60', '125.60', 39, 6);

--
-- Триггеры `order_item_list`
--
DELIMITER $$
CREATE TRIGGER `after_order_item_list_delete` AFTER DELETE ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE orders
                SET total_items = total_items - OLD.count,
                    total_price = total_price - OLD.total_price
                WHERE id = OLD.order_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_order_item_list_insert` AFTER INSERT ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE orders
                SET total_items = total_items + NEW.count,
                    total_price = total_price + NEW.total_price
                WHERE id = NEW.order_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `after_order_item_list_update` AFTER UPDATE ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE orders
                SET total_items = total_items - OLD.count + NEW.count,
                    total_price = total_price - OLD.total_price + NEW.total_price
                WHERE id = NEW.order_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_order_item_list_insert` BEFORE INSERT ON `order_item_list` FOR EACH ROW BEGIN
                SET NEW.total_price = ROUND(NEW.this_price * NEW.count, 2);
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `before_order_item_list_update` BEFORE UPDATE ON `order_item_list` FOR EACH ROW BEGIN
                SET NEW.total_price = ROUND(NEW.this_price * NEW.count, 2);
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_order_item_list_after_delete` AFTER DELETE ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count + OLD.count,
                    total_ordered = total_ordered - OLD.count
                WHERE id = OLD.item_size_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_order_item_list_after_insert` AFTER INSERT ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count - NEW.count,
                    total_ordered = total_ordered + NEW.count
                WHERE id = NEW.item_size_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_order_item_list_after_update` AFTER UPDATE ON `order_item_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_count = total_count - (NEW.count - OLD.count),
                    total_ordered = total_ordered + (NEW.count - OLD.count)
                WHERE id = NEW.item_size_id;
            END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `order_statuses`
--

CREATE TABLE `order_statuses` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `order_statuses`
--

INSERT INTO `order_statuses` (`id`, `title`, `search_title`, `description`) VALUES
(1, 'Новый', 'new', 'Заказ только что создан'),
(2, 'Обработан', 'processed', 'Заказ обработан и готов к отправке'),
(3, 'Отправлен', 'shipped', 'Заказ отправлен клиенту'),
(4, 'Доставлен', 'delivered', 'Заказ доставлен получателю'),
(5, 'Отменен', 'cancelled', 'Заказ отменен'),
(6, 'Возврат', 'returned', 'Товар возвращен');

-- --------------------------------------------------------

--
-- Структура таблицы `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `payment_types`
--

CREATE TABLE `payment_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `payment_types`
--

INSERT INTO `payment_types` (`id`, `title`, `search_title`) VALUES
(1, 'Картой при получении', 'card'),
(2, 'Наличными при получении', 'cash');

-- --------------------------------------------------------

--
-- Структура таблицы `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `abilities` text COLLATE utf8mb4_unicode_ci,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `mark` int(11) NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `item_id` bigint(20) UNSIGNED NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `reviews`
--

INSERT INTO `reviews` (`id`, `mark`, `user_id`, `item_id`, `description`, `created_at`) VALUES
(1, 5, 4, 6, 'Прекрасные кроссовки', '2024-06-22 18:44:21'),
(2, 4, 4, 5, 'Подошва сломалась слишком быстро', '2024-06-22 18:45:46'),
(3, 5, 4, 7, 'Прекрасные туфли', '2024-06-22 18:46:09');

-- --------------------------------------------------------

--
-- Структура таблицы `seasons`
--

CREATE TABLE `seasons` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `seasons`
--

INSERT INTO `seasons` (`id`, `title`, `search_title`) VALUES
(1, 'Всесезонная', 'All-season'),
(2, 'Демисезонная', 'Mid-season'),
(3, 'Зима', 'Winter'),
(4, 'Лето', 'Summer');

-- --------------------------------------------------------

--
-- Структура таблицы `sizes`
--

CREATE TABLE `sizes` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `sizes`
--

INSERT INTO `sizes` (`id`, `title`) VALUES
(1, '17'),
(2, '18'),
(3, '19'),
(4, '20'),
(5, '21'),
(6, '22'),
(7, '23'),
(8, '24'),
(9, '25'),
(10, '26'),
(11, '27'),
(12, '28'),
(13, '29'),
(14, '30'),
(15, '31'),
(16, '32'),
(17, '33'),
(18, '34'),
(19, '35'),
(20, '36'),
(21, '37'),
(22, '38'),
(23, '39'),
(24, '40'),
(25, '41'),
(26, '42'),
(27, '43'),
(28, '44'),
(29, '45'),
(30, '46'),
(31, '47'),
(32, '48'),
(33, '49'),
(34, '50'),
(35, '51');

-- --------------------------------------------------------

--
-- Структура таблицы `states`
--

CREATE TABLE `states` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL,
  `foto_url` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_action` tinyint(1) NOT NULL DEFAULT '1',
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `statabody` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `views` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `states`
--

INSERT INTO `states` (`id`, `created_at`, `foto_url`, `is_action`, `title`, `statabody`, `views`) VALUES
(31, '2024-06-22 19:57:48', '/storage/images/news/2024-06-22-195748.jpg', 0, 'Новая весенняя коллекция', 'йцувам', 0),
(32, '2024-06-23 20:48:57', '/storage/images/news/2024-06-23-204857.jpg', 0, 'Новая летняя коллекция', 'Поступила на склады новая летняя коллекция обуви.', 0);

-- --------------------------------------------------------

--
-- Структура таблицы `storages`
--

CREATE TABLE `storages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `storagetype_id` smallint(5) UNSIGNED DEFAULT NULL,
  `title` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `contacts` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `storage_itemsize_list`
--

CREATE TABLE `storage_itemsize_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `item_size_id` bigint(20) UNSIGNED NOT NULL,
  `storage_id` bigint(20) UNSIGNED NOT NULL,
  `count` bigint(20) NOT NULL,
  `total_sended` bigint(20) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Триггеры `storage_itemsize_list`
--
DELIMITER $$
CREATE TRIGGER `tr_storage_itemsize_list_after_delete` AFTER DELETE ON `storage_itemsize_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage - OLD.count,
                    total_count = total_count - OLD.count
                WHERE id = OLD.item_size_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_storage_itemsize_list_after_insert` AFTER INSERT ON `storage_itemsize_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage + NEW.count,
                    total_count = total_count + NEW.count
                WHERE id = NEW.item_size_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_storage_itemsize_list_after_send_update` AFTER UPDATE ON `storage_itemsize_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_delivered = total_delivered + (NEW.total_sended - OLD.total_sended),
                    total_ordered = total_ordered - (NEW.total_sended - OLD.total_sended)
                WHERE id = NEW.item_size_id;
            END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `tr_storage_itemsize_list_after_update` AFTER UPDATE ON `storage_itemsize_list` FOR EACH ROW BEGIN
                UPDATE item_sizes_lists
                SET total_in_storage = total_in_storage + (NEW.count - OLD.count),
                    total_count = total_count + (NEW.count - OLD.count)
                WHERE id = NEW.item_size_id;
            END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Структура таблицы `storage_types`
--

CREATE TABLE `storage_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `storage_types`
--

INSERT INTO `storage_types` (`id`, `title`, `search_title`) VALUES
(1, 'Склад', 'Warehouse'),
(2, 'Магазин', 'Store');

-- --------------------------------------------------------

--
-- Структура таблицы `storage_worker_list`
--

CREATE TABLE `storage_worker_list` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `worker_id` bigint(20) UNSIGNED NOT NULL,
  `storage_id` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Структура таблицы `userdelivery_types`
--

CREATE TABLE `userdelivery_types` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `search_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `userdelivery_types`
--

INSERT INTO `userdelivery_types` (`id`, `title`, `search_title`) VALUES
(1, 'Самовывоз с Притыцкого 10', 'selfdelivery'),
(2, 'Доставка в пределах МКАД', 'ourdelivery'),
(3, 'Почтовое отправление', 'postdelivery');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otchestvo` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `city` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `street` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `house` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `apartment` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role_id` smallint(5) UNSIGNED NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `name`, `surname`, `otchestvo`, `email`, `email_verified_at`, `password`, `phone`, `city`, `street`, `house`, `apartment`, `role_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Никита', 'Ярмак', 'Андреевич', 'nik.yarmak.04@mail.ru', NULL, '$2y$12$WAKBzSEHyR23Y.6u5v9HUO411Qcwmt9HNAyJux8to3VV.9fML5Q5i', NULL, NULL, NULL, NULL, NULL, 5, NULL, '2024-06-12 03:57:36', '2024-06-12 03:57:36'),
(2, 'Никита', 'Молчан', 'Евгеньевич', 'nik.05@mail.ru', NULL, '$2y$12$WsNqnNUV1CzBozmMNqdrE.B13pLEV1Qn7IoDX7e3DsfR7aOv1HtDK', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-12 05:35:26', '2024-06-12 05:35:26'),
(3, 'Никита', 'Молчан', 'Андреевич', 'nik3@mail.ru', NULL, '$2y$12$zm7u8.3qvC3O0gggqewen.zU2MeKtAoB59DaqscK1yBKfi9oQFPN.', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-12 05:57:06', '2024-06-12 05:57:06'),
(4, 'Харон', 'Хароныч', NULL, 'nik.yarmak.01@mail.ru', NULL, '$2y$12$q6gZjTetbBJf7paGY36AqeMisovAaJKyFeIkMVGD8cLrWb2VdWO7C', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-22 12:37:07', '2024-06-22 12:37:07'),
(5, 'Харон', 'Ferat', NULL, 'rr@mail.ru', NULL, '$2y$12$2eSYciFoAxnSoIKktGvKB.r4QAC1RKS2QUv35ggOty967epwDvPyS', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-23 07:22:34', '2024-06-23 07:22:34'),
(6, 'Никита', 'Ярмак', 'Андреевич', 'nik.03@mail.ru', NULL, '$2y$12$opn.U9Uxgs81KlwZc2nI/up2TmAaqFf2.qls9iPkH/tJfOzUPiuyi', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-24 03:37:24', '2024-06-24 03:37:24'),
(7, 'Никита', 'Ярмак', 'Андреевич', 'nik.yarmak.0433@mail.ru', NULL, '$2y$12$ErxzBxby5U.mQAJIoCuQruEd5Unjng.wFKEyuNJA8TQ6JFF7RLQba', NULL, NULL, NULL, NULL, NULL, 1, NULL, '2024-06-24 03:43:31', '2024-06-24 03:43:31');

-- --------------------------------------------------------

--
-- Структура таблицы `user_roles`
--

CREATE TABLE `user_roles` (
  `id` smallint(5) UNSIGNED NOT NULL,
  `search_title` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Дамп данных таблицы `user_roles`
--

INSERT INTO `user_roles` (`id`, `search_title`) VALUES
(1, 'user'),
(2, 'worker_simple'),
(3, 'worker_boss'),
(4, 'worker_moderator'),
(5, 'admin');

-- --------------------------------------------------------

--
-- Структура таблицы `user_workers`
--

CREATE TABLE `user_workers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `surname` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `otchestvo` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `paycard` varchar(100) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `actions`
--
ALTER TABLE `actions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `actions_foto_img_id_foreign` (`foto_img_id`),
  ADD KEY `actions_state_link_id_foreign` (`state_link_id`);

--
-- Индексы таблицы `action_fotos`
--
ALTER TABLE `action_fotos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `action_fotos_search_title_index` (`search_title`);

--
-- Индексы таблицы `action_item_list`
--
ALTER TABLE `action_item_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `action_item_list_item_id_action_id_unique` (`item_id`,`action_id`),
  ADD KEY `action_item_list_action_id_foreign` (`action_id`);

--
-- Индексы таблицы `brends`
--
ALTER TABLE `brends`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `childcategories`
--
ALTER TABLE `childcategories`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `clasp_types`
--
ALTER TABLE `clasp_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clasp_types_search_title_index` (`search_title`);

--
-- Индексы таблицы `colors`
--
ALTER TABLE `colors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `colors_search_title_index` (`search_title`);

--
-- Индексы таблицы `delivery_types`
--
ALTER TABLE `delivery_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `delivery_types_search_title_index` (`search_title`);

--
-- Индексы таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Индексы таблицы `heepiece_types`
--
ALTER TABLE `heepiece_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `items`
--
ALTER TABLE `items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `items_maincategory_id_foreign` (`maincategory_id`),
  ADD KEY `items_category_id_foreign` (`category_id`),
  ADD KEY `items_season_id_foreign` (`season_id`),
  ADD KEY `items_brend_id_foreign` (`brend_id`),
  ADD KEY `items_material_sole_id_foreign` (`material_sole_id`),
  ADD KEY `items_heelpiece_id_foreign` (`heelpiece_id`);

--
-- Индексы таблицы `item_clasptype_list`
--
ALTER TABLE `item_clasptype_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_clasptype_list_item_id_clasptype_id_unique` (`item_id`,`clasptype_id`),
  ADD KEY `item_clasptype_list_clasptype_id_foreign` (`clasptype_id`);

--
-- Индексы таблицы `item_color_list`
--
ALTER TABLE `item_color_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_color_list_item_id_color_id_unique` (`item_id`,`color_id`),
  ADD KEY `item_color_list_color_id_foreign` (`color_id`);

--
-- Индексы таблицы `item_materialins_list`
--
ALTER TABLE `item_materialins_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_materialins_list_item_id_materialin_id_unique` (`item_id`,`materialin_id`),
  ADD KEY `item_materialins_list_materialin_id_foreign` (`materialin_id`);

--
-- Индексы таблицы `item_materialout_list`
--
ALTER TABLE `item_materialout_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `item_materialout_list_item_id_materialout_id_unique` (`item_id`,`materialout_id`),
  ADD KEY `item_materialout_list_materialout_id_foreign` (`materialout_id`);

--
-- Индексы таблицы `item_sizes_lists`
--
ALTER TABLE `item_sizes_lists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `item_sizes_lists_size_id_foreign` (`size_id`),
  ADD KEY `item_sizes_lists_item_id_foreign` (`item_id`);

--
-- Индексы таблицы `maincategories`
--
ALTER TABLE `maincategories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `maincategories_search_title_index` (`search_title`);

--
-- Индексы таблицы `material_insides`
--
ALTER TABLE `material_insides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_insides_search_title_index` (`search_title`);

--
-- Индексы таблицы `material_outsides`
--
ALTER TABLE `material_outsides`
  ADD PRIMARY KEY (`id`),
  ADD KEY `material_outsides_search_title_index` (`search_title`);

--
-- Индексы таблицы `material_soles`
--
ALTER TABLE `material_soles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `messages`
--
ALTER TABLE `messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `messages_for_answer_id_foreign` (`for_answer_id`),
  ADD KEY `messages_adressee_id_foreign` (`adressee_id`),
  ADD KEY `messages_adresser_id_foreign` (`adresser_id`);

--
-- Индексы таблицы `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_addressee_id_foreign` (`addressee_id`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_user_id_foreign` (`user_id`),
  ADD KEY `orders_delivery_id_foreign` (`delivery_id`),
  ADD KEY `orders_status_id_foreign` (`status_id`),
  ADD KEY `orders_userdelivery_type_id_foreign` (`userdelivery_type_id`),
  ADD KEY `orders_payment_type_id_foreign` (`payment_type_id`);

--
-- Индексы таблицы `order_item_list`
--
ALTER TABLE `order_item_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `order_item_list_item_size_id_order_id_unique` (`item_size_id`,`order_id`),
  ADD KEY `order_item_list_order_id_foreign` (`order_id`);

--
-- Индексы таблицы `order_statuses`
--
ALTER TABLE `order_statuses`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Индексы таблицы `payment_types`
--
ALTER TABLE `payment_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Индексы таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reviews_item_id_foreign` (`item_id`),
  ADD KEY `reviews_user_id_foreign` (`user_id`);

--
-- Индексы таблицы `seasons`
--
ALTER TABLE `seasons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `seasons_search_title_index` (`search_title`);

--
-- Индексы таблицы `sizes`
--
ALTER TABLE `sizes`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `states`
--
ALTER TABLE `states`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `storages`
--
ALTER TABLE `storages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `storages_storagetype_id_foreign` (`storagetype_id`);

--
-- Индексы таблицы `storage_itemsize_list`
--
ALTER TABLE `storage_itemsize_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `storage_itemsize_list_item_size_id_storage_id_unique` (`item_size_id`,`storage_id`),
  ADD KEY `storage_itemsize_list_storage_id_foreign` (`storage_id`);

--
-- Индексы таблицы `storage_types`
--
ALTER TABLE `storage_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `storage_worker_list`
--
ALTER TABLE `storage_worker_list`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `storage_worker_list_worker_id_storage_id_unique` (`worker_id`,`storage_id`),
  ADD KEY `storage_worker_list_storage_id_foreign` (`storage_id`);

--
-- Индексы таблицы `userdelivery_types`
--
ALTER TABLE `userdelivery_types`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_role_id_foreign` (`role_id`);

--
-- Индексы таблицы `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `user_workers`
--
ALTER TABLE `user_workers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_workers_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `actions`
--
ALTER TABLE `actions`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `action_fotos`
--
ALTER TABLE `action_fotos`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `action_item_list`
--
ALTER TABLE `action_item_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `brends`
--
ALTER TABLE `brends`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `childcategories`
--
ALTER TABLE `childcategories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT для таблицы `clasp_types`
--
ALTER TABLE `clasp_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `colors`
--
ALTER TABLE `colors`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT для таблицы `delivery_types`
--
ALTER TABLE `delivery_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `heepiece_types`
--
ALTER TABLE `heepiece_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT для таблицы `items`
--
ALTER TABLE `items`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT для таблицы `item_clasptype_list`
--
ALTER TABLE `item_clasptype_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `item_color_list`
--
ALTER TABLE `item_color_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `item_materialins_list`
--
ALTER TABLE `item_materialins_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT для таблицы `item_materialout_list`
--
ALTER TABLE `item_materialout_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `item_sizes_lists`
--
ALTER TABLE `item_sizes_lists`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=156;

--
-- AUTO_INCREMENT для таблицы `maincategories`
--
ALTER TABLE `maincategories`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `material_insides`
--
ALTER TABLE `material_insides`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT для таблицы `material_outsides`
--
ALTER TABLE `material_outsides`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT для таблицы `material_soles`
--
ALTER TABLE `material_soles`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT для таблицы `messages`
--
ALTER TABLE `messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT для таблицы `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `order_item_list`
--
ALTER TABLE `order_item_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `order_statuses`
--
ALTER TABLE `order_statuses`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT для таблицы `payment_types`
--
ALTER TABLE `payment_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `seasons`
--
ALTER TABLE `seasons`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT для таблицы `sizes`
--
ALTER TABLE `sizes`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT для таблицы `states`
--
ALTER TABLE `states`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT для таблицы `storages`
--
ALTER TABLE `storages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `storage_itemsize_list`
--
ALTER TABLE `storage_itemsize_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `storage_types`
--
ALTER TABLE `storage_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT для таблицы `storage_worker_list`
--
ALTER TABLE `storage_worker_list`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT для таблицы `userdelivery_types`
--
ALTER TABLE `userdelivery_types`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT для таблицы `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` smallint(5) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT для таблицы `user_workers`
--
ALTER TABLE `user_workers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `actions`
--
ALTER TABLE `actions`
  ADD CONSTRAINT `actions_foto_img_id_foreign` FOREIGN KEY (`foto_img_id`) REFERENCES `action_fotos` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `actions_state_link_id_foreign` FOREIGN KEY (`state_link_id`) REFERENCES `states` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `action_item_list`
--
ALTER TABLE `action_item_list`
  ADD CONSTRAINT `action_item_list_action_id_foreign` FOREIGN KEY (`action_id`) REFERENCES `actions` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `action_item_list_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `items`
--
ALTER TABLE `items`
  ADD CONSTRAINT `items_brend_id_foreign` FOREIGN KEY (`brend_id`) REFERENCES `brends` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `items_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `childcategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `items_heelpiece_id_foreign` FOREIGN KEY (`heelpiece_id`) REFERENCES `heepiece_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `items_maincategory_id_foreign` FOREIGN KEY (`maincategory_id`) REFERENCES `maincategories` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `items_material_sole_id_foreign` FOREIGN KEY (`material_sole_id`) REFERENCES `material_soles` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `items_season_id_foreign` FOREIGN KEY (`season_id`) REFERENCES `seasons` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `item_clasptype_list`
--
ALTER TABLE `item_clasptype_list`
  ADD CONSTRAINT `item_clasptype_list_clasptype_id_foreign` FOREIGN KEY (`clasptype_id`) REFERENCES `clasp_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_clasptype_list_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `item_color_list`
--
ALTER TABLE `item_color_list`
  ADD CONSTRAINT `item_color_list_color_id_foreign` FOREIGN KEY (`color_id`) REFERENCES `colors` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_color_list_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `item_materialins_list`
--
ALTER TABLE `item_materialins_list`
  ADD CONSTRAINT `item_materialins_list_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_materialins_list_materialin_id_foreign` FOREIGN KEY (`materialin_id`) REFERENCES `material_insides` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `item_materialout_list`
--
ALTER TABLE `item_materialout_list`
  ADD CONSTRAINT `item_materialout_list_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `item_materialout_list_materialout_id_foreign` FOREIGN KEY (`materialout_id`) REFERENCES `material_outsides` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `item_sizes_lists`
--
ALTER TABLE `item_sizes_lists`
  ADD CONSTRAINT `item_sizes_lists_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `item_sizes_lists_size_id_foreign` FOREIGN KEY (`size_id`) REFERENCES `sizes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `messages`
--
ALTER TABLE `messages`
  ADD CONSTRAINT `messages_adressee_id_foreign` FOREIGN KEY (`adressee_id`) REFERENCES `user_workers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_adresser_id_foreign` FOREIGN KEY (`adresser_id`) REFERENCES `user_workers` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `messages_for_answer_id_foreign` FOREIGN KEY (`for_answer_id`) REFERENCES `messages` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_addressee_id_foreign` FOREIGN KEY (`addressee_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_delivery_id_foreign` FOREIGN KEY (`delivery_id`) REFERENCES `delivery_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_payment_type_id_foreign` FOREIGN KEY (`payment_type_id`) REFERENCES `payment_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_status_id_foreign` FOREIGN KEY (`status_id`) REFERENCES `order_statuses` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `orders_userdelivery_type_id_foreign` FOREIGN KEY (`userdelivery_type_id`) REFERENCES `userdelivery_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `order_item_list`
--
ALTER TABLE `order_item_list`
  ADD CONSTRAINT `order_item_list_item_size_id_foreign` FOREIGN KEY (`item_size_id`) REFERENCES `item_sizes_lists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `order_item_list_order_id_foreign` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_item_id_foreign` FOREIGN KEY (`item_id`) REFERENCES `items` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reviews_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `storages`
--
ALTER TABLE `storages`
  ADD CONSTRAINT `storages_storagetype_id_foreign` FOREIGN KEY (`storagetype_id`) REFERENCES `storage_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `storage_itemsize_list`
--
ALTER TABLE `storage_itemsize_list`
  ADD CONSTRAINT `storage_itemsize_list_item_size_id_foreign` FOREIGN KEY (`item_size_id`) REFERENCES `item_sizes_lists` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `storage_itemsize_list_storage_id_foreign` FOREIGN KEY (`storage_id`) REFERENCES `storages` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `storage_worker_list`
--
ALTER TABLE `storage_worker_list`
  ADD CONSTRAINT `storage_worker_list_storage_id_foreign` FOREIGN KEY (`storage_id`) REFERENCES `storages` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `storage_worker_list_worker_id_foreign` FOREIGN KEY (`worker_id`) REFERENCES `user_workers` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `user_roles` (`id`) ON DELETE CASCADE;

--
-- Ограничения внешнего ключа таблицы `user_workers`
--
ALTER TABLE `user_workers`
  ADD CONSTRAINT `user_workers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
