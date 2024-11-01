const express = require('express');
const dotenv = require('dotenv');
const userRouter = require('./user/userController');
const authRouter = require('./auth/authController');
const laporanRouter = require('./laporan/Laporancontroller');

const app = express();


dotenv.config();

const PORT = process.env.PORT;

app.use(express.json());

app.use("/laporan", laporanRouter);
app.use("/users", userRouter);
app.use("/auth", authRouter);
app.get("/api", (req, res) => {
    res.send("hai");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});