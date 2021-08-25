import { create } from 'apisauce'
import { BASE_URL } from '../env'
export const apiClient = create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})
