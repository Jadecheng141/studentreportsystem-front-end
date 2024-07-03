
const routes = [
  {
    path: '/',
    component: 'Layout',
    redirect: '/thefirstpage',
    name: 'Home',
    alwaysShow: true,
    children: [{
      path: '/thefirstpage',
      name: 'Thefirstpage',
      component: 'views/thefirstpage/index',
      meta: { title: '首页', icon: 'thefirstpage' }
    }]
  },

  {
    path: '/ads',
    component: 'Layout',
    redirect: '/ads/banner',
    name: 'Ads',
    meta: { title: '学校信息', icon: 'el-icon-help' },
    children: [
      {
        path: '/ads/banner',
        name: 'Banner',
        component: 'views/banner/index',
        meta: { title: '学校简介' }
      },
      {
        path: '/ads/link',
        name: 'Link',
        component: 'views/link/index',
        meta: { title: '师资力量' }
      },
      {
        path: '/ads/leader',
        name: 'Leader',
        component: 'views/leader/leader',
        meta: { title: '历任领导' }
      },
      {
        path: '/ads/history',
        name: 'History',
        component: 'views/history/history',
        meta: { title: '历史名人' }
      }
    ]
  },

  {
    path: '/nested',
    component: 'Layout',
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: '我的宿舍',
      icon: 'el-icon-s-operation'
    },
    children: [
      {
        path: '/nested/menu1',
        alwaysShow: true,
        redirect: '/nested/menu1/menu1-1',
        component: 'views/nested/menu1/index', // Parent router-view
        name: 'Menu1',
        meta: { title: '二级菜单' },
        children: [
          {
            path: '/nested/menu1/menu1-1',
            component: 'views/nested/menu1/menu1-1/index',
            name: 'Menu1-1',
            meta: { title: '三级菜单' }
          },
          {
            path: '/nested/menu1/menu1-2',
            alwaysShow: true,
            redirect: 'noRedirect',
            component: 'views/nested/menu1/menu1-2/index',
            name: 'Menu1-2',
            meta: { title: '三级菜单' },
            children: [
              {
                path: '/nested/menu1/menu1-2/menu1-2-1',
                component: 'views/nested/menu1/menu1-2/menu1-2-1/index',
                name: 'Menu1-2-1',
                meta: { title: '四级菜单' }
              },
              {
                path: '/nested/menu1/menu1-2/menu1-2-2',
                component: 'views/nested/menu1/menu1-2/menu1-2-2/index',
                name: 'Menu1-2-2',
                meta: { title: '四级菜单' }
              }
            ]
          },
          {
            path: '/nested/menu1/menu1-3',
            component: 'views/nested/menu1/menu1-3/index',
            name: 'Menu1-3',
            meta: { title: '三级菜单' }
          }
        ]
      },
      {
        path: '/nested/menu2',
        component: 'views/nested/menu2/index',
        name: 'Menu2',
        meta: { title: '二级菜单' }
      }
    ]
  },

  {
    path: '/site',
    component: 'Layout',
    alwaysShow: true,
    children: [
      {
        path: '/site/index',
        name: 'Site',
        component: 'views/site/index',
        meta: { title: '我的校园卡', icon: 'el-icon-setting' }
      }
    ]
  },

  {
    path: '/setting',
    component: 'Layout',
    redirect: '/setting/user',
    name: 'Setting',
    meta: { title: '我的课程', icon: 'el-icon-s-tools' },
    children: [
      {
        path: '/setting/user',
        name: 'User',
        component: 'views/user/index',
        meta: { title: '课程查询' }
      },
      {
        path: '/setting/role',
        name: 'Role',
        component: 'views/role/index',
        meta: { title: '课程选择' }
      },
      {
        path: '/setting/menu',
        name: 'Menu',
        component: 'views/menu/index',
        meta: { title: '我的课表' }
      }
    ]
  }
]

module.exports = [
  // get routes
  {
    url: '/vue-admin-template/permission/getroutes',
    type: 'get',
    response: () => {
      return {
        code: 20000,
        data: { list: routes }
      }
    }
  }
]
