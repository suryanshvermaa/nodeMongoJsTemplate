import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import dbConnect from "./utils/db.js";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import response from "./utils/response.js";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

//db connection
dbConnect().catch(() => {
	process.exit(1);
});

//health route
app.get("/health", (req, res, next) => {
	try {
		response(res,200,"healthy",{});
	} catch (err) {
		next(err);
	}
});
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running on port", port);
});
