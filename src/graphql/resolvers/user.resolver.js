import prisma from "../../config/db.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Query: {
		users: async (_, { page }, _context) => {
			const skipContent = 10 * (page - 1);
			return await prisma.user.findMany({
				skip: skipContent,
				take: 10,
			});
		},
	},
	Mutation: {
		updatePassword: async (_, { password, prevPassword }, context) => {
			try {
				const { userId } = context;
				if (!userId) throw new Error("user id not found");
				const user = await prisma.user.findUnique({
					where: {
						id: userId,
					},
				});
				if (!user) throw new Error("User not exists");
				const isMatched = await bcrypt.compare(
					prevPassword,
					user.password
				);
				if (!isMatched) throw new Error("Password is not correct");
				const newUser = await prisma.user.update({
					where: {
						id: userId,
					},
					data: {
						password: await bcrypt.hash(password, 10),
					},
				});
				return newUser;
			} catch (error) {
				if (error instanceof Error) throw new Error(error.message);
				else throw new Error("Update password not successful");
			}
		},
	},
};
export default userResolver;
