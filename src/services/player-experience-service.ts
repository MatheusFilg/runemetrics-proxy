import axios from 'axios'
import type { PlayerExperienceResponse } from '../interfaces/player-experience-response'
import { apiClient } from '../lib/axios'

interface getPlayerExperienceProps {
	name: string
	skillId: number
}

export async function getPlayerExperienceService({
	name,
	skillId,
}: getPlayerExperienceProps) {
	try {
		const response = await apiClient.get<PlayerExperienceResponse>(
			`runemetrics/xp-monthly?searchName=${name}&skillid=${skillId}`
		)

		if (!name) {
			throw new Error('Perfil não encontrado')
		}

		console.log(response.data)
		return response.data
	} catch (error) {
		if (axios.isAxiosError(error)) {
			console.error(
				`Erro na API do RuneScape: ${error.response?.status} - ${error.message}`
			)
			throw new Error(`Erro ao comunicar com a API do RuneScape.`)
		}
		if (error instanceof Error) {
			throw error
		}
		throw new Error('Erro desconhecido ao buscar perfil')
	}
}
