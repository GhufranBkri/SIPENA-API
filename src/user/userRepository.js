const { prisma } = require('../db');

const findUsers = async () => {
    const users = await prisma.users.findMany();
    return users;
}

const insertUser = async (userData) => {
    const user = await prisma.users.create({
        data: {
            name: userData.name,
            email: userData.email,
            password: userData.password,
            role: userData.role,
            no_identitas: userData.no_identitas,
            program_studi: userData.program_studi,
        }
    });
    return user;
}

const findUsersByUniq = async (no_identitas) => {
    if (!no_identitas) {
        throw new Error('no_identitas is required');
    }

    const user = await prisma.users.findUnique({
        where: {
            no_identitas,
        }
    });
    return user;
}

const deletedUser = async (no_identitas) => {
    const user = await prisma.users.delete({
        where: {
            no_identitas,
        }
    })
}




module.exports = {
    findUsers,
    insertUser,
    findUsersByUniq,
    deletedUser,
    

};