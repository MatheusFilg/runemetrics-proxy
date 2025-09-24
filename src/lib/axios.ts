import axios from "axios";
import envConfig from "../config";

export const apiClient = axios.create({
  baseURL: envConfig.RS_API_BASE_URL,
  timeout: envConfig.RS_API_TIMEOUT,
  headers: {
    'Accept': 'application/json',
    'Cache-Control': `max-age=${envConfig.RS_API_CACHE_TTL}`
  }
})