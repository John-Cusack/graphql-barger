const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser')
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
app.use('/graphiql', graphiqlExpress({endpointURL: '/graphql'}))
//connect schemas with GraphQL
app.use('/graphql',
bodyParser.json(),
graphqlExpress({
    schema,
    context: {
        Recipe,
        User
    }
}))
const PORT = process.env.PORT || 4444

app.listen(PORT, ()=> {
    console.log(`Server listening on ${PORT}`)
})