const list = [
  {
    id: 1,
    sort: 1,
    status: 1,
    path: '/ads',
    name: 'Ads',
    title: '学校信息',
    icon: 'el-icon-help',
    children: [{
      id: 2,
      sort: 1,
      status: 1,
      path: '/ads/banner',
      name: 'Banner',
      title: '学校简介'
    }, {
      id: 3,
      sort: 1,
      status: 1,
      path: '/ads/link',
      name: 'Link',
      title: '师资力量'
    }, {
      id: 4,
      sort: 1,
      status: 1,
      path: '/ads/leader',
      name: 'Leader',
      title: '历任领导'
    }, {
      id: 5,
      sort: 1,
      status: 1,
      path: '/ads/history',
      name: 'History',
      title: '历史名人'
    }
    ]
  },
  {
    id: 6,
    sort: 1,
    status: 1,
    path: '/nested',
    name: 'Nested',
    title: '我的宿舍',
    icon: 'el-icon-s-operation',
    children: [
      {
        id: 7,
        sort: 1,
        status: 1,
        path: '/nested/menu1',
        name: 'Menu1',
        title: '二级菜单',
        children: [
          {
            id: 8,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-1',
            name: 'Menu1-1',
            title: '三级菜单'
          },
          {
            id: 9,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-2',
            name: 'Menu1-2',
            title: '三级菜单',
            children: [
              {
                id: 10,
                sort: 1,
                status: 1,
                path: '/nested/menu1/menu1-2/menu1-2-1',
                name: 'Menu1-2-1',
                title: '四级菜单'
              },
              {
                id: 11,
                sort: 1,
                status: 1,
                path: '/nested/menu1/menu1-2/menu1-2-2',
                name: 'Menu1-2-2',
                title: '四级菜单'
              }
            ]
          },
          {
            id: 12,
            sort: 1,
            status: 1,
            path: '/nested/menu1/menu1-3',
            name: 'Menu1-3',
            title: '三级菜单'
          }
        ]
      },
      {
        id: 13,
        sort: 1,
        status: 1,
        path: '/nested/menu2',
        name: 'Menu2',
        title: '二级菜单'
      }
    ]
  },
  {
    id: 14,
    sort: 1,
    status: 1,
    path: '/site',
    name: 'Site',
    title: '基础设置',
    children: [
      {
        id: 15,
        sort: 1,
        status: 1,
        path: '/site/index',
        name: 'SiteSet',
        title: '我的校园卡',
        icon: 'el-icon-setting'
      }
    ]
  },
  {
    id: 16,
    sort: 1,
    status: 1,
    path: '/setting',
    name: 'Setting',
    title: '我的课程',
    icon: 'el-icon-s-tools',
    children: [
      {
        id: 17,
        sort: 1,
        status: 1,
        path: '/setting/user',
        name: 'User',
        title: '课程查询'
      },
      {
        id: 18,
        sort: 1,
        status: 1,
        path: '/setting/role',
        name: 'Role',
        title: '课程选择'
      },
      {
        id: 19,
        sort: 1,
        status: 1,
        path: '/setting/menu',
        name: 'Menu',
        title: '我的课表'
      }
    ]
  }
]

module.exports = [
  {
    url: '/vue-admin-template/menu/list',
    type: 'get',
    response: config => {
      return {
        code: 20000,
        data: {
          list: list
        }
      }
    }
  }
]
