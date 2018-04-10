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