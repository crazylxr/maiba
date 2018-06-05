import { get, put } from '../common'

const SERVICE = 'order-service'

export function getOrderByState (state) {
  return get(`${SERVICE}/admin/orders/${state}`)
}

export function getAllOrders () {
  return get(`${SERVICE}/admin/orders`)
}

export function updateStateByOrderId (id, state) {
  return put(`${SERVICE}/admin/orders/${id}?state=${state}`)
}
