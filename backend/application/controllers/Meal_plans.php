<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/**
 * Meal_plans Controller — SMART MEAL PLANNER
 *
 * Endpoints:
 *   GET  /api/meal-plans?child_id=X          → Ambil meal plan hari ini
 *   GET  /api/meal-plans?child_id=X&generate=true → Generate baru dari AI
 *   POST /api/meal-plans/create              → Simpan manual meal plan
 *
 * Alur generate: backend kirim data anak (usia, alergi, budget, bahan)
 * ke AI Server → AI balikkan 4 menu (sarapan, siang, malam, camilan)
 * → backend simpan ke database → return ke frontend.
 */

class Meal_plans extends MY_Controller {

    public function __construct() {
        parent::__construct();
        $this->load->model('Meal_plan_model');
        $this->load->model('Child_model');
        $this->load->helper('growth');
        $this->load->helper('nuids');
    }

    public function index() {
        $this->_require_auth();
        $child_id = $this->input->get('child_id');
        $date = $this->input->get('date') ?? date('Y-m-d');
        $generate = $this->input->get('generate');

        if (!$child_id) { json_error('Parameter child_id wajib diisi'); return; }
        $child = $this->_verify_child_access($child_id);
        if (!$child) return;

        // Kalau ada parameter ?generate=true, buat meal plan dari AI
        if ($generate === 'true' || $generate === '1') {
            $this->_generate_meal_plan($child, $date);
            return;
        }

        // Cari meal plan yang sudah ada di database
        $plan = $this->Meal_plan_model->get_by_child_and_date($child_id, $date);
        if (!$plan) { json_success(null, 'Belum ada meal plan untuk tanggal ini'); return; }

        json_success([
            'date'        => $plan->plan_date,
            'budget'      => $plan->budget ? (int) $plan->budget : 0,
            'allergies'   => json_decode($plan->allergies ?? '[]', true),
            'aiNote'      => $plan->ai_note ?? '',
            'meals'       => json_decode($plan->meals ?? '[]', true),
            'ingredients' => json_decode($plan->ingredients ?? '[]', true),
        ]);
    }

    /**
     * _generate_meal_plan()
     * Minta AI Server untuk membuat menu makanan hari ini.
     *
     * Data yang dikirim ke AI:
     *   - Profil anak (nama, usia, gender)
     *   - Alergi (wajib dihindari)
     *   - Budget & mode (harian/mingguan)
     *   - Bahan yang tersedia di rumah
     *   - Riwayat menu 7 hari terakhir (biar AI tidak kasih menu yang sama)
     *   - Checkup terakhir (Z-score, kondisi, pola makan)
     */
    private function _generate_meal_plan($child, $date) {
        // Ambil riwayat 7 hari terakhir
        $history = $this->db->where('child_id', $child->child_id)
            ->order_by('plan_date', 'DESC')->limit(7)->get('meal_plans')->result();
        $mealHistory = [];
        foreach ($history as $h) {
            $meals = json_decode($h->meals ?? '[]', true);
            $mealHistory[] = ['date' => $h->plan_date, 'meals' => array_column($meals, 'name')];
        }

        // Ambil checkup terakhir untuk konteks pertumbuhan
        $this->load->model('Checkup_model');
        $checkups = $this->Checkup_model->get_by_child($child->child_id);
        $latestCheckup = $checkups[0] ?? null;
        list($zScoreLatest, $latestStatus) = calculate_latest_zscore($child, $checkups);

        $aiPayload = [
            'feature' => 'meal-planner',
            'context' => [
                'child' => [
                    'name' => $child->full_name, 'ageMonths' => calculate_age_months($child->birth_date),
                    'gender' => $child->gender, 'birthDate' => $child->birth_date,
                ],
                'allergies'            => json_decode($child->allergies ?? '[]', true),
                'texture'              => $child->texture ?? 'lembut',
                'budget'               => $child->budget ? (int) $child->budget : 0,
                'budgetMode'           => $child->budget_mode ?? 'harian',
                'availableIngredients' => json_decode($child->available_ingredients ?? '[]', true),
                'mealHistory'          => $mealHistory,
                'latestCheckup'        => $latestCheckup ? [
                    'height' => (float) $latestCheckup->height_cm, 'weight' => (float) $latestCheckup->weight_kg,
                    'status' => $latestCheckup->status, 'zScore' => $zScoreLatest,
                    'zStatus' => $latestStatus, 'meal' => $latestCheckup->meal ?? '',
                    'condition' => json_decode($latestCheckup->conditions ?? '[]', true),
                    'date' => $latestCheckup->checkup_date,
                ] : null,
            ],
        ];

        $aiResult = $this->_call_ai($aiPayload);
        if (!$aiResult || empty($aiResult['success']) || empty($aiResult['mealPlan'])) {
            json_error('Layanan AI sedang sibuk, silakan coba lagi nanti');
            return;
        }

        $mealPlan = $aiResult['mealPlan'];

        $plan_id = $this->Meal_plan_model->create([
            'child_id'    => $child->child_id,
            'plan_date'   => $date,
            'budget'      => $mealPlan['budget'] ?? $child->budget,
            'allergies'   => json_encode($mealPlan['allergies'] ?? []),
            'ai_note'     => $mealPlan['aiNote'] ?? '',
            'meals'       => json_encode($mealPlan['meals'] ?? []),
            'ingredients' => json_encode($mealPlan['ingredients'] ?? []),
        ]);
        $mealPlan['id'] = $plan_id;
        json_success($mealPlan, 'Meal plan berhasil dibuat');
    }

    public function create() {
        $this->_require_auth();
        $input = $this->_get_json_input();
        if (empty($input['child_id'])) { json_error('child_id wajib diisi'); return; }
        $child = $this->_verify_child_access($input['child_id']);
        if (!$child) return;

        $plan_id = $this->Meal_plan_model->create([
            'child_id' => $input['child_id'], 'plan_date' => $input['date'] ?? date('Y-m-d'),
            'budget' => $input['budget'] ?? null,
            'allergies' => json_encode($input['allergies'] ?? []),
            'ai_note' => $input['aiNote'] ?? null,
            'meals' => json_encode($input['meals'] ?? []),
            'ingredients' => json_encode($input['ingredients'] ?? []),
        ]);
        json_success(['id' => $plan_id], 'Meal plan berhasil dibuat', 201);
    }
}
