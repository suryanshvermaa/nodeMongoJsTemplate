const userSchema = `#graphql
type User{
    _id: String!
    name: String
    email: String
    create_at: String
}

type Query{
    users(page:Int!):[User]
}

type Mutation{
    updatePassword(password: String!,prevPassword:String!): User
}
`;

export default userSchema;
