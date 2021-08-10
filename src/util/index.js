export function removeNull(data, defaultStr = '') {
  // 普通数据类型
  if (typeof data !== 'object' || data === null) {
    if (data == null || data === 'null') {
      return defaultStr
    } else {
      return data
    }
  }
  // 引用数据类型
  for (const v in data) {
    if (data[v] == null || data[v] === 'null') {
      data[v] = defaultStr
    }
    if (typeof data[v] === 'object') {
      this.removeNull(data[v])
    }
  }
}
