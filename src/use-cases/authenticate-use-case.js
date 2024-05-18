const bcrypt = require('bcryptjs')

const { prisma } = require('../lib/prisma')

/**
 *
 * @param {{email: string, password: string}} data
 * @returns {Promise<{ userId: number }>}
 */
async function authenticateUseCase(data) {
	const { email, password } = data

	const userExists = await prisma.user.findFirst({
		where: {
			email,
		},
	})

	if (userExists === null) {
		throw new Error('Email or password invalid.')
	}

	const isPasswordValid = await bcrypt.compare(password, userExists.password)

	if (!isPasswordValid) {
		throw new Error('Email or password invalid.')
	}

	return { userId: userExists.id }
}

module.exports = { authenticateUseCase }
