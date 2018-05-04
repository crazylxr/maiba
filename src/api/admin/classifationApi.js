import axios from 'axios'

const SERVICE = 'goods-service'

export function getAllClassification () {
  return axios.get(SERVICE + '/admin/classifications')
}

export function saveClassification (classification) {
  return axios.post(SERVICE + 'admin/classification', classification)
}

export function deleteClassification (id) {
  return axios.delete(SERVICE + 'admin/classification/' + id)
}
