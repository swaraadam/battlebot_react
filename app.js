const express = require('express')
const bodyParser = require('body-parser')
const graphqlHttp = require('express-graphql')
const {buildSchema} = require('graphql')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const graphQlSchema = require('./graphql/schema/index')
const graphQlResolvers = require('./graphql/resolvers/index')
const isAuth = require('./middleware/is-auth')

const app = express()
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS')
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200)
    }
    next()
  })
  
app.use(isAuth)

app.use(
    '/graphql',
    graphqlHttp({
      schema: graphQlSchema,
      rootValue: graphQlResolvers,
      graphiql: true
    })
)

mongoose.connect("mongodb+srv://swaraadam:3McNOBElhQNeeH77@battlebot-3l6rw.mongodb.net/test?retryWrites=true&w=majority").then(()=>{
    app.listen(212)
}).catch(err => {
    console.log(err)
})