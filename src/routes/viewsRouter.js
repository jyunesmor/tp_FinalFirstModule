const { Router } = require("express");
const ProductManager = require("../dao/ProductManager.js");
const ruteFile = "../../data/products.json";

const productManager = new ProductManager(ruteFile);

const router = Router();

router.get("/products", async (req, res) => {
	/* 	const products = await productManager.getProducts();
	console.log(products); */
	res.render("products");
});

module.exports = router;
