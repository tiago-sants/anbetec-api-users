const { prisma } = require('../lib/prisma')

/**
 *
 * @param {number} userId
 * @returns {Promise<boolean>}
 */
async function deleteUserUseCase(userId) {
	const user = await prisma.user.findUnique({
		where: {
			id: userId,
		},
		select: {
			id: true,
		},
	})

	if (user === null) {
		throw new Error('User not exists.')
	}

	await prisma.user.delete({
		where: {
			id: userId,
		},
	})

	return true
}

module.exports = { deleteUserUseCase }
