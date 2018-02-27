/*
    Challenge 1: Add a query to the GraphQL server to return an array of users
    Challenge 2: Return cats for each individual user
*/

const cors = require('cors');
const express = require('express');
const graphqlHTTP = require('express-graphql');
const { buildSchema } = require('graphql');

const users = [
    { id: 1, age: 32, name: 'Leeroy Jenkins'}, 
    { id: 2, age: 25, name: 'Aaron Rumery'}
];
const cats = [
    { name: 'Tim', age: 2, userId: 1 }, 
    { name: 'Sam', age: 6, userId: 2 },
    { name: 'Edward', age: 1, userId: 2 },
    { name: 'Sarah', age: 9, userId: 1 }
];
class User {
    constructor({ id, age, name}) {
        this.id = id;
        this.age = age;
        this.name = name;
    }
};

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
  type user {
    id: ID
    name: String
    age: Int
  }

  type Query {
    hello: String
    users: [user]
  }
`);

// The root provides a resolver function for each API endpoint
const root = {
  hello: () => {
    return 'Hello world!';
  }
}


const app = express();
app.use(cors());
app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));
app.listen(8080);
console.log('Running a GraphQL API server at localhost:8080/graphql');