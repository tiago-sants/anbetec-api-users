const { z } = require('zod')

const updateUserSchema = {
	summary: 'Update an user',
	tags: ['Users'],

	security: [{ Authorization: [] }],

	params: z.object({
		id: z.coerce.number(),
	}),

	body: z.object({
		name: z.string(),
		email: z.string().email(),
		phone: z.string(),
		companyId: z.coerce.number().optional(),
	}),

	response: {
		200: z.object({
			userId: z.number(),
		}),
	},
}

module.exports = {
	updateUserSchema,
}
