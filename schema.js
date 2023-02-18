const { gql } = require('apollo-server-express');

exports.typeDefs = gql `
    type Employee {
        id: ID!
        firstname: String!
        lastname: String!
        email: String!
        gender: String!
        salary: Float!
    }
    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getUser(username: String!, password: String!): User
        getEmployees: [Employee]
        getEmployeeByID(id: ID!): Employee
        getEmployeeByGender(gender: String!): [Employee]
    }

    type Mutation {
        addEmployee(firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee

        updateEmployee(id: String!
            firstname: String!
            lastname: String!
            email: String!
            gender: String!
            salary: Float!): Employee
        
        deleteEmployee(id: String!): Employee

        signup(username: String!
            email: String!
            password: String!): User

        
    }
`