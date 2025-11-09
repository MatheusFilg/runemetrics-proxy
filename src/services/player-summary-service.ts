import axios from 'axios'
import type { PlayerSummaryResponse } from '../interfaces/player-summary-response'
import { apiClient } from '../lib/axios'

interface getPlayerDetailsProps {
	name: string
	activities: number
}

export async function getPlayerSummaryService({
	name,
	activities,
}: getPlayerDetailsProps): Promise<PlayerSummaryResponse> {
	try {
		const response = await apiClient.get<PlayerSummaryResponse>(
			`/runemetrics/profile/profile?user=${name}&activities=${activities}`
		)
		if (!response.data.name) {
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
