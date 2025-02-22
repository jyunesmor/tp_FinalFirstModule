const fs = require("fs");
const Product = require("./Product");

const p = new Product();

class ProductManager {
	constructor(ruteFile) {
		this.path = ruteFile;
	}

	async addProduct(product) {
		if (!product) {
			throw new Error("Product is required");
		}
		let products = [];
		// Read existing products if file exists
		if (fs.existsSync(this.path)) {
			const fileContent = await fs.promises.readFile(this.path, "utf8");
			products = JSON.parse(fileContent);
		}
		// Add new product
		products.push(product);
		// Write back to file
		await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
		return product;
	}

	//	get all products

	async getProducts() {
		if (fs.existsSync(this.path)) {
			return JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		} else {
			/* throw new Error(`The file ${this.path} does not exist`); */
			return [];
		}
	}

	// get a product by id

	async getProductById(id) {
		const products = JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		return products.find((product) => product.id === id);
	}

	// get a product by id

	async updateProduct(id, body) {
		const fileContent = await fs.promises.readFile(this.path, "utf8");
		const products = JSON.parse(fileContent);
		const productIndex = products.findIndex(
			(product) => product.id === parseInt(id)
		);

		products[productIndex] = { ...products[productIndex], ...body };
		await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
		return products;
	}

	// remove a product by id

	async removeProductsById(id) {
		const fileContent = await fs.promises.readFile(this.path, "utf8");
		const products = JSON.parse(fileContent);
		const productIndex = products.findIndex(
			(product) => product.id === parseInt(id)
		);
		products.splice(productIndex, 1);
		await fs.promises.writeFile(this.path, JSON.stringify(products, null, 4));
	}
}

module.exports = ProductManager;
