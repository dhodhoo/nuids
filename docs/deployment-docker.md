# Deployment ke VPS dengan Docker

> Panduan step-by-step untuk deploy Nuids ke VPS menggunakan Docker.

---

## Prasyarat

- VPS dengan akses SSH
- Docker dan Docker Compose sudah terinstall
- File project Nuids (dari GitHub repo)

---

## Step 1: Install Docker di VPS

```bash
sudo apt-get update
sudo apt-get install -y docker.io docker-compose-v2
sudo systemctl enable docker
sudo systemctl start docker
```

Verifikasi: `docker --version`

---

## Step 2: Clone Project dari GitHub

```bash
cd /opt
sudo git clone https://github.com/dhodhoo/nuids.git
sudo chown -R $USER:$USER /opt/nuids
cd /opt/nuids
```

---

## Step 3: Build Frontend

```bash
# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

cd /opt/nuids/frontend
npm install
npm run build

# Pindahkan hasil build
cd /opt/nuids
cp -r frontend/dist dist
```

---

## Step 4: Konfigurasi Backend

Edit `backend/application/config/database.php`:

```php
'hostname' => 'db',
'username' => 'nuids',
'password' => '(isi password database)',
'database' => 'nuids_fix',
```

Edit `backend/application/config/config.php`:

```php
$config['base_url'] = '';
```

Edit `frontend/src/services/api.js` (sebelum build):

```js
const BASE_URL = '/backend/api'
```

---

## Step 5: Jalankan dengan Docker Compose

```bash
cd /opt/nuids
sudo docker compose up -d --build
```

Cek status: `sudo docker compose ps`

Harus muncul 3 container dengan status `Up`:

```
NAME             STATUS
nuids-db         Up
nuids-backend    Up
nuids-frontend   Up
```

---

## Step 6: Buka Firewall

```bash
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw reload
```

---

## Step 7: SSL (HTTPS)

Pastikan domain sudah pointing ke IP VPS, lalu:

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d domainkamu.com --non-interactive --agree-tos --email email@domain.com
```

---

## Struktur Docker

| Container | Image | Port | Fungsi |
|---|---|---|---|
| `nuids-frontend` | `nginx:alpine` | 8080 | Serve React build (via Nginx host proxy) |
| `nuids-backend` | `php:8.3-apache` | 8081 | CodeIgniter API |
| `nuids-db` | `mysql:8.0` | 3307 | Database |

Nginx host (`systemctl nginx`) di port 80/443 reverse proxy ke `127.0.0.1:8080`.

---

## Command Penting

```bash
sudo docker compose ps           # Status container
sudo docker compose logs -f      # Lihat log
sudo docker compose restart      # Restart semua
sudo docker compose down         # Stop semua
sudo docker compose up -d --build # Rebuild + start

sudo docker exec -it nuids-backend bash
sudo docker exec -it nuids-db mysql -u root -p
```

---

## Troubleshooting

### Frontend 403 Forbidden

```bash
ls /opt/nuids/dist/index.html
```

Kalau tidak ada, ulangi Step 3 (build frontend).

### Backend 500

```bash
sudo docker compose logs backend
```

Penyebab umum: database belum siap → `docker compose restart backend`.

### Database tidak ter-import

```bash
sudo docker exec -it nuids-db mysql -u root -p -e 'SHOW DATABASES;'
sudo docker exec -i nuids-db mysql -u root -p nuids_fix < /opt/nuids/nuids_fix.sql
```

### AI Server tidak bisa diakses

```bash
sudo docker exec nuids-backend curl -s https://deepseek-api.nexaworks.me/api/nuids
```

Kalau timeout, pastikan VPS bisa akses internet keluar.
