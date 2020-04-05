import * as coreApi from '../api/core-api'
import { constantRouterMap } from '@/base/router'

const user = {
  state: {
    userInfo: {},
    token: window.localStorage.getItem('token'),
    addRoutes: window.localStorage.getItem('addRoutes') || [],
    routes: constantRouterMap
  },
  mutations: {
    setToken: (state, token) => {
      state.token = token
      window.localStorage.setItem('token', token)
    },
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo
    },
    setAddRoutes: (state, addRoutes) => {
      state.addRoutes = addRoutes
      state.routes = constantRouterMap.concat(addRoutes)
      window.localStorage.setItem('addRoutes', addRoutes)
    }
  },
  actions: {
    /**
     * 用户名密码登录
     */
    login ({ commit }, param) {
      return new Promise((resolve, reject) => {
        coreApi.login({
          loginName: param.username,
          loginPwdTS: param.password
        }).then(resp => {
          commit('setToken', resp)
          return resolve(resp)
        }).catch(error => {
          return reject(error)
        })
      })
    },
    /**
     * 获取用户全部信息
     */
    getUserInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        coreApi.getUserInfo().then(resp => {
          commit('setUserInfo', resp)
          return resolve(resp)
        }).catch(error => {
          return reject(error)
        })
      })
    }
  }
}

export default user
