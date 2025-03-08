const validateProducts = (err, req, res, next) => {
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
		return res.status(206).json({ message: console.error(err) });
	}
	next();
};

module.exports = { validateProducts };
