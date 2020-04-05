import Layout from '@/modules/core/pages/layout'

const _import = require(`@/base/router/import_${process.env.NODE_ENV === 'development' ? 'development' : 'production'}`)

export default [
  {
    isModule: true,
    redirect: 'noredirect',
    name: 'sys',
    meta: {
      title: '系统管理'
    },
    children: [
      {
        root: false,
        path: '/sys',
        component: Layout,
        name: 'Sys',
        meta: {
          title: '系统管理',
          icon: 'ds-tongzhigonggao'
        },
        children: [
          {
            path: 'org_list',
            component: _import('system/pages/temp'),
            name: 'OrgList',
            meta: {
              title: '组织机构管理'
            }
          },
          {
            path: 'role_list',
            component: _import('system/pages/temp'),
            name: 'RoleList',
            meta: {
              title: '角色管理'
            }
          },
          {
            path: 'menu_list',
            component: _import('system/pages/temp'),
            name: 'MenuList',
            meta: {
              title: '菜单管理'
            }
          },
          {
            path: 'user_list',
            component: _import('system/pages/temp'),
            name: 'UserList',
            meta: {
              title: '用户管理'
            }
          }
        ]
      }
    ]
  }
]
