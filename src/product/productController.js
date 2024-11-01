// layer untuk handel req dan res
// validasi body
const express = require('express');
const router = express.Router();
const { getAllProducts, getProductbyId, createProduct, deleteProductbyId, editProductById } = require('./productServices');

router.get("/", async (req, res) => {
    const products = await getAllProducts();
    res.send(products);
})

router.get("/:id", async (req, res) => {
    const productId = req.params.id;
    const product = await getProductbyId(productId)


    res.send(product);
})

router.post("/", async (req, res) => {

    try {
        const productData = req.body;

        const product = await createProduct(productData);
        res.send({
            data: product,
            message: "Product created successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }

})

// DELETE a product by ID
router.delete("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        await deleteProductbyId(productId);
        res.status(200).send({
            message: "Product deleted successfully"
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        });
    }
});


router.put("/:id", async (req, res) => {
    const productId = req.params.id;
    const productData = req.body;

    const product = await editProductById(productId, productData);
    res.send({
        data: product,
        message: "Product updated successfully"
    })
})


router.patch("/:id", async (req, res) => {
    try {
        const productId = req.params.id;
        const productData = req.body;

        const product = await editProductById(productId, productData)
        res.send({
            data: product,
            message: "Product updated successfully"
        })
    } catch (error) {
        res.status(400).send({
            error: error.message
        })

    }

})

module.exports = router;

