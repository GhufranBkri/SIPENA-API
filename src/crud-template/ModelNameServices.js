const { findModelNames, findModelNameById, insertModelName, findModelNameByName, deleteModelName, editModel } = require('./ModelNameRepository');

const getAllModelName = async () => {
    const modelNames = await findModelNames();
    return modelNames;
};

const getModelNameById = async (id) => {
    const modelData = await findModelNameById(id);
    if (!modelData) {
        throw new Error("ModelName not found");
    }
    return modelData;
};

const createModelName = async (newModel) => {
    const existingModel = await findModelNameByName(newModel.name);
    if (existingModel) {
        throw new Error("ModelName already exists");
    }
    const modelName = await insertModelName(newModel);
    return modelName;
};

const deleteModelNameById = async (id) => {
    await getModelNameById(id);
    await deleteModelName(id);
};

const editModelNameById = async (id, modelData) => {
    await getModelNameById(id);
    const modelName = await editModel(id, modelData);
    return modelName;
};

module.exports = {
    getAllModelName,
    getModelNameById,
    createModelName,
    deleteModelNameById,
    editModelNameById
};
