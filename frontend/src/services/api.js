/**
 * ============================================
 * API Service — Koneksi ke Backend Nuids
 * ============================================
 *
 * File ini adalah "jembatan" antara React dan backend PHP.
 * Semua panggilan ke server lewat sini.
 *
 * Cara pakai:
 *   import api from '../services/api'
 *
 *   // Ambil data
 *   const children = await api.children.list()
 *
 *   // Kirim data
 *   await api.checkups.create({ child_id: 1, height: 76.5, ... })
 *
 * Teknologi: Axios (library HTTP untuk fetch data)
 * ============================================
 */

import axios from 'axios'

// Alamat backend Nuids (CodeIgniter)
const BASE_URL = '/backend/api'

/**
 * Buat instance Axios dengan konfigurasi dasar.
 * Semua request akan otomatis:
 * 1. Menggunakan BASE_URL sebagai awalan
 * 2. Mengirim header Content-Type: application/json
 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: { 'Content-Type': 'application/json' },
})

/**
 * INTERCEPTOR — Otomatis sisipkan token ke setiap request
 *
 * Cara kerja:
 * Setiap kali React memanggil api.get() atau api.post(),
 * interceptor ini akan:
 * 1. Ambil token dari localStorage
 * 2. Tambahkan header "Authorization: Bearer <token>"
 *
 * Jadi programmer tidak perlu manual nambahin token tiap request.
 */
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('nuids_token')
  if (token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  return config
})

/**
 * INTERCEPTOR — Tangani error secara terpusat
 *
 * Kalau backend return error (400, 401, 500, dll),
 * interceptor ini akan mengambil pesan error-nya
 * dan mengubahnya jadi Error object biasa.
 *
 * Jadi di komponen React cukup:
 *   try { ... } catch (err) { console.warn(err.message) }
 */
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg = err.response?.data?.message || 'Terjadi kesalahan'
    return Promise.reject(new Error(msg))
  }
)

/**
 * Helper: ambil data dari response
 * Backend selalu return { success, message, data }
 * Fungsi ini langsung mengembalikan bagian .data saja.
 */
async function get(path) {
  const res = await api.get(path)
  return res.data.data
}

async function post(path, data) {
  const res = await api.post(path, data)
  return res.data.data
}

/**
 * Getter/Setter untuk token di localStorage
 */
function getToken() {
  return localStorage.getItem('nuids_token')
}

function setToken(token) {
  if (token) {
    localStorage.setItem('nuids_token', token)
  } else {
    localStorage.removeItem('nuids_token')
  }
}

export { getToken, setToken }

/**
 * ============================================
 * DAFTAR ENDPOINT
 * ============================================
 *
 * Setiap properti di object ini adalah kumpulan endpoint
 * yang berhubungan. Contoh:
 *   api.auth.login(...)    → POST /api/auth/login
 *   api.children.list()   → GET /api/children
 *   api.checkups.create() → POST /api/checkups/create
 *
 * Semua fungsi mengembalikan Promise.
 * Pakai await atau .then() untuk ambil hasilnya.
 * ============================================
 */
export default {
  getToken,
  setToken,

  auth: {
    register: (data) => post('/auth/register', data),
    login: (data) => post('/auth/login', data),
    me: () => get('/auth/me'),
    status: () => get('/auth/status'),
    consent: () => post('/auth/consent'),
    logout: () => post('/auth/logout'),
    updateProfile: (data) => post('/auth/update-profile', data),
  },

  children: {
    list: () => get('/children'),
    get: (id) => get('/children/' + id),
    create: (data) => post('/children/create', data),
    update: (id, data) => post('/children/' + id + '/update', data),
  },

  checkups: {
    list: (childId) => get('/checkups?child_id=' + childId),
    analyze: (childId) => get('/checkups/analyze?child_id=' + childId),
    create: (data) => post('/checkups/create', data),
  },

  mealPlans: {
    get: (childId, date) => get('/meal-plans?child_id=' + childId + (date ? '&date=' + date : '')),
    generate: (childId) => get('/meal-plans?child_id=' + childId + '&generate=true'),
  },

  chat: {
    list: (childId) => get('/chat?child_id=' + childId),
    send: (data) => post('/chat/create', data),
  },

  growthChart: {
    get: (childId) => get('/growth-chart?child_id=' + childId),
  },
}
