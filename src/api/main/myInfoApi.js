import {
  get,
  put
} from '../common'

const SERVICE = 'goods-service'

export function getUser () {
  return get(`${SERVICE}/user`, params)
}

export function updateUser(user) {
    return put(`${SERVICE}/user`, user)
}