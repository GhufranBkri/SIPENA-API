const { findProducts, findProductsById, insertProduct, findProductsByName, deleteProduct, editProduct } = require('./productRepository');

const getAllProducts = async () => {
    const products = await findProducts;


    return products;
}

const getProductbyId = async (id) => {
    const productData = await findProductsById(id);
    if (!productData) {
        throw new Error("Product not found")
    }
    return productData
}

const createProduct = async (newProduct) => {
    const findProduct = await findProductsByName(newProduct.name);
    if (findProduct) {
        throw new Error("Product already exist")
    }
    const product = await insertProduct(newProduct);
    return product;
}

const deleteProductbyId = async (id) => {
    await getProductbyId(id);

    await deleteProduct(id);
}

const editProductById = async (id, productData) => {
    await getProductbyId
    const product = await editProduct(id, productData);
    return product;
}



module.exports = {
    getAllProducts,
    getProductbyId,
    createProduct,
    deleteProductbyId,
    editProductById
}