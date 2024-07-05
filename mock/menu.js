const list = [
  {
    id: 1,
    sort: 1,
    status: 1,
    path: '/b',
    name: 'B',
    title: '报道信息',
    icon: 'el-icon-help',
    children: [{
      id: 2,
      sort: 1,
      status: 1,
      path: '/b/baodo',
      name: 'Baodao',
      title: '基本信息'
    }, {
      id: 3,
      sort: 1,
      status: 1,
      path: '/b/domitorydecide',
      name: 'Domitorydecide',
      title: '宿舍确认'
    }, {
      id: 4,
      sort: 1,
      status: 1,
      path: '/b/card',
      name: 'Card',
      title: '校园卡申请'
    }
    ]
  },
  {
    id: 5,
    sort: 1,
    status: 1,
    path: '/ads',
    name: 'Ads',
    title: '学校信息',
    icon: 'el-icon-help',
    children: [{
      id: 6,
      sort: 1,
      status: 1,
      path: '/ads/banner',
      name: 'Banner',
      title: '学校简介'
    }, {
      id: 7,
      sort: 1,
      status: 1,
      path: '/ads/link',
      name: 'Link',
      title: '师资力量'
    }, {
      id: 8,
      sort: 1,
      status: 1,
      path: '/ads/leader',
      name: 'Leader',
      title: '历任领导'
    }, {
      id: 9,
      sort: 1,
      status: 1,
      path: '/ads/history',
      name: 'History',
      title: '历史名人'
    }
    ]
  },
  {
    id: 10,
    sort: 1,
    status: 1,
    path: '/nested',
    name: 'Nested',
    title: '我的宿舍',
    children:[
      {
        id: 11,
        sort: 1,
        status: 1,
        path: '/nested/domitory',
        name: 'Nestedset',
        title: '我的宿舍',
        icon: 'el-icon-s-operation'
      }
    ]
  },
  {
    id: 12,
    sort: 1,
    status: 1,
    path: '/site',
    name: 'Site',
    title: '基础设置',
    children: [
      {
        id: 13,
        sort: 1,
        status: 1,
        path: '/site/index',
        name: 'SiteSet',
        title: '在线咨询',
        icon: 'el-icon-setting'
      }
    ]
  },
  {
    id: 14,
    sort: 1,
    status: 1,
    path: '/setting',
    name: 'Setting',
    title: '我的课程',
    icon: 'el-icon-s-tools',
    children: [
      {
        id: 15,
        sort: 1,
        status: 1,
        path: '/setting/user',
        name: 'User',
        title: '课程查询'
      },
      {
        id: 16,
        sort: 1,
        status: 1,
        path: '/setting/role',
        name: 'Role',
        title: '课程选择'
      },
      {
        id: 17,
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
