import {
  get,
  post
} from '../common'

const SERVICE = 'goods-service'

export function saveAddress(address) {
  return post(`${SERVICE}/address`, address)
}

export function getAddress() {
  return get(`${SERVICE}/address`)
}
