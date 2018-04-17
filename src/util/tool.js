/**
 * @description 将对象转化为 url 参数形式
 * @param { Object } obj
 */
export function parseObjectToUrl (obj) {
  return Object.keys(obj).reduce(function (a, b) {
    return obj[b] ? `${a}&${b}=${obj[b]}` : `${a}`
  }, '')
}
