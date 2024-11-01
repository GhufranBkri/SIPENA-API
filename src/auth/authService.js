const jwt = require('jsonwebtoken');
const { getUserbyId } = require('../user/userService');
const bcrypt = require('bcrypt');

const authenticateToken = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1]; // Mengambil token dari header Authorization

    if (!token) return res.status(401).json({ message: 'Access denied. No token provided.' });

    try {
        // Verifikasi token dan masukkan data ke req.user
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
        next(); // Melanjutkan ke fungsi berikutnya
    } catch (err) {
        res.status(400).json({ message: 'Invalid token' });
    }
};


const login = async (no_identitas, password) => {
    console.log(`Attempting to find user with no_identitas: ${no_identitas}`);
    const user = await getUserbyId(no_identitas);
    if (!user) {
        console.error(`User not found for no_identitas: ${no_identitas}`);
        throw new Error('User not found');
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        console.error(`Invalid password for user with no_identitas: ${no_identitas}`);
        throw new Error('Invalid password');
    }
    const token = jwt.sign(
        {
            userId: user.id,
            no_identitas: user.no_identitas,
            email: user.email,
            role: user.role
        },
        process.env.TOKEN_SECRET,
        { expiresIn: '1h' }
    );
    return token;
}


const verifyToken = async (token) => {
    try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
        if (!decoded.no_identitas) {
            console.error('Invalid token payload: no_identitas is missing');
            throw new Error('Invalid token payload: no_identitas is missing');
        }
        console.log(`Attempting to find user with no_identitas: ${decoded.no_identitas}`);
        const user = await getUserbyId(decoded.no_identitas);

        if (!user) {
            console.error(`User not found for no_identitas: ${decoded.no_identitas}`);
            throw new Error('User not found');
        }

        return user;
    } catch (err) {
        console.error('Invalid token');
        throw new Error('Invalid token');
    }
}


module.exports = {
    authenticateToken, login, verifyToken
}
