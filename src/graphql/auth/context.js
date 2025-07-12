import { verifyToken } from "../../middlewares/auth.middleware.js";
/**
 *
 * @param {{req:import("express").Request,res:import("express").Response}} param0
 * @returns
 */
const graphqlContext = async ({ req, _res }) => {
	try {
		const token =
			req.headers["token"] || req.headers.authorization?.split(" ")[1];
		if (!token) throw new Error("Unauthorised");
		const user = await verifyToken(token);
		if (!user) throw new Error("Unauthorised");
		return user;
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		else throw new Error("Unauthorised");
	}
};
export default graphqlContext;
