<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config['ai_api_url'] = getenv('AI_API_URL') ?: 'https://deepseek-api.nexaworks.me/api/nuids';
$config['ai_api_key'] = getenv('AI_API_KEY') ?: 'isi_api_key_ai';
