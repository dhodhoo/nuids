<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Meal_plan_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_by_child_and_date($child_id, $date) {
        return $this->db
            ->where('child_id', $child_id)
            ->where('plan_date', $date)
            ->order_by('created_at', 'DESC')
            ->get('meal_plans')
            ->row();
    }

    public function create($data) {
        $this->db->insert('meal_plans', $data);
        return $this->db->insert_id();
    }
}
