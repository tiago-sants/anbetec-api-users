const fastify = require('fastify')
const fastifySwagger = require('@fastify/swagger')
const jsonWebToken = require('@fastify/jwt')
const cors = require('@fastify/cors')
const {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} = require('fastify-type-provider-zod')
const fastifyCron = require('fastify-cron')

const { routes } = require('./routes')
const { errorHandler } = require('./middlewares/error-handler')
const { cronJobUseCase } = require('./use-cases/cron-job-use-case')

const app = fastify()

app.register(cors, {
	origin: '*',
})

app.register(jsonWebToken, {
	secret: process.env.JWT_SECRET,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
	swagger: {
		consumes: ['application/json'],
		produces: ['application/json'],
		info: {
			title: 'Anbetec-api-users',
			description: 'Especificações da API para o back-end da aplicação Anbetec',
			version: '1.0.0',
		},
		securityDefinitions: {
			Authorization: {
				description: 'Authorization header token, sample: "Bearer #TOKEN#"',
				type: 'apiKey',
				name: 'Authorization',
				in: 'header',
			},
		},
	},
	transform: jsonSchemaTransform,
})

app.setErrorHandler(errorHandler)

app.decorate('authenticate', async (request, reply) => {
	try {
		await request.jwtVerify()
	} catch (error) {
		reply.status(401).send({
			message: 'Unauthorized.',
		})
	}
})

app.register(fastifyCron, {
	jobs: [
		{
			cronTime: '* * * * *', // 1 minute time interval
			onTick: async () => {
				try {
					console.log('Starting cron job...')

					await cronJobUseCase()
				} catch (error) {
					console.log(error)
				}
			},
		},
	],
})

app.register(routes)

module.exports = { app }
