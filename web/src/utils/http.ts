import axios from 'axios'

const http = axios.create({
  timeout: 10000,
  responseType: 'json',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
})

http.interceptors.request.use((config) => {
  const token = window.localStorage.getItem('token')
  Object.assign(config.headers, { Authorization: token ? `Bearer ${token}` : '' })

  return config
})

http.interceptors.response.use(
  (res) => {
    return res.data
  },
  (err) => {
    if (err && typeof err.toJSON === 'function') {
      const { useError } = err.toJSON().config || {}
      useError && console.error('网络异常', err)
    }

    return Promise.reject(err)
  }
)

export default http
