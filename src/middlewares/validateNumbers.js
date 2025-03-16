const validateNumbers = (req, res, next) => {
	const { price, stock } = req.body;

	const numPrice = Number(price);
	const numStock = Number(stock);

	// Validar price
	if (isNaN(numPrice)) {
		return res
			.status(400)
			.json({ error: "El precio debe ser un número válido" });
	}

	// Validar stock
	if (isNaN(numStock)) {
		return res
			.status(400)
			.json({ error: "El stock debe ser un número válido" });
	}

	// Si todo es válido, reemplazar los valores string por números en el request
	req.body.price = numPrice;
	req.body.stock = numStock;

	next();
};

module.exports = { validateNumbers };
