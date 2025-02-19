const express = require("express");
const productManagerRouter = require("./routes/productsManagerRouter.js");

const app = express();

const PORT = 8080;

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/products", productManagerRouter);
