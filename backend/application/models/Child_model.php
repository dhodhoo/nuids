<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Child_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_by_user($user_id) {
        return $this->db
            ->where('user_id', $user_id)
            ->order_by('created_at', 'DESC')
            ->get('children')
            ->result();
    }

    public function get_by_id($child_id) {
        return $this->db->get_where('children', ['child_id' => $child_id])->row();
    }

    public function create($data) {
        $this->db->insert('children', $data);
        return $this->db->insert_id();
    }

    public function update($child_id, $data) {
        return $this->db->where('child_id', $child_id)->update('children', $data);
    }
}
