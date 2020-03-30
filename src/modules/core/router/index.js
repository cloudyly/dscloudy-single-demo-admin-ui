import Layout from '@/modules/core/pages/layout'

const _import = require(`@/base/router/import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

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
        component: Layout,
        name: 'Demo',
        meta: {
          title: 'Demo示例',
          icon: 'component'
        },
        children: [
          {
            path: 'demo_dialog',
            component: _import('demo/pages/index'),
            name: 'DemoIndex',
            meta: {
              title: 'Demo演示',
              icon: 'component'
            }
          }
        ]
      }
    ]
  }
]
