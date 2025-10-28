import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import z from 'zod'
import { getPlayerQuestsController } from '../controllers/player-quests-controller'

export default function playerQuests(app: FastifyInstance) {
	app.withTypeProvider<ZodTypeProvider>().get('/player-quests', {
		schema: {
			querystring: z.object({
				user: z.string().min(1).max(50),
			}),
			response: {
				200: z.object({
					quests: z.array(
						z.object({
							title: z.string(),
							urlQuestQuickGuide: z.string(),
							urlQuestIcon: z.string(),
							urlQuestReward: z.string(),
							status: z.enum(['COMPLETED', 'NOT_STARTED', 'STARTED']),
							difficulty: z.number(),
							members: z.boolean(),
							questPoints: z.number(),
							userEligible: z.boolean(),
						})
					),
					loggedIn: z.string(),
				}),
				502: z.object({
					error: z.string(),
				}),
			},
		},
		handler: getPlayerQuestsController,
	})
}
