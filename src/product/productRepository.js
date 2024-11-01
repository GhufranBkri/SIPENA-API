// berkomunikasi dengan database
// boleh menggunakan query builder atau ORM

const prisma = require('../db');


const findProducts = async () => {
    const products = await prisma.product.findMany();

    return products;
}

const findProductsById = async (id) => {
    const product = await prisma.product.findUnique({
        where: {
            id,
        }
    })

    return product;
}

const insertProduct = async (productData) => {
    const product = await prisma.product.create({
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }
    })
}

const findProductsByName = async (name) => {
    const product = await prisma.product.findFirst({
        where: {
            name,
        }
    })
}

const deleteProduct = async (id) => {
    await prisma.product.delete({
        where: {
            id,
        }
    })
}

const editProduct = async (id, productData) => {
    const product = await prisma.product.update({
        where: {
            id: id
        },
        data: {
            name: productData.name,
            description: productData.description,
            price: productData.price,
            image: productData.image
        }
    })

    return product;
}
module.exports = {
    findProducts,
    findProductsById,
    insertProduct,
    findProductsByName,
    deleteProduct,
    editProduct
}

