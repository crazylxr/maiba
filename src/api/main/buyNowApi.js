import {
  post
} from '../common'

const SERVICE = 'order-service'

export function saveOrder (params) {
  return post(`${SERVICE}/orders`, params)
}
