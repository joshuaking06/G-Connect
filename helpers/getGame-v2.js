const axios = require('axios')

require('dotenv').config()

// fields we will use to build our game Object, with the related query fields for each api call
const fields = {
    cover: 'cover.game, cover.height, cover.image_id, cover.url, cover.width',
    artworks: 'artworks.game, artworks.height, artworks.image_id, artworks.url, artworks.width',
    genres: 'genres.id, genres.name, genres.slug',
    platforms: 'platforms.id, platforms.abbreviation, platforms.alternative_name, platforms.name',
    game_modes: 'game_modes.name, game_modes.slug, game_modes.id',
    screenshots: 'screenshots.*',
    videos: 'videos.*',
    similar_games: 'similar_games.cover.game, similar_games.cover.height, similar_games.cover.image_id, similar_games.cover.url, similar_games.cover.width, similar_games.id, similar_games.name',
    dlcs: 'dlcs.cover.game, dlcs.cover.height, dlcs.cover.image_id, dlcs.cover.url, dlcs.cover.width, dlcs.id, dlcs.name',
    player_perspectives: 'player_perspectives.id, player_perspectives.name, player_perspectives.slug',
    game:
        'fields summary, id, rating, rating_count, name, url, videos'
}

// requesting a single bit of data from an endpoint, data is the querystring
const getGameDataFromApi = async (gameId) => {
    try {
        const queryString = `${fields.game}, ${fields.cover}, ${fields.artworks}, ${fields.genres}, ${fields.platforms}, ${fields.game_modes}, ${fields.screenshots}, ${fields.videos}, ${fields.similar_games}, ${fields.dlcs}, ${fields.player_perspectives};exclude tags;where id = ${gameId};`
        // const queryString = ` ${fields.platforms}, ${fields.game_modes}, ${fields.screenshots}, ${fields.videos}, ${fields.similar_games}, ${fields.dlcs}, ${fields.player_perspectives};exclude tags;where id = ${gameId};`
        // console.log(queryString)
        return await axios({
            url: 'https://api-v3.igdb.com/games',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': process.env.USER_KEY
            },
            data: queryString
        })
    } catch (error) {
        console.log(error)
    }
}



// take the array of data and spread them into a larger game Object, to be returned
const assignGameToObj = async (gameId) => {
    console.log(gameId)
    console.log("here")

    let game = await getGameDataFromApi(gameId)
    console.log(game)
    return Object.assign({}, ...game.data)
    // console.log(Object.assign({}, ...game.data))


}

// function to search through the database based on user input(queryString)
const searchGames = async (queryString) => {
    try {
        return await axios({
            url: 'https://api-v3.igdb.com/games',
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'user-key': process.env.USER_KEY
            },
            data: queryString
        })
    } catch (err) {
        console.log(err)
    }
}

module.exports = {
    fetchGame: assignGameToObj,
    searchGames: searchGames
}







