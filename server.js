const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// API Test Endpoint
app.get("/", (req, res) => {
  res.send("Emlak Otomasyon API Çalışıyor!");
});

// Sunucuyu başlat
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server ${PORT} portunda çalışıyor`));

const customerRoutes = require("./routes/customers");
app.use("/customers", customerRoutes);

// Müşteri Ekleme
app.post("/customers", (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  
  // SQL sorgusunu yazalım
  const query = "INSERT INTO customers (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)";
  
  db.query(query, [first_name, last_name, phone, email], (err, result) => {
    if (err) {
      console.error("Müşteri eklenirken hata:", err);
      return res.status(500).json({ message: "Müşteri eklenirken hata", error: err.message });
    }
    res.status(201).json({ message: "Müşteri başarıyla eklendi", customerId: result.insertId });
  });
});
// Müşteri Listeleme
app.get("/customers", (req, res) => {
  const query = "SELECT * FROM customers";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Müşteriler listelenirken hata:", err);
      return res.status(500).json({ message: "Müşteriler listelenirken hata", error: err.message });
    }
    res.json(results);
  });
});
// Emlak Ekleme
app.post("/properties", (req, res) => {
  const { title, description, price, location, bedrooms, bathrooms, area, broker_id } = req.body;
  
  const query = "INSERT INTO properties (title, description, price, location, bedrooms, bathrooms, area, broker_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  
  db.query(query, [title, description, price, location, bedrooms, bathrooms, area, broker_id], (err, result) => {
    if (err) {
      console.error("Emlak eklenirken hata:", err);
      return res.status(500).json({ message: "Emlak eklenirken hata", error: err.message });
    }
    res.status(201).json({ message: "Emlak başarıyla eklendi", propertyId: result.insertId });
  });
});
// Emlak Listeleme
app.get("/properties", (req, res) => {
  const query = "SELECT * FROM properties";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Emlaklar listelenirken hata:", err);
      return res.status(500).json({ message: "Emlaklar listelenirken hata", error: err.message });
    }
    res.json(results);
  });
});
// Randevu Ekleme
app.post("/appointments", (req, res) => {
  const { customer_id, property_id, broker_id, appointment_date, status } = req.body;
  
  const query = "INSERT INTO appointments (customer_id, property_id, broker_id, appointment_date, status) VALUES (?, ?, ?, ?, ?)";
  
  db.query(query, [customer_id, property_id, broker_id, appointment_date, status], (err, result) => {
    if (err) {
      console.error("Randevu eklenirken hata:", err);
      return res.status(500).json({ message: "Randevu eklenirken hata", error: err.message });
    }
    res.status(201).json({ message: "Randevu başarıyla oluşturuldu", appointmentId: result.insertId });
  });
});
// Randevuları Listeleme
app.get("/appointments", (req, res) => {
  const query = "SELECT * FROM appointments";
  
  db.query(query, (err, results) => {
    if (err) {
      console.error("Randevular listelenirken hata:", err);
      return res.status(500).json({ message: "Randevular listelenirken hata", error: err.message });
    }
    res.json(results);
  });
});
