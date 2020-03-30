import Vue from 'vue'
import 'normalize.css/normalize.css'
import ElementUI from 'element-ui'
import './assets/scss/base.scss'

import App from './App.vue'
import router from './base/router'
import store from './base/store'
import i18n from '@/base/i18n'
import '@/assets/iconfonts/iconfonts.css'

import config from '@/config'
if (config.isMock) {
  require('./base/mock')
}

Vue.use(ElementUI, {
  size: 'mini',
  i18n: (key, value) => i18n.t(key, value)
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
