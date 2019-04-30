const Game = require('../../models/game')

const gameHelper = require('../../helpers/getGame')

module.exports = {
	getGame: async (args) => {
		try {
			return Game.findOne({ id: args.id }).then(async (game) => {
				if (game) {
					await game.populate('usersInterestedin').execPopulate()

					return await game
				}
				if (!game) {
					return gameHelper.fetchGame(args.id).then((res) => {
						return Game.create(res).then(async (newGame) => {
							await newGame.populate('usersInterestedin').execPopulate()
							return newGame.save()
						})
					})
				}
			})
		} catch (err) {
			throw err
		}
	},
	searchGames: async ({ query }) => {
		try {
			const results = await gameHelper.searchGames(query)
			console.log(results, 'results')
			return results.data
		} catch (err) {
			throw err
		}
	},
	indexGame: async () => {
		try {
			// return { ...args }
			return Game.find().limit(20).then(async (game) => {
				// console.log(game)
				if (game) {
					// await game.populate('usersInterestedin').execPopulate()
					return await game
				}
				return await []
			})
		} catch (err) {
			throw err
		}
	}
}
