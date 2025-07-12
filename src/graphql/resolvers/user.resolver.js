import User from "../../models /user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
	Query: {
		users: async (_, { page }, _context) => {
			const skipContent = 10 * (page - 1);
			return await User.find().skip(skipContent).limit(10);
		},
	},
	Mutation: {
		updatePassword: async (_, { password, prevPassword }, context) => {
			try {
				const { userId } = context;
				if (!userId) throw new Error("user id not found");
				const user = await User.findById(userId).select("+password");
				if (!user) throw new Error("User not exists");
				const isMatched = await bcrypt.compare(
					prevPassword,
					user.password
				);
				if (!isMatched) throw new Error("Password is not correct");
				user.password = await bcrypt.hash(password, 10);
				await user.save();
				return user;
			} catch (error) {
				if (error instanceof Error) throw new Error(error.message);
				else throw new Error("Update password not successful");
			}
		},
	},
};
export default userResolver;
