class ProductManager {
	constructor(products = []) {
		this.products = [...products];
	}

	// Add product and id generated to the Cart

	addProduct(product) {
		product.id = generateId(this.products);
		this.products.push(product);
	}

	//	get all products

	getProducts() {
		return this.products;
	}

	// get a product by id

	getProductsById(id) {
		return this.products.find((product) => product.id === id);
	}

	// remove a product by id

	removeProductsById(id) {
		this.products = this.products.filter((product) => product.id !== id);
		return this.products;
	}

	// method to get the total price of all products in the cart

	getTotal() {
		return this.products.reduce((acc, product) => acc + product.price, 0);
	}
}

// Function to generate an id  autoincremental for a product

function generateId(product) {
	let id = 1;
	if (product.length > 0) {
		const lastProduct = product[product.length - 1];
		id = lastProduct.id + 1;
	}
	return id;
}

module.exports = ProductManager;
