import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { getPlayerExperienceController } from '../controllers/player-experience-controller'

export default function playerExperience(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get('/player-experience', {
		schema: {
			querystring: z.object({
				name: z.string().min(1).max(50),
				skillId: z.coerce.number().min(-1).max(28),
			}),
			response: {
				200: z.object({
					monthlyXpGain: z.array(
						z.object({
							skillId: z.coerce.number().min(-1).max(28),
							totalXp: z.number(),
							averageXpGain: z.number(),
							totalGain: z.number(),
							monthData: z.array(
								z.object({
									xpGain: z.number(),
									timestamp: z.number(),
									rank: z.number(),
								})
							),
						})
					),
					loggedIn: z.string(),
				}),
				502: z.object({
					error: z.string(),
				}),
			},
		},
		handler: getPlayerExperienceController,
	})
}
