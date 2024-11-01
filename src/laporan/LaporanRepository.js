const prisma = require('../db');

const findlaporans = async () => {
    const laporans = await prisma.laporan.findMany();
    return laporans;
};

const findlaporanById = async (id) => {
    const laporan = await prisma.laporan.findUnique({
        where: {
            id,
        }
    });
    return laporan;
};

const insertlaporan = async (modelData) => {
    const laporan = await prisma.laporan.create({
        data: modelData
    });
    return laporan;
};

const findlaporanByName = async (name) => {
    const laporan = await prisma.laporan.findFirst({
        where: {
            name,
        }
    });
    return laporan;
};

const deletelaporan = async (id) => {
    await prisma.laporan.delete({
        where: {
            id,
        }
    });
};

const editModel = async (id, modelData) => {
    const laporan = await prisma.laporan.update({
        where: {
            id: id
        },
        data: modelData
    });
    return laporan;
};

module.exports = {
    findlaporans,
    findlaporanById,
    insertlaporan,
    findlaporanByName,
    deletelaporan,
    editModel
};
