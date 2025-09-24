import axios from 'axios'
import type { PlayerDetailsResponse } from '../interfaces/player-details-response'
import { apiClient } from '../lib/axios'

interface getPlayerDetailsProps {
	name: string
	activities: number
}

export async function getPlayerDetailsService({
	name,
	activities,
}: getPlayerDetailsProps): Promise<PlayerDetailsResponse> {
	try {
		const response = await apiClient.get<PlayerDetailsResponse>(
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
