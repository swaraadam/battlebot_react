const {buildSchema} = require('graphql')

module.exports = buildSchema(`
    type User{
        _id: ID!
        email: String!
        password: String
        point: Int
        createdTank: [Tank!]
    }

    type Tank{
        _id: ID!
        name: String!
        logic: String!
        creator: User!
        followingMatch: [Match!]
    }

    type Match{
        _id: ID!
        date: String!
        winner: User!
        loser: User!
    }
    
    type AuthData{
        userId: ID!
        token: String!
        tokenExpiration: Int!
    }

    input UserInput{
        email: String!
        password: String!
    }

    input TankInput{
        name: String!
        logic: String!
    }

    input MatchInput{
        date: String!
        tankId: String!
        winner: String!
        loser: String!
    }

    type RootQuery{
        users: [User!]!
        tanks: [Tank!]!
        match: [Match!]!
        login(email: String!, password: String!): AuthData!
    }

    type RootMutation{
        createTank(tankInput: TankInput): Tank
        createUser(userInput: UserInput): User
        createMatch(matchInput: MatchInput): Match
    }

    schema{
        query: RootQuery
        mutation: RootMutation
    }
    
`)