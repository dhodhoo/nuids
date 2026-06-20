# WHO Growth Chart Z-score — Dokumentasi Implementasi

> Fitur ekstra materi di luar pembelajaran (20 poin).
> Mengganti bar chart palsu di `/tracking` dengan grafik pertumbuhan standar WHO.

---

## Daftar Isi

1. [Apa itu WHO Z-score?](#apa-itu-who-z-score)
2. [Arsitektur](#arsitektur)
3. [Data WHO LMS](#data-who-lms)
4. [Backend: Growth Helper](#backend-growth-helper)
5. [Backend: Controller](#backend-controller)
6. [Frontend: Recharts Component](#frontend-recharts-component)
7. [Frontend: TrackingPage](#frontend-trackingpage)
8. [Flow End-to-End](#flow-end-to-end)
9. [Status Rule](#status-rule)

---

## Apa itu WHO Z-score?

Z-score adalah ukuran statistik yang menyatakan seberapa jauh nilai seorang anak dari nilai **median** populasi referensi sehat (WHO), dalam satuan **standar deviasi**.

```
Z = ((nilai_anak / M)^L - 1) / (L × S)
```

- **L** (Lambda) — kekuatan transformasi Box-Cox
- **M** (Mu) — median populasi referensi
- **S** (Sigma) — koefisien variasi

### Interpretasi Z-score

| Z-score | Status | Warna | Tindakan |
|---|---|---|---|
| > -2 SD | Aman 🟢 | Hijau | Lanjut pemantauan rutin |
| -2 SD s/d -3 SD | Perlu Pemantauan 🟡 | Kuning | Periksa asupan gizi |
| < -3 SD | Perlu Konsultasi 🔴 | Merah | Konsultasi ke tenaga kesehatan |

---

## Arsitektur

```
┌─────────────────────────────────────────────────────────────────┐
│ TrackingPage (React)                                            │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ GrowthChart (Recharts LineChart)                          │  │
│  │   - 3 reference lines: -2SD, Median, +2SD (dari WHO)     │  │
│  │   - 1 data line: nilai anak per bulan                    │  │
│  │   - Toggle: Weight-for-Age / Height-for-Age                │  │
│  └───────────────────────────────────────────────────────────┘  │
│         ↕ API call (GET /api/growth-chart?child_id=X)          │
├─────────────────────────────────────────────────────────────────┤
│ Backend: Growth_chart Controller (CI3)                          │
│   ├─ Baca checkups dari database                                │
│   ├─ Load WHO reference dari JSON (assets/)                     │
│   ├─ Hitung Z-score pakai growth_helper.php                     │
│   └─ Return: hfa + wfa + latestStatus                           │
├─────────────────────────────────────────────────────────────────┤
│ Data Files                                                      │
│  ├─ backend/assets/who_wfa.json (Weight-for-Age LMS)            │
│  └─ backend/assets/who_hfa.json (Height-for-Age LMS)            │
└─────────────────────────────────────────────────────────────────┘
```

### File-file terkait

| File | Peran |
|---|---|
| `backend/assets/who_wfa.json` | Data LMS Weight-for-Age (0-24 bulan, female/male) |
| `backend/assets/who_hfa.json` | Data LMS Height-for-Age (0-24 bulan, female/male) |
| `backend/application/helpers/growth_helper.php` | Fungsi kalkulasi Z-score + status |
| `backend/application/controllers/Growth_chart.php` | Endpoint API |
| `frontend/src/components/tracking/GrowthChart.jsx` | Komponen chart Recharts |
| `frontend/src/pages/TrackingPage.jsx` | Halaman tracking (panggil API, render chart) |
| `frontend/src/services/api.js` | Method `api.growthChart.get()` |

---

## Data WHO LMS

Data bersumber dari **WHO Child Growth Standards** untuk anak usia 0–24 bulan. Format JSON:

```json
{
  "female": [
    { "month": 0, "L": 0.38, "M": 3.2322, "S": 0.14232 },
    { "month": 1, "L": 0.38, "M": 4.1873, "S": 0.13591 },
    ...
  ],
  "male": [
    { "month": 0, "L": 0.38, "M": 3.3464, "S": 0.14602 },
    ...
  ]
}
```

Nilai -2SD dan +2SD dihitung dari LMS:

- **Jika L = 1** (height data): `-2SD = M × (1 − 2 × S)`, `+2SD = M × (1 + 2 × S)`
- **Jika L ≠ 1** (weight data): `-2SD = M × (1 − 2 × L × S)^(1/L)`, `+2SD = M × (1 + 2 × L × S)^(1/L)`

---

## Backend: Growth Helper

**File:** `backend/application/helpers/growth_helper.php`

| Fungsi | Input | Output |
|---|---|---|
| `calculate_zscore($value, $L, $M, $S)` | Nilai anak + LMS | Z-score (float) atau null jika invalid |
| `get_who_reference($type)` | 'wfa' atau 'hfa' | JSON object dari file |
| `get_status_from_zscore($zscore)` | Z-score | 'aman' / 'pantau' / 'konsultasi' |
| `calculate_age_months($birth_date)` | Tanggal lahir | Usia dalam bulan |

Rumus Z-score dalam PHP:
```php
function calculate_zscore($value, $L, $M, $S) {
    if ($value <= 0 || $M <= 0) return null;
    if ($L == 0) {
        return log($value / $M) / $S;
    }
    return (pow($value / $M, $L) - 1) / ($L * $S);
}
```

---

## Backend: Controller

**File:** `backend/application/controllers/Growth_chart.php`

**Endpoint:** `GET /api/growth-chart?child_id=X`

**Auth:** Bearer token (di-filter, user hanya bisa akses anak miliknya)

**Response JSON:**
```json
{
  "success": true,
  "data": {
    "childAge": 14,
    "childGender": "female",
    "wfa": {
      "months": [0, 1, 2, ..., 24],
      "minus2sd": [2.39, 3.14, ...],
      "median": [3.23, 4.19, ...],
      "plus2sd": [4.24, 5.42, ...],
      "childData": [
        { "week": 18, "month": 15, "value": 9.2, "date": "2024-05-12" }
      ]
    },
    "hfa": { ... struktur sama ... },
    "latestStatus": {
      "status": "aman",
      "label": "Aman",
      "zScore": -0.5
    }
  }
}
```

**4 array referensi (`minus2sd`, `median`, `plus2sd`) + `childData` panjangnya sama** — frontend tinggal mapping.

---

## Frontend: Recharts Component

**File:** `frontend/src/components/tracking/GrowthChart.jsx`

Teknologi: **Recharts** (library React murni, deklaratif).

Komponen menerima props:
- `chartData` — object berisi `months`, `minus2sd`, `median`, `plus2sd`, `childData`
- `metric` — `'wfa'` (berat) atau `'hfa'` (tinggi)

Logika `combineChartData()` menggabungkan 4 array referensi + data anak menjadi satu array of objects untuk Recharts:
```js
[{ month: 14, minus2sd: 68.0, median: 74.0, plus2sd: 80.0, anak: 74.0 }, ...]
```

Rendering:
- `<LineChart>` dengan `<Line>` untuk setiap garis
- Referensi (`plus2sd`, `median`, `minus2sd`) — `dot={false}`
- Data anak (`anak`) — `dot={{ r: 4 }}` (lingkaran biru)
- Garis putus-putus pakai `strokeDasharray="5 5"`
- `Tooltip` menampilkan nilai dalam kg atau cm
- `Legend` menampilkan label: -2 SD, Median, +2 SD, Anak

---

## Frontend: TrackingPage

**File:** `frontend/src/pages/TrackingPage.jsx`

**Data flow:**
1. `useEffect` → `api.growthChart.get(child.id)` saat `child` tersedia
2. Simpan ke `chartData` state
3. Toggle metric (`wfa` / `hfa`) — ganti data yang ditampilkan
4. Render `GrowthChart` + status badge (`latestStatus`)
5. Analisis teks dinamis berdasarkan status

**State:**
- `chartData` — data dari API (null saat loading)
- `loading` — boolean untuk spinner
- `metric` — `'wfa'` (default) atau `'hfa'`

**UI:**
- Toggle button Berat / Tinggi di header grafik
- Loading state: "Memuat grafik..."
- Empty state: "Data belum tersedia..."
- Status: "Aman 🟢" atau "Perlu Pemantauan 🟡" atau "Perlu Konsultasi 🔴" + Z-score

---

## Flow End-to-End

```
1. User login → dapat token
2. User buka /tracking
3. TrackingPage → api.growthChart.get(child.id)
4. Backend Growth_chart::index()
   ├─ Verifikasi token (MY_Controller)
   ├─ Cek child milik user (Child_model)
   ├─ Load checkups (Checkup_model, order by week DESC)
   ├─ Load WHO data dari JSON (growth_helper)
   ├─ For setiap checkup → hitung usia bulan → cari LMS → hitung Z-score
   ├─ Susun 4 array referensi: months[], minus2sd[], median[], plus2sd[]
   ├─ Susun childData[] untuk titik data anak
   └─ Return JSON { wfa, hfa, latestStatus }
5. Frontend render line chart dengan Recharts
   └─ 4 garis: data anak, median, -2SD, +2SD
```

---

## Status Rule

```php
function get_status_from_zscore($zscore) {
    if ($zscore > -2)   return 'aman';        // 🟢
    if ($zscore >= -3)  return 'pantau';       // 🟡
    return 'konsultasi';                        // 🔴
}
```

| Z-score | Label | User-facing copy |
|---|---|---|
| > -2 SD | Aman | Data dalam rentang normal. Lanjutkan pemantauan rutin. |
| -2 SD s/d -3 SD | Perlu Pemantauan | Tren melambat. Periksa asupan gizi dan tingkatkan frekuensi makan. |
| < -3 SD | Perlu Konsultasi | Perlu evaluasi tenaga kesehatan untuk tindak lanjut. |

---

## Catatan

- Data LMS yang digunakan adalah data mendekati standar WHO untuk anak 0-24 bulan. Untuk akurasi penuh, gunakan data resmi dari [WHO Child Growth Standards](https://www.who.int/tools/child-growth-standards/standards).
- Untuk anak di atas 24 bulan, tambahkan data LMS bulan 25-60 ke file JSON.
- Recharts menambah ~340 KB ke bundle size — wajar untuk library chart.
