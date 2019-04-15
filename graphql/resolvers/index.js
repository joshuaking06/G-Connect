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
		'fields cover, dlcs,summary, slug,similar_games, screenshots, id, rating, rating_count,platforms, player_perspectives, genres, game_modes, artworks, name, url, videos; exclude tags;'
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

const getMultipleData = async (ids, endpoint) => {
	try {
		return await Promise.all(
			ids.map(async (i) => {
				const single = await getSingleData(endpoint, fields[endpoint] + `where id=${i};`)
				return single.data[0]
			})
		)
	} catch (error) {
		console.error(error)
	}
}

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

const assignGameToObj = async (gameId) => {
	let game = await getGameDataFromApi(gameId)
	return game
}

// getGameDataFromApiAndSave(darksouls).then((res) => console.log(Object.assign(gameToSave, ...res)))
module.exports = {
	fetchAndSaveGame: assignGameToObj
}
