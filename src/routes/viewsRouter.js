const { Router } = require("express");
const ProductManager = require("../dao/ProductManager.js");

const router = Router();

const productManager = new ProductManager();

router.get("/products", async (req, res) => {
	const products = await productManager.getProducts();
	res.render("products", { products });
});

module.exports = router;
