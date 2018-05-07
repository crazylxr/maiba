import { post } from '../common'

const SERVICE = 'order-service'

export function saveShoppingCart(goodsInfo) {
    const userId = localStorage.getItem('userId')
    post(SERVICE + '/shoppingCart/' + userId, goodsInfo)
}