const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserbyId } = require('./userService');
const { authenticateToken } = require('../auth/authService');

// Middleware to authenticate requests
// router.use(authenticateToken);

router.get("/", async (req, res) => {
    try {
        const users = await getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

router.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        res.status(201).send({
            data: user,
            message: "User created successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const userId = req.params.id;
        const user = await getUserbyId(userId);
        if (!user) {
            return res.status(404).send({
                error: "User not found"
            });
        }
        res.send(user);
    } catch (error) {
        res.status(500).send({
            error: error.message
        });
    }
});

module.exports = router;
