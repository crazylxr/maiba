import axios from 'axios'

export function get (url) {
    return axios.get(url)
}

export function post (url, requestBody) {
    return axios.post(url, requestBody)
}

// delete 为关键字,不能作为方法名
export function remove (url) {
    return axios.delete(url)
}

export function put (url, requestBody) {
    return axios.put(url, requestBody)
}



