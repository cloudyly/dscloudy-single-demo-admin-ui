import DscDemoTest from './demo-test'
import DscSearchArea from './search-area'
import DscDataList from './data-list'
import DscToolBar from './tool-bar'
import DscPagePanel from './page-panel'

const components = [
  DscDemoTest,
  DscSearchArea,
  DscDataList,
  DscToolBar,
  DscPagePanel
]

// 在引入组件时，能使用 Vue.use(XXX). 该use方法会调用此处提供的 install 方法
const install = Vue => {
  components.forEach(item => {
    Vue.component(item.name, item)
  })
}

// 判断是否是直接引入文件，如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue)
}

export default {
  install
}
