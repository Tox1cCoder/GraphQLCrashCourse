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
    },
    Game: {
        reviews(parent) {
            return db.reviews.filter((r) => r.game_id === parent.id)
        }
    },
    Author: {
        reviews(parent) {
            return db.reviews.filter((r) => r.author_id === parent.id)
        }
    },
    Review: {
        author(parent) {
            return db.authors.filter((a) => a.id === parent.author_id)
        },
        game(parent) {
            return db.games.filter((g) => g.id === parent.game_id)
        }
    },
    Muation: {
        addGame(_, args) {
            let game = {
                ...args.game,
                id: Math.floor(Math.random * 10000).toString()
            }
            db.games.push(game)

            return game
        },
        deleteGame(_, args) {
            db.games = db.games.filter((g) => g.id !== args.id)

            return db.games
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