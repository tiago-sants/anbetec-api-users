const bcrypt = require('bcryptjs')

const { prisma } = require('../lib/prisma')

/**
 *
 * @param {{name: string, email: string, password: string, cpf: string, phone: string, companyId: number}} data
 * @returns {Promise<number>}
 */
async function createUserUseCase(data) {
	const { name, email, password, cpf, phone, companyId } = data

	const companyExists = await prisma.company.findUnique({
		where: {
			id: companyId,
		},
	})

	if (companyExists === null) {
		throw new Error('Company not found.')
	}

	const userExists = await prisma.user.findFirst({
		where: {
			OR: [{ name }, { email }, { cpf }],
		},
	})

	if (userExists) {
		throw new Error('User already exists.')
	}

	const passwordHashed = await bcrypt.hash(password, 8)

	const user = await prisma.user.create({
		data: {
			cpf,
			name,
			phone,
			email,
			companyId,
			password: passwordHashed,
		},
		select: {
			id: true,
		},
	})

	return user.id
}

module.exports = { createUserUseCase }
