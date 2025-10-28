import type { FastifyReply, FastifyRequest } from 'fastify'
import type { PlayerQuestResponse } from '../interfaces/player-quests-response'
import { getPlayerQuestsService } from '../services/player-quests-service'

export async function getPlayerQuestsController(
	request: FastifyRequest<{
		Querystring: { user: string }
	}>,
	reply: FastifyReply
): Promise<PlayerQuestResponse> {
	const { user } = request.query

	try {
		const playerQuest = await getPlayerQuestsService(user)
		const questsWithUrl = playerQuest.quests.map(quest => {
			const formattedTitle = quest.title.replace(/ /g, '_')

			const quickGuideUrl = `https://runescape.wiki/w/${formattedTitle}/Quick_guide`
			const iconUrl = `https://runescape.wiki/images/${formattedTitle}_icon.png?0b972`
			const rewardUrl = `https://runescape.wiki/images/${formattedTitle}_reward.png?ba8d7`

			return {
				...quest,
				urlQuestQuickGuide: quickGuideUrl,
				urlQuestIcon: iconUrl,
				urlQuestReward: rewardUrl,
			}
		})

		return {
			...playerQuest,
			quests: questsWithUrl,
		}
	} catch (error) {
		request.log.error(error)
		reply.code(502).send({ error: 'Failed to fetch RuneScape data' })
		throw error
	}
}
