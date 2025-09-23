import axios, { AxiosInstance } from 'axios';
import { PlayerDetailsResponse } from '../interfaces/player-details-response';
import envConfig from '../config';

interface getPlayerProfileProps {
  name: string
  activities: number
}

class RuneScapeService {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: envConfig.RS_API_BASE_URL,
      timeout: envConfig.RS_API_TIMEOUT,
      headers: {
        'Accept': 'application/json',
        'Cache-Control': `max-age=${envConfig.RS_API_CACHE_TTL}`
      }
    });
  }

  async getPlayerProfile({ name, activities }: getPlayerProfileProps): Promise<PlayerDetailsResponse> {
    try {
      const response = await this.client.get<PlayerDetailsResponse>(
        `/runemetrics/profile/profile?user=${name}&activities=${activities}`
      );
      if (!response.data.name) {
        throw new Error('Perfil não encontrado');
      }
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`Erro na API do RuneScape: ${error.message}`);
      }
      throw new Error('Erro desconhecido ao buscar perfil');
    }
  }
}

export default new RuneScapeService();