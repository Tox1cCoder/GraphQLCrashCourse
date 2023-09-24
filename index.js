import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';


1// db
import db from './_db.js'

// types
import { typeDefs } from './schema.js';

const resolvers = {
    Query: {
        games() {
            return db.games
        },
        game(_, agrs) {
            return db.games.find((game) => game.id === args.id)
        },
        authors() {
            return db.authors
        },
        author(_, agrs) {
            return db.authors.find((author) => author.id === args.id)
        },
        reviews() {
            return db.reviews
        },
        review(_, agrs) {
            return db.reviews.find((review) => review.id === args.id)
        }
    }
}

// Server Setup
const server = new ApolloServer({
    typeDefs,
    resolvers
});

const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 }
})

console.log(`Server ready at ${url}`);