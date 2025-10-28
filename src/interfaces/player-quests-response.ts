export interface PlayerQuestResponse {
	quests: Quest[]
	loggedIn: string
}

interface Quest {
	title: string
	urlQuestQuickGuide: string
	urlQuestIcon: string
	urlQuestReward: string
	status: 'COMPLETED' | 'NOT_STARTED' | 'STARTED'
	difficulty: number
	members: boolean
	questPoints: number
	userEligible: boolean
}
