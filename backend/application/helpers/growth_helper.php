<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * ============================================
 * GROWTH HELPER — Fungsi untuk menghitung Z-score
 * ============================================
 *
 * Z-score adalah cara standar WHO untuk mengukur pertumbuhan anak.
 * Rumus: Z = ((nilai_anak / M)^L - 1) / (L * S)
 *
 * L, M, S = nilai referensi WHO (Lambda, Median, Sigma)
 * - L: bentuk kurva distribusi
 * - M: nilai median (rata-rata) populasi sehat
 * - S: koefisien variasi (sebaran data)
 *
 * Hasil Z-score:
 *   > -2   → Aman (hijau)
 *   -2 sd -3 → Perlu Pemantauan (kuning)
 *   < -3   → Perlu Konsultasi (merah)
 * ============================================
 */

// Cegah error jika file di-load dua kali
if (!function_exists('calculate_zscore')) {

    /**
     * calculate_zscore()
     * Hitung Z-score dari satu nilai pengukuran anak.
     *
     * @param float $value Tinggi atau berat badan anak
     * @param float $L     Lambda (bentuk kurva) dari tabel WHO
     * @param float $M     Median dari tabel WHO
     * @param float $S     Sigma dari tabel WHO
     * @return float|null  Z-score, atau null jika data tidak valid
     */
    function calculate_zscore($value, $L, $M, $S) {
        // Jika nilai tidak valid (negatif atau nol), Z-score tidak bisa dihitung
        if ($value <= 0 || $M <= 0) return null;

        // Rumus berbeda jika L = 0 (jarang terjadi pada data tinggi/berat)
        if ($L == 0) {
            return log($value / $M) / $S;
        }

        // Rumus standar Z-score
        return (pow($value / $M, $L) - 1) / ($L * $S);
    }
}

if (!function_exists('get_who_reference')) {

    /**
     * get_who_reference()
     * Ambil data referensi WHO dari file JSON.
     *
     * File JSON berisi tabel LMS untuk setiap bulan usia.
     * Lokasi file: backend/assets/who_wfa.json atau who_hfa.json
     *
     * @param string $type 'wfa' untuk berat badan, 'hfa' untuk tinggi badan
     * @return array|null  Data LMS dalam bentuk array, atau null jika file tidak ada
     */
    function get_who_reference($type) {
        $path = FCPATH . 'assets/who_' . $type . '.json';
        if (!file_exists($path)) return null;
        return json_decode(file_get_contents($path), true);
    }
}

if (!function_exists('get_status_from_zscore')) {

    /**
     * get_status_from_zscore()
     * Konversi angka Z-score menjadi status pertumbuhan.
     *
     * @param float $zscore Hasil Z-score
     * @return string 'aman', 'pantau', atau 'konsultasi'
     */
    function get_status_from_zscore($zscore) {
        if ($zscore > -2) return 'aman';       // 🟢 Masih dalam batas normal
        if ($zscore >= -3) return 'pantau';    // 🟡 Perlu perhatian lebih
        return 'konsultasi';                     // 🔴 Perlu konsultasi medis
    }
}

if (!function_exists('calculate_age_months')) {

    /**
     * calculate_age_months()
     * Hitung usia anak dalam bulan dari tanggal lahir sampai tanggal tertentu.
     *
     * @param string      $birth_date  Tanggal lahir (format: YYYY-MM-DD)
     * @param string|null $checkup_date Tanggal pengukuran (default: hari ini)
     * @return int Usia dalam bulan
     */
    function calculate_age_months($birth_date, $checkup_date = null) {
        $birth = new DateTime($birth_date);
        $ref = $checkup_date ? new DateTime($checkup_date) : new DateTime();
        $diff = $birth->diff($ref);
        return ($diff->y * 12) + $diff->m;
    }
}

if (!function_exists('calculate_latest_zscore')) {

    /**
     * calculate_latest_zscore()
     * Hitung Z-score dari checkup terbaru seorang anak.
     *
     * Fungsi ini menggabungkan langkah-langkah:
     * 1. Ambil checkup terbaru
     * 2. Hitung usia anak saat checkup
     * 3. Cari nilai LMS yang sesuai dengan usia dan jenis kelamin
     * 4. Hitung Z-score
     * 5. Konversi ke status
     *
     * @param object $child   Data anak dari tabel children
     * @param array  $checkups Daftar checkups (diurutkan week DESC)
     * @return array [zScore, status] — contoh: [-0.5, 'aman']
     */
    function calculate_latest_zscore($child, $checkups) {
        $latest = $checkups[0] ?? null;     // Ambil checkup paling baru
        if (!$latest) return [0, 'aman'];   // Belum ada checkup

        $whoWfa = get_who_reference('wfa'); // Load data WHO
        if (!$whoWfa) return [0, 'aman'];   // Data WHO tidak tersedia

        // Hitung usia anak saat checkup
        $age = calculate_age_months($child->birth_date, $latest->checkup_date);

        // Cari baris LMS yang sesuai dengan usia anak
        $refs = $whoWfa[$child->gender] ?? [];
        $lms = null;
        foreach ($refs as $r) {
            if ($r['month'] == $age) { $lms = $r; break; }
        }
        if (!$lms && count($refs) > 0) $lms = end($refs); // fallback ke usia terakhir
        if (!$lms) return [0, 'aman'];     // LMS tidak ditemukan

        // Hitung Z-score
        $z = calculate_zscore($latest->weight_kg, $lms['L'], $lms['M'], $lms['S']);
        if ($z === null) return [0, 'aman'];

        return [round($z, 2), get_status_from_zscore($z)];
    }
}
