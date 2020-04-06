import ui from './store/ui'
import user from './store/user'
import tagsView from './store/tags-view'

export default {
  install (module, store) {
    // 注册状态管理
    if (store !== undefined) {
      store.registerModule('ui', ui)
      store.registerModule('user', user)
      store.registerModule('tagsView', tagsView)
    }
  }
}
