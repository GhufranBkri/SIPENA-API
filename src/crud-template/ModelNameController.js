const express = require('express');
const router = express.Router();
const { getAllModelName, getModelNameById, createModelName, deleteModelNameById, editModelNameById } = require('./ModelNameServices');

router.get("/", async (req, res) => {
    const modelNames = await getAllModelName();
    res.send(modelNames);
});

router.get("/:id", async (req, res) => {
    const modelId = req.params.id;
    const modelName = await getModelNameById(modelId);
    res.send(modelName);
});

router.post("/", async (req, res) => {
    try {
        const modelData = req.body;
        const modelName = await createModelName(modelData);
        res.send({
            data: modelName,
            message: "ModelName created successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const modelId = req.params.id;
        await deleteModelNameById(modelId);
        res.status(200).send({
            message: "ModelName deleted successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

router.put("/:id", async (req, res) => {
    const modelId = req.params.id;
    const modelData = req.body;
    const modelName = await editModelNameById(modelId, modelData);
    res.send({
        data: modelName,
        message: "ModelName updated successfully"
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const modelId = req.params.id;
        const modelData = req.body;
        const modelName = await editModelNameById(modelId, modelData);
        res.send({
            data: modelName,
            message: "ModelName updated successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

module.exports = router;
