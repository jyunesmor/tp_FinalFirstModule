const express = require("express");
const productManagerRouter = require("./routes/productsManagerRouter.js");

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use("/products", productManagerRouter);
