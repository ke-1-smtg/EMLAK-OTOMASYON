const express = require("express");
const router = express.Router();
const db = require('../db'); // Buradaki yol doğru mu?


// Müşteri Ekle
router.post("/add", (req, res) => {
  const { first_name, last_name, phone, email } = req.body;
  const sql = "INSERT INTO customers (first_name, last_name, phone, email) VALUES (?, ?, ?, ?)";
  db.query(sql, [first_name, last_name, phone, email], (err, result) => {
    if (err) return res.status(500).send(err);
    res.send({ message: "Müşteri başarıyla eklendi!", id: result.insertId });
  });
});

// Tüm Müşterileri Getir
router.get("/", (req, res) => {
  db.query("SELECT * FROM customers", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

module.exports = router;
