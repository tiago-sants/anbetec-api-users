const {
	getAllUserController,
} = require('../../controllers/get-all-user-controller')

const { getAllUserSchema } = require('./schemas/get-all-user-schema')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */

async function getAllUserRouter(app) {
	app
		.withTypeProvider()
		.get(
			'/',
			{ schema: getAllUserSchema, onRequest: [app.authenticate] },
			getAllUserController
		)
}

module.exports = { getAllUserRouter }
