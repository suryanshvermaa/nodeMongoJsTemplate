import { ApolloServer } from "@apollo/server";
import graphQlError from "../graphql/auth/error.js";
import userSchema from "../graphql/schemas/user.schema.js";
import userResolver from "../graphql/resolvers/user.resolver.js";

const apolloServer = new ApolloServer({
	typeDefs: [userSchema],
	resolvers: [userResolver],
	formatError: graphQlError,
});

export default apolloServer;
