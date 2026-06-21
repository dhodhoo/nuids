<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$config['ai_api_url'] = getenv('AI_API_URL') ?: 'https://deepseek-api.nexaworks.me/api/nuids';
$config['ai_api_key'] = getenv('AI_API_KEY') ?: 'nuids-dev-key-2024';
