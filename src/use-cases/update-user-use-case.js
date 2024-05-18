const { prisma } = require('../lib/prisma')

/**
 *
 * @param {{name: string, email: string, phone: string, companyId: number, userId: number}} data
 * @returns {Promise<{ userId: number }>}
 */
async function updateUserUseCase(data) {
	const { name, email, phone, companyId, userId } = data

	if (companyId) {
		const companyExists = await prisma.company.findUnique({
			where: {
				id: companyId,
			},
		})

		if (companyExists === null) {
			throw new Error('Company not found.')
		}
	}

	const userExists = await prisma.user.findFirst({
		where: {
			id: userId,
		},
	})

	if (userExists === null) {
		throw new Error('User not exists.')
	}

	const emailExists = await prisma.user.findFirst({
		where: {
			email,
		},
		select: {
			id: true,
		},
	})

	if (emailExists && emailExists.id !== userId) {
		throw new Error('User already exists.')
	}

	const user = await prisma.user.update({
		data: {
			name,
			email,
			phone,
			...(companyId !== undefined && { companyId }),
		},
		where: {
			id: userId,
		},
		select: {
			id: true,
		},
	})

	return {
		userId: user.id,
	}
}

module.exports = { updateUserUseCase }
