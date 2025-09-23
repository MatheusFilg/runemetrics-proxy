import { FastifyRequest, FastifyReply } from 'fastify';
import runescapeService from '../services/runescape-service';
import { PlayerDetailsResponse } from '../interfaces/player-details-response';
import { classifyActivity } from '../utils/activities-type';


export async function getPlayerDetail(
  request: FastifyRequest<{ Querystring: { name: string, activities: number } }>,
  reply: FastifyReply
): Promise<PlayerDetailsResponse> {
  const { name, activities } = request.query;

  try {
    const profile = await runescapeService.getPlayerProfile({name, activities})

    const classifiedActivities = (profile.activities || []).map(classifyActivity);

    return {
      ...profile,
      activities: classifiedActivities
    }
  } catch (error) {
    request.log.error(error)
    reply.code(502).send({ error: 'Failed to fetch RuneScape data' })
    throw error
  }
}
