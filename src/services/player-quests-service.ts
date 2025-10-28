import axios from 'axios'
import type { PlayerQuestResponse } from '../interfaces/player-quests-response'
import { apiClient } from '../lib/axios'

export async function getPlayerQuestsService(user: string) {
	try {
		const response = await apiClient.get<PlayerQuestResponse>(
			`runemetrics/quests?user=${user}`
		)
		if (!user) {
			throw new Error('Perfil não encontrado')
		}

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
