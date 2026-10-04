import axios from 'axios'

const instance = axios.create({
  baseURL: import.meta.env.DEV ? '/api' : `/data/`,
})
instance.interceptors.request.use((config) => {
  if (import.meta.env.PROD && config.method === 'get') {
    config.url = `${config.url}.json`
  }
  return config
})

instance.interceptors.response.use((res) => {
  return res.data
})

export default instance
