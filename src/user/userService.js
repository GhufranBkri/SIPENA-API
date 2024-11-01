const { findUsers, insertUser, findUsersByUniq } = require('./userRepository');
const { hashPassword } = require('../utility/encodePassword');

const getAllUsers = async () => {
    const users = await findUsers();
    return users;
}

const createUser = async (userData) => {
    const findUser = await findUsersByUniq(userData.no_identitas);
    if (findUser) {
        throw new Error("User already exist")
    }

    const password = userData.password; // hash password here
    userData.password = await hashPassword(password);
    const user = await insertUser(userData);


    return user;
}

const getUserbyId = async (id) => {
    const UserData = await findUsersByUniq(id);
    if (!UserData) {
        throw new Error("user not found");
    }
    return UserData;
};
module.exports = {
    getAllUsers,
    createUser,
    getUserbyId
}

