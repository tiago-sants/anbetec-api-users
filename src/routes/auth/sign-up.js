const { signUpSchema } = require('./schemas/sign-up-schema')
const { signUpController } = require('../../controllers/sign-up-controller')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function signUpRouter(app) {
	app
		.withTypeProvider()
		.post('/sign-up', { schema: signUpSchema }, signUpController)
}

module.exports = { signUpRouter }
