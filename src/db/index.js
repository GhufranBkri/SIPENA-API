const { PrismaClient } = require('@prisma/client');
const dotenv = require('dotenv');

dotenv.config();

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.POSTGRES_PRISMA_URL,
        },
    },
});

const connectDB = async () => {
    try {
        await prisma.$connect();
        console.log('Connected to the database');
    } catch (error) {
        console.error('Failed to connect to the database', error);
        process.exit(1);
    }
};

module.exports = {
    prisma,
    connectDB,
};