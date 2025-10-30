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

		const DEFAULT_ICON_URL = 'https://runescape.wiki/images/Quest_icon.png'
		const DEFAULT_REWARD_URL = 'https://imgur.com/sFCBK0H.png'

		const questsWithUrl = playerQuest.quests.map(quest => {
			if (!quest.title || quest.title.trim() === '') {
				return {
					...quest,
					urlQuestIcon: DEFAULT_ICON_URL,
					urlQuestReward: DEFAULT_REWARD_URL,
				}
			}

			let baseTitle = quest.title

			if (baseTitle.includes(':')) {
				baseTitle = baseTitle.split(':').at(-1)!.trim()
			}

			if (baseTitle.trim() === '') {
				return {
					...quest,
					urlQuestIcon: DEFAULT_ICON_URL,
					urlQuestReward: DEFAULT_REWARD_URL,
				}
			}

			const formattedTitle = quest.title.replace(/ /g, '_')

			const quickGuideUrl = `https://runescape.wiki/w/${formattedTitle}/Quick_guide`
			const iconUrl = `https://runescape.wiki/images/${formattedTitle}_icon.png`
			const rewardUrl = `https://runescape.wiki/images/${formattedTitle}_reward.png`

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
