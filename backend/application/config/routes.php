<?php
defined('BASEPATH') OR exit('No direct script access allowed');

$route['default_controller'] = 'welcome';
$route['404_override'] = '';
$route['translate_uri_dashes'] = FALSE;

// API Routes
$route['api/auth/register']       = 'auth/register';
$route['api/auth/login']          = 'auth/login';
$route['api/auth/me']             = 'auth/me';
$route['api/auth/status']         = 'auth/status';
$route['api/auth/consent']        = 'auth/consent';
$route['api/auth/logout']         = 'auth/logout';
$route['api/auth/update-profile'] = 'auth/update_profile';

$route['api/children']             = 'children/index';
$route['api/children/create']      = 'children/create';
$route['api/children/(:num)']      = 'children/show/$1';
$route['api/children/(:num)/update'] = 'children/update/$1';

$route['api/checkups']             = 'checkups/index';
$route['api/checkups/create']      = 'checkups/create';
$route['api/checkups/analyze']      = 'checkups/analyze';
$route['api/checkups/(:num)']      = 'checkups/show/$1';
$route['api/checkups/(:num)/update'] = 'checkups/update/$1';

$route['api/meal-plans']           = 'meal_plans/index';
$route['api/meal-plans/create']    = 'meal_plans/create';

$route['api/chat']                 = 'chat/index';
$route['api/chat/create']          = 'chat/create';
$route['api/chat/history']         = 'chat/history';
$route['api/chat/custom']          = 'chat/custom';

$route['api/growth-chart']          = 'growth_chart/index';
