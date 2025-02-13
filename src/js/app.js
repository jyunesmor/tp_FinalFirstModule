const ProductManager = require("./ProductManager.js");
const Products = require("./Product.js");

const cart = new ProductManager();

const p1 = new Products("Carnes", 100, 1, "imagen1", 10);
const p2 = new Products("Aceite", 200, 2, "imagen2", 20);
const p3 = new Products("Leche", 300, 3, "imagen3", 30);
const p4 = new Products("Pan", 400, 4, "imagen4", 40);

cart.addProduct(p1);
cart.addProduct(p2);
cart.addProduct(p3);
cart.addProduct(p4);

const p5 = new Products("Azucar", 500, 5, "imagen5", 50);

cart.addProduct(p5);
console.log(cart.getProducts());

console.log(cart.getTotal());
