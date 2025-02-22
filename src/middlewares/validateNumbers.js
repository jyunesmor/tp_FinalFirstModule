function validateNumbers(req, res, next) {
	const { price, stock } = req.body;

	// Validate data types
	if (typeof price !== "number" || typeof stock !== "number") {
		return res.status(206).json({
			status: "error",
			message: "El precio y Stock deben estar ingresados en formato númerico",
		});
	}
	next();
}

module.exports = { validateNumbers };
