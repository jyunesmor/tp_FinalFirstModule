const fs = require("fs");

class CartManager {
	products = [];
	path = "./data/cart.json";
	pathProducts = "./data/products.json";

	constructor() {}

	//	Agregar Producto al Carrito

	async addProductToCart(id) {
		console.log(id);

		// Agregar producto al carrito
		const productsJson = await fs.promises.readFile(this.pathProducts, "utf8");
		const product = JSON.parse(productsJson);

		// filtrar productos por id
		const productById = product.find((product) => product.id === id);

		this.products.push(productById);

		// re-escribir el archivo cart.json
		await fs.promises.writeFile(
			this.path,
			JSON.stringify(this.products, null, 2)
		);
		return product;
	}

	//	Obtener Productos del Carrito

	async getCart() {
		if (fs.existsSync(this.path)) {
			return JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		} else {
			return [];
		}
	}

	// Eliminar carrito

	async removeCart() {
		this.products = [];
		await fs.promises.unlink(this.path);
	}
}

const readFile = async () => {
	try {
		if (fs.existsSync(this.pathProducts)) {
			const fileContent = await fs.promises.readFile(this.pathProducts, "utf8");
			this.products = JSON.parse(fileContent);
			return this.products;
		}
	} catch (error) {
		console.log("Error reading file", error);
	}
};

module.exports = CartManager;
