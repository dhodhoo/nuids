-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2026 at 09:17 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nuids_fix`
--

-- --------------------------------------------------------

--
-- Table structure for table `chat_messages`
--

CREATE TABLE `chat_messages` (
  `chat_message_id` bigint(20) UNSIGNED NOT NULL,
  `child_id` bigint(20) UNSIGNED NOT NULL,
  `role` varchar(10) NOT NULL,
  `message_text` text NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `chat_messages`
--

INSERT INTO `chat_messages` (`chat_message_id`, `child_id`, `role`, `message_text`, `created_at`) VALUES
(1, 1, 'ai', 'Halo! Saya Nuids AI, asisten pertumbuhan anak kamu. Ada yang bisa saya bantu hari ini?', '2026-06-19 17:28:35'),
(2, 1, 'user', 'Anak saya Vera, 14 bulan. Berat badannya 8,5 kg. Apakah normal?', '2026-06-19 17:28:35'),
(3, 1, 'ai', 'Berdasarkan standar WHO, berat badan ideal anak perempuan usia 14 bulan adalah sekitar 8,5u20139,5 kg. Vera berada di batas bawah kisaran normal.\n\nSaya sarankan tetap pantau secara rutin dan pastikan asupan gizi hariannya terpenuhi.', '2026-06-19 17:28:35'),
(4, 2, 'user', 'Halo, apa kabar?', '2026-06-19 17:57:09'),
(7, 4, 'user', 'halo', '2026-06-19 19:17:23'),
(8, 4, 'ai', 'Maaf, layanan AI sedang sibuk. Silakan coba lagi nanti.', '2026-06-19 19:17:23'),
(9, 2, 'user', 'Halo, apa kabar?', '2026-06-19 19:18:15'),
(10, 2, 'ai', 'Maaf, layanan AI sedang sibuk. Silakan coba lagi nanti.', '2026-06-19 19:18:15'),
(11, 2, 'user', 'Halo, apa kabar?', '2026-06-19 19:19:11'),
(12, 2, 'ai', 'Halo, Vera Putri Reska! Kabar saya baik, terima kasih sudah bertanya. ????\n\nSenang sekali bisa berkenalan dengan Vera, putri kecil yang berusia 41 bulan dan menurut data terakhir (12 Mei 2024) tumbuh dengan **baik dan sehat**. Beratnya 9,2 kg dan tinggi 76,5 cm dengan Z-Score -0,5 — ini masih dalam kategori pertumbuhan yang aman dan normal, Bu. Vera juga makan dengan lahap dan kondisinya sehat, catatan pertumbuhannya pun baik. Jadi, Bunda bisa tenang dulu.\n\nSaya siap membantu Bunda terkait menu makan sehari-hari untuk Vera dengan budget Rp30.000 dan bahan yang tersedia di rumah (nasi, ayam, tahu, tempe, wortel). Saya juga sudah ingat bahwa Vera **alergi telur**, jadi semua menu yang saya sarankan pasti bebas telur.\n\nApa yang bisa saya bantu hari ini, Bu? Apakah Bunda ingin:\n- Daftar menu harian selama seminggu?\n- Resep praktis dari bahan yang ada?\n- Tips variasi agar Vera tidak bosan?\n- Atau ada hal lain yang dikhawatirkan?\n\nSaya siap mendampingi dengan senang hati. Silakan ceritakan kebutuhan Bunda ya! ????', '2026-06-19 19:19:16'),
(13, 4, 'user', 'halo', '2026-06-19 19:21:29'),
(14, 4, 'ai', 'Halo, Ayah/Bunda! ????\n\nSenang sekali bisa berkenalan dengan keluarga kecil yang baru saja menyambut anggota baru. Namanya **adadad**, ya? Usia 2 bulan adalah masa yang sangat istimewa—di usia ini, si kecil sedang dalam masa adaptasi dengan dunia di luar perut Bunda.\n\nSebelum kita lanjut, saya perlu jujur ya: **data pemeriksaan adadad belum ada**, jadi saya belum bisa memberikan saran spesifik tentang tumbuh kembangnya. Tapi tenang, saya di sini untuk membantu memberikan gambaran umum dan saran praktis sesuai dengan kondisi yang Bunda/Ayah sampaikan.\n\n---\n\n### Yang Perlu Diperhatikan untuk adadad (Usia 2 Bulan):\n\n1. **Asupan utama:** Di usia ini, **ASI adalah makanan terbaik dan satu-satunya** yang dibutuhkan. Belum perlu makanan padat atau camilan apapun, ya.\n\n2. **Alergi yang perlu diwaspadai:** Karena adadad memiliki alergi terhadap **kedelai, gandum, dan susu sapi**, maka jika Bunda memberikan ASI, **Bunda yang menyusui sebaiknya menghindari makanan yang mengandung ketiga bahan ini**. Karena alergen bisa masuk melalui ASI.  \n   - Contoh makanan yang dihindari: tahu, tempe, susu, keju, yogurt, roti, mi, kue, dan makanan olahan yang pakai tepung terigu atau susu.\n\n3. **Untuk bahan makanan Bunda sendiri (karena menyusui):**  \n   Dari bahan yang tersedia (ayam, ikan, sayuran, kentang, bayam), semuanya **aman** untuk Bunda konsumsi selama tidak diolah dengan tambahan kedelai, gandum, atau susu sapi. Misalnya:\n   - Ayam/ikan digoreng atau direbus pakai bumbu sederhana (bawang, garam, minyak goreng biasa) — aman.\n   - Sayur bayam dan kentang juga aman, asal tidak pakai santan yang dicampur susu atau tepung.\n\n4. **Budget Rp50.000/hari:** Untuk kebutuhan makanan Bunda sehari-hari, budget ini sangat cukup. Contoh menu sehat untuk Bunda (tanpa alergen):\n   - Sarapan: nasi + ikan goreng + sayur bayam rebus\n   - Makan siang: nasi + ayam ungkep + kentang rebus\n   - Makan malam: nasi + sup sayuran (tanpa susu/tepung)\n\n---\n\n### Yang Perlu Dicatat:\n\n- **Belum ada data pemeriksaan** seperti berat badan, panjang badan, atau lingkar kepala. Untuk memantau pertumbuhan adadad, sangat disarankan untuk rutin ke **Posyandu atau Puskesmas** setiap bulan agar bisa diukur dan dicatat di Kartu Menuju Sehat (KMS).\n- Jika Bunda/Ayah melihat tanda-tanda seperti:\n  - Berat badan tidak naik dalam 2 bulan berturut-turut\n  - Adadad tampak lemas, tidak mau menyusu, atau jarang buang air kecil\n  - Ada ruam, muntah, atau diare setelah Bunda makan tertentu\n\n  **Segera konsultasikan ke dokter anak atau bidan**, ya. Saya hanya bisa memberi saran umum, bukan menggantikan peran tenaga kesehatan.\n\n---\n\n### Saran saya untuk sekarang:\n1. Tetap beri ASI eksklusif sebisa mungkin.\n2. Catat makanan Bunda setiap hari untuk memantau apakah ada reaksi alergi pada adadad.\n3. Bawa adadad ke Posyandu terdekat untuk cek pertumbuhan bulan ini.\n\n---\n\nApakah ada yang ingin Bunda/Ayah tanyakan lebih lanjut? Misalnya tentang tanda-tanda alergi pada bayi, atau cara mengolah bahan makanan yang aman? Saya siap membantu dengan senang hati. ????', '2026-06-19 19:21:39'),
(15, 4, 'user', 'halo', '2026-06-20 04:32:32'),
(16, 4, 'user', 'halo', '2026-06-20 04:35:30'),
(17, 4, 'ai', 'Halo, Ayah/Bunda! ????\n\nMaaf banget, saya lihat ada sedikit kekeliruan dari respons saya sebelumnya. Saya tadi menyebutkan usia 2 bulan, padahal di data tertulis **adadad sudah berusia 12 bulan**. Terima kasih sudah mengingatkan kembali, ya. Saya perbaiki sekarang.\n\n---\n\n### Untuk adadad (12 bulan):\n\nDi usia 1 tahun ini, adadad sudah boleh mulai makan makanan pendamping ASI (MPASI) yang lebih padat, bahkan hampir sama dengan makanan keluarga, dengan tekstur yang disesuaikan.\n\n**Tapi sebelumnya, saya perlu jujur:**  \nData adadad belum lengkap—**tinggi badan, berat badan, dan pola makannya belum ada**. Jadi saya belum bisa memberikan saran yang spesifik tentang tumbuh kembangnya. \n\nYang saya tahu:\n- Statusnya: **Perlu Konsultasi**\n- Kondisinya: sehat\n\nKarena statusnya \"Perlu Konsultasi\", saya sarankan Ayah/Bunda untuk **konsultasikan tumbuh kembang adadad ke dokter anak, bidan, atau ke Posyandu/Puskesmas terdekat**, ya. Mereka bisa mengukur dan menilai apakah pertumbuhan adadad sesuai usianya.\n\n---\n\n### Sementara ini, yang bisa saya bantu:\n\n**1. Menu makan untuk adadad (usia 12 bulan) dengan budget Rp50.000/hari**  \nKarena adadad alergi **kedelai, gandum, dan susu sapi**, semua menu harus bebas dari 3 bahan ini.\n\nDari bahan yang tersedia: **ayam, ikan, sayuran, kentang, bayam** — semuanya aman! Berikut contoh menu sehari (bisa dipilih):\n\n- **Sarapan:** Bubur nasi + ayam cincang + bayam rebus haluskan  \n- **Snack pagi:** Kentang kukus, tumbuk (tanpa tambahan susu/mentega)  \n- **Makan siang:** Nasi tim + ikan (kukus/goreng tanpa tepung) + sayuran rebus (wortel/buncis)  \n- **Snack sore:** Pisang atau pepaya (jika ada)  \n- **Makan malam:** Nasi + sup ayam bening (bawang, garam, sedikit minyak) + kentang potong kecil  \n\n**Semua menu ini aman** karena tidak pakai tahu, tempe, susu, keju, roti, mi, atau tepung terigu.\n\n**2. Budget Rp50.000**  \nCukup kok, Bun. Misalnya:\n- Ayam 1/4 kg: Rp15.000\n- Ikan 2 ekor kecil: Rp12.000\n- Kentang 1/2 kg: Rp5.000\n- Bayam 1 ikat: Rp3.000\n- Sayuran lain (wortel/buncis): Rp5.000\n- Nasi/bahan pokok: Rp10.000  \nTotal sekitar Rp50.000. Masih bisa diatur.\n\n---\n\n### Yang perlu diingat:\n- Di usia 12 bulan, adadad sudah bisa makan 3 kali makanan utama + 2 kali snack.\n- Tekstur makanan bisa mulai dicincang kasar, tidak perlu dihaluskan lagi, kecuali adadad belum terbiasa.\n- Tetap berikan ASI atau susu formula khusus (yang bebas susu sapi, kedelai, dan gandum) sesuai anjuran dokter.\n\n---\n\n### Yang paling penting sekarang:\nKarena statusnya \"Perlu Konsultasi\" dan data tinggi/berat belum ada, **saya sangat menyarankan Ayah/Bunda untuk segera membawa adadad ke Posyandu atau Puskesmas** untuk ditimbang dan diukur. Dari situlah nanti bisa diketahui apakah pertumbuhannya baik atau perlu intervensi lebih lanjut.\n\n---\n\nApakah Ayah/Bunda bisa membantu melengkapi data berikut?  \n- Berat badan adadad sekarang?  \n- Tinggi/panjang badan?  \n- Pola makan saat ini (berapa kali, porsi, tekstur)?  \n\nDengan data itu, saya bisa bantu kasih saran menu yang lebih pas. Kalau belum sempat, tidak apa-apa, yang terpenting tetap konsultasi ke tenaga kesehatan, ya.\n\nAda yang bisa saya bantu lagi, Bun? Saya siap mendampingi. ????', '2026-06-20 04:35:49'),
(18, 4, 'user', 'halo', '2026-06-20 04:39:14'),
(19, 4, 'ai', 'Halo, Ayah/Bunda! ????\n\nSaya di sini kok. Maaf kalau sebelumnya ada kebingungan, ya. Saya siap membantu dengan senang hati.\n\n---\n\n**Sebelum lanjut, saya perlu jujur dulu:**\n\nSaya belum punya data lengkap tentang adadad, seperti:\n- Berat dan tinggi badan sekarang\n- Riwayat pertumbuhan sebelumnya\n- Pola makan dan minum sehari-hari\n\nJadi saran saya sifatnya **umum dan edukatif**, bukan diagnosis atau pengganti konsultasi dengan tenaga kesehatan, ya.\n\n---\n\n### Yang saya tahu dari informasi sebelumnya:\n- Nama: **adadad**\n- Usia: **12 bulan**\n- Status: **Perlu Konsultasi**\n- Kondisi: sehat\n- Alergi: **kedelai, gandum, susu sapi**\n\nKarena statusnya \"Perlu Konsultasi\", saya sarankan Ayah/Bunda untuk **memeriksakan adadad ke Posyandu, Puskesmas, atau dokter anak** agar pertumbuhannya bisa diukur dan dinilai secara profesional.\n\n---\n\n### Sementara itu, yang bisa saya bantu:\n\n1. **Memberi contoh menu sehat bebas alergen** sesuai bahan yang tersedia (ayam, ikan, sayuran, kentang, bayam) dengan budget Rp50.000/hari.\n2. **Memberi tahu tanda-tanda yang perlu diwaspadai** terkait alergi atau gangguan tumbuh kembang.\n3. **Menjawab pertanyaan umum** seputar MPASI usia 12 bulan.\n\n---\n\nApakah ada yang ingin Ayah/Bunda tanyakan hari ini?\n\nMisalnya:\n- Mau minta contoh menu spesifik?\n- Ingin tahu cara mengenali reaksi alergi?\n- Atau mau cerita tentang perkembangan adadad saat ini?\n\nSaya siap mendengarkan dan membantu semampu saya. ????', '2026-06-20 04:39:21'),
(20, 4, 'user', 'halo', '2026-06-20 06:01:23'),
(21, 4, 'ai', 'Halo, selamat siang! Senang sekali Bunda/Ayah bisa menyapa di sini.  \n\nBagaimana kabar si kecil hari ini? Apakah ada yang ingin ditanyakan seputar tumbuh kembangnya?  \n\nSaya di sini untuk menemani diskusi, ya. Namun perlu diingat, saya bukan pengganti dokter atau tenaga kesehatan. Jika ada hal yang membuat Bunda/Ayah khawatir, sangat disarankan untuk berkonsultasi langsung dengan ahli, misalnya ke posyandu, puskesmas, atau dokter anak.  \n\nCeritakan dulu, kira-kira apa yang ingin didiskusikan? Saya siap mendengar dengan sabar. ????', '2026-06-20 06:01:28'),
(22, 4, 'user', 'kamu ai apa?', '2026-06-20 06:01:41'),
(23, 4, 'ai', 'Saya adalah asisten virtual yang dirancang khusus untuk menemani diskusi ringan seputar tumbuh kembang anak.  \n\nSaya **bukan dokter, bukan tenaga kesehatan**, dan tidak bisa menggantikan pemeriksaan langsung oleh ahli. Tugas saya hanya membantu memberikan informasi umum, mendengarkan cerita Bunda/Ayah, dan mengarahkan ke saran yang bijak—termasuk mengingatkan untuk tetap berkonsultasi ke posyandu, puskesmas, atau dokter anak jika ada kekhawatiran.  \n\nJadi, silakan anggap saya seperti teman ngobrol yang siap mendengar, ya. ????  \n\nAda yang bisa saya bantu untuk si kecil hari ini?', '2026-06-20 06:01:46');

-- --------------------------------------------------------

--
-- Table structure for table `checkups`
--

CREATE TABLE `checkups` (
  `checkup_id` bigint(20) UNSIGNED NOT NULL,
  `child_id` bigint(20) UNSIGNED NOT NULL,
  `week` int(11) NOT NULL,
  `checkup_date` date NOT NULL,
  `height_cm` decimal(5,2) NOT NULL,
  `weight_kg` decimal(5,2) NOT NULL,
  `status` varchar(30) NOT NULL DEFAULT 'aman',
  `meal` varchar(20) DEFAULT NULL,
  `conditions` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`conditions`)),
  `parent_notes` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ;

--
-- Dumping data for table `checkups`
--

INSERT INTO `checkups` (`checkup_id`, `child_id`, `week`, `checkup_date`, `height_cm`, `weight_kg`, `status`, `meal`, `conditions`, `parent_notes`, `created_at`) VALUES
(1, 1, 18, '2024-05-12', 76.50, 9.20, 'aman', 'baik', '[\"sehat\"]', 'Pertumbuhan sangat baik, teruskan ASI eksklusif dan MPASI bergizi.', '2026-06-19 17:28:35'),
(2, 1, 17, '2024-05-05', 75.80, 8.80, 'pantau', 'cukup', '[\"sehat\"]', '', '2026-06-19 17:28:35'),
(3, 1, 16, '2024-04-28', 75.50, 8.90, 'aman', 'baik', '[\"sehat\"]', '', '2026-06-19 17:28:35'),
(4, 1, 15, '2024-04-21', 74.00, 8.50, 'konsultasi', 'kurang', '[\"sakit\"]', 'Berat badan menurun dari minggu sebelumnya. Disarankan segera konsultasi dengan bidan/dokter.', '2026-06-19 17:28:35'),
(5, 2, 18, '2024-05-12', 76.50, 9.20, 'aman', 'baik', '[\"sehat\"]', 'Pertumbuhan baik', '2026-06-19 17:57:09'),
(7, 4, 19, '2026-06-20', 75.00, 9.00, 'aman', 'cukup', '[\"sehat\"]', '', '2026-06-20 02:32:36'),
(10, 4, 20, '2026-06-27', 79.00, 10.00, 'aman', 'baik', '[\"sehat\"]', '', '2026-06-20 02:36:28'),
(11, 4, 21, '2026-07-04', 85.00, 10.00, 'aman', 'kurang', '[\"sehat\",\"sakit\"]', '', '2026-06-20 03:12:01'),
(12, 4, 22, '2026-07-11', 55.00, 2.00, 'pantau', 'kurang', '[\"sehat\",\"muntah\"]', '', '2026-06-20 03:12:46');

-- --------------------------------------------------------

--
-- Table structure for table `children`
--

CREATE TABLE `children` (
  `child_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `birth_date` date NOT NULL,
  `gender` varchar(20) NOT NULL,
  `birth_weight` decimal(5,2) DEFAULT NULL,
  `birth_height` decimal(5,2) DEFAULT NULL,
  `allergies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allergies`)),
  `texture` varchar(50) DEFAULT NULL,
  `budget` decimal(12,2) DEFAULT NULL,
  `budget_mode` varchar(20) DEFAULT 'harian',
  `available_ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`available_ingredients`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ;

--
-- Dumping data for table `children`
--

INSERT INTO `children` (`child_id`, `user_id`, `full_name`, `birth_date`, `gender`, `birth_weight`, `birth_height`, `allergies`, `texture`, `budget`, `budget_mode`, `available_ingredients`, `created_at`, `updated_at`) VALUES
(1, 1, 'Vera Putri Reska', '2023-01-15', 'female', 3.20, 48.50, '[\"telur\"]', 'lembut', 20000.00, 'harian', '[\"Nasi\", \"Ayam\", \"Tahu\", \"Tempe\"]', '2026-06-19 17:28:35', '2026-06-19 17:28:35'),
(2, 3, 'Vera Putri Reska', '2023-01-15', 'female', 3.20, 48.50, '[\"telur\"]', 'cincang', 30000.00, 'harian', '[\"Nasi\",\"Ayam\",\"Tahu\",\"Tempe\",\"Wortel\"]', '2026-06-19 17:57:09', '2026-06-19 17:57:09'),
(4, 4, 'adadad', '2025-06-07', 'male', 5.00, 58.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'lembut', 50000.00, 'harian', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:15:40', '2026-06-20 02:31:37');

-- --------------------------------------------------------

--
-- Table structure for table `consents`
--

CREATE TABLE `consents` (
  `consent_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `is_approved` tinyint(1) NOT NULL DEFAULT 0,
  `approved_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `consents`
--

INSERT INTO `consents` (`consent_id`, `user_id`, `is_approved`, `approved_at`, `created_at`) VALUES
(1, 4, 1, '2026-06-19 14:15:09', '2026-06-19 19:14:26');

-- --------------------------------------------------------

--
-- Table structure for table `meal_plans`
--

CREATE TABLE `meal_plans` (
  `meal_plan_id` bigint(20) UNSIGNED NOT NULL,
  `child_id` bigint(20) UNSIGNED NOT NULL,
  `plan_date` date NOT NULL,
  `budget` decimal(12,2) DEFAULT NULL,
  `allergies` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`allergies`)),
  `ai_note` text DEFAULT NULL,
  `meals` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`meals`)),
  `ingredients` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`ingredients`)),
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `meal_plans`
--

INSERT INTO `meal_plans` (`meal_plan_id`, `child_id`, `plan_date`, `budget`, `allergies`, `ai_note`, `meals`, `ingredients`, `created_at`) VALUES
(1, 1, '2024-05-12', 20000.00, '[\"telur\"]', 'Menu ini kaya akan Zat Besi untuk mendukung pertumbuhan tinggi badan.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Beras Merah Hati Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Wortel & Tempe\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Labu Kuning Daging Giling\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pepaya & Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Beras Merah\", \"Hati Ayam\", \"Wortel\", \"Tempe\", \"Labu Kuning\", \"Daging Giling\"]', '2026-06-19 17:28:35'),
(2, 2, '2024-05-12', 20000.00, '[\"telur\"]', 'Menu kaya zat besi', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ayam\",\"time\":\"08:00\"}]', '[\"Ayam\",\"Nasi\"]', '2026-06-19 17:57:09'),
(3, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:16:34'),
(4, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:16:34'),
(5, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:16:51'),
(6, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:17:06'),
(7, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:17:06'),
(8, 2, '2026-06-19', 30000.00, '[\"telur\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Nasi\",\"Ayam\",\"Tahu\",\"Tempe\",\"Wortel\"]', '2026-06-19 19:18:16'),
(9, 2, '2026-06-19', 30000.00, '[\"telur\"]', 'Menu ini bervariasi dengan bahan utama nasi, ayam, tahu, tempe, dan wortel. Tekstur disesuaikan untuk anak 41 bulan (cincang halus hingga makanan keluarga). Semua menu bebas telur dan berbeda dari 7 hari terakhir.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Wortel Ayam\",\"time\":\"08:00 WIB\",\"price\":5500},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tempe Sayur\",\"time\":\"12:30 WIB\",\"price\":6000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Tahu Ayam Cincang\",\"time\":\"18:30 WIB\",\"price\":5500},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Pisang Kukus Parut\",\"time\":\"15:30 WIB\",\"price\":2500}]', '[\"Nasi\",\"Ayam\",\"Tahu\",\"Tempe\",\"Wortel\",\"Pisang\"]', '2026-06-19 19:19:20'),
(10, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:22:10'),
(11, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:22:11'),
(12, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:22:57'),
(13, 4, '2026-06-19', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-19 19:22:59'),
(14, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:30:24'),
(15, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:30:27'),
(16, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:30:49'),
(17, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:30:51'),
(18, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:30:59'),
(19, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:31:12'),
(20, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:31:14'),
(21, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:33:02'),
(22, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:33:04'),
(23, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:37:07'),
(24, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini disusun berdasarkan bahan yang tersedia.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi Ayam\",\"time\":\"08:00 WIB\"},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Nasi Tim Tahu\",\"time\":\"12:30 WIB\"},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Sup Ayam Sayur\",\"time\":\"18:30 WIB\"},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puree Pisang\",\"time\":\"15:30 WIB\"}]', '[\"Ayam\",\"Ikan\",\"Sayuran\",\"Kentang\",\"Bayam\"]', '2026-06-20 02:37:09'),
(25, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan yang berbeda dari 7 hari terakhir, berbahan dasar ikan dan sayuran dengan tekstur lembut sesuai usia 12 bulan, serta bebas dari alergen kedelai, gandum, dan susu sapi.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ikan Dory dan Bayam\",\"time\":\"08:00 WIB\",\"price\":6000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Kentang Daging Ayam Cincang\",\"time\":\"12:30 WIB\",\"price\":7000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Ikan Kembung dan Wortel\",\"time\":\"18:30 WIB\",\"price\":6500},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Pisang dan Alpukat\",\"time\":\"15:30 WIB\",\"price\":3000}]', '[\"Ikan Dory\",\"Bayam\",\"Kentang\",\"Daging Ayam Giling\",\"Ikan Kembung\",\"Wortel\",\"Pisang\",\"Alpukat\",\"Beras Putih\",\"Minyak Sayur\"]', '2026-06-20 02:44:02'),
(26, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini bervariasi dengan bahan ayam, ikan, sayur, dan kentang, tekstur lembut sesuai usia 12 bulan, serta bebas dari kedelai, gandum, dan susu sapi.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ayam dan Bayam\",\"time\":\"08:00 WIB\",\"price\":6000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ikan Kembung dan Wortel\",\"time\":\"12:30 WIB\",\"price\":7000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Kentang dan Daging Ayam\",\"time\":\"18:30 WIB\",\"price\":6000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Alpukat dan Pisang\",\"time\":\"15:30 WIB\",\"price\":2500}]', '[\"daging ayam\",\"bayam\",\"ikan kembung\",\"wortel\",\"kentang\",\"alpukat\",\"pisang\"]', '2026-06-20 02:44:08'),
(27, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan yang aman dan berbeda dari 7 hari terakhir. Tekstur lembut sesuai usia 12 bulan, dengan variasi ikan, ayam, dan sayuran.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ikan Tenggiri dan Labu Kuning\",\"time\":\"08:00 WIB\",\"price\":7000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ayam dan Brokoli\",\"time\":\"12:30 WIB\",\"price\":8000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Kentang dan Hati Ayam\",\"time\":\"18:30 WIB\",\"price\":7000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Mangga dan Santan\",\"time\":\"15:30 WIB\",\"price\":3000}]', '[\"Ikan Tenggiri\",\"Labu Kuning\",\"Daging Ayam\",\"Brokoli\",\"Kentang\",\"Hati Ayam\",\"Mangga\",\"Santan\"]', '2026-06-20 03:07:24'),
(28, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan yang aman (tanpa kedelai, gandum, susu sapi) dan bervariasi dari menu sebelumnya. Tekstur disesuaikan untuk usia 12 bulan (lembut/cincang halus). Total biaya terjangkau.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ikan Tuna dan Bayam\",\"time\":\"08:00 WIB\",\"price\":5000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Daging Ayam Cincang dengan Kentang\",\"time\":\"12:30 WIB\",\"price\":6000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Ikan Kakap dan Wortel\",\"time\":\"18:30 WIB\",\"price\":5000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Labu Kuning dan Kelapa Parut\",\"time\":\"15:30 WIB\",\"price\":2500}]', '[\"Ikan Tuna\",\"Bayam\",\"Daging Ayam\",\"Kentang\",\"Ikan Kakap\",\"Wortel\",\"Labu Kuning\",\"Kelapa Parut\"]', '2026-06-20 03:07:30'),
(29, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan-bahan segar yang mudah didapat dan bebas dari alergen. Tekstur disesuaikan lembut untuk si kecil, dengan variasi rasa dari sayuran dan protein hewani.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ayam dan Wortel\",\"time\":\"08:00 WIB\",\"price\":5000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ikan Kakap dengan Bayam\",\"time\":\"12:30 WIB\",\"price\":6000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Kentang dan Daging Ayam\",\"time\":\"18:30 WIB\",\"price\":5000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Pepaya dan Kelapa\",\"time\":\"15:30 WIB\",\"price\":2500}]', '[\"ayam\",\"wortel\",\"ikan kakap\",\"bayam\",\"kentang\",\"daging ayam\",\"pepaya\",\"kelapa parut\"]', '2026-06-20 03:31:32'),
(30, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan-bahan segar yang aman untuk anak usia 12 bulan dengan tekstur lembut. Semua bahan bebas dari alergen yang disebutkan dan bervariasi dari menu sebelumnya.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi dengan Ikan Tongkol dan Bayam\",\"time\":\"08:00 WIB\",\"price\":6000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ikan Bandeng dengan Kentang dan Wortel\",\"time\":\"12:30 WIB\",\"price\":7000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Ayam dengan Labu Siam dan Kacang Hijau\",\"time\":\"18:30 WIB\",\"price\":6000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Nangka dan Kelapa Muda\",\"time\":\"15:30 WIB\",\"price\":3000}]', '[\"Ikan Tongkol\",\"Bayam\",\"Ikan Bandeng\",\"Kentang\",\"Wortel\",\"Daging Ayam\",\"Labu Siam\",\"Kacang Hijau\",\"Nangka\",\"Kelapa Muda\"]', '2026-06-20 03:42:57'),
(31, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini menggunakan bahan-bahan segar yang aman untuk alergi dan variasi berbeda dari 7 hari terakhir. Tekstur disesuaikan untuk usia 12 bulan (lembut/cincang halus).', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Nasi dengan Ikan Patin dan Wortel\",\"time\":\"08:00 WIB\",\"price\":6000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ikan Nila dengan Kentang dan Zukini\",\"time\":\"12:30 WIB\",\"price\":7000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Ayam dengan Labu Kuning dan Bayam\",\"time\":\"18:30 WIB\",\"price\":6000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Pisang dan Kelapa Muda\",\"time\":\"15:30 WIB\",\"price\":3000}]', '[\"Beras\",\"Ikan Patin\",\"Wortel\",\"Ikan Nila\",\"Kentang\",\"Zukini\",\"Daging Ayam\",\"Labu Kuning\",\"Bayam\",\"Pisang\",\"Kelapa Muda\",\"Minyak Kelapa\",\"Bawang Putih\",\"Bawang Merah\"]', '2026-06-20 03:46:37'),
(32, 4, '2026-06-20', 50000.00, '[\"Kedelai\",\"Gandum\",\"Susu Sapi\"]', 'Menu ini dirancang khusus untuk si kecil dengan porsi kecil dan sering (4-5 kali makan), tekstur lembut, serta menghindari makanan asam dan berminyak agar tidak memicu muntah. Bahan-bahan yang digunakan aman dari alergen kedelai, gandum, dan susu sapi. Karena status konsultasi dan Z-score -14.92, sangat penting untuk segera berkonsultasi dengan dokter anak atau ahli gizi guna mendapatkan penanganan lebih lanjut.', '[{\"type\":\"sarapan\",\"label\":\"Sarapan\",\"name\":\"Bubur Ayam dan Kentang\",\"time\":\"08:00 WIB\",\"price\":7000},{\"type\":\"siang\",\"label\":\"Makan Siang\",\"name\":\"Tim Ikan Kakap dengan Bayam\",\"time\":\"12:30 WIB\",\"price\":8000},{\"type\":\"malam\",\"label\":\"Makan Malam\",\"name\":\"Puree Daging Ayam dan Wortel\",\"time\":\"18:30 WIB\",\"price\":7000},{\"type\":\"camilan\",\"label\":\"Camilan\",\"name\":\"Puding Pisang dan Kelapa\",\"time\":\"15:30 WIB\",\"price\":3000}]', '[\"Ayam\",\"Kentang\",\"Ikan Kakap\",\"Bayam\",\"Wortel\",\"Pisang\",\"Kelapa Parut\",\"Minyak Kelapa\"]', '2026-06-20 03:47:10');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `full_name` varchar(150) NOT NULL,
  `email` varchar(150) NOT NULL,
  `password_hash` text NOT NULL,
  `phone_number` varchar(30) DEFAULT NULL,
  `role` varchar(30) NOT NULL DEFAULT 'parent',
  `auth_token` varchar(128) DEFAULT NULL,
  `token_expires_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`user_id`, `full_name`, `email`, `password_hash`, `phone_number`, `role`, `auth_token`, `token_expires_at`, `created_at`, `updated_at`) VALUES
(1, 'Neisya Adrillia P.R', 'neisya@gmail.com', '$2y$10$dummyhashuntukdev', '08123456789', 'parent', NULL, NULL, '2026-06-19 17:28:35', '2026-06-19 17:28:35'),
(2, 'Neisya', 'neisya123@gmail.com', '$2y$10$upH7X9qZobnCjQv6Bjy3JuID57fN5P5D7v2bbfdsYUHBsfnSwCPnu', '08123456789', 'parent', '1e6e366a0804933a6e726c433780e1259967fba93fcc4c856bf466bbf89f6aa2', '2026-07-19 19:54:57', '2026-06-19 17:53:29', '2026-06-19 17:54:57'),
(3, 'Test User', 'test@test.com', '$2y$10$cJPyUO2wJv0y99KRc/s.e.fdMaapuywQYF9QCWp69puEkyYiGrWDG', '08123456789', 'parent', '9e25f14cc0e4f098ccd15623177344b43699f8c2eca4de33bfbc74d1f9312c94', '2026-07-19 21:32:40', '2026-06-19 17:56:33', '2026-06-19 19:32:40'),
(4, 'Andhika Yuridho', 'andhikayuridho05@gmail.com', '$2y$10$aM5XtcUP6i/7dufrEIjn.uenvmYzA5v8wkoh4Xi7mvK7f6EbCXNlC', '081805227515', 'parent', 'dec2da17041000c170dbb78530847c2272570bbb03fe5228580e942a8ada5a7f', '2026-07-20 07:22:20', '2026-06-19 18:16:55', '2026-06-20 05:22:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD PRIMARY KEY (`chat_message_id`),
  ADD KEY `idx_chat_messages_child_id` (`child_id`);

--
-- Indexes for table `checkups`
--
ALTER TABLE `checkups`
  ADD PRIMARY KEY (`checkup_id`),
  ADD UNIQUE KEY `uq_child_week` (`child_id`,`week`),
  ADD KEY `idx_checkups_child_id` (`child_id`),
  ADD KEY `idx_checkups_date` (`checkup_date`);

--
-- Indexes for table `children`
--
ALTER TABLE `children`
  ADD PRIMARY KEY (`child_id`),
  ADD KEY `idx_children_user_id` (`user_id`);

--
-- Indexes for table `consents`
--
ALTER TABLE `consents`
  ADD PRIMARY KEY (`consent_id`),
  ADD UNIQUE KEY `uq_user_consent` (`user_id`);

--
-- Indexes for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD PRIMARY KEY (`meal_plan_id`),
  ADD KEY `idx_meal_plans_child_date` (`child_id`,`plan_date`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `idx_users_token` (`auth_token`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `chat_messages`
--
ALTER TABLE `chat_messages`
  MODIFY `chat_message_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `checkups`
--
ALTER TABLE `checkups`
  MODIFY `checkup_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `children`
--
ALTER TABLE `children`
  MODIFY `child_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `consents`
--
ALTER TABLE `consents`
  MODIFY `consent_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `meal_plans`
--
ALTER TABLE `meal_plans`
  MODIFY `meal_plan_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=33;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `user_id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chat_messages`
--
ALTER TABLE `chat_messages`
  ADD CONSTRAINT `fk_chat_messages_child` FOREIGN KEY (`child_id`) REFERENCES `children` (`child_id`) ON DELETE CASCADE;

--
-- Constraints for table `checkups`
--
ALTER TABLE `checkups`
  ADD CONSTRAINT `fk_checkups_child` FOREIGN KEY (`child_id`) REFERENCES `children` (`child_id`) ON DELETE CASCADE;

--
-- Constraints for table `children`
--
ALTER TABLE `children`
  ADD CONSTRAINT `fk_children_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `consents`
--
ALTER TABLE `consents`
  ADD CONSTRAINT `fk_consents_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`user_id`) ON DELETE CASCADE;

--
-- Constraints for table `meal_plans`
--
ALTER TABLE `meal_plans`
  ADD CONSTRAINT `fk_meal_plans_child` FOREIGN KEY (`child_id`) REFERENCES `children` (`child_id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
