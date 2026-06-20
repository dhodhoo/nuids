<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * ============================================
 * MY_Controller — Base Controller untuk semua controller
 * ============================================
 *
 * Semua controller di Nuids (Auth, Children, Checkups, dll.)
 * mewarisi (extends) class ini, bukan CI_Controller langsung.
 *
 * Keuntungan: fungsi-fungsi umum seperti:
 *   - Cek login (_require_auth)
 *   - Cek akses ke data anak (_verify_child_access)
 *   - Panggil AI server (_call_ai)
 *   - Parse input JSON (_get_json_input)
 *
 * Sudah tersedia di sini, tidak perlu ditulis ulang di setiap controller.
 * ============================================
 */

class MY_Controller extends CI_Controller {

    // Menyimpan ID user yang sedang login (diisi oleh _require_auth)
    protected $user_id = null;

    public function __construct() {
        parent::__construct();

        // --- CORS headers ---
        // Frontend React (localhost:5173) perlu izin untuk akses API ini
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, Authorization');

        // Untuk request OPTIONS (preflight CORS), langsung selesai tanpa proses
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            exit(0);
        }
    }

    /**
     * _require_auth()
     * Periksa apakah user sudah login.
     *
     * Cara kerja:
     * 1. Ambil header "Authorization: Bearer <token>"
     * 2. Cek token di database
     * 3. Jika valid, isi $this->user_id
     * 4. Jika invalid, return error 401 dan hentikan proses
     *
     * Panggil di awal method yang membutuhkan login.
     */
    protected function _require_auth() {
        $token = $this->input->get_request_header('Authorization', true);

        if (!$token) {
            json_error('Authorization header required', 401);
            exit;
        }

        $token = str_replace('Bearer ', '', $token);
        $payload = $this->_verify_token($token);

        if (!$payload) {
            json_error('Invalid or expired token', 401);
            exit;
        }

        $this->user_id = $payload->user_id;
    }

    /**
     * _get_json_input()
     * Ambil data JSON dari body request.
     *
     * Frontend mengirim data dalam format JSON (bukan form biasa),
     * jadi kita baca dari php://input lalu di-decode.
     *
     * @return array|null Data dari frontend
     */
    protected function _get_json_input() {
        return json_decode(file_get_contents('php://input'), true);
    }

    /**
     * _verify_child_access()
     * Periksa apakah user berhak mengakses data seorang anak.
     *
     * Aturan: user hanya bisa akses anak yang user_id-nya sama.
     * Ini mencegah user A melihat data anak milik user B.
     *
     * @param int $child_id ID anak
     * @return object|null  Data anak jika berhak, null jika tidak
     */
    protected function _verify_child_access($child_id) {
        $this->load->model('Child_model');
        $child = $this->Child_model->get_by_id($child_id);
        if (!$child || $child->user_id != $this->user_id) {
            json_error('Data anak tidak ditemukan', 404);
            return null;
        }
        return $child;
    }

    /**
     * _call_ai()
     * Kirim permintaan ke AI server (localhost:3001) dan ambil response-nya.
     *
     * Dipakai oleh:
     *   - Chat controller (AI Consultant)
     *   - Meal_plans controller (AI Meal Planner)
     *
     * @param array $payload Data yang dikirim ke AI server
     * @return array|null    Response dari AI server, atau null jika gagal
     */
    protected function _call_ai($payload) {
        $url = $this->config->item('ai_api_url');
        $key = $this->config->item('ai_api_key');

        try {
            $ch = curl_init($url);
            curl_setopt_array($ch, [
                CURLOPT_POST           => true,
                CURLOPT_POSTFIELDS     => json_encode($payload, JSON_UNESCAPED_UNICODE),
                CURLOPT_HTTPHEADER     => [
                    'Content-Type: application/json',
                    'Authorization: Bearer ' . $key,
                ],
                CURLOPT_RETURNTRANSFER => true,
                CURLOPT_TIMEOUT        => 30,
            ]);
            $response = curl_exec($ch);
            $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
            curl_close($ch);

            if ($response && $httpCode === 200) {
                return json_decode($response, true);
            }
        } catch (Exception $e) {}

        return null;
    }

    /**
     * _verify_token()
     * Periksa apakah token valid dan belum kadaluarsa.
     *
     * Token disimpan di tabel users (kolom auth_token).
     * Token dibuat saat login dan berlaku 30 hari.
     *
     * @param string $token Token dari header Authorization
     * @return object|null   Object berisi user_id jika valid, null jika tidak
     */
    private function _verify_token($token) {
        $this->load->model('User_model');
        $user = $this->User_model->get_by_token($token);

        if (!$user) return null;

        $exp = isset($user->token_expires_at)
            ? strtotime($user->token_expires_at)
            : 0;

        if ($exp < time()) return null;

        return (object) ['user_id' => $user->user_id];
    }

    /**
     * _generate_token()
     * Buat token acak untuk session login.
     *
     * Token ini dikirim ke frontend setelah login/register.
     * Frontend menyimpannya dan mengirimkannya kembali di setiap request.
     *
     * @return string Token 64 karakter hex
     */
    protected function _generate_token() {
        return bin2hex(random_bytes(32));
    }
}
