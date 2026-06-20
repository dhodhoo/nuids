<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Checkups Controller — INPUT MINGGUAN + ANALISIS Z-SCORE
 *
 * Endpoints:
 *   GET  /api/checkups?child_id=X     → Ambil semua checkups (untuk history)
 *   GET  /api/checkups/analyze?child_id=X → Ambil checkups + Z-score tiap entry
 *   GET  /api/checkups/{id}            → Detail satu checkup
 *   POST /api/checkups/create          → Simpan input mingguan baru
 *   PUT  /api/checkups/{id}/update     → Ubah data checkup
 */

class Checkups extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Checkup_model');
        $this->load->model('Child_model');
        $this->load->helper('growth');
    }

    public function index() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');
        if (!$child_id) { json_error('Parameter child_id wajib diisi'); return; }

        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        $checkups = $this->Checkup_model->get_by_child($child_id);
        $result = array_map(function($c) {
            return [
                'id'        => (int) $c->checkup_id,
                'week'      => (int) $c->week,
                'date'      => $c->checkup_date,
                'height'    => (float) $c->height_cm,
                'weight'    => (float) $c->weight_kg,
                'status'    => $c->status,
                'meal'      => $c->meal ?? '',
                'condition' => json_decode($c->conditions ?? '[]', true),
                'notes'     => $c->parent_notes ?? '',
            ];
        }, $checkups);
        json_success($result);
    }

    /**
     * GET /api/checkups/analyze?child_id=X
     * Sama seperti index tapi setiap checkup sudah dihitung Z-score-nya.
     * Status di sini pakai Z-score, bukan status dari database.
     */
    public function analyze() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');
        if (!$child_id) { json_error('Parameter child_id wajib diisi'); return; }

        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        $checkups = $this->Checkup_model->get_by_child($child_id);
        $whoWfa = get_who_reference('wfa');
        $birthDate = $child->birth_date;

        $result = array_map(function($c) use ($whoWfa, $birthDate, $child) {
            $age = calculate_age_months($birthDate, $c->checkup_date);
            $refs = $whoWfa[$child->gender] ?? [];
            $lms = null;
            foreach ($refs as $r) { if ($r['month'] == $age) { $lms = $r; break; } }
            if (!$lms && count($refs) > 0) $lms = end($refs);

            $zstatus = $c->status;
            $zscore = null;
            if ($lms) {
                $z = calculate_zscore($c->weight_kg, $lms['L'], $lms['M'], $lms['S']);
                if ($z !== null) { $zscore = round($z, 2); $zstatus = get_status_from_zscore($z); }
            }
            return [
                'id' => (int) $c->checkup_id, 'week' => (int) $c->week,
                'date' => $c->checkup_date, 'height' => (float) $c->height_cm,
                'weight' => (float) $c->weight_kg, 'status' => $zstatus,
                'zScore' => $zscore, 'meal' => $c->meal ?? '',
                'condition' => json_decode($c->conditions ?? '[]', true),
                'notes' => $c->parent_notes ?? '',
            ];
        }, $checkups);
        json_success($result);
    }

    public function show($checkup_id) {
        $this->_require_auth();
        $checkup = $this->Checkup_model->get_by_id($checkup_id);
        if (!$checkup) { json_error('Data checkup tidak ditemukan', 404); return; }

        $child = $this->_verify_child_access($checkup->child_id);
        if (!$child) return;

        json_success([
            'id' => (int) $checkup->checkup_id, 'week' => (int) $checkup->week,
            'date' => $checkup->checkup_date, 'height' => (float) $checkup->height_cm,
            'weight' => (float) $checkup->weight_kg, 'status' => $checkup->status,
            'meal' => $checkup->meal ?? '',
            'condition' => json_decode($checkup->conditions ?? '[]', true),
            'notes' => $checkup->parent_notes ?? '',
        ]);
    }

    public function create() {
        $this->_require_auth();
        $input = $this->_get_json_input();
        if (empty($input['child_id']) || !isset($input['height']) || !isset($input['weight'])) {
            json_error('child_id, height, dan weight wajib diisi');
            return;
        }

        $child = $this->_verify_child_access($input['child_id']);
        if (!$child) return;

        $checkup_id = $this->Checkup_model->create([
            'child_id'     => $input['child_id'],
            'week'         => $input['week'] ?? 1,
            'checkup_date' => $input['date'] ?? date('Y-m-d'),
            'height_cm'    => $input['height'],
            'weight_kg'    => $input['weight'],
            'status'       => $input['status'] ?? 'aman',
            'meal'         => $input['meal'] ?? null,
            'conditions'   => json_encode($input['condition'] ?? []),
            'parent_notes' => $input['notes'] ?? null,
        ]);
        json_success(['id' => $checkup_id], 'Data checkup berhasil disimpan', 201);
    }

    public function update($checkup_id) {
        $this->_require_auth();
        $input = $this->_get_json_input();
        $checkup = $this->Checkup_model->get_by_id($checkup_id);
        if (!$checkup) { json_error('Data checkup tidak ditemukan', 404); return; }

        $child = $this->_verify_child_access($checkup->child_id);
        if (!$child) return;

        $data = [];
        if (isset($input['week'])) $data['week'] = $input['week'];
        if (isset($input['date'])) $data['checkup_date'] = $input['date'];
        if (isset($input['height'])) $data['height_cm'] = $input['height'];
        if (isset($input['weight'])) $data['weight_kg'] = $input['weight'];
        if (isset($input['status'])) $data['status'] = $input['status'];
        if (isset($input['meal'])) $data['meal'] = $input['meal'];
        if (isset($input['condition'])) $data['conditions'] = json_encode($input['condition']);
        if (isset($input['notes'])) $data['parent_notes'] = $input['notes'];

        $this->Checkup_model->update($checkup_id, $data);
        json_success(null, 'Data checkup berhasil diperbarui');
    }
}
