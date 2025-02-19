const fs = require("fs");

class ProductManager {
	constructor(ruteFile) {
		this.path = ruteFile;
	}

	// Add product and id generated to the Cart

	addProduct(product) {}

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

	async getProductsById(id) {
		const products = JSON.parse(await fs.promises.readFile(this.path, "utf8"));
		return products.products.find((product) => product.id === id);
	}

	// remove a product by id

	async removeProductsById(id) {
		const product = await this.getProductsById(id);
		console.log(product);
		return product;
	}

	// method to get the total price of all products in the cart

	getTotal() {}
}

module.exports = ProductManager;
