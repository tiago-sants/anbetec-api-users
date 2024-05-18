const { getUserByIdUseCase } = require('../use-cases/get-user-by-id-use-case')

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function getUserController(request, reply) {
	try {
		const userId = request.params.id

		const { user } = await getUserByIdUseCase(userId)

		return reply.status(200).send({ user })
	} catch (error) {
		return reply.status(400).send({
			message: error.message,
		})
	}
}

module.exports = { getUserController }
