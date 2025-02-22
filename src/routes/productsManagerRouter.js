const Router = require("express").Router;
const ProductManager = require("../dao/ProductManager.js");
const ruteFile = "./data/products.json";
const { validateProducts } = require("../middlewares/validateProducts.js");
const { validateNumbers } = require("../middlewares/validateNumbers.js");

const productManager = new ProductManager(ruteFile);

const router = Router();

router.get("/", async (req, res) => {
	try {
		const products = await productManager.getProducts();
		res.status(202).send(products);
	} catch (error) {
		res.status(404).json({
			message: "Producto no encontrado",
			error: error.message,
		});
	}
});

router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.getProductById(parseInt(id));
	if (product) {
		res.status(202).send(product);
	} else {
		res
			.status(404)
			.send(`El producto con el id: ${id} no se encuentra en la base de datos`);
	}
});

router.post("/", async (req, res) => {
	try {
		const {
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnails,
		} = req.body;
		const id = await generateId();
		// Create new product object
		await productManager.addProduct({
			id,
			title,
			description,
			code,
			price,
			status,
			stock,
			category,
			thumbnails,
		});

		res.status(201).send("Producto creado exitosamente");
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
});

router.put("/:id", async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;
		await productManager.updateProduct(id, body);

		res.status(201).json({
			message: "Producto Actualizado Exitosamente",
		});
	} catch (error) {
		res.status(304).json({
			message: "Producto no Actualizado",
			error: error.message,
		});
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		await productManager.removeProductsById(id);
		res.status(201).send("Producto eliminado exitosamente");
	} catch {
		res.status(500).json({
			message: "Error interno del servidor",
			error: error.message,
		});
	}
});

const generateId = async () => {
	let id = 1;
	const products = await productManager.getProducts();
	if (products.length > 0) {
		const lastProduct = products[products.length - 1];
		id = lastProduct.id + 1;
		return id;
	}
	return id;
};

module.exports = router;
