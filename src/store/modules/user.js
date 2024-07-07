import { login, logout } from '@/api/user'
import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    name: '',
    avatar: '',
    roles: []
  }
}
const getters = {
  roles: (state) => state.roles,
  name: (state) => state.name
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    console.log('执行登录')
    const { username, password } = userInfo
    // 创建一个 URLSearchParams 对象来处理数据
    const formData = new FormData()
    formData.append('username', username.trim())
    formData.append('password', password)
    return new Promise((resolve, reject) => {
      login(formData)
        .then((response) => {
          console.log('登录response', response)
          if (response.data.status === 'success') {
            sessionStorage.setItem('role', response.data.role)
            sessionStorage.setItem('username', response.data.username)
            sessionStorage.setItem('avatar', response.data.url)
            sessionStorage.setItem('accountname', response.data.accountName)
            sessionStorage.setItem('email', response.data.email)
            commit('SET_NAME', response.data.username)
            commit('SET_ROLES', response.data.role)
            commit('SET_AVATAR', response.data.url)
            console.log('登录url', sessionStorage.getItem('avatar'))
            resolve(response)
          } else {
            return reject('账号与密码不匹配')
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()
      formData.append('emptyField', '') // 添加一个空字段
      logout()
        .then(() => {
          resetRouter()
          sessionStorage.clear() // 清除 sessionStorage 中的所有数据
          commit('RESET_STATE')
          dispatch('permission/resetPermissionState', null, { root: true }) // 重置 permission 模块的状态
          resolve()
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}

