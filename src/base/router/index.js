import Vue from 'vue'
import Router from 'vue-router'
import { Message } from 'element-ui'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import store from '@/base/store'
import config from '@/config'
import { constantRouterMap } from './constant-router'

export { constantRouterMap }

Vue.use(Router)

NProgress.configure({ showSpinner: false })

const _import = require(`@/base/router/import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

/**
 * 配置路由
 **/
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

/**
 * 白名单 无需跳转
 */
const whiteList = config.whiteList

const generateRouteTree = (routes, tree) => {
  tree.forEach(item => {
    if (!item.isModule) {
      const r = { ...item }
      if (r.componentName) {
        r.component = _import(r.componentName)
      }
      if (item.children && item.children.length > 0) {
        r.children = []
        generateRouteTree(r.children, item.children)
      }
      routes.push(r)
    } else {
      if (item.children && item.children.length > 0) {
        generateRouteTree(routes, item.children)
      }
    }
  })
}

const removeModuleRoute = (routes) => {
  const addRoutes = []
  routes.forEach(item => {
    if (item.isModule) {
      addRoutes.push(...item.children)
    } else {
      addRoutes.push(item)
    }
  })
  return addRoutes
}

router.beforeEach((to, from, next) => {
  NProgress.start()
  const token = store.state.user.token
  // 先判断是否有Token
  if (token) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      // 判断当前用户是否已获取到user_info信息
      if (!store.state.user.userInfo.id) {
        store.dispatch('getUserInfo').then(resp => {
          const dynamicRoutes = config.isMockMenu ? asyncRouterMap : resp.privilegeList
          const addRoutes = removeModuleRoute(dynamicRoutes)
          addRoutes.push({ path: '*', redirect: '/401', hidden: true })
          store.commit('setAddRoutes', addRoutes)

          const needGenerateRouters = []
          generateRouteTree(needGenerateRouters, addRoutes)
          router.addRoutes(needGenerateRouters)
        }).catch((err) => {
          console.log(err)
          Message.error('验证失败, 请重新登录')
          next({ path: '/login' })
        })
      } else {
        next()
      }
    }
  } else {
    // 没有Token，先判断是否在白名单中
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next()
    } else {
      next('/login')
      NProgress.done()
    }
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

/**
 * 导出 基础路由
 **/
export default router

/**
 * 导出 业务路由
 **/
export const asyncRouterMap = []
