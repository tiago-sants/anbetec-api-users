const {
	deleteUserController,
} = require('../../controllers/delete-user-controller')

const { deleteUserSchema } = require('./schemas/delete-user-schema')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */

async function deleteUserRouter(app) {
	app
		.withTypeProvider()
		.delete(
			'/:id',
			{ schema: deleteUserSchema, onRequest: [app.authenticate] },
			deleteUserController
		)
}

module.exports = { deleteUserRouter }
