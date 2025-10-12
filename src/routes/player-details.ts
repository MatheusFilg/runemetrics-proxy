import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { getPlayerDetailsController } from '../controllers/player-details-controller'

export default async function playerDetails(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get('/player-details', {
		schema: {
			querystring: z.object({
				name: z.string().min(1).max(50),
				activities: z.preprocess(
					val => (val ? Number(val) : 20),
					z.number().min(1).max(50).default(20)
				),
			}),
			response: {
				200: z.object({
					name: z.string(),
					combatlevel: z.number(),
					magic: z.number(),
					totalskill: z.number(),
					questsstarted: z.number(),
					questscomplete: z.number(),
					questsnotstarted: z.number(),
					totalxp: z.number(),
					ranged: z.number(),
					rank: z.string(),
					melee: z.number(),
					loggedIn: z.string(),
					skillvalues: z.array(
						z.object({
							level: z.number(),
							xp: z.number(),
							rank: z.number(),
							id: z.number(),
							percentageProgress: z.string(),
							xpToNextLevel: z.number(),
						})
					),
					activities: z.array(
						z.object({
							id: z.string(),
							date: z.string(),
							details: z.string(),
							text: z.string(),
							activityType: z.string(),
							activityUrl: z.string(),
						})
					),
				}),
				502: z.object({
					error: z.string(),
				}),
			},
		},
		handler: getPlayerDetailsController,
	})
}
