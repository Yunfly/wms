// let baseUrl = 'http://192.168.0.161:8061/a' //李帅
// let baseUrl = "http://192.168.0.152:8061/a"; //陈杰
// let baseUrl = "http://192.168.0.183:8061/a"; //周朝宇
// let baseUrl = 'http://ec2-3-84-110-44.compute-1.amazonaws.com/api' // 测试环境
let baseUrl = 'http://localhost:8080/api' // 测试环境
// let baseUrl = "http://180.168.107.58:8061/a"; //测试环境
// let baseUrl = 'http://180.168.107.58:8062/a' //线上环境
const env = process.env
if (env.VUE_APP_URL) {
  baseUrl = env.VUE_APP_URL + baseUrl
}

export default baseUrl
