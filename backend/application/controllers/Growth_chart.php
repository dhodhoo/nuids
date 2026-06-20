<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Growth_chart Controller — GRAFIK PERTUMBUHAN WHO Z-SCORE
 *
 * Endpoint:
 *   GET /api/growth-chart?child_id=X
 *
 * Mengembalikan data yang diperlukan untuk menggambar grafik pertumbuhan
 * menggunakan standar WHO Child Growth Standards.
 *
 * Response berisi:
 *   - wfa (Weight-for-Age): referensi -2SD, median, +2SD + data anak
 *   - hfa (Height-for-Age): sama seperti wfa tapi untuk tinggi
 *   - latestStatus: status dan Z-score dari checkup terbaru
 */

class Growth_chart extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Child_model');
        $this->load->model('Checkup_model');
        $this->load->helper('growth');
    }

    public function index() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');
        if (!$child_id) { json_error('Parameter child_id wajib diisi'); return; }

        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        $checkups = $this->Checkup_model->get_by_child($child_id);
        $whoWfa = get_who_reference('wfa');
        $whoHfa = get_who_reference('hfa');

        $wfa = $this->build_chart_data($checkups, $child->birth_date, $child->gender, $whoWfa, 'weight_kg');
        $hfa = $this->build_chart_data($checkups, $child->birth_date, $child->gender, $whoHfa, 'height_cm');

        list($latestZScore, $latestStatus) = calculate_latest_zscore($child, $checkups);
        $labels = ['aman' => 'Aman', 'pantau' => 'Perlu Pemantauan', 'konsultasi' => 'Perlu Konsultasi'];

        json_success([
            'childAge'    => calculate_age_months($child->birth_date),
            'childGender' => $child->gender,
            'wfa'         => $wfa,
            'hfa'         => $hfa,
            'latestStatus' => [
                'status' => $latestStatus,
                'label'  => $labels[$latestStatus] ?? 'Aman',
                'zScore' => $latestZScore,
            ],
        ]);
    }

    /**
     * build_chart_data()
     * Buat data untuk grafik: referensi WHO (-2SD, median, +2SD) + titik data anak.
     *
     * @param array  $checkups  Daftar checkups anak
     * @param string $birthDate Tanggal lahir
     * @param string $gender    'male' atau 'female'
     * @param array  $whoData   Data LMS dari JSON
     * @param string $column    Kolom database: 'weight_kg' atau 'height_cm'
     * @return array Data untuk frontend (Recharts)
     */
    private function build_chart_data($checkups, $birthDate, $gender, $whoData, $column) {
        $refData = $whoData[$gender] ?? [];
        $months = []; $minus2sd = []; $median = []; $plus2sd = []; $childData = [];

        foreach ($refData as $ref) {
            $m = $ref['month'];
            $months[] = $m;
            $M = $ref['M']; $S = $ref['S']; $L = $ref['L'];

            // Hitung -2SD dan +2SD dari nilai LMS
            if ($L == 1) {
                $minus2sd[] = round($M * (1 - 2 * $S), 2);
                $median[] = round($M, 2);
                $plus2sd[] = round($M * (1 + 2 * $S), 2);
            } else {
                $minus2sd[] = round($M * pow(1 - 2 * $L * $S, 1 / $L), 2);
                $median[] = round($M, 2);
                $plus2sd[] = round($M * pow(1 + 2 * $L * $S, 1 / $L), 2);
            }

            // Cari data anak yang sesuai dengan bulan ini
            foreach ($checkups as $c) {
                $age = calculate_age_months($birthDate, $c->checkup_date);
                if ($age == $m) {
                    $childData[] = ['week' => (int) $c->week, 'month' => $age,
                        'value' => (float) $c->{$column}, 'date' => $c->checkup_date];
                }
            }
        }
        return ['months' => $months, 'minus2sd' => $minus2sd, 'median' => $median,
            'plus2sd' => $plus2sd, 'childData' => $childData];
    }
}
