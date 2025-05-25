import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import dbConnect from "./config/db.js";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import response from "./utils/response.js";

const app = express();

/**
 * @description Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

/**
 * @description connect to database
 */
dbConnect().catch(() => {
	process.exit(1);
});

/**
 * @description health check route
 * @route GET /health
 * @access public
 * @returns {object} - {status: number, message: string, data: null}
 */
app.get("/health", (req, res, next) => {
	try {
		response(res, 200, "healthy");
	} catch (err) {
		next(err);
	}
});

/**
 * @description Error handling middleware
 * @route *
 */
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running on port", port);
});
