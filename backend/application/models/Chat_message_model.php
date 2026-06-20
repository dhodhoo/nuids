<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Chat_message_model extends CI_Model {

    public function __construct() {
        parent::__construct();
        $this->load->database();
    }

    public function get_by_child($child_id) {
        return $this->db
            ->where('child_id', $child_id)
            ->order_by('created_at', 'ASC')
            ->get('chat_messages')
            ->result();
    }

    public function create($data) {
        $this->db->insert('chat_messages', $data);
        return $this->db->insert_id();
    }
}
