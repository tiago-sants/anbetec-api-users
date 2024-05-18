const { deleteUserUseCase } = require('../use-cases/delete-user-use-case')

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function deleteUserController(request, reply) {
	try {
		const userId = request.params.id

		await deleteUserUseCase(userId)

		return reply.status(200).send()
	} catch (error) {
		return reply.status(400).send({
			message: error.message,
		})
	}
}

module.exports = { deleteUserController }
