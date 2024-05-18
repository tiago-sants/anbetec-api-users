const { getUserController } = require('../../controllers/get-user-controller')

const { getUserSchema } = require('./schemas/get-user-schema')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */

async function getUserRouter(app) {
	app
		.withTypeProvider()
		.get(
			'/:id',
			{ schema: getUserSchema, onRequest: [app.authenticate] },
			getUserController
		)
}

module.exports = { getUserRouter }
