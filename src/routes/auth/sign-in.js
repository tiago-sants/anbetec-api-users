const { signInSchema } = require('./schemas/sign-in-schema')
const { signInController } = require('../../controllers/sign-in-controller')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function signInRouter(app) {
	app.post('/sign-in', { schema: signInSchema }, (request, reply) =>
		signInController(app, request, reply)
	)
}

module.exports = { signInRouter }
