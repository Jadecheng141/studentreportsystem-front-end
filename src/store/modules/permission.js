import { constantRoutes } from '@/router'
import { asyncRoutes } from '@/router/asyncRoutes'
import Layout from '@/layout'

/**
 * 循环生成异步路由
 * @Author   HarveyCheng
 * @DateTime 2018-10-09
 * @param    {[type]}    routes [description]
 * @return   {[type]}           [description]
 */
function loopCreateRouter(routes) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    const tpl = Object.assign({}, tmp)
    if (typeof tmp['component'] !== 'undefined' && tmp['component']) {
      if (tmp['component'] === 'Layout') {
        tpl['component'] = Layout
      } else {
        tpl['component'] = resolve => require([`../../${tmp['component']}.vue`], resolve)
      }
    }
    if (tmp['children']) {
      tpl['children'] = loopCreateRouter(tmp['children'])
    }
    res.push(tpl)
  })
  return res
}

const getDefaultState = () => {
  return {
    routes: [],
    second_routes: [],
    third_routes: [],
    addedRoutes: false // 新增标记
  }
}

const state = getDefaultState()

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
  },
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_ADDED_ROUTES: (state, status) => {
    state.addedRoutes = status
  },
  SET_SECOND_ROUTES: (state, routes) => {
    state.second_routes = routes
  },
  SET_THIRD_ROUTES: (state, routes) => {
    state.third_routes = routes
  }
}

const actions = {
//   generateRoutes({ commit }) {
//     return new Promise((resolve, reject) => {
//       getroutes().then(response => {
//         const { data } = response
//         const asyncRouterMap = data.list
//         const accessedRoutes = loopCreateRouter(asyncRouterMap)
//         accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
//         commit('SET_ROUTES', constantRoutes.concat(accessedRoutes))
//         resolve(accessedRoutes)
//       }).catch(error => {
//         reject(error)
//       })
//     })
//   },

  // 获取路由
  generateRoutes({ commit }, role) {
    return new Promise((resolve, reject) => {
      let asyncRouterMap
      if (role === 'student') {
        asyncRouterMap = asyncRoutes.student
      } else if (role === 'teacher') {
        asyncRouterMap = asyncRoutes.teacher
      } else {
        reject(new Error('Unknown role'))
        return
      }
      const accessedRoutes = loopCreateRouter(asyncRouterMap)
      accessedRoutes.push({ path: '*', redirect: '/404', hidden: true })
      commit('SET_ROUTES', constantRoutes.concat(accessedRoutes))
      resolve(accessedRoutes)
    })
  },

  // 重置路由
  resetPermissionState({ commit }) {
    commit('RESET_STATE')
  },
  changeSecondRoutes({ commit, state }, data) {
    commit('SET_SECOND_ROUTES', [])
    const second_routes = state.routes.find(item => {
      return !item.hidden && (item.path === data.path || (data.path === '' && item.path === '/'))
    })
    if (typeof second_routes !== 'undefined' && second_routes.children) {
      const res = second_routes.children.filter(item => {
        return !item.hidden && item.path
      })
      if (res.length > 1) {
        commit('SET_SECOND_ROUTES', res)
      }
    }
  },
  changeThirdRoutes({ commit, state }, data) {
    commit('SET_THIRD_ROUTES', [])
    const third_routes = state.second_routes.find(item => {
      return !item.hidden && (item.path === data.path || (data.path === '' && item.path === '/'))
    })
    if (typeof third_routes !== 'undefined' && third_routes.children) {
      const res = third_routes.children.filter(item => {
        return !item.hidden && item.path
      })
      if (res.length > 1) {
        commit('SET_THIRD_ROUTES', res)
      }
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
