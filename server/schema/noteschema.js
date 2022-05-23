const graphql = require("graphql");
const _ = require("lodash");
const userSchema = require("../models/users");
const {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInt,
} = graphql;

const UserType = new GraphQLObjectType({
  name: "user",
  fields: () => ({
    id: { type: GraphQLID },
    username: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
    mobile: { type: GraphQLString },
  }),
});

const Muatation = new GraphQLObjectType({
  //post
  name: "Mutation",
  fields: {
    addUser: {
      type: UserType,
      args: {
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        password: { type: GraphQLString },
        mobile: { type: GraphQLString },
      },
      async resolve(parent, args) {
        var emailExists = await userSchema.findOne({ email: args.email });
        if (emailExists) {
          throw new Error("Email already exist !!!");
        }
        let users = await new userSchema({
          username: args.username,
          email: args.email,
          password: args.password,
          mobile: args.mobile,
        });

        return users.save();
      },
    },
    deleteUser: {
      type: UserType,
      args: { id: { type: GraphQLString } },
      async resolve(parent, args) {
        await userSchema.findByIdAndDelete({ _id: args.id }).exec();
        return "user dlete";
      },
    },
    updateUser: {
      type: UserType,
      args: {
        id: { type: GraphQLID },
        username: { type: GraphQLString },
        email: { type: GraphQLString },
        mobile: { type: GraphQLString },
      },
     async resolve(parent, args) {
        return await userSchema.findByIdAndUpdate(args.id, {
          id:args.id,
          username: args.username,
          email: args.email,
          mobile: args.mobile,
        });
      },
    },
  },
});

const RootQuery = new GraphQLObjectType({
  //get
  name: "RootQuery",
  fields: {
    user: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return userSchema.findById(args.id);
      },
    },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        // return books;
        return userSchema.find({});
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Muatation,
});
