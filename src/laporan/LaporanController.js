const express = require('express');
const router = express.Router();
const { getAllLaporan, getLaporanById, createLaporan, deleteLaporanById, editLaporanById } = require('./laporanServices');

router.get("/", async (req, res) => {
    const laporans = await getAllLaporan();
    res.send(laporans);
});

router.get("/:id", async (req, res) => {
    const modelId = req.params.id;
    const laporan = await getLaporanById(modelId);
    res.send(laporan);
});

router.post("/", async (req, res) => {
    try {
        const modelData = req.body;
        const laporan = await createLaporan(modelData);
        res.send({
            data: laporan,
            message: "Laporan created successfully"
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
        await deleteLaporanById(modelId);
        res.status(200).send({
            message: "Laporan deleted successfully"
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
    const laporan = await editLaporanById(modelId, modelData);
    res.send({
        data: laporan,
        message: "Laporan updated successfully"
    });
});

router.patch("/:id", async (req, res) => {
    try {
        const modelId = req.params.id;
        const modelData = req.body;
        const laporan = await editLaporanById(modelId, modelData);
        res.send({
            data: laporan,
            message: "Laporan updated successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});

module.exports = router;
