/**
 * 前台首页 api
 */

import axios from 'axios'

export function getIndexGoods (page = 0, size = 10) {
  return axios.get(`/goods?page=${page}&size=${size}`)
}
