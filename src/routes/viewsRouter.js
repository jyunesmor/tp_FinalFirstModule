const { Router } = require("express");
const ProductManager = require("../dao/ProductManager.js");

const router = Router();

const productManager = new ProductManager();

router.get("/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("products", { products });
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
