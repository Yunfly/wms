export function set(objName, objValue, expires) {
  // 添加cookie
  var str = objName + '=' + objValue
  // 为0时不设定过期时间，浏览器关闭时cookie自动消失
  if (expires > 0) {
    str += '; expires=' + expires
  }
  document.cookie = str
}

// 获取指定名称的cookie的值
export function get(objName) {
  var arrStr = document.cookie.split('; ')
  for (var i = 0; i < arrStr.length; i++) {
    var temp = arrStr[i].split('=')
    if (temp[0] === objName) return unescape(temp[1])
  }
}

// 为了删除指定名称的cookie，可以将其过期时间设定为一个过去的时间
export function remove(name) {
  var date = new Date()
  date.setTime(date.getTime() - 10000)
  document.cookie = name + '='
}

// 读取所有保存的cookie字符串
export function allCookie() {
  var str = document.cookie
  if (str === '') {
    str = '没有保存任何cookie'
  }
  alert(str)
}
