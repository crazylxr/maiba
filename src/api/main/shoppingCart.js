import { get, remove } from '../common'

const SERVICE = 'order-service'

export function getShoppingCartByUserId (userId) {
  return get(SERVICE + '/shoppingCart/' + userId)
}

export function deleteByGoodId (id) {
  return remove(SERVICE + '/shoppingCart/' + id)
}
