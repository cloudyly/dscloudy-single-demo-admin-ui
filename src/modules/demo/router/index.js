// import Layout from '@/modules/core/pages/layout'
//
// const _import = require(`@/base/router/import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

export default [
  {
    isModule: true,
    path: '/demo',
    redirect: 'noredirect',
    name: 'Demo',
    meta: {
      title: 'Demo模块'
    },
    children: [
      {
        root: false,
        path: '/demo_index',
        component: 'Layout',
        name: 'Demo',
        meta: {
          title: 'Demo示例',
          icon: 'ds-gongzuotai'
        },
        children: []
      },
      {
        root: false,
        path: '/examples',
        component: 'Layout',
        name: 'Demo',
        meta: {
          title: '测试组件',
          icon: 'ds-tongzhigonggao'
        },
        children: [
          {
            path: 'datalist',
            component: 'datalist',
            name: 'DemoList',
            meta: {
              title: '列表Demo'
            }
          },
          {
            path: '/test32',
            component: 'Layout',
            name: 'Demo32',
            meta: {
              title: '详情Demo'
            }
          }
        ]
      }
    ]
  }
]
