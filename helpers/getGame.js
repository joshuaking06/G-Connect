const axios = require('axios')
const darksouls = '2155'

require('dotenv').config()

const fields = {
	covers: 'fields game,height,image_id,url,width;',
	artworks: 'fields game,height,image_id,url,width;',
	genres: 'fields id,name,slug;',
	platforms: 'fields id,abbreviation,alternative_name,name;',
	game_modes: 'fields name,slug,id;',
	screenshots: 'fields *;',
	game_videos: 'fields *;',
	games: 'fields cover,id,name;',
	player_perspectives: 'fields id,name,slug;',
	gamesShow:
		'fields cover, dlcs,summary, similar_games, screenshots, id, rating, rating_count,platforms, player_perspectives, genres, game_modes, artworks, name, url, videos; exclude tags;'
}

// requesting a single bit of data from an endpoint
const getSingleData = async (endpoint, data) => {
	try {
		return await axios({
			url: `https://api-v3.igdb.com/${endpoint}`,
			method: 'POST',
			headers: {
				Accept: 'application/json',
				'user-key': process.env.USER_KEY
			},
			data: data
		})
	} catch (error) {
		console.log(data)
	}
}

// getting a list of data using multiple requests to the same endpoint
const getMultipleData = async (ids, endpoint) => {
	let newIds
	if (ids.length < 2) newIds = ids[0]
	if (ids.length > 10) newIds = ids.slice(0, 10).join(',')
	if (ids.length < 10 || ids.length > 2) newIds = ids.join(',')
	try {
		const gameData = await getSingleData(endpoint, fields[endpoint] + `where id=(${newIds});`)
		return gameData.data
	} catch (error) {
		console.log(error)
	}
}

// create and build up a new game object which will be saved to the database
const getGameDataFromApi = async (gameId) => {
	const game = await getSingleData('games', fields.gamesShow + `where id=${gameId};`)
	return Promise.all(
		Object.keys(game.data[0]).map(async (field) => {
			if (Array.isArray(game.data[0][field])) {
				const data = await getMultipleData(
					game.data[0][field],
					field
						.replace(/dlcs|similar_games/gi, 'games')
						.replace(/videos/gi, 'game_videos')
				)
				return { [field]: data }
			} else if (field === 'cover') {
				return {
					[field]: (await getSingleData(
						'covers',
						fields[field + 's'] + `where id=${game.data[0][field]};`
					)).data[0]
				}
			} else {
				return { [field]: game.data[0][field] }
			}
		})
	)
}

const assignGameToObj = async (gameId) => {
	let game = await getGameDataFromApi(gameId)
	console.log(game)
	return Object.assign({}, ...game)
}

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
