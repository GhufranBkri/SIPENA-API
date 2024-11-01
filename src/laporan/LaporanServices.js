const { findLaporans, findLaporanById, insertLaporan, findLaporanByName, deleteLaporan, editModel } = require('./Laporanrepository');

const getAllLaporan = async () => {
    const laporans = await findLaporans();
    return laporans;
};

const getLaporanById = async (id) => {
    const modelData = await findLaporanById(id);
    if (!modelData) {
        throw new Error("Laporan not found");
    }
    return modelData;
};

const createLaporan = async (newModel) => {
    const existingModel = await findLaporanByName(newModel.name);
    if (existingModel) {
        throw new Error("Laporan already exists");
    }
    const laporan = await insertLaporan(newModel);
    return laporan;
};

const deleteLaporanById = async (id) => {
    await getLaporanById(id);
    await deleteLaporan(id);
};

const editLaporanById = async (id, modelData) => {
    await getLaporanById(id);
    const laporan = await editModel(id, modelData);
    return laporan;
};

module.exports = {
    getAllLaporan,
    getLaporanById,
    createLaporan,
    deleteLaporanById,
    editLaporanById
};
