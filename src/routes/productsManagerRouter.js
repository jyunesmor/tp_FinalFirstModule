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

router.post("/", async (req, res) => {
	const { title, code, price, stock, thumbnails } = req.body;

	try {
		// Validate required fields
		if (!title || !code || !price || !stock || !thumbnails) {
			return res.status(400).json({
				status: "error",
				message: `All fields (${title},${price}, ${code}, ${stock}, ${thumbnails}) are required`,
			});
		}

		// Validate data types
		if (typeof price !== "number" || typeof stock !== "number") {
			return res.status(400).json({
				status: "error",
				message: "Price and stock must be numbers",
			});
		}
		const id = await generateId();
		// Create new product object
		const newProduct = await productManager.addProduct({
			id,
			code,
			title,
			price,
			stock,
			thumbnails,
		});

		// Here you would typically add your database logic
		// For example: await ProductModel.create(newProduct);

		res.status(201).json({
			status: "success",
			message: "Product created successfully",
			data: newProduct,
		});
	} catch (error) {
		res.status(500).json({
			status: "error",
			message: "Internal server error",
			error: error.message,
		});
	}
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const product = await productManager.removeProductsById(parseInt(id));
	res.send(product);
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
