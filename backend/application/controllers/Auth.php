<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * ============================================
 * Auth Controller — REGISTER, LOGIN, LOGOUT
 * ============================================
 *
 * Semua yang berhubungan dengan akun pengguna (orang tua).
 *
 * Endpoints:
 *   POST /api/auth/register       → Buat akun baru
 *   POST /api/auth/login          → Masuk (dapat token)
 *   GET  /api/auth/me             → Lihat profil sendiri
 *   POST /api/auth/logout         → Keluar (hapus token)
 *   POST /api/auth/update-profile → Ubah nama/no. handphone
 *   POST /api/auth/consent        → Simpan persetujuan medis
 *   GET  /api/auth/status         → Cek status consent + anak
 * ============================================
 */

class Auth extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('User_model');
    }

    /**
     * POST /api/auth/register
     * Mendaftarkan akun orang tua baru.
     *
     * Yang dilakukan:
     * 1. Validasi email, password, nama
     * 2. Cek apakah email sudah dipakai
     * 3. Hash password (biar tidak disimpan plain text)
     * 4. Buat token login
     * 5. Simpan ke database
     * 6. Kembalikan data user + token ke frontend
     */
    public function register() {
        $input = $this->_get_json_input();

        if (empty($input['email']) || empty($input['password']) || empty($input['name'])) {
            json_error('Email, password, dan nama wajib diisi');
            return;
        }

        // Cek email duplikat
        if ($this->User_model->get_by_email($input['email'])) {
            json_error('Email sudah terdaftar');
            return;
        }

        $token = $this->_generate_token();

        $user_id = $this->User_model->create([
            'full_name'     => $input['name'],
            'email'         => $input['email'],
            'password_hash' => password_hash($input['password'], PASSWORD_BCRYPT),
            'phone_number'  => $input['phone'] ?? null,
            'auth_token'    => $token,
            'token_expires_at' => date('Y-m-d H:i:s', strtotime('+30 days')),
        ]);

        json_success([
            'user' => [
                'id'    => $user_id,
                'name'  => $input['name'],
                'email' => $input['email'],
                'phone' => $input['phone'] ?? '',
            ],
            'token' => $token,
        ], 'Registrasi berhasil');
    }

    /**
     * POST /api/auth/login
     * Masuk dengan email dan password.
     *
     * Jika berhasil, backend membuat token baru dan mengirimkannya ke frontend.
     * Token ini harus disertakan di setiap request berikutnya.
     */
    public function login() {
        $input = $this->_get_json_input();

        if (empty($input['email']) || empty($input['password'])) {
            json_error('Email dan password wajib diisi');
            return;
        }

        $user = $this->User_model->get_by_email($input['email']);

        // Cek apakah user ada dan password cocok
        if (!$user || !password_verify($input['password'], $user->password_hash)) {
            json_error('Email atau password salah', 401);
            return;
        }

        // Buat token baru setiap login (token lama jadi tidak berlaku)
        $token = $this->_generate_token();

        $this->User_model->update($user->user_id, [
            'auth_token'    => $token,
            'token_expires_at' => date('Y-m-d H:i:s', strtotime('+30 days')),
        ]);

        json_success([
            'user' => [
                'id'    => (int) $user->user_id,
                'name'  => $user->full_name,
                'email' => $user->email,
                'phone' => $user->phone_number ?? '',
            ],
            'token' => $token,
        ], 'Login berhasil');
    }

    /**
     * GET /api/auth/me
     * Ambil data user yang sedang login.
     * Berguna untuk menampilkan nama/email di halaman profil.
     */
    public function me() {
        $this->_require_auth();
        $user = $this->User_model->get_by_id($this->user_id);

        if (!$user) {
            json_error('User tidak ditemukan', 404);
            return;
        }

        json_success([
            'id'    => (int) $user->user_id,
            'name'  => $user->full_name,
            'email' => $user->email,
            'phone' => $user->phone_number ?? '',
        ]);
    }

    /**
     * POST /api/auth/logout
     * Hapus token — user harus login lagi untuk mendapatkan token baru.
     */
    public function logout() {
        $this->_require_auth();
        $this->User_model->update($this->user_id, [
            'auth_token'    => null,
            'token_expires_at' => null,
        ]);
        json_success(null, 'Logout berhasil');
    }

    /**
     * POST /api/auth/consent
     * Simpan persetujuan medis (informed consent) ke database.
     *
     * User harus setuju disclaimer medis sebelum bisa menggunakan aplikasi.
     * Consent disimpan di tabel consents, bukan session.
     * Jadi kalau logout lalu login lagi, tidak perlu consent ulang.
     */
    public function consent() {
        $this->_require_auth();
        $this->load->database();

        $existing = $this->db->get_where('consents', ['user_id' => $this->user_id])->row();

        if ($existing) {
            // Update consent yang sudah ada
            $this->db->where('consent_id', $existing->consent_id)
                     ->update('consents', ['is_approved' => 1, 'approved_at' => date('Y-m-d H:i:s')]);
        } else {
            // Buat consent baru
            $this->db->insert('consents', [
                'user_id'     => $this->user_id,
                'is_approved' => 1,
                'approved_at' => date('Y-m-d H:i:s'),
            ]);
        }

        json_success(null, 'Persetujuan berhasil disimpan');
    }

    /**
     * GET /api/auth/status
     * Cek status consent dan apakah user sudah punya data anak.
     *
     * Dipakai frontend untuk menentukan redirect setelah login:
     * - Belum consent → /consent
     * - Sudah consent, belum punya anak → /input-data-awal
     * - Sudah consent + punya anak → /dashboard
     */
    public function status() {
        $this->_require_auth();
        $this->load->model('Child_model');
        $this->load->database();

        $consent = $this->db->get_where('consents', ['user_id' => $this->user_id])->row();
        $hasConsent = $consent && $consent->is_approved ? true : false;

        $children = $this->Child_model->get_by_user($this->user_id);
        $hasChild = count($children) > 0;

        json_success([
            'hasConsent' => $hasConsent,
            'hasChild'   => $hasChild,
        ]);
    }

    /**
     * POST /api/auth/update-profile
     * Ubah nama dan/atau no. handphone user.
     * Email tidak bisa diubah (dijadikan sebagai ID unik).
     */
    public function update_profile() {
        $this->_require_auth();
        $input = $this->_get_json_input();

        $data = [];
        if (!empty($input['name'])) $data['full_name'] = $input['name'];
        if (!empty($input['phone'])) $data['phone_number'] = $input['phone'];

        if (!empty($data)) {
            $this->User_model->update($this->user_id, $data);
        }

        json_success(null, 'Profil berhasil diperbarui');
    }
}
