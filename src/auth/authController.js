const express = require('express');
const { login, verifyToken } = require('./authService');
const router = express.Router();

router.post("/login", async (req, res) => {
    const { no_identitas, password } = req.body;
    try {
        const token = await login(no_identitas, password);
        res.send({ token });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.post("/verify", async (req, res) => {
    const { token } = req.body;

    try {
        const verify = await verifyToken(token);
        res.status(201).send({
            data: verify,
            message: "user telah login"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }

})

module.exports = router; 