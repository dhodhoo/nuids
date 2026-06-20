<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Checkup_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_by_child($child_id) {
        return $this->db
            ->where('child_id', $child_id)
            ->order_by('week', 'DESC')
            ->get('checkups')
            ->result();
    }

    public function get_by_id($checkup_id) {
        return $this->db->get_where('checkups', ['checkup_id' => $checkup_id])->row();
    }

    public function create($data) {
        $this->db->insert('checkups', $data);
        return $this->db->insert_id();
    }

    public function update($checkup_id, $data) {
        return $this->db->where('checkup_id', $checkup_id)->update('checkups', $data);
    }
}
