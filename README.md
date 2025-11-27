# Food API - REST API Dokumentasi Makanan Indonesia

REST API untuk mengelola data makanan tradisional Indonesia dengan integrasi database Supabase.

---

## 📋 Daftar Isi

- [Fitur Utama](#fitur-utama)
- [Persyaratan Sistem](#persyaratan-sistem)
- [Instalasi](#instalasi)
- [Konfigurasi Environment](#konfigurasi-environment)
- [Menjalankan Aplikasi](#menjalankan-aplikasi)
- [Endpoint API](#endpoint-api)
- [Contoh Penggunaan](#contoh-penggunaan)
- [Struktur Project](#struktur-project)
- [Dependency](#dependency)
- [Troubleshooting](#troubleshooting)

---

## ✨ Fitur Utama

- ✅ Retrieve semua data makanan
- ✅ Filter makanan berdasarkan daerah/region
- ✅ Tambah data makanan baru
- ✅ Integrasi dengan Supabase database
- ✅ Error handling yang proper
- ✅ Response JSON yang terstruktur

---

## 🔧 Persyaratan Sistem

- **Node.js** v14.0.0 atau lebih tinggi
- **npm** atau **yarn**
- Account **Supabase** dengan project dan API keys
- **Git** (opsional)

---

## 📦 Instalasi

### 1. Clone Repository (jika menggunakan Git)
```bash
git clone <repository-url>
cd rest-supa
```

### 2. Install Dependencies
```bash
npm install
```

Dependencies yang akan diinstall:
- `express` - Web framework
- `@supabase/supabase-js` - Supabase client
- `dotenv` - Environment variable manager

---

## ⚙️ Konfigurasi Environment

### 1. Buat file `.env` di root directory project
```bash
# Dari terminal di root project folder
touch .env
```

### 2. Isi file `.env` dengan konfigurasi berikut:
```env
# Supabase Configuration
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_ANON_KEY=your-anonymous-key-here

# Server Configuration
PORT=3000
```

### 3. Dapatkan Supabase Keys:
1. Login ke [Supabase Dashboard](https://app.supabase.com)
2. Pilih project Anda
3. Ke **Settings** → **API**
4. Copy **Project URL** dan **anon public key**

### ⚠️ PENTING
- **JANGAN** commit file `.env` ke Git
- `.env` sudah ditambahkan ke `.gitignore`
- Keep API keys rahasia dan aman

---

## 🚀 Menjalankan Aplikasi

### Development Mode
```bash
npm start
```

Output yang diharapkan:
```
Server berjalan di port 3000
```

Server akan berjalan di `http://localhost:3000`

---

## 📡 Endpoint API

### 1. **Health Check / Default Route**
- **Method:** `GET`
- **URL:** `/`
- **Description:** Cek apakah server berjalan
- **Response:**
```json
"api jalan hehe"
```

---

### 2. **Get All Foods**
- **Method:** `GET`
- **URL:** `/foods`
- **Description:** Retrieve semua data makanan dari database
- **Response (Success - 200):**
```json
[
  {
    "id": 1,
    "daerah": "Jawa Barat",
    "makanan": "Nasi Kuning",
    "deskripsi": "Nasi yang dimasak dengan kunyit dan santan"
  },
  {
    "id": 2,
    "daerah": "Bali",
    "makanan": "Babi Guling",
    "deskripsi": "Daging babi yang dipanggang dengan rempah khas Bali"
  }
]
```
- **Response (Error - 500):**
```json
{
  "error": "Error message from database"
}
```

---

### 3. **Get Foods by Region/Daerah**
- **Method:** `GET`
- **URL:** `/foods/:daerah`
- **Description:** Retrieve makanan berdasarkan daerah tertentu
- **URL Parameters:**
  - `daerah` (string, required) - Nama daerah (case-sensitive)
- **Example URL:** `/foods/Jawa Barat`
- **Response (Success - 200):**
```json
[
  {
    "id": 1,
    "daerah": "Jawa Barat",
    "makanan": "Nasi Kuning",
    "deskripsi": "Nasi yang dimasak dengan kunyit dan santan"
  }
]
```
- **Response (No Data - 200):**
```json
[]
```
- **Response (Error - 500):**
```json
{
  "error": "Error message from database"
}
```

---

### 4. **Add New Food**
- **Method:** `POST`
- **URL:** `/foods`
- **Description:** Tambahkan data makanan baru ke database
- **Request Headers:**
```
Content-Type: application/json
```
- **Request Body (required fields):**
```json
{
  "daerah": "Jawa Barat",
  "makanan": "Cireng",
  "deskripsi": "Cilegon Goreng - makanan ringan dari tepung tapioka"
}
```
- **Response (Success - 200):**
```json
{
  "message": "berhasil menambah data",
  "data": [
    {
      "id": 3,
      "daerah": "Jawa Barat",
      "makanan": "Cireng",
      "deskripsi": "Cilegon Goreng - makanan ringan dari tepung tapioka"
    }
  ]
}
```
- **Response (Bad Request - 400):**
```json
{
  "error": "daerah dan makanan wajib diisi"
}
```
- **Response (Error - 500):**
```json
{
  "error": "Error message from database"
}
```

---

## 💡 Contoh Penggunaan

### Menggunakan cURL

#### 1. Get All Foods
```bash
curl -X GET http://localhost:3000/foods
```

#### 2. Get Foods by Region
```bash
curl -X GET http://localhost:3000/foods/Jawa%20Barat
```

#### 3. Add New Food
```bash
curl -X POST http://localhost:3000/foods \
  -H "Content-Type: application/json" \
  -d '{
    "daerah": "Sumatera Utara",
    "makanan": "Pempek",
    "deskripsi": "Makanan olahan ikan dan tepung"
  }'
```

### Menggunakan Postman

1. **Import Collection** atau buat request manual
2. **GET Request:**
   - Method: `GET`
   - URL: `http://localhost:3000/foods`
   
3. **POST Request:**
   - Method: `POST`
   - URL: `http://localhost:3000/foods`
   - Body (raw JSON):
   ```json
   {
     "daerah": "Yogyakarta",
     "makanan": "Gudeg",
     "deskripsi": "Makanan tradisional dari nangka muda"
   }
   ```

### Menggunakan JavaScript/Fetch API

```javascript
// Get All Foods
fetch('http://localhost:3000/foods')
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));

// Add New Food
fetch('http://localhost:3000/foods', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    daerah: 'Bandung',
    makanan: 'Tahu Goreng',
    deskripsi: 'Tahu yang digoreng hingga golden brown'
  })
})
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
```

### Menggunakan Python/Requests

```python
import requests

# Get All Foods
response = requests.get('http://localhost:3000/foods')
print(response.json())

# Add New Food
data = {
  'daerah': 'Aceh',
  'makanan': 'Mie Aceh',
  'deskripsi': 'Mie yang disajikan dengan kuah yang kaya rasa'
}
response = requests.post('http://localhost:3000/foods', json=data)
print(response.json())
```

---

## 📁 Struktur Project

```
rest-supa/
├── food-api/
│   └── index.js          # Main application file dengan semua endpoint
├── .vscode/              # VS Code configuration (opsional)
├── .env                  # Environment variables (JANGAN commit!)
├── .gitignore            # Git ignore file
├── package.json          # Project metadata dan dependencies
├── package-lock.json     # Lock file untuk dependency versions
└── README.md             # File dokumentasi ini
```

### Deskripsi File:

- **`food-api/index.js`** - File utama yang berisi:
  - Inisialisasi Express server
  - Setup Supabase client
  - Semua endpoint API (GET, POST)
  - Error handling

- **`package.json`** - Mendefisikan:
  - Nama dan versi project
  - Script npm (start, test)
  - Dependencies yang digunakan

---

## 📚 Dependency

| Package | Version | Fungsi |
|---------|---------|--------|
| `express` | ^5.1.0 | Web framework untuk membangun API |
| `@supabase/supabase-js` | ^2.86.0 | Client library untuk berkomunikasi dengan Supabase |
| `dotenv` | ^17.2.3 | Load environment variables dari file .env |

---

## 🐛 Troubleshooting

### 1. Error: "Cannot find module 'express'"
```
Solusi:
- Pastikan sudah menjalankan: npm install
- Cek file package.json ada dependencies yang sesuai
- Delete node_modules dan jalankan npm install lagi
```

### 2. Error: "SUPABASE_URL is not defined"
```
Solusi:
- Pastikan file .env ada di root directory
- Cek format .env file benar:
  SUPABASE_URL=https://...
  SUPABASE_ANON_KEY=...
- Restart server setelah mengubah .env
```

### 3. Error: "Port 3000 already in use"
```
Solusi:
- Ubah PORT di file .env ke port lain (contoh: 3001, 3002)
- Atau kill process yang menggunakan port 3000
Windows PowerShell: 
  netstat -ano | findstr :3000
  taskkill /PID <PID> /F
```

### 4. Error: "Cannot connect to Supabase database"
```
Solusi:
- Verifikasi SUPABASE_URL dan SUPABASE_ANON_KEY sudah benar
- Cek koneksi internet
- Pastikan Supabase project aktif
- Cek table 'foods' sudah ada di Supabase
```

### 5. POST request error: "daerah dan makanan wajib diisi"
```
Solusi:
- Pastikan request body mengandung kedua field:
  {
    "daerah": "...",
    "makanan": "..."
  }
- Pastikan Content-Type: application/json
```

---

## 🔒 Best Practices

1. **Environment Variables**
   - Selalu gunakan `.env` untuk sensitive data
   - JANGAN hardcode API keys
   - Add `.env` ke `.gitignore`

2. **Error Handling**
   - Selalu check error response dari Supabase
   - Return proper HTTP status codes
   - Berikan pesan error yang jelas

3. **Database**
   - Pastikan table struktur di Supabase sesuai
   - Columns: id (auto), daerah, makanan, deskripsi
   - Set proper data types dan constraints

4. **Security**
   - Validasi input dari client
   - Gunakan RLS (Row Level Security) di Supabase untuk production
   - Monitor API usage dan rate limiting

---

## 📝 Database Schema (Supabase)

Table name: `foods`

| Column | Type | Constraints |
|--------|------|-------------|
| id | integer | PRIMARY KEY, auto-increment |
| daerah | text | NOT NULL |
| makanan | text | NOT NULL |
| deskripsi | text | nullable |
| created_at | timestamp | nullable, default NOW() |

**SQL untuk membuat table:**
```sql
CREATE TABLE foods (
  id SERIAL PRIMARY KEY,
  daerah TEXT NOT NULL,
  makanan TEXT NOT NULL,
  deskripsi TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## 🤝 Kontribusi

Untuk menambah fitur atau lapor bug:
1. Fork repository
2. Buat branch baru (`git checkout -b feature/NamaFeature`)
3. Commit changes (`git commit -m 'Add NamaFeature'`)
4. Push ke branch (`git push origin feature/NamaFeature`)
5. Open Pull Request

---

## 📄 License

ISC License - Lihat file LICENSE untuk detail

---

## 📧 Support

Jika ada pertanyaan atau masalah:
- Buka issue di repository
- Contact: [Developer Email]

---

## 🚀 Next Steps / Improvement Ideas

- [ ] Implementasi authentication/authorization
- [ ] Tambah endpoint untuk update/delete data
- [ ] Implement pagination untuk GET /foods
- [ ] Tambah search functionality
- [ ] Implement rate limiting
- [ ] Tambah unit tests
- [ ] Setup CI/CD pipeline
- [ ] Deploy ke production (Vercel, Heroku, Railway)

---

**Last Updated:** November 27, 2025  
**Version:** 1.0.0
