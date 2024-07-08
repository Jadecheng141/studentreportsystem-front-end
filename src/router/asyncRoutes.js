export const asyncRoutes = {
  student: [
    {
      path: '/',
      component: 'Layout',
      redirect: '/thefirstpage',
      name: 'Home',
      alwaysShow: true,
      children: [
        {
          path: '/thefirstpage',
          name: 'Thefirstpage',
          component: 'views/thefirstpage/index',
          meta: { title: '首页', icon: 'thefirstpage' }
        }
      ]
    },
    {
      path: '/b',
      component: 'Layout',
      redirect: '/b/baodao',
      name: 'B',
      alwaysShow: true,
      meta: { title: '报道信息', icon: 'el-icon-help' },
      children: [
        {
          path: '/b/baodao',
          name: 'Baodao',
          component: 'views/information/information',
          meta: { title: '基本信息' }
        },
        {
          path: '/b/domitorydecide',
          name: 'Domitorydecide',
          component: 'views/domitorydecide/dode',
          meta: { title: '宿舍确认' }
        }
      ]
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
      alwaysShow: true,
      children: [
        {
          path: '/nested/domitory',
          name: 'Domitory',
          component: 'views/nested/domitory',
          meta: { title: '我的宿舍', icon: 'el-icon-s-operation' }
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
          meta: { title: '在线咨询', icon: 'el-icon-setting' }
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
  ],
  teacher: [
    {
      path: '/',
      component: 'Layout',
      redirect: '/thefirstpage',
      name: 'Home',
      alwaysShow: true,
      children: [
        {
          path: '/thefirstpage',
          name: 'Thefirstpage',
          component: 'views/thefirstpage/teacher',
          meta: { title: '首页', icon: 'thefirstpage' }
        }
      ]
    },
    {
      path: '/b',
      component: 'Layout',
      alwaysShow: true,
      children: [
        {
          path: '/b/baodao',
          name: 'B',
          component: 'views/information/studentmanager',
          meta: { title: '学生管理', icon: 'el-icon-help' }
        }
      ]
    },
    {
      path: '/ads',
      component: 'Layout',
      alwaysShow: true,
      children: [
        {
          path: '/ads/banner',
          name: 'Ads',
          component: 'views/banner/coursemanager',
          meta: { title: '课程管理', icon: 'el-icon-help' }
        }
      ]
    },
    {
      path: '/nested',
      component: 'Layout',
      alwaysShow: true,
      children: [
        {
          path: '/nested/domitory',
          name: 'Domitory',
          component: 'views/nested/doemanager',
          meta: { title: '宿舍管理', icon: 'el-icon-s-operation' }
        }
      ]
    },
    {
      path: '/setting',
      component: 'Layout',
      alwaysShow: true,
      children: [
        {
          path: '/setting/user',
          name: 'teachermanage',
          component: 'views/user/teachermanager',
          meta: { title: '教师管理', icon: 'el-icon-s-operation' }
        }
      ]
    }
  ]
}
