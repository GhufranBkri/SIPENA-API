const bcrypt = require('bcrypt');

const hashPassword = async (password) => {
    return await bcrypt.hash(password, 10); // Hash berdasarkan NIP
};


module.exports = hashPassword