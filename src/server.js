const { app } = require('./app.js')
require('./lib/prisma.js')

const port = Number(process.env.PORT) || 3333

app
	.listen({ port })
	.then( () => {
		app.cron.startAllJobs()
		console.log(`🚀 Server ready at http://localhost:${port}`)
	})
	.catch(() => {
		console.error('Error while listening')
	})
