const { buildSchema } = require('graphql')

// defining all the types of  objects that can or will be sent/received to/from the client

module.exports = buildSchema(`
type Image{
    id: Int!
    game: Int
    height: Float
    image_id: String
    url: String
    width: Float
}

type Video{
    id: Int!
    game: Int!
    name: String
    video_id: String
}

type GenreGameMode{
    id: Int!
    slug: String
    name: String
}

type NestedGame{
    id: Int!
    cover: Int
    name: String
}
type TwitchTv{

    id: String,
    user_id: String,
    user_name: String,
    game_id: String,
    community_ids: [String],
    type: String,
    title: String,
    viewer_count: Int,
    started_at: String,
    language: String,
    thumbnail_url: String,
    tag_ids: [
        String
    ]
}


type User {
    _id: ID!
    email: String!
    username: String!
    bio: String
    image: String
    password: String
    passwordConfirmation: String
    gamesInterestedIn: [Game]
  }

type Game{
    _id: ID!
    id: Int!
    name: String!
    rating: Float
    rating_count: Int
    url: String
    summary: String!
    cover: Image
    artworks: [Image]!
    screenshots: [Image]!
    videos: [Video]!
    genres: [GenreGameMode]!
    game_modes: [GenreGameMode]!
    dlcs: [NestedGame]!
    similar_games: [NestedGame]!
    usersInterestedin: [User]
}

type SearchResult{
    id: Int!
    name: String!
    summary: String
}

type LoginData{
    userId: ID!
    token: String!
    tokenExpiration: Int! 
}


type RootQuery{
    searchGames(query: String!): [SearchResult]
    getGame(id: Int!): Game!
    getUsers(_id: ID!): User!
    login(email: String!, password: String!): LoginData!
    indexGame:[Game!]!
    popularStreamers(email: String!, password: String!): User!
}



input UserInput {
    username: String!
    password: String!
    passwordConfirmation: String!
    email: String!
    image: String
    bio: String
}



input UserInterest {
    _id: ID!
    gameId: ID!
}


type RootMutation{
    createUser(userInput: UserInput): User
    updateUserGameInterest(userInput: UserInterest): User
    removeUserGameInterest(userInput: UserInterest): User
    

}

schema{
    query: RootQuery
    mutation: RootMutation
}
`)

// createUser(userInput: { username: "sid", password: "user", email: "hello@emial", image: "https://www.telegraph.co.uk/content/dam/films/2017/03/20/bean_trans_NvBQzQNjv4BqFNieKJvd-mi0anfcfhLYGg39oWbqNtszRryLrO6EuiQ.png?imwidth=450", bio: "hello" }){
//     password
//     username
// }

// getUsers(_id: ID!): User!
// gamesInterestedIn: [ID]
