const Router = require("express").Router;
const ProductManager = require("../dao/ProductManager.js");
const ruteFile = "./data/products.json";

productManager = new ProductManager(ruteFile);

const router = Router();

router.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.send(products);
	} catch (error) {
		res.status(404).send(error.message);
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.getProductsById(parseInt(id));
	if (product) {
		res.send(product);
	} else {
		res.status(404).send("Product not found");
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.removeProductsById(parseInt(id));
	res.send(product);
});

router.get("/total", (req, res) => {
	const total = productManager.getTotal();
	res.send({ total });
});

module.exports = router;
