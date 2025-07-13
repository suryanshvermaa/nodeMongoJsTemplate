import express from "express";
import "dotenv/config";
import router from "./routes/index.js";
import cors from "cors";
import errorHandler from "./middlewares/error.middleware.js";
import response from "./utils/response.js";
import apolloServer from "./config/apollo.js";
import { expressMiddleware } from "@as-integrations/express5";
import graphqlContext from "./graphql/auth/context.js";
import asyncHandler from "./utils/asyncHandler.js";

const app = express();

/**
 * @description Middlewares
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", router);

/**
 *
 * @description health route
 * @route POST /health
 * @access Public
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 */
export const createUser = asyncHandler(async (req, res) => {
	response(res, 200, "healthy route!", { state: "healthy" });
});

/**
 * @description apolloServer setup
 */
const startApolloServer = async () => {
	await apolloServer.start();
	app.use(
		"/graphql",
		expressMiddleware(apolloServer, {
			context: graphqlContext,
		})
	);
};
startApolloServer();
/**
 * @description Error handling middleware
 * @route *
 */
app.use(errorHandler);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log("server is running on port", port);
});
