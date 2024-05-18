const { createUserUseCase } = require('../use-cases/create-user-use-case')

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function signUpController(request, reply) {
	try {
		const { name, email, password, cpf, phone, companyId } = request.body

		const userId = await createUserUseCase({
			name,
			email,
			password,
			cpf,
			phone,
			companyId,
		})

		return reply.status(201).send({
			userId,
		})
	} catch (error) {
		return reply.status(400).send({
			message: error.message,
		})
	}
}

module.exports = { signUpController }
