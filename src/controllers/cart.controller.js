import { cartService } from "../dao/index.js";

const insertProductToCart = async (req, res) => {
    const user = req.user;
    const productId = req.params.vid;
    const cart = await cartService.getCartById(user.cart); // TENGO UN PROBLEMA CON ESTA LINEA
    const exists = cart.products.find(product => product._id.toString() === productId);
    if (exists) return res.status(400).send({ status: 'error', error: "Game already exist" });
    cart.products.push({ _id: productId });
    await cartService.updateCart(cart._id, { products: cart.products });
    res.redirect('/cart');
};

export default {
    insertProductToCart
};