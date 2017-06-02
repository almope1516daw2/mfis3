import User from "./Models/UserSchema.es6";

import {
    GraphQLID,
    GraphQLInterfaceType,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLString
} from "graphql";

import {mutationWithClientMutationId} from "graphql-relay";


let Node = new GraphQLInterfaceType({
    name: 'Node',
    description: 'An object with an ID',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'The global unique ID of an object'
        },
        type: {
            type: new GraphQLNonNull(GraphQLString),
            description: "The type of the object"
        }
    }),
    resolveType: (obj) => {
        if (obj.type === 'user') {
            return userType;
        }
    }
});


let userType = new GraphQLObjectType({
    name: 'User',
    description: 'A user',
    fields: () => ({
        id: {
            type: new GraphQLNonNull(GraphQLID)
        },
        name: {
            type: GraphQLString
        },
        surname: {
            type: GraphQLString
        },
        mail: {
            type: GraphQLString
        },
        image: {
            type: GraphQLString
        },
        salt: {
            type: GraphQLString
        },
        hash: {
            type: GraphQLString
        },
        type: {
            type: new GraphQLNonNull(GraphQLString)
        }
    }),
    interfaces: [Node]
});

let nodeField = {
    name: 'Node',
    type: Node,
    description: 'A node interface field',
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: 'Id of node interface'
        }
    },
    resolve: (obj, {id}) => {
        return User.getUserById(obj, {id: id})
            .then((user) => {
                return user;
            });
    }
};

let userQueries = {
    users: {
        type: new GraphQLList(userType),
        name: 'users',
        description: 'A user list',
        resolve: User.getListOfUsers
    },
    user: {
        type: userType,
        args: {
            id: {
                type: GraphQLID
            }
        },
        resolve: (root, {id}) => {
            return User.getUserById(id)
        }
    }
};


let addRegisterMutation = mutationWithClientMutationId({
    name: 'AddRegister',
    inputFields: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        surname: {type: new GraphQLNonNull(GraphQLString)},
        mail: {type: new GraphQLNonNull(GraphQLString)},
        image: {type: new GraphQLNonNull(GraphQLString)},
        salt: {type: GraphQLString},
        hash: {type: GraphQLString}
    },
    outputFields: {
        user: {
            type: userType,
            resolve: ({id}) => {

                return User.getUserById(id)
            }
        }
    },
    mutateAndGetPayload: User.addRegister
});


let searchLoginMutation = mutationWithClientMutationId({
    name: 'SearchLogin',
    inputFields: {
        mail: {type: new GraphQLNonNull(GraphQLString)},
        password: {type: GraphQLString}
    },
    outputFields: {
        user: {
            type: userType,
            resolve: ({mail, password}) => {
                User.searchLogin(mail, password)
            }
        }
    },
    mutateAndGetPayload: User.searchLogin
});

let RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        user: userQueries.user,
        users: userQueries.users,
        node: nodeField
    })
});


let RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: () => ({
        addRegister: addRegisterMutation,
        searchLogin: searchLoginMutation,
    })
});


let schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation
});

export default schema;