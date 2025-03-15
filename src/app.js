const express = require("express");
const productRouter = require("./routes/productRouter.js");
const viewsRouter = require("./routes/viewsRouter.js");
const cartRouter = require("./routes/cartRouter.js");
const { Server } = require("socket.io");
const { engine } = require("express-handlebars");

let io = undefined;

const PORT = 8080;

const app = express();

//Setting up the server
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("./src/public"));
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

// Routes
app.use(
	"/api/products",
	(req, res, next) => {
		req.io = io;
		next();
	},
	productRouter
);
app.use("/", viewsRouter);
app.use(
	"/cart",
	(req, res, next) => {
		req.io = io;
		next();
	},
	cartRouter
);

app.get("/", (req, res) => {
	res.setHeader("content-type", "text/plain");
	res.status(200).send("Server is running");
});

const serverHttp = app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});

io = new Server(serverHttp);
