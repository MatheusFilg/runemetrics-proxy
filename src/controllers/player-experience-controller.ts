import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PlayerExperienceResponse } from '../interfaces/player-experience-response'
import { getPlayerExperienceService } from '../services/player-experience-service'

export async function getPlayerExperienceController(
	request: FastifyRequest<{
		Querystring: { name: string; skillId: number }
	}>,
	reply: FastifyReply
): Promise<PlayerExperienceResponse> {
	const { name, skillId } = request.query

	try {
		const playerExperience = await getPlayerExperienceService({ name, skillId })

		return playerExperience
	} catch (error) {
		request.log.error(error)
		reply.code(502).send({ error: 'Failed to fetch RuneScape data' })
		throw error
	}
}
