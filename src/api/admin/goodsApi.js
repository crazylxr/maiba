import axios from 'axios'

const SERVICE = 'goods-service'

export function saveGoods (goods = {}) {
  return axios.post(SERVICE + '/admin/goods', goods)
}

export function deleteGoods (ids) {
  return axios.delete(SERVICE + `/admin/goods?ids=${ids}`)
}

export function getGoods (page = 0, size = 10) {
  return axios.get(`${SERVICE}/admin/goods?page=${page}&size=${size}`)
}

export function getGoodsById (goodsId) {
  return axios.get(`${SERVICE}/admin/goods/${goodsId}`)
}

// 根据商品 id 和 类型(主图：0，局部图：1) 获取商品图片
export function getGoodsImages (goodsId, type = 0) {
  return axios.get(`${SERVICE}/admin/goodsImages?goodsId=${goodsId}&type=${type}`)
}
