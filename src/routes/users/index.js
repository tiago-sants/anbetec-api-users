const { deleteUserRouter } = require('./delete-user')
const { getAllUserRouter } = require('./get-all-user')
const { getUserRouter } = require('./get-user')
const { updateUserRouter } = require('./update-user')

/**
 *
 * @param {import('fastify').FastifyInstance} app
 */
async function userRoutes(app) {
	app.register(getUserRouter)
	app.register(getAllUserRouter)
	app.register(updateUserRouter)
	app.register(deleteUserRouter)
}

module.exports = { userRoutes }
