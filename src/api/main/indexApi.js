/**
 * 前台首页 api
 */

import axios from 'axios'
import { parseObjectToUrl } from '../../util/tool'

export function getIndexGoods (page = 0, size = 10, searchForm = {}) {
  const param = parseObjectToUrl(searchForm)
  return axios.get(`/goods?page=${page}&size=${size}${param}`)
}

export function getGoodsById (goodsId) {
  return axios.get(`/admin/goods/${goodsId}`)
}
