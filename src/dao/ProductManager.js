const fs = require("fs");
const Product = require("./Product");

const p = new Product();

class ProductManager {
	constructor(ruteFile) {
		this.path = ruteFile;
	}

	// Add product and id generated to the Cart

	/* async addProduct(product) {
		if (!product) {
			throw new Error("Product is required");
		}
		const products = [];
		if (!fs.existsSync(this.path)) {
			return await fs.promises.writeFile(this.path, JSON.stringify(products));
		} else {
			
			const productsPath = JSON.parse(
				await fs.promises.readFile(this.path, "utf8")
			);
			products.push(...productsPath, product);

			return await fs.promises.writeFile(this.path, JSON.stringify(products));
		}
	}*/

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
		await fs.promises.writeFile(this.path, JSON.stringify(products));
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
