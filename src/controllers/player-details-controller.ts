import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PlayerDetailsResponse } from '../interfaces/player-details-response'
import { getPlayerDetailsService } from '../services/player-details-service'
import { classifyActivity } from '../utils/activities-type'

export async function getPlayerDetailsController(
	request: FastifyRequest<{
		Querystring: { name: string; activities: number }
	}>,
	reply: FastifyReply
): Promise<PlayerDetailsResponse> {
	const { name, activities } = request.query

	try {
		const profile = await getPlayerDetailsService({ name, activities })

		const classifiedActivities = (profile.activities || []).map(
			classifyActivity
		)

		return {
			...profile,
			activities: classifiedActivities,
		}
	} catch (error) {
		request.log.error(error)
		reply.code(502).send({ error: 'Failed to fetch RuneScape data' })
		throw error
	}
}
