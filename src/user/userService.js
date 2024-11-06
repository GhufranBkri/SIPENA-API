const { findUsers, insertUser, findUsersByUniq, deletedUser } = require('./userRepository');
const hashPassword = require('../utility/encodePassword');

const getAllUsers = async () => {
    try {
        const users = await findUsers();
        return users;
    } catch (error) {
        throw new Error("Failed to retrieve users: " + error.message);
    }
};

const createUser = async (userData) => {
    try {
        // Check if user already exists
        const existingUser = await findUsersByUniq(userData.no_identitas);
        if (existingUser) {
            throw new Error("User already exists");
        }

        // Hash the password
        const password = userData.password;
        userData.password = await hashPassword(password);

        // Insert new user
        const user = await insertUser(userData);
        return user;
    } catch (error) {
        throw new Error("Failed to create user: " + error.message);
    }
};

const getUserbyId = async (id) => {
    try {
        const userData = await findUsersByUniq(id);
        if (!userData) {
            throw new Error("User not found");
        }
        return userData;
    } catch (error) {
        throw new Error("Failed to retrieve user: " + error.message);
    }
};

const deleteUserbyId = async (id) => {
    await getUserbyId(id);

    await deletedUser(id);
}

module.exports = {
    getAllUsers,
    createUser,
    getUserbyId,
    deleteUserbyId
};
