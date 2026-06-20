# Dokumentasi Proyek Nuids

Nuids adalah website untuk membantu orang tua memantau pertumbuhan anak, mendeteksi risiko stunting sejak dini, dan mendapatkan rekomendasi gizi.

---

## Daftar Isi

- [Struktur Folder](#struktur-folder)
- [Cara Menjalankan](#cara-menjalankan)
- [Alur Program dari Awal](#alur-program-dari-awal)
- [Frontend (React)](#frontend-react)
- [Backend (CodeIgniter 3)](#backend-codeigniter-3)
- [Database](#database)
- [Panduan Mengubah Sesuatu](#panduan-mengubah-sesuatu)

---

## Struktur Folder

```
nuids/
├── frontend/              ← Aplikasi React (yang dilihat user)
│   └── src/
│       ├── App.jsx        ← Router / daftar halaman
│       ├── main.jsx       ← Entry point React
│       ├── context/       ← State global (data login, anak, checkups)
│       ├── services/      ← Koneksi ke backend (API)
│       ├── pages/         ← Halaman-halaman
│       ├── components/    ← Potongan UI kecil
│       │   ├── layout/    ← Header, BottomNav, PageShell
│       │   ├── dashboard/ ← Komponen untuk halaman Dashboard
│       │   ├── tracking/  ← Komponen grafik pertumbuhan
│       │   ├── chat/      ← Komponen chat (bubble, input, avatar)
│       │   ├── history/   ← Komponen timeline riwayat
│       │   ├── onboarding/← Step-step input data awal anak
│       │   └── ui/        ─ Tombol, badge, logo kecil-kecil
│       └── data/          ← File konfigurasi (daftar alergi, budget, dll)
│
├── backend/               ← API server (CodeIgniter 3)
│   └── application/
│       ├── controllers/   ← File yang menangani request dari frontend
│       ├── models/        ← File yang berhubungan dengan database
│       ├── helpers/       ← Fungsi bantuan (JSON response, hitung Z-score)
│       ├── core/          ← MY_Controller (base untuk semua controller)
│       └── config/        ← Setting database, route, API key AI
│
├── docs/                  ← Dokumentasi
├── nuids.sql              ← File database
└── AGENTS.md              ← Catatan untuk AI agent
```

---

## Cara Menjalankan

### 1. Jalankan Backend (XAMPP)

Backend Nuids adalah API yang berjalan di atas CodeIgniter 3. Pastikan XAMPP menyala.

```bash
# Cek di browser:
http://localhost/nuids/backend/api/auth/login
# → harus muncul {"success":false,"message":"Email dan password wajib diisi"}
```

Kalau error "Database Error", jalankan file `nuids.sql` di phpMyAdmin dulu.

### 2. Jalankan Frontend (React)

Buka terminal baru, lalu:

```bash
cd frontend
npm install        # cukup sekali, download library
npm run dev        # untuk pengembangan (coding)
```

Nanti muncul URL seperti `http://localhost:5173`. Buka di browser.

Kalau mau build untuk production:

```bash
npm run build      # hasilnya di folder frontend/dist/
```

### 3. Jalankan AI Server (kalau mau fitur chat & meal planner)

AI Server adalah program terpisah yang menangani kecerdasan buatan.
Pastikan sudah jalan di `https://deepseek-api.nexaworks.me/api/nuids`.
Backend Nuids otomatis akan menghubungi server ini.

---

## Alur Program dari Awal

```
Buka website (LandingPage)
       ↓
Klik "Mulai" → Pilih Login atau Register
       ↓
Isi email & password
       ↓
Setuju disclaimer medis (hanya sekali)
       ↓
Isi data anak (nama, tanggal lahir, jenis kelamin, dll)
       ↓
Masuk DASHBOARD — halaman utama
       ↓
   ├── Input mingguan (isi tinggi & berat)
   ├── Lihat grafik pertumbuhan (Tracking)
   ├── Chat dengan AI (AI Consultant)
   ├── Lihat meal plan (Meal Planner)
   └── Atur profil
```

---

## Frontend (React)

### Halaman dan File-nya

| Halaman | Path URL | File |
|---|---|---|
| Halaman depan | `/` | `pages/LandingPage.jsx` |
| Pilih Login/Register | `/auth` | `pages/AuthPage.jsx` |
| Login | `/login` | `pages/LoginPage.jsx` |
| Register | `/register` | `pages/RegisterPage.jsx` |
| Disclaimer medis | `/consent` | `pages/ConsentPage.jsx` |
| Isi data awal anak | `/input-data-awal` | `pages/InputDataAwalPage.jsx` |
| Dashboard (utama) | `/dashboard` | `pages/DashboardPage.jsx` |
| Grafik pertumbuhan | `/tracking` | `pages/TrackingPage.jsx` |
| Input mingguan | `/weekly-input` | `pages/WeeklyInputPage.jsx` |
| Riwayat | `/history` | `pages/HistoryPage.jsx` |
| Meal planner | `/meal-planner` | `pages/MealPlannerPage.jsx` |
| Chat AI | `/ai-chat` | `pages/AIChatPage.jsx` |
| Profil | `/profile` | `pages/ProfilePage.jsx` |

### Cara Membaca Halaman

Setiap halaman di `pages/` biasanya punya struktur:

```jsx
export default function NamaHalaman() {
  // 1. State dan hooks (data yang disimpan)
  const { child, user } = useApp()

  // 2. Efek samping (ambil data dari backend pas halaman dibuka)
  useEffect(() => { api.children.list() }, [])

  // 3. Fungsi-fungsi (handle submit, handle klik)
  async function handleSave() { ... }

  // 4. Tampilan (JSX)
  return ( <PageShell> ... </PageShell> )
}
```

### Komponen UI yang Sering Dipakai

| Komponen | Letak | Kegunaan |
|---|---|---|
| `<PageShell>` | `components/layout/PageShell.jsx` | Bungkus halaman, kasih background + lebar max 480px |
| `<PageHeader>` | `components/layout/PageHeader.jsx` | Header dengan logo + judul + tombol kembali |
| `<BottomNav>` | `components/layout/BottomNav.jsx` | Navigasi bawah (Home, Riwayat, Tracker, Profil) |
| `<ToggleChip>` | `components/ui/ToggleChip.jsx` | Tombol pilihan (aktif/nonaktif) |
| `<StatusBadge>` | `components/ui/StatusBadge.jsx` | Label status (AMAN/PANTAU/KONSULTASI) |
| `<ChatInput>` | `components/chat/ChatInput.jsx` | Input teks untuk chat |

### State Global (AppContext)

File: `context/AppContext.jsx`

Data yang tersedia di **semua** halaman:

| Nama | Isi | Contoh |
|---|---|---|
| `user` | Data orang tua | `{ id, name, email, phone }` |
| `child` | Data anak yang dipilih | `{ id, name, ageMonths, allergies, ... }` |
| `checkups` | Riwayat checkups anak | `[{ week, height, weight, status, ... }]` |
| `isLoggedIn` | Status login | `true` atau `false` |
| `loading` | Lagi ambil data? | `true` atau `false` |

Cara pakai di halaman:

```jsx
import { useApp } from '../context/AppContext'

function DashboardPage() {
  const { user, child, logout } = useApp()
  return <h1>Halo {user.name}</h1>
}
```

### API Service

File: `services/api.js`

Semua panggilan ke backend lewat sini. Contoh:

```js
import api from '../services/api'

// Ambil data
const children = await api.children.list()
const checkups = await api.checkups.list(child.id)

// Kirim data
await api.checkups.create({ child_id: 1, height: 76.5, weight: 9.2 })
await api.auth.login({ email, password })
```

Daftar lengkap endpoint ada di file `services/api.js` bagian `export default { ... }`.

---

## Backend (CodeIgniter 3)

### Controller dan Tugasnya

| Controller | File | Tugas |
|---|---|---|
| `Auth` | `controllers/Auth.php` | Login, register, logout, consent, status |
| `Children` | `controllers/Children.php` | CRUD data anak |
| `Checkups` | `controllers/Checkups.php` | Input mingguan + analisis Z-score |
| `Chat` | `controllers/Chat.php` | Simpan history chat + forward ke AI |
| `Meal_plans` | `controllers/Meal_plans.php` | Generate & simpan meal plan |
| `Growth_chart` | `controllers/Growth_chart.php` | Data grafik WHO Z-score |

### Model dan Tabel Database

| Model | Tabel | Isi |
|---|---|---|
| `User_model` | `users` | Akun orang tua |
| `Child_model` | `children` | Data anak (nama, alergi, budget, dll) |
| `Checkup_model` | `checkups` | Input mingguan (tinggi, berat, status) |
| `Meal_plan_model` | `meal_plans` | Meal plan dari AI |
| `Chat_message_model` | `chat_messages` | Riwayat chat |

### Cara Membaca Controller

```php
class NamaController extends MY_Controller {

    public function __construct() {
        parent::__construct();
        // Load model yang dipakai
        $this->load->model('Nama_model');
    }

    public function index() {
        $this->_require_auth();       // Cek login
        $data = $this->_get_json_input(); // Ambil data dari frontend

        $child = $this->_verify_child_access($id); // Cek akses anak
        if (!$child) return;

        // Proses...
        json_success($result);         // Kirim response JSON ke frontend
    }
}
```

Fungsi dari MY_Controller yang sering dipakai:

| Fungsi | Kegunaan |
|---|---|
| `_require_auth()` | Cek apakah user sudah login |
| `_get_json_input()` | Ambil data JSON dari request body |
| `_verify_child_access($id)` | Cek apakah user punya akses ke anak ini |
| `_call_ai($payload)` | Kirim data ke AI Server |
| `json_success($data)` | Kirim response sukses |
| `json_error($message)` | Kirim response error |

---

## Database

Ada 6 tabel:

| Tabel | Kolom Penting |
|---|---|
| `users` | `user_id`, `full_name`, `email`, `password_hash`, `auth_token` |
| `children` | `child_id`, `user_id`, `full_name`, `birth_date`, `gender`, `allergies` (JSON), `budget`, `available_ingredients` (JSON) |
| `checkups` | `checkup_id`, `child_id`, `week`, `checkup_date`, `height_cm`, `weight_kg`, `status`, `conditions` (JSON) |
| `meal_plans` | `meal_plan_id`, `child_id`, `plan_date`, `budget`, `ai_note`, `meals` (JSON) |
| `chat_messages` | `chat_message_id`, `child_id`, `role`, `message_text` |
| `consents` | `consent_id`, `user_id`, `is_approved`, `approved_at` |

Kolom dengan tipe `JSON` berarti menyimpan array atau object langsung di database. Contoh:

```json
// Kolom allergies di tabel children
["telur", "susu sapi"]

// Kolom conditions di tabel checkups
["sehat"]

// Kolom meals di tabel meal_plans
[{"type":"sarapan","label":"Sarapan","name":"Bubur Ayam","time":"08:00 WIB"}]
```

---

## Panduan Mengubah Sesuatu

### "Saya ingin mengubah teks di halaman..."

Cari file yang sesuai di tabel halaman di atas, lalu cari teksnya.
Contoh: mau ubah tulisan "Selamat Pagi" → cari di `pages/DashboardPage.jsx` atau `components/dashboard/GreetingSection.jsx`.

### "Saya ingin menambah halaman baru"

1. Buat file baru di `frontend/src/pages/` (contoh: `LaporanPage.jsx`)
2. Isi dengan komponen React biasa (copy dari halaman lain sebagai template)
3. Tambahkan rute di `frontend/src/App.jsx`:
   ```jsx
   import LaporanPage from './pages/LaporanPage'
   // ...di dalam <Routes>:
   <Route path="/laporan" element={<ProtectedRoute><LaporanPage /></ProtectedRoute>} />
   ```
4. Tambahkan tombol navigasi di `components/layout/BottomNav.jsx` kalau perlu

### "Saya ingin menambah endpoint API baru"

1. Buat fungsi di controller yang sesuai (atau buat controller baru)
2. Tambahkan rute di `backend/application/config/routes.php`:
   ```php
   $route['api/laporan'] = 'laporan/index';
   ```
3. Tambahkan method di `frontend/src/services/api.js`:
   ```js
   laporan: {
     get: () => get('/laporan'),
   },
   ```

### "Saya ingin mengubah prompt AI"

Buka `frontend/src/pages/AIChatPage.jsx`, cari variabel `SYSTEM_PROMPT`.
Ubah teksnya. Simpan. Langsung berlaku.

### "Saya ingin mengubah tampilan grafik pertumbuhan"

Buka `frontend/src/components/tracking/GrowthChart.jsx`.
Grafik pakai library Recharts.
Kalau mau ganti warna garis, cari `stroke="#4CAF50"` atau `stroke="#58A5DA"`.

### "Saya ingin menambah field di form input mingguan"

1. Tambah kolom di database (`nuids.sql`)
2. Tambah field di `backend/application/controllers/Checkups.php` (fungsi `create`)
3. Tambah input di `frontend/src/pages/WeeklyInputPage.jsx`

### "Saya ingin mengubah warna tema"

Buka `frontend/tailwind.config.js`, cari bagian `colors:`.
Ubah nilai `primary`, `green`, `bg-app`, dll.

### Dimana Letak File Penting

| Yang Ingin Diubah | Letak File |
|---|---|
| Teks landing page | `pages/LandingPage.jsx` |
| Form login | `pages/LoginPage.jsx` |
| Form register | `pages/RegisterPage.jsx` |
| Dashboard (ringkasan) | `pages/DashboardPage.jsx` |
| Input tinggi & berat | `pages/WeeklyInputPage.jsx` |
| Grafik pertumbuhan | `components/tracking/GrowthChart.jsx` |
| Chat dengan AI | `pages/AIChatPage.jsx` |
| Meal planner | `pages/MealPlannerPage.jsx` |
| Profil | `pages/ProfilePage.jsx` |
| Riwayat | `pages/HistoryPage.jsx` |
| Navigasi bawah | `components/layout/BottomNav.jsx` |
| Warna tema | `tailwind.config.js` (di folder frontend) |
| API key AI | `backend/application/config/nuids.php` |
| Rute API | `backend/application/config/routes.php` |
| Login/logout logic | `context/AppContext.jsx` |
| Koneksi ke backend | `services/api.js` |
| Database | `nuids.sql` |
