import ElementUI from 'element-ui'

export default class LoadingService {
  static loadingInstance = ''

  static openLoading(text) {
    this.loadingInstance = ElementUI.Loading.service({
      text: text,
      lock: true,
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.7)'
    })
  }

  static closeLoading() {
    this.loadingInstance.close()
  }
}
