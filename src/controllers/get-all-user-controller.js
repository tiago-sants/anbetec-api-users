const { prisma } = require('../lib/prisma')

/**
 *
 * @param {import('fastify').FastifyRequest} request
 * @param {import('fastify').FastifyReply} reply
 */
async function getAllUserController(_request, reply) {
	const users = await prisma.user.findMany()
	return reply.send(users)
}

module.exports = { getAllUserController }
