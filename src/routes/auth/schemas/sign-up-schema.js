const { z } = require('zod')

const signUpSchema = {
	summary: 'Create an user',
	tags: ['Users'],

	body: z.object({
		name: z.string(),
		email: z.string().email(),
		password: z.string(),
		cpf: z.string().length(11, 'Enter the 11 numbers of your CPF.'),
		phone: z.string(),
		companyId: z.coerce.number(),
	}),

	response: {
		201: z.object({
			userId: z.number(),
		}),
	},
}

module.exports = {
	signUpSchema,
}
