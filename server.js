const express = require('express');
const graphqlHTTP = require('express-graphql');
const { GraphQLSchema } = require('graphql');
const query = require('./models/RootQuery');
const path = require('path');

const production_env = process.env.NODE_ENV === 'production' ? true : false;

const app = express();

if (!production_env) {
    const cors = require('cors');
    app.use(cors());
}

app.use('/graphql', graphqlHTTP({
    schema: new GraphQLSchema({ query }),
    graphiql: production_env ? false : true
}))

if (production_env) {
    app.use(express.static('public'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(production_env ?
        `>>> Server started on port ${PORT}` :
        `>>> GraphQL @ http://localhost:${PORT}/graphql`);
});