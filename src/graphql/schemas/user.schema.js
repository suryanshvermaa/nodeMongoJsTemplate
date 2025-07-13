const userSchema = `#graphql
type User{
    id: String!
    name: String
    email: String
    createAt: String
}

type Query{
    users(page:Int!):[User]
}

type Mutation{
    updatePassword(password: String!,prevPassword:String!): User
}
`;

export default userSchema;
