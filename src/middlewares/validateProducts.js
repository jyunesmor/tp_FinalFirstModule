function validateProducts(req, res, next) {
	const {
		title,
		description,
		code,
		price,
		status,
		stock,
		category,
		thumbnails,
	} = req.body;
	if (
		!title ||
		!description ||
		!code ||
		!price ||
		!status ||
		!stock ||
		!category ||
		!thumbnails
	) {
		return res.status(206).json({ message: "Todos los Campos son requeridos" });
	}
	next();
}

module.exports = validateProducts;
