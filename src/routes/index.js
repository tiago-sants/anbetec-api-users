const fastifySwaggerUI = require('@fastify/swagger-ui')

const { userRoutes } = require('./users')
const { signInRouter } = require('./auth/sign-in')
const { signUpRouter } = require('./auth/sign-up')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function routes(app) {
	app.register(fastifySwaggerUI, {
		prefix: '/docs',
	})

	app.register(signInRouter)
	app.register(signUpRouter)

	app.register(userRoutes, {
		prefix: '/users',
	})

}

module.exports = { routes }
