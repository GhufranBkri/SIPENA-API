const express = require('express');
const router = express.Router();
const { getAllUsers, createUser, getUserbyId } = require('./userService');
const { authenticateToken } = require('../auth/authService');


router.get("/", authenticateToken, async (req, res) => {
    const users = await getAllUsers();
    res.send(users);
});

router.post("/", async (req, res) => {
    try {
        const userData = req.body;
        const user = await createUser(userData);
        res.send({
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
    const userId = req.params.id;
    const user = await getUserbyId(userId)


    res.send(user);
})


module.exports = router;
