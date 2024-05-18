const { updateUserUseCase } = require('../use-cases/update-user-use-case')

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function updateUserController(request, reply) {
	try {
		const { name, email, phone, companyId } = request.body

		const { userId } = await updateUserUseCase({
			name,
			email,
			phone,
			companyId,
			userId: request.params.id,
		})

		return reply.send({ userId })
	} catch (error) {
		return reply.status(400).send({
			message: error.message,
		})
	}
}

module.exports = { updateUserController }
