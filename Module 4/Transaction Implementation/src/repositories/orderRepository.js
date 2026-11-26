const prisma = require('../db/prisma');
async function placeOrder(productId, amount) {
  return prisma.$transaction(async (tx) => {
    const product = await tx.product.findUnique({ where: { id: productId } });
    if (!product) { const error = new Error('Product not found'); error.statusCode = 404; throw error; }
    if (product.stock < amount) { const error = new Error('Insufficient stock'); error.statusCode = 409; throw error; }
    const order = await tx.order.create({ data: { productId, amount } });
    const updatedProduct = await tx.product.update({ where: { id: productId }, data: { stock: { decrement: amount } } });
    return { order, stock: updatedProduct.stock };
  });
}
module.exports = { placeOrder };
