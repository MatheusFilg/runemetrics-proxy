export interface PlayerSummaryResponse {
	name: string
	combatlevel: number
	magic: number
	totalskill: number
	questsstarted: number
	questscomplete: number
	questsnotstarted: number
	totalxp: number
	ranged: number
	rank: string
	melee: number
	loggedIn: string
	skillvalues: SkillValue[]
	activities: Activity[]
}

export interface SkillValue {
	level: number
	xp: number
	rank: number
	id: number
	percentageProgress: string
	xpToNextLevel: number
}

export interface Activity {
	id: string
	date: string
	details: string
	text: string
	activityType: string
	activityUrl: string
}
