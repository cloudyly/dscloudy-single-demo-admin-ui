const ui = {
  state: {
    /** 菜单有关状态 */
    menu: {
      /** 是否收缩 */
      collapse: false
    }
  },
  mutations: {
    setMenuCollapse: (state, menuCollapse) => {
      state.menu.collapse = menuCollapse
    }
  },
  actions: {
  }
}

export default ui
