<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_by_email($email) {
        return $this->db->get_where('users', ['email' => $email])->row();
    }

    public function get_by_id($user_id) {
        return $this->db->get_where('users', ['user_id' => $user_id])->row();
    }

    public function get_by_token($token) {
        return $this->db->get_where('users', ['auth_token' => $token])->row();
    }

    public function create($data) {
        $this->db->insert('users', $data);
        return $this->db->insert_id();
    }

    public function update($user_id, $data) {
        return $this->db->where('user_id', $user_id)->update('users', $data);
    }
}
