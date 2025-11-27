import express from "express";
import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

//default route
app.get("/", (req, res) => {
  res.send("api jalan hehe");
});

// Inisialisasi client Supabase
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY
);

// ---------------------------
// ENDPOINT 1: Ambil semua makanan
// ---------------------------
app.get("/foods", async (req, res) => {
  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .order("id", { ascending: true });

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// ---------------------------
// ENDPOINT 2: Ambil makanan berdasarkan daerah
// contoh: /foods/jawa barat
// ---------------------------
app.get("/foods/:daerah", async (req, res) => {
  const daerah = req.params.daerah;

  const { data, error } = await supabase
    .from("foods")
    .select("*")
    .eq("daerah", daerah);

  if (error) return res.status(500).json({ error: error.message });

  res.json(data);
});

// ---------------------------
// ENDPOINT 3: Tambah data makanan
// ---------------------------
app.post("/foods", async (req, res) => {
  const { daerah, makanan, deskripsi } = req.body;

  // Validasi sederhana (asumsi minimal)
  if (!daerah || !makanan)
    return res.status(400).json({ error: "daerah dan makanan wajib diisi" });

  const { data, error } = await supabase
    .from("foods")
    .insert([{ daerah, makanan, deskripsi }]);

  if (error) return res.status(500).json({ error: error.message });

  res.json({ message: "berhasil menambah data", data });
});

// ---------------------------
// Jalankan Server
// ---------------------------
app.listen(process.env.PORT, () => {
  console.log("Server berjalan di port", process.env.PORT);
});
