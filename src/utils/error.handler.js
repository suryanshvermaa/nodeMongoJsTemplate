import { AppError } from "./error.js";

const errorHandler = (err, req, res, _next) => {
	const statusCode = err instanceof AppError ? err.statusCode : 500;
	res.status(statusCode).json({
		success: false,
		message: err.message || "Internal Server Error",
	});
};

export default errorHandler;
