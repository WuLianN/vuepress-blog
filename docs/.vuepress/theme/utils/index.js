export function getCurrentPage(path) {
  let page = '/'
  path = path.split('/')[1]
  if (path) {
    page = path.split('.')[0]
  }
  return page
}

/**
 * @description: 清空数组中的元素 （常用于更新数据）
 * @param {Array}
 * @return:
 */

export function clearArray(array) {
  let length = array.length
  array.splice(0, length)
  return array
}

export function isNight() {
  const hour = new Date().getHours()
  if (6 < hour && hour < 19) {
    return false
  } else {
    return true
  }
}
