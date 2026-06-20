<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Children Controller — DATA ANAK (CRUD)
 *
 * Endpoints:
 *   GET  /api/children             → Daftar anak milik user login
 *   GET  /api/children/{id}        → Detail satu anak
 *   POST /api/children/create      → Tambah anak baru
 *   PUT  /api/children/{id}/update → Ubah data anak
 *
 * Setiap endpoint otomatis memfilter berdasarkan user_id yang login.
 * User A tidak bisa melihat/mengubah data anak milik User B.
 */

class Children extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Child_model');
    }

    public function index() {
        $this->_require_auth();
        $children = $this->Child_model->get_by_user($this->user_id);

        $result = array_map(function($c) {
            return [
                'id'                   => (int) $c->child_id,
                'name'                 => $c->full_name,
                'birthDate'            => $c->birth_date,
                'gender'               => $c->gender,
                'birthWeight'          => $c->birth_weight ? (float) $c->birth_weight : null,
                'birthHeight'          => $c->birth_height ? (float) $c->birth_height : null,
                'ageMonths'            => $this->_age_in_months($c->birth_date),
                'allergies'            => json_decode($c->allergies ?? '[]', true),
                'texture'              => $c->texture ?? '',
                'budget'               => $c->budget ? (int) $c->budget : 0,
                'budgetMode'           => $c->budget_mode ?? 'harian',
                'availableIngredients' => json_decode($c->available_ingredients ?? '[]', true),
            ];
        }, $children);

        json_success($result);
    }

    public function show($child_id) {
        $this->_require_auth();
        $child = $this->Child_model->get_by_id($child_id);
        if (!$child || $child->user_id != $this->user_id) {
            json_error('Data anak tidak ditemukan', 404);
            return;
        }
        json_success([
            'id'                   => (int) $child->child_id,
            'name'                 => $child->full_name,
            'birthDate'            => $child->birth_date,
            'gender'               => $child->gender,
            'birthWeight'          => $child->birth_weight ? (float) $child->birth_weight : null,
            'birthHeight'          => $child->birth_height ? (float) $child->birth_height : null,
            'ageMonths'            => $this->_age_in_months($child->birth_date),
            'allergies'            => json_decode($child->allergies ?? '[]', true),
            'texture'              => $child->texture ?? '',
            'budget'               => $child->budget ? (int) $child->budget : 0,
            'budgetMode'           => $child->budget_mode ?? 'harian',
            'availableIngredients' => json_decode($child->available_ingredients ?? '[]', true),
        ]);
    }

    public function create() {
        $this->_require_auth();
        $input = $this->_get_json_input();
        if (empty($input['name']) || empty($input['birthDate']) || empty($input['gender'])) {
            json_error('Nama, tanggal lahir, dan jenis kelamin wajib diisi');
            return;
        }

        $child_id = $this->Child_model->create([
            'user_id'               => $this->user_id,
            'full_name'             => $input['name'],
            'birth_date'            => $input['birthDate'],
            'gender'                => $input['gender'],
            'birth_weight'          => $input['birthWeight'] ?? null,
            'birth_height'          => $input['birthHeight'] ?? null,
            'allergies'             => json_encode($input['allergies'] ?? []),
            'texture'               => $input['texture'] ?? null,
            'budget'                => $input['budget'] ?? null,
            'budget_mode'           => $input['budgetMode'] ?? 'harian',
            'available_ingredients' => json_encode($input['availableIngredients'] ?? []),
        ]);
        json_success(['id' => $child_id], 'Profil anak berhasil dibuat', 201);
    }

    public function update($child_id) {
        $this->_require_auth();
        $input = $this->_get_json_input();
        $child = $this->Child_model->get_by_id($child_id);
        if (!$child || $child->user_id != $this->user_id) {
            json_error('Data anak tidak ditemukan', 404);
            return;
        }
        $data = [];
        if (isset($input['name'])) $data['full_name'] = $input['name'];
        if (isset($input['birthDate'])) $data['birth_date'] = $input['birthDate'];
        if (isset($input['gender'])) $data['gender'] = $input['gender'];
        if (isset($input['birthWeight'])) $data['birth_weight'] = $input['birthWeight'];
        if (isset($input['birthHeight'])) $data['birth_height'] = $input['birthHeight'];
        if (isset($input['allergies'])) $data['allergies'] = json_encode($input['allergies']);
        if (isset($input['texture'])) $data['texture'] = $input['texture'];
        if (isset($input['budget'])) $data['budget'] = $input['budget'];
        if (isset($input['budgetMode'])) $data['budget_mode'] = $input['budgetMode'];
        if (isset($input['availableIngredients'])) $data['available_ingredients'] = json_encode($input['availableIngredients']);

        $this->Child_model->update($child_id, $data);
        json_success(null, 'Profil anak berhasil diperbarui');
    }

    private function _age_in_months($birth_date) {
        $birth = new DateTime($birth_date);
        $now = new DateTime();
        $diff = $birth->diff($now);
        return ($diff->y * 12) + $diff->m;
    }
}
