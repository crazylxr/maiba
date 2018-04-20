import axios from 'axios'

export function saveGoods (goods = {}) {
  return axios.post('/admin/goods', goods)
}

export function deleteGoods (ids) {
  return axios.delete(`/admin/goods?ids=${ids}`)
}

export function getGoods (page = 0, size = 10) {
  return axios.get(`/admin/goods?page=${page}&size=${size}`)
}

export function getGoodsById (goodsId) {
  return axios.get(`/admin/goods/${goodsId}`)
}

// 根据商品 id 和 类型(主图：0，局部图：1) 获取商品图片
export function getGoodsImages (goodsId, type = 0) {
  return axios.get(`/admin/goodsImages?goodsId=${goodsId}&type=${type}`)
}
