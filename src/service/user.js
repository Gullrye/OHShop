import axios from '../utils/axios'

function getUserInfo () {
  return axios.get('/user/info')
}

function login (params) {
  return axios.post('/user/login', params)
}

function logout () {
  return axios.post('/user/logout')
}

function register (params) {
  return axios.post('/user/register', params)
}

export { getUserInfo, login, logout, register }
