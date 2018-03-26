import axios from 'axios';

export function getAllClassification() {
  return axios.get('classifications');
}

export function saveClassification(classification) {
  return axios.post('classification', classification);
}

export function deleteClassification(id) {
  return axios.delete('classification/' + id);
}
