const { z } = require('zod')

const deleteUserSchema = {
	summary: 'Delete an user',
	tags: ['Users'],

	security: [{ Authorization: [] }],

	params: z.object({
		id: z.coerce.number(),
	}),

	response: {
		200: z.string(),
	},
}

module.exports = { deleteUserSchema }
