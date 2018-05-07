import axios from 'axios'

// 登录
export function signIn (form) {
  return axios.post('/goods-service/signIn', form)
}

// 注册
export function signUp (params) {
  return axios.post('/goods-service/user', params)
}
