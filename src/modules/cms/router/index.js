import Layout from '@/modules/core/pages/layout'

const _import = require(`@/base/router/import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

export default [
  {
    isModule: true,
    redirect: 'noredirect',
    name: 'cms',
    meta: {
      title: '补贴公示模块'
    },
    children: [
      {
        root: false,
        path: '/cms',
        component: Layout,
        name: 'Demo',
        meta: {
          title: '补贴公示',
          icon: 'ds-tongzhigonggao'
        },
        children: [
          {
            path: 'policy_list',
            component: _import('cms/pages/policy/list'),
            name: 'PolicyList',
            meta: {
              title: '政策法规列表',
              btnList: [
                { code: '10001', title: '发布新内容', icon: 'el-icon-plus' },
                { code: '10002', title: '查看', icon: 'el-icon-view' },
                { code: '10003', title: '编辑', icon: 'el-icon-edit' },
                { code: '10004', title: '隐藏', icon: 'el-icon-turn-off' },
                { code: '10005', title: '删除', icon: 'el-icon-delete' }
              ]
            }
          },
          {
            path: 'policy_view',
            hidden: true,
            component: _import('cms/pages/news/list'),
            name: 'PolicyView',
            meta: {
              title: '政策法规发布-查看'
            }
          },
          {
            path: 'policy_edit',
            hidden: true,
            component: _import('cms/pages/news/list'),
            name: 'PolicyEdit',
            meta: {
              title: '政策法规发布-编辑'
            }
          },
          {
            path: 'news_list',
            component: _import('cms/pages/news/list'),
            name: 'NewsList',
            meta: {
              title: '新闻发布'
            }
          }
        ]
      }
    ]
  }
]
