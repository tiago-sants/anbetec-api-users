const {
	updateUserController,
} = require('../../controllers/update-user-controller')

const { updateUserSchema } = require('./schemas/update-user-schema')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function updateUserRouter(app) {
	app
		.withTypeProvider()
		.put(
			'/:id',
			{ schema: updateUserSchema, onRequest: [app.authenticate] },
			updateUserController
		)
}

module.exports = { updateUserRouter }
