import axios from 'axios'

export function getAllClassification () {
  return axios.get('admin/classifications')
}

export function saveClassification (classification) {
  return axios.post('admin/classification', classification)
}

export function deleteClassification (id) {
  return axios.delete('admin/classification/' + id)
}
