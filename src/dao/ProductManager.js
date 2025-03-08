const fs = require("fs");

class ProductManager {
	products = [];
	path = "./data/products.json";

	constructor() {}

	async addProduct(product) {
		console.log(product);
		if (!product) {
			throw new Error("Product is required");
		}

		// Read existing products if file exists
		if (fs.existsSync(this.path)) {
			const fileContent = await fs.promises.readFile(this.path, "utf8");
			this.products = JSON.parse(fileContent);
		}
		// Add new product
		this.products.push(product);
		console.log(this.products);
		// Write back to file
		await fs.promises.writeFile(
			this.path,
			JSON.stringify(this.products, null, 4)
		);
		return product;
	}

	//	Obtener Productos de la base de datos
	async getProducts() {
		if (fs.existsSync(this.path)) {
			return JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		} else {
			/* throw new Error(`The file ${this.path} does not exist`); */
			return [];
		}
	}

	// Obtener Producto por ID de la base de datos

	async getProductById(id) {
		this.products = JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		return this.products.find((product) => product.id === id);
	}

	// Actualización de Producto por Id de la base de datos

	async updateProduct(id, body) {
		const fileContent = await fs.promises.readFile(path, "utf8");
		this.products = JSON.parse(fileContent);
		const productIndex = this.products.findIndex(
			(product) => product.id === parseInt(id)
		);

		this.products[productIndex] = { ...this.products[productIndex], ...body };
		await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
		return this.products;
	}

	// Eliminar Producto por ID de la base de datos

	async removeProductsById(id) {
		const fileContent = await fs.promises.readFile(path, "utf8");
		this.products = JSON.parse(fileContent);
		const productIndex = this.products.findIndex(
			(product) => product.id === parseInt(id)
		);
		products.splice(productIndex, 1);
		await fs.promises.writeFile(path, JSON.stringify(products, null, 4));
	}
}

module.exports = ProductManager;
