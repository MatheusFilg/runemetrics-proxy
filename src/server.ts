import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import dotenv from 'dotenv'
import fastify from 'fastify'
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from 'fastify-type-provider-zod'
import { errorHandler } from './error-handler'
import playerExperience from './routes/player-experience'
import playerQuests from './routes/player-quests'
import playerSummary from './routes/player-summary'

dotenv.config()

const app = fastify()

app.register(fastifyCors, {
	origin: ['http://localhost:5173'],
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
	allowedHeaders: ['Content-Type', 'Authorization'],
})

app.register(fastifySwagger, {
	swagger: {
		consumes: ['application/json'],
		produces: ['application/json'],
		info: {
			title: 'runescape-proxy',
			description: 'Proxy para consumo de api do runemetrics',
			version: '1.0.0',
		},
	},
	transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs',
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.setErrorHandler(errorHandler)

app.listen({ port: 3333, host: '0.0.0.0' }).then(() => {
	console.log('💻 Server Running!')
})

app.register(playerSummary)
app.register(playerExperience)
app.register(playerQuests)
