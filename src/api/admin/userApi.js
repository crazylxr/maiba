import {
  get,
  put
} from '../common'

const SERVICE = 'goods-service'

export function getUsers () {
  return get(`${SERVICE}/users`)
}

export function updateUser (user) {
  return put(`${SERVICE}/user`, user)
}
