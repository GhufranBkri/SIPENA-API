const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const userRouter = require('./user/userController');
const authRouter = require('./auth/authController');
const { connectDB } = require('./db/index'); // Impor connectDB

const app = express();
dotenv.config();

// Gunakan cors dengan konfigurasi yang diinginkan
app.use(cors({
    origin: 'http://example.com', // Ganti dengan URL frontend Anda
    methods: ['GET', 'POST'], // Metode yang diizinkan
    allowedHeaders: ['Content-Type', 'Authorization'], // Header yang diizinkan
}));

app.use(express.json());

app.use("/users", userRouter);
app.use("/auth", authRouter);
app.get("/api", (req, res) => {
    res.send("hai");
});
app.get("/", (req, res) => {
    res.send("PACAR IPA");
});

// Hubungkan ke database dan mulai server
connectDB().then(() => {
    const port = process.env.PORT || 3000;
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});