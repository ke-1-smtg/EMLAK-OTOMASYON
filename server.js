const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// MySQL Bağlantısı
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ MySQL bağlantı hatası:", err);
    return;
  }
  console.log("✅ MySQL Bağlantısı Başarılı!");
});

// Test için Basit Endpoint
app.get("/", (req, res) => {
  res.send("Emlak Otomasyon API Çalışıyor!");
});

// **Müşteri Listeleme**
app.get("/customers", (req, res) => {
  const query = "SELECT * FROM customers";
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Hata", error: err.message });
    }
    res.json(results);
  });
});

// **Müşteri Ekleme**
app.post("/customers", (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const query = "INSERT INTO customers (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)";
  
  db.query(query, [first_name, last_name, phone, email], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Ekleme hatası", error: err.message });
    }
    res.status(201).json({ message: "Müşteri eklendi", customerId: result.insertId });
  });
});

// Sunucuyu Başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server ${PORT} portunda çalışıyor`));
