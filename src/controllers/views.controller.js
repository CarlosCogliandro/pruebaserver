
import { cartService, productsService } from "../dao/index.js";

const productsGetAll = async (req, res) => {

    // el problema lo tengo con esto que no lee el .cart
    const cartId = req.session.user.cart;                    
    const cart = await cartService.getCartById(cartId);
    products = products.map(product => {
        const exists = cart.products.some(v => v._id.toSting() === product._id.toSting());
        return { ...product, isValidToAdd: !exists };
    });
    // ----------------------

    
    const page = req.query.page || 1;
    const pagination = await productsService.getAll({}, page);
    let products = pagination.docs;
    const paginationData = {
        hasPrevPage: pagination.hasPrevPage,
        hasNextPage: pagination.hasNextPage,
        prevPage: pagination.prevPage,
        nextPage: pagination.nextPage,
        page: pagination.page
    };

    
    res.render('home', { products, css:'styles', paginationData });
}

const createProduct = (req, res) => {
    res.render('productCreator');
};

const cart = async (req, res) => {
    const cartId = req.session.user.cart;
    const cart = await cartService.getCartById(cartId, { populate: true });
    const name = req.user.name;
    const products = cart.products.map(product => product._id);
    res.render('cart', {
        products,
        name
    })

}

// ------------------------------------------------------------------

const login = (req, res) => {
    res.render('login');
};

const register = (req, res) => {
    res.render('register');
};

const profile = (req, res) => {
    res.render('profile', { user: req.session.user });
};

const home = async (req, res) => {
    res.render('home', { user: req.session.user });
};

const chat = async (req, res, next) => {
    res.render('chat', {})
}

const logOut = (req, res) => {
    res.render('logout', { user: req.session.user });
    req.session.destroy();
    console.log('Sesion finalizada');
};

const info = (req, res) => {
    res.json({
        server: {
            name: process.title,
            nodeVersion: process.version,
            pid: process.pid,
            uptime: process.uptime(),
            memoryUsage: process.memoryUsage(),
            platform: process.platform,
            architecture: process.arch
        }
    })
};

export default {
    productsGetAll,
    createProduct,
    cart,
    login,
    register,
    profile,
    home,
    chat,
    logOut,
    info
}