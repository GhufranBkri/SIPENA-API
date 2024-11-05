const express = require('express');
const { login, verifyToken } = require('./authService');
const { successResponse, errorResponse } = require('../utility/responseFormat');
const router = express.Router();

router.post("/login", async (req, res) => {
    const { no_identitas, password } = req.body;
    try {
        const token = await login(no_identitas, password);
        res.send(successResponse({ token }));
    } catch (error) {
        res.status(400).send(errorResponse(error.message));
    }
});

router.post("/verify-token", async (req, res) => {
    const { token } = req.body;

    try {
        const verify = await verifyToken(token);

        if (!verify) {
            throw new Error("Token Invalid!");
        }
        res.status(201).send(successResponse({ data: verify }, "Token Verified!"));
    } catch (error) {
        res.status(400).send(errorResponse(error.message));
    }
})

module.exports = router;