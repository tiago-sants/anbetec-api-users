const { z } = require('zod')

const getAllUserSchema = {
	summary: 'Get all users',
	tags: ['Users'],

	security: [{ Authorization: [] }],

	response: {
		200: z.array(
			z.object({
				id: z.number(),
				name: z.string(),
				email: z.string().email(),
				cpf: z.string(),
				phone: z.string(),
				createdAt: z.date(),
			})
		),
	},
}

module.exports = { getAllUserSchema }
