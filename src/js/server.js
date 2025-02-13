const express = require("express");
const fs = require("fs");

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.get("/products", (req, res) => {
	const data = JSON.parse(fs.readFileSync("./data/products.json", "utf8"));
	res.send(data);
});
