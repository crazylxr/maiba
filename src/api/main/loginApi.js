import axios from 'axios'

export function signIn (form) {
  return axios.post('/user', form)
}
