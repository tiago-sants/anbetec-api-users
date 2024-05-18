const { z } = require('zod')

const signInSchema = {
	summary: 'Login with a user',
	tags: ['Authenticate'],

	body: z.object({
		email: z.string().email(),
		password: z.string().min(6),
	}),

	response: {
		200: z.object({
			token: z.string(),
		}),
	},
}

module.exports = {
	signInSchema,
}
