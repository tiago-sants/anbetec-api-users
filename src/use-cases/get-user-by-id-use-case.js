const { prisma } = require('../lib/prisma')

/**
 *
 * @param {number} userId
 * @returns {Promise<{user: {id: number, name: string, email: string, password: string, cpf: string, phone: string, company: { id: number, socialReason: string }}}>}
 */
async function getUserByIdUseCase(userId) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
			name: true,
			email: true,
			cpf: true,
			phone: true,
			createdAt: true,
			company: {
				select: {
					id: true,
					socialReason: true,
				},
			},
		},
	})

	if (user === null) {
		throw new Error('User not found.')
	}

	return { user }
}

module.exports = { getUserByIdUseCase }
