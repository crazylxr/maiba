/**
 * 前台首页 api
 */

import axios from 'axios'
import { parseObjectToUrl } from '../../util/tool'

const SERVICE = 'goods-service'

export function getIndexGoods (page = 0, size = 10, searchForm = {}) {
  const param = parseObjectToUrl(searchForm)
  return axios.get(`${SERVICE}/goods?page=${page}&size=${size}${param}`)
}

export function getGoodsById (goodsId) {
  return axios.get(`${SERVICE}/admin/goods/${goodsId}`)
}
