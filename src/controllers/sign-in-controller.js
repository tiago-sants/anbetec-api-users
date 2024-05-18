const { authenticateUseCase } = require('../use-cases/authenticate-use-case')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function signInController(app, request, reply) {
	try {
		const { email, password } = request.body

		const { userId } = await authenticateUseCase({ email, password })

		const token = app.jwt.sign(
			{ userId },
			{
				expiresIn: '1d',
			}
		)

		return reply.send({ token })
	} catch (error) {
		return reply.status(400).send({
			message: error.message,
		})
	}
}

module.exports = { signInController }
