import axios from 'axios'

// ** Config
import authConfig from 'src/configs/auth'

const instance = axios.create({
  // baseURL: 'http://192.168.0.136:5000/api/v1', // local Farhan
  // baseURL: 'https://ttfzrwzb-5000.asse.devtunnels.ms/api/v1', // local Faizan Bhai
  // baseURL: 'https://rdvqqkfh-5000.inc1.devtunnels.ms/api/v1', // local Farhan Home
  // baseURL: 'http://192.168.0.203:8002/api/v1', // local Maaz
  // baseURL: 'http://192.168.0.140:8004/api/v1', // local Manahil
  baseURL: 'https://62w84jwr-5000.inc1.devtunnels.ms/api/v1', // Live
  timeout: 500000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  }
})

// Add a request interceptor
instance.interceptors.request.use(function (config: any) {
  const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)!

  return {
    ...config,
    headers: {
      authorization: storedToken ? `Bearer ${storedToken}` : null
    }
  }
})

export default instance
