<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * ============================================
 * NUIDS HELPER — Fungsi bantuan untuk JSON response
 * ============================================
 *
 * Semua controller di Nuids mengembalikan data dalam format JSON,
 * bukan HTML. Helper ini menyediakan 3 fungsi yang dipakai di
 * seluruh controller agar penulisan response konsisten.
 *
 * Cara pakai: cukup panggil json_success() atau json_error()
 * dari controller mana pun.
 * ============================================
 */

// Cegah error "function already defined" jika file ini di-load dua kali
if (!function_exists('json_response')) {

    /**
     * json_response()
     * Fungsi dasar untuk mengirim response JSON ke frontend.
     *
     * @param mixed $data        Data utama yang dikirim (array/object/string)
     * @param int   $status_code HTTP status code (200 = OK, 400 = error, 401 = unauthorized, dll)
     */
    function json_response($data, $status_code = 200) {
        $CI =& get_instance(); // Ambil instance CodeIgniter
        $CI->output
            ->set_content_type('application/json')            // Beri tahu browser: ini JSON
            ->set_status_header($status_code)                 // Set status HTTP
            ->set_output(json_encode($data, JSON_UNESCAPED_UNICODE)); // Ubah array PHP jadi JSON
    }
}

if (!function_exists('json_error')) {

    /**
     * json_error()
     * Kirim response error — dipakai saat validasi gagal atau data tidak ditemukan.
     *
     * Contoh response:
     * { "success": false, "message": "Email sudah terdaftar" }
     *
     * @param string $message     Pesan error
     * @param int    $status_code HTTP status (default 400 = Bad Request)
     */
    function json_error($message, $status_code = 400) {
        json_response(['success' => false, 'message' => $message], $status_code);
    }
}

if (!function_exists('json_success')) {

    /**
     * json_success()
     * Kirim response sukses — dipakai saat operasi berhasil.
     *
     * Contoh response:
     * { "success": true, "message": "Login berhasil", "data": { ... } }
     *
     * @param mixed  $data    Data yang dikirim ke frontend (bisa null kalau tidak ada data)
     * @param string $message Pesan sukses (default "Success")
     */
    function json_success($data = null, $message = 'Success') {
        json_response(['success' => true, 'message' => $message, 'data' => $data]);
    }
}
