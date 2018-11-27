const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
require('dotenv').config({path: 'variables.env'})
const cors = require('cors')
const Recipe = require('./models/Recipe')
const User = require('./models/User')

const {graphqlExpress, graphiqlExpress } = require('apollo-server-express')
const {makeExecutableSchema} =  require('graphql-tools')

const {typeDefs} = require('./schema')
const {resolvers} = require('./resolvers')

const schema = makeExecutableSchema({
    typeDefs,
    resolvers
})


mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log('DB Connected'))
    .catch(err => console.error(err))

const app = express();
const corsOption = {
    origin: 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOption))
//set up jwt auth middleware
app.use(async (req, res, next) => {
    const token =req.headers['authorization']
    if (token !== "null") {
        try{
            const currentUser = jwt.verify(token, process.env.SECRET)
            req.currentUser = currentUser;
        } catch(err) {
            console.error(err)
        }
    }
    next();
})

app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
//connect schemas with GraphQL
app.use('/graphql',
bodyParser.json(),
graphqlExpress(({currentUser})=>({
    schema,
    context: {
        Recipe,
        User,
        currentUser
    }
})))
const PORT = process.env.PORT || 4444

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})