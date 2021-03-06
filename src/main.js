import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import './assets/scss/base.scss'
import './icons'

import QuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
import 'quill/dist/quill.snow.css'

import App from './App.vue'
import router from './base/router'
import store from './base/store'
import i18n from '@/base/i18n'
import '@/assets/iconfonts/iconfonts.css'
import config from '@/config'
import DscUI from '@/components'

import moduleCore from '@/modules/core'
import moduleDemo from '@/modules/demo'

Vue.use(QuillEditor)

Vue.use(moduleCore, store)
Vue.use(moduleDemo, store)

if (config.isMock) {
  require('./base/mock')
}

Vue.use(ElementUI, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(DscUI)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
