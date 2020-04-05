import ui from './store/ui'
import user from './store/user'

export default {
  install (module, store) {
    // 注册状态管理
    if (store !== undefined) {
      store.registerModule('ui', ui)
      store.registerModule('user', user)
    }
  }
}
