const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10); // Hash password
};

module.exports = hashPassword; // Ekspor fungsi
