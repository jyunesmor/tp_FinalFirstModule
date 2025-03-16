const { Router } = require("express");
const CartManager = require("../dao/CartManager");

const cartManager = new CartManager();

const router = Router();

// Ruta para Obrtener Productos de base de datos
router.get("/", async (req, res) => {
	try {
		// Obtencion de productos de base de datos.
		const products = await cartManager.getCart();
		res.status(202).send(products);
	} catch (error) {
		res.status(404).json({
			message: "Producto no encontrado",
			error: error.message,
		});
	}
});

// Ruta para Creacion Producto en base de datos
router.post("/addCart/:id", async (req, res) => {
	try {
		// Agregar Producto a Carrito.
		const newCart = await cartManager.addProductToCart(parseInt(req.params.id));
		req.io.emit("newCart", newCart);
		res.status(201);
	} catch (error) {
		res.status(500).json({
			message: "Internal server error",
			error: error.message,
		});
	}
});

module.exports = router;
