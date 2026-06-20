<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * ============================================
 * Chat Controller — AI CONSULTANT (obrolan)
 * ============================================
 *
 * Endpoint untuk menyimpan pesan chat user dan AI ke database.
 *
 * Alur chat yang baru (Juni 2026):
 * Frontend langsung hubungi AI Server (port 3001) untuk response AI.
 * Backend ini hanya dipakai untuk MENYIMPAN history chat.
 * Frontend panggil POST /chat/create → backend simpan ke tabel chat_messages.
 *
 * Route:
 *   GET  /api/chat?child_id=1    → ambil history chat
 *   POST /api/chat/create        → simpan satu pesan (user atau AI)
 *   GET  /api/chat/history       → sama seperti index tapi dengan created_at
 *   POST /api/chat/custom        → forward ke AI Server dengan system prompt custom
 * ============================================
 */

class Chat extends MY_Controller {

    public function __construct() {
        parent::__construct();
        // Model untuk membaca/menulis tabel chat_messages
        $this->load->model('Chat_message_model');
        // Model untuk verifikasi akses anak
        $this->load->model('Child_model');
    }

    /**
     * GET /api/chat?child_id=X
     * Ambil semua pesan chat milik seorang anak.
     * Hasil diurutkan dari yang paling lama (ASC).
     */
    public function index() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');

        if (!$child_id) {
            json_error('Parameter child_id wajib diisi');
            return;
        }

        // Verifikasi: user hanya bisa lihat chat anak miliknya sendiri
        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        $messages = $this->Chat_message_model->get_by_child($child_id);

        // Format output: ubah nama kolom database jadi nama yang dimengerti frontend
        $result = array_map(function($m) {
            return [
                'id'   => (int) $m->chat_message_id,
                'role' => $m->role,    // 'user' atau 'ai'
                'text' => $m->message_text,
            ];
        }, $messages);

        json_success($result);
    }

    /**
     * GET /api/chat/history?child_id=X
     * Sama seperti index tapi menyertakan waktu pembuatan (created_at).
     * Berguna untuk menampilkan timestamp di UI chat.
     */
    public function history() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');

        if (!$child_id) {
            json_error('Parameter child_id wajib diisi');
            return;
        }

        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        $messages = $this->Chat_message_model->get_by_child($child_id);

        $result = array_map(function($m) {
            return [
                'id'         => (int) $m->chat_message_id,
                'role'       => $m->role,
                'text'       => $m->message_text,
                'created_at' => $m->created_at, // Format: YYYY-MM-DD HH:MM:SS
            ];
        }, $messages);

        json_success($result);
    }

    /**
     * POST /api/chat/create
     * Simpan satu pesan chat ke database (bisa pesan user atau AI).
     *
     * Request body:
     * { "child_id": 1, "message": "Halo", "role": "user" }
     *
     * role bisa "user" atau "ai" (default: "user")
     */
    public function create() {
        $this->_require_auth();
        $input = $this->_get_json_input();

        $child_id = $input['child_id'] ?? null;
        $message  = $input['message'] ?? $input['text'] ?? null;
        $role     = $input['role'] ?? 'user';   // Default: pesan dari user

        if (!$child_id || !$message) {
            json_error('child_id dan message wajib diisi');
            return;
        }

        // Verifikasi akses
        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        // Simpan ke tabel chat_messages
        $msg_id = $this->Chat_message_model->create([
            'child_id'     => $child_id,
            'role'         => $role,
            'message_text' => $message,
        ]);

        json_success([
            'id'   => (int) $msg_id,
            'role' => $role,
            'text' => $message,
        ], 'Pesan berhasil dikirim');
    }

    /**
     * POST /api/chat/custom
     * Forward pertanyaan chat ke AI Server dengan system prompt custom.
     *
     * Ini adalah "jembatan" agar frontend bisa:
     * 1. Kirim prompt + conversation ke backend
     * 2. Backend forward ke AI Server (localhost:3001)
     * 3. AI Server proses dengan feature "custom"
     * 4. Backend return reply ke frontend
     *
     * Keuntungan: tidak kena CORS karena satu domain dengan backend.
     *
     * Request body:
     * {
     *   "systemPrompt": "Kamu adalah asisten...",
     *   "conversation": [ { "role": "user", "text": "Halo" } ]
     * }
     */
    public function custom() {
        $this->_require_auth();
        $input = $this->_get_json_input();

        $systemPrompt = $input['systemPrompt'] ?? '';
        $conversation = $input['conversation'] ?? [];

        if (!$systemPrompt) {
            json_error('systemPrompt wajib diisi');
            return;
        }

        // Siapkan payload untuk AI Server
        $payload = [
            'feature' => 'custom',
            'systemPrompt' => $systemPrompt,
            'conversation' => $conversation,
        ];

        // Kirim ke AI Server (method _call_ai ada di MY_Controller)
        $aiResult = $this->_call_ai($payload);

        // Fallback kalau AI Server error atau timeout
        $reply = 'Maaf, layanan AI sedang sibuk. Silakan coba lagi nanti.';
        if ($aiResult && !empty($aiResult['success']) && !empty($aiResult['reply'])) {
            $reply = $aiResult['reply'];
        }

        json_success(['reply' => $reply]);
    }
}
