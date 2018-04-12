import axios from 'axios';

export function saveGoods(goods = {}) {
  return axios.post('/goods', goods);
}

export function deleteGoods(ids) {
    return axios.delete(`/goods?ids=${ids}`);
}

export function getGoods(page = 0, size = 10) {
    return axios.get(`/goods?page=${page}&size=${size}`);
}

// 根据商品 id 和 类型(主图：0，局部图：1) 获取商品图片
export function getGoodsImages(goodsId, type = 0) {
    return axios.get(`/goodsImages?goodsId=${goodsId}&type=${type}`);
}