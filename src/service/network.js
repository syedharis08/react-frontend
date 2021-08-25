import { apiClient } from './config'

export default {
  get: async (url, header) => {
    apiClient.setHeaders(header)
    return await apiClient.get(url)
  },
  post: async (url, data, header) => {
    apiClient.setHeaders(header)
    return await apiClient.post(url, data)
  },
}
