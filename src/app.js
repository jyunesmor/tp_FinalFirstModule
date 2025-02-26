const express = require("express");
const productRouter = require("./routes/productRouter.js");
const viewsRouter = require("./routes/viewsRouter.js");

const { engine } = require("express-handlebars");

const PORT = 8080;

const app = express();

//Setting up the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.engine("hbs", engine());
app.set("view engine", "hbs");
app.set("views", "./src/views");

// Routes
app.use("/api/products", productRouter);
app.use("/api/views", viewsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});
