# Tutorial Deploy ke cPanel

> Panduan step-by-step untuk hosting Nuids di cPanel hosting.

---

## Persiapan

Sebelum mulai, siapkan:

- Akun cPanel (login URL, username, password) — dari penyedia hosting
- Domain atau subdomain (contoh: `nuids.domainkamu.com`)
- File `nuids.sql` yang sudah di-export dari phpMyAdmin lokal
- Folder project `nuids` yang sudah lengkap

---

## Step 1: Build Frontend

Jalankan di komputer kamu:

```bash
cd frontend
npm run build
```

Hasil build ada di `frontend/dist/`. Folder ini yang akan di-upload.

---

## Step 2: Buat Database di cPanel

1. Login ke cPanel
2. Cari menu **MySQL Databases** atau **Database Wizard**
3. Buat database baru, misal: `nuids_db`
4. Buat user database, misal: `nuids_user`
5. Kasih password, misal: `Rahasia123!`
6. Tambahkan user ke database dengan **All Privileges**

Catat:
- Nama database: `nuids_db`
- Username: `nuids_user`
- Password: `Rahasia123!`
- Host: `localhost` (biasanya)

---

## Step 3: Import Database

1. Di cPanel, cari **phpMyAdmin**
2. Klik database `nuids_db` (sebelah kiri)
3. Klik tab **Import**
4. Pilih file `nuids.sql` dari komputer kamu
5. Klik **Go**

Tunggu sampai selesai.

---

## Step 4: Upload File ke cPanel

### Cara A: Upload File Manager (lebih mudah untuk pemula)

1. Di cPanel, cari **File Manager**
2. Masuk ke folder `public_html`
3. Buat folder baru (kalau belum ada), misal: `nuids`
4. Upload file-file berikut:

```
public_html/nuids/
├── backend/           ← [upload seluruh folder backend]
├── frontend/dist/     ← [upload isi folder dist] → letakkan di public_html langsung
```

Atau biar domain langsung指向 ke frontend:

```
public_html/
├── index.html         ← dari frontend/dist/index.html
├── assets/            ← dari frontend/dist/assets/
├── favicon.svg        ← dari frontend/dist/favicon.svg
├── backend/           ← upload seluruh folder backend
└── .htaccess          ← (buat baru)
```

### Cara B: Upload via FTP (lebih cepat untuk file banyak)

Gunakan aplikasi FTP seperti **FileZilla**:

1. Host FTP: `ftp.domainkamu.com` (cek di cPanel)
2. Username: (username cPanel)
3. Password: (password cPanel)
4. Port: 21

Setelah connect, upload:

```
/              → isi dari frontend/dist/ (index.html, assets/, dll)
/backend/      → isi dari folder backend/
```

---

## Step 5: Konfigurasi Backend

### 5a. Edit `backend/application/config/database.php`

```php
'hostname' => 'localhost',
'username' => 'nuids_user',     // ganti dengan username database
'password' => 'Rahasia123!',     // ganti dengan password database
'database' => 'nuids_db',        // ganti dengan nama database
```

### 5b. Edit `backend/application/config/config.php`

```php
$config['base_url'] = 'https://domainkamu.com/backend/';
// Ganti domainkamu.com dengan domain asli
```

### 5c. Edit `backend/application/config/nuids.php`

```php
$config['ai_api_url'] = 'https://deepseek-api.nexaworks.me/api/nuids';
$config['ai_api_key'] = 'nuids-dev-key-2024';
```

### 5d. Edit `backend/.htaccess`

Buat file `.htaccess` di folder `backend/`:

```
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.php/$1 [L]
```

---

## Step 6: Konfigurasi Frontend

### 6a. Edit `frontend/src/services/api.js`

Ubah `BASE_URL` jadi domain hosting:

```js
const BASE_URL = 'https://domainkamu.com/backend/api'
```

**Catatan:** Edit ini di **file asli** (`src/services/api.js`), lalu build ulang:

```bash
cd frontend
npm run build
```

Upload ulang folder `dist/` ke hosting.

### 6b. .htaccess untuk Single Page App (React Router)

Buat file `.htaccess` di folder `public_html` (root domain):

```
RewriteEngine On
RewriteBase /

# Redirect semua request ke index.html (untuk React Router)
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ index.html [QSA,L]

# Cegah akses langsung ke file backend
RewriteRule ^backend/ - [L]
```

---

## Step 7: Cek dan Test

Buka di browser:

```
https://domainkamu.com/                 → harus muncul landing page
https://domainkamu.com/login            → harus muncul halaman login
https://domainkamu.com/backend/api/auth/login  → harus response JSON
```

Coba flow lengkap:
1. Register akun baru
2. Login
3. Setuju consent
4. Input data anak
5. Dashboard tampil
6. Input mingguan
7. Lihat grafik

---

## Troubleshooting

### Error 500 (Internal Server Error)

Cek error log di cPanel → **Error Log** atau `backend/application/logs/`.

Penyebab umum:
- PHP version tidak cocok (CI3 butuh PHP 7.2+)
- `#[AllowDynamicProperties]` belum ditambahkan ke core CI3 → sudah ada

### Error "Database connection failed"

1. Cek nama database, username, password di `database.php`
2. Pastikan database sudah di-import
3. Coba di phpMyAdmin pastikan tabel-tabelnya ada

### Error 404 selain di halaman pertama

React Router (SPA) butuh `.htaccess` yang benar. Pastikan file `.htaccess` di root sudah ada seperti di Step 6b.

### Blank page / tidak muncul apa-apa

1. Buka **Inspect Element** → tab **Console**
2. Lihat error JavaScript-nya
3. Pastikan `BASE_URL` di `api.js` sudah benar
4. Pastikan favicon, logo, dan asset lainnya path-nya benar

### AI Server tidak bisa diakses

Pastikan firewall hosting tidak memblokir koneksi keluar ke `deepseek-api.nexaworks.me`.
Kalau diblokir, hubungi support hosting untuk allow koneksi keluar port 443.

---

## Ringkasan File yang Harus Diubah untuk Hosting

| File | Yang Diubah |
|---|---|
| `backend/application/config/database.php` | username, password, database name |
| `backend/application/config/config.php` | `base_url` |
| `frontend/src/services/api.js` | `BASE_URL` → lalu build ulang |
| `.htaccess` (root domain) | Buat baru untuk React SPA |
| `.htaccess` (folder backend/) | Buat baru untuk clean URL |

---

## Setup Subdomain (Alternatif)

Kalau mau pisah frontend dan backend:

- Frontend: `nuids.domainkamu.com` → pointing ke `public_html/nuids/`
- Backend API: `api.nuids.domainkamu.com` → pointing ke `public_html/nuids/backend/`

Caranya di cPanel:
1. Cari **Subdomains**
2. Buat subdomain `nuids` → folder: `public_html/nuids`
3. Buat subdomain `api.nuids` → folder: `public_html/nuids/backend`
4. Sesuaikan `BASE_URL` di `api.js` jadi `https://api.nuids.domainkamu.com/api`
