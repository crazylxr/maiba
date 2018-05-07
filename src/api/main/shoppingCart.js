import { get } from '../common'

const SERVICE = 'order-service'

export function getShoppingCartByUserId (userId) {
  return get(SERVICE + '/shoppingCart/' + userId)
}
