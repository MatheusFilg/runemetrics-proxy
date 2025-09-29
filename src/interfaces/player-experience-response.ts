interface MonthData {
	xpGain: number
	timestamp: number
	rank: number
}

interface MonthlyXpGain {
	skillId: number
	totalXp: number
	averageXpGain: number
	totalGain: number
	monthData: MonthData[]
}

export interface PlayerExperienceResponse {
	monthlyXpGain: MonthlyXpGain[]
	loggedIn: string
}
