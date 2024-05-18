const { z } = require('zod')

const getUserSchema = {
	summary: 'Get an user',
	tags: ['Users'],

	security: [{ Authorization: [] }],

	params: z.object({
		id: z.coerce.number(),
	}),

	response: {
		200: z.object({
			user: z.object({
				id: z.coerce.number(),
				name: z.string(),
				email: z.string().email(),
				cpf: z.string(),
				phone: z.string(),
				createdAt: z.date(),
				company: z.object({
					id: z.number(),
					socialReason: z.string(),
				}),
			}),
		}),
	},
}

module.exports = { getUserSchema }
