import path from 'node:path'
import dotenv from 'dotenv'

dotenv.config({
	path: path.resolve(__dirname, '../.env'),
})

interface EnvConfig {
	RS_API_BASE_URL: string
	RS_API_TIMEOUT: number
	RS_API_CACHE_TTL: number
	PORT: number
	NODE_ENV: 'development' | 'production' | 'test'
}

const envConfig: EnvConfig = {
	RS_API_BASE_URL: process.env.RS_API_BASE_URL || 'https://apps.runescape.com',
	RS_API_TIMEOUT: parseInt(process.env.RS_API_TIMEOUT || '5000', 10),
	RS_API_CACHE_TTL: parseInt(process.env.RS_API_CACHE_TTL || '3600', 10),
	PORT: parseInt(process.env.PORT || '3000', 10),
	NODE_ENV: (process.env.NODE_ENV as EnvConfig['NODE_ENV']) || 'development',
}

if (!envConfig.RS_API_BASE_URL) {
	throw new Error('RS_API_BASE_URL não está definido no .env')
}

export default envConfig
