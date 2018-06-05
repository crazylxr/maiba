import axios from 'axios'

const userId = localStorage.getItem('userId')

const token = localStorage.getItem('token')

const headers = {
  headers: {
    'Authorization': 'BASIC' + token,
    'userId': userId
  }
}

export function get (url) {
  return axios.get(url, headers)
}

export function post (url, requestBody) {
  return axios.post(url, requestBody, headers)
}

// delete 为关键字,不能作为方法名
export function remove (url) {
  return axios.delete(url, headers)
}

export function put (url, requestBody) {
  return axios.put(url, requestBody, headers)
}
