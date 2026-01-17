require("express-async-errors");
const express = require("express");
const cors = require("cors");
const path = require("path");
const router = require("./routers");
const errorHandler = require("./middlewares/validations/errorHandler");
require("dotenv").config();
require("./db/mysql_connect");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Statik Dosyalar (Public klasörü için)
app.use(express.static(path.join(__dirname, "public")));

// Ana Router
app.use("/api", router);

// Hata Yakalama Middleware'i (En sonda olmalı)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor. Backend + Frontend Hazır.`);
});const path = require("path");
// ... diğer importlar ...

// Statik Dosyaları Sun (BU SATIR ÇOK ÖNEMLİ)
app.use(express.static(path.join(__dirname, "public")));

// ... API rotaları ...