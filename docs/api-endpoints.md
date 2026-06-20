# API Endpoints — Nuids

> Base URL: `http://localhost/nuids/backend/api`

## Autentikasi

Semua endpoint kecuali `register` & `login` memerlukan header:
```
Authorization: Bearer <token>
```

---

### Register

Mendaftarkan akun orang tua baru.

```
POST /auth/register
```

**Request Body:**
```json
{
  "name": "Neisya Adrillia P.R",
  "email": "neisya@gmail.com",
  "password": "rahasia123",
  "phone": "08123456789"
}
```

**Response (201):**
```json
{
  "success": true,
  "message": "Registrasi berhasil",
  "data": {
    "user": {
      "id": 1,
      "name": "Neisya Adrillia P.R",
      "email": "neisya@gmail.com",
      "phone": "08123456789"
    },
    "token": "a1b2c3d4..."
  }
}
```

---

### Login

```
POST /auth/login
```

**Request Body:**
```json
{
  "email": "neisya@gmail.com",
  "password": "rahasia123"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "user": { "id": 1, "name": "...", "email": "...", "phone": "..." },
    "token": "a1b2c3d4..."
  }
}
```

---

### Get Current User

Mengambil data user yang sedang login berdasarkan token.

```
GET /auth/me
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Neisya Adrillia P.R",
    "email": "neisya@gmail.com",
    "phone": "08123456789"
  }
}
```

---

### Logout

Menghapus token session.

```
POST /auth/logout
```

**Response:**
```json
{ "success": true, "message": "Logout berhasil", "data": null }
```

---

### Update Profile

```
PUT /auth/update-profile
```

**Request Body (partial):**
```json
{
  "name": "Nama Baru",
  "phone": "08123456788"
}
```

**Response:**
```json
{ "success": true, "message": "Profil berhasil diperbarui", "data": null }
```

---

## Children / Data Anak

### List Children

Mengambil daftar anak milik user yang login.

```
GET /children
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Vera Putri Reska",
      "birthDate": "2023-01-15",
      "gender": "female",
      "birthWeight": 3.2,
      "birthHeight": 48.5,
      "ageMonths": 14,
      "allergies": ["telur"],
      "texture": "lembut",
      "budget": 20000,
      "budgetMode": "harian",
      "availableIngredients": ["Nasi", "Ayam", "Tahu", "Tempe"]
    }
  ]
}
```

---

### Get Child by ID

```
GET /children/{id}
```

**Response:** Sama seperti satu item di list.

---

### Create Child

```
POST /children/create
```

**Request Body:**
```json
{
  "name": "Vera Putri Reska",
  "birthDate": "2023-01-15",
  "gender": "female",
  "birthWeight": 3.2,
  "birthHeight": 48.5,
  "allergies": ["telur"],
  "texture": "lembut",
  "budget": 20000,
  "budgetMode": "harian",
  "availableIngredients": ["Nasi", "Ayam", "Tahu", "Tempe"]
}
```

**Response (201):**
```json
{ "success": true, "message": "Profil anak berhasil dibuat", "data": { "id": 1 } }
```

---

### Update Child

```
PUT /children/{id}/update
```

**Request Body (partial):**
```json
{
  "name": "Nama Baru",
  "budget": 30000,
  "allergies": ["telur", "susu"]
}
```

**Response:**
```json
{ "success": true, "message": "Profil anak berhasil diperbarui", "data": null }
```

---

## Checkups / Input Mingguan

### List Checkups

```
GET /checkups?child_id=1
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "week": 18,
      "date": "2024-05-12",
      "height": 76.5,
      "weight": 9.2,
      "status": "aman",
      "meal": "baik",
      "condition": ["sehat"],
      "notes": "Pertumbuhan sangat baik, teruskan ASI eksklusif dan MPASI bergizi."
    }
  ]
}
```

Urutan: `week` DESC (terbaru di atas).

---

### Get Checkup by ID

```
GET /checkups/{id}
```

---

### Create Checkup

```
POST /checkups/create
```

**Request Body:**
```json
{
  "child_id": 1,
  "week": 19,
  "date": "2024-05-19",
  "height": 77.0,
  "weight": 9.5,
  "status": "aman",
  "meal": "baik",
  "condition": ["sehat"],
  "notes": ""
}
```

**Response (201):**
```json
{ "success": true, "message": "Data checkup berhasil disimpan", "data": { "id": 5 } }
```

---

### Update Checkup

```
PUT /checkups/{id}/update
```

---

## Meal Plans

### Get Meal Plan by Date

```
GET /meal-plans?child_id=1&date=2024-05-12
```

`date` opsional — default: hari ini.

**Response:**
```json
{
  "success": true,
  "data": {
    "date": "2024-05-12",
    "budget": 20000,
    "allergies": ["telur"],
    "aiNote": "Menu ini kaya akan Zat Besi untuk mendukung pertumbuhan tinggi badan.",
    "meals": [
      { "type": "sarapan", "label": "Sarapan", "name": "Bubur Beras Merah Hati Ayam", "time": "08:00 WIB" },
      { "type": "siang", "label": "Makan Siang", "name": "Nasi Tim Wortel & Tempe", "time": "12:30 WIB" },
      { "type": "malam", "label": "Makan Malam", "name": "Sup Labu Kuning Daging Giling", "time": "18:30 WIB" },
      { "type": "camilan", "label": "Camilan", "name": "Puree Pepaya & Pisang", "time": "15:30 WIB" }
    ],
    "ingredients": ["Beras Merah", "Hati Ayam", "Wortel", "Tempe", "Labu Kuning", "Daging Giling"]
  }
}
```

Jika belum ada meal plan: `"data": null` dengan message.

---

### Create Meal Plan

```
POST /meal-plans/create
```

**Request Body:**
```json
{
  "child_id": 1,
  "date": "2024-05-12",
  "budget": 20000,
  "allergies": ["telur"],
  "aiNote": "Menu ini kaya...",
  "meals": [
    { "type": "sarapan", "label": "Sarapan", "name": "...", "time": "08:00" }
  ],
  "ingredients": ["Beras", "Ayam"]
}
```

---

## Chat Messages

### List Messages

```
GET /chat?child_id=1
```

Urutan: `created_at` ASC (lama ke baru).

**Response:**
```json
{
  "success": true,
  "data": [
    { "id": 1, "role": "ai", "text": "Halo! Saya Nuids AI..." },
    { "id": 2, "role": "user", "text": "Anak saya Vera, 14 bulan..." },
    { "id": 3, "role": "ai", "text": "Berdasarkan standar WHO..." }
  ]
}
```

---

### Send Message

```
POST /chat/create
```

**Request Body:**
```json
{
  "child_id": 1,
  "role": "user",
  "text": "Anak saya Vera, 14 bulan. Berat badannya 8,5 kg. Apakah normal?"
}
```

---

## Status Values

| Field | Values |
|---|---|
| `checkups.status` | `aman`, `pantau`, `konsultasi` |
| `checkups.meal` | `baik`, `cukup`, `kurang` |
| `checkups.condition[]` | `sehat`, `sakit`, `muntah`, `diare` |
| `children.gender` | `male`, `female` |
| `children.budgetMode` | `harian`, `mingguan` |

---

## Error Response Format

```json
{
  "success": false,
  "message": "Email dan password wajib diisi"
}
```

| HTTP Code | Arti |
|---|---|
| 400 | Validation error |
| 401 | Unauthorized (token salah/kadaluarsa) |
| 404 | Data tidak ditemukan |
| 201 | Berhasil membuat data baru |
