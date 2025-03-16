const { Router } = require("express");
const ProductManager = require("../dao/ProductManager.js");
const CartManager = require("../dao/CartManager.js");

const router = Router();

const productManager = new ProductManager();
const cartManager = new CartManager();

router.get("/realTimeProducts", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("realTimeProducts", { products });
});

router.get("/productsCart", async (req, res) => {
	const products = await cartManager.getCart();
	const totalPrice = products.reduce((acc, product) => acc + product.price, 0);
	res.render("cartProducts", { products, totalPrice });
});

router.get("/product/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.getProductById(parseInt(id));
	res.render("product", { product });
});

router.get("/form", async (req, res) => {
	res.render("form");
});

module.exports = router;
