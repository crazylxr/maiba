import axios from 'axios'

// 登录
export function signIn (form) {
  return axios.post('/signIn', form)
}

// 注册
export function signUp (params) {
  return axios.post('/user', params)
}
