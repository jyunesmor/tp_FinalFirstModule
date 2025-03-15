const { Router } = require("express");
const ProductManager = require("../dao/ProductManager.js");
const { validateProducts } = require("../middlewares/validateProducts.js");
const { validateNumbers } = require("../middlewares/validateNumbers.js");

const productManager = new ProductManager();

const router = Router();

// Ruta para Obrtener Productos de base de datos
router.get("/", async (req, res) => {
	try {
		// Obtencion de productos de base de datos.
		const products = await productManager.getProducts();
		res.status(202).send(products);
	} catch (error) {
		res.status(404).json({
			message: "Producto no encontrado",
			error: error.message,
		});
	}
});

// Ruta para Obrtener Producto por ID
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	// Obtencion de producto por su ID de base de datos.
	const product = await productManager.getProductById(parseInt(id));
	if (product) {
		res.status(202).send(product);
	} else {
		res
			.status(404)
			.send(`El producto con el id: ${id} no se encuentra en la base de datos`);
	}
});

// Ruta para Creacion Producto en base de datos
router.post("/", validateProducts, validateNumbers, async (req, res) => {
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
		// Creacion automatica del Id, teniendo en cuenta el ultimo id de la base de datos.
		const id = await generateId();
		// Creacion de producto y persistencia en base de datos.
		const newProduct = await productManager.addProduct({
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

		req.io.emit("newProduct", newProduct);
		res.status(201);
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
});

// Ruta para Modificacion Producto por ID
router.put("/:id", validateNumbers, async (req, res) => {
	try {
		const body = req.body;
		const { id } = req.params;
		// Actualizacion de producto y persistencia en base de datos.
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

// Ruta para Eliminar Producto por ID
router.delete("/:id", async (req, res) => {
	try {
		const { id } = req.params;
		// Remocion del producto y persistencia en base de datos.
		const deleteProduct = await productManager.removeProductsById(id);
		req.io.emit("deleteProduct", deleteProduct);
		res.status(201).send("Producto eliminado exitosamente");
	} catch (error) {
		res.status(500).json({
			message: "Error interno del servidor",
			error: error.message,
		});
	}
});

// Función para Generacion de ID Automatico.

const generateId = async () => {
	let id = 1;
	// Obtencion de productos de base de datos.
	const products = await productManager.getProducts();
	if (products.length > 0) {
		// Obtencion del ultimo producto de base de datos.
		const lastProduct = products[products.length - 1];
		// Obtencion del ultimo id de base de datos y agrega 1.
		id = lastProduct.id + 1;
		return id;
	}
	return id;
};

module.exports = router;
