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
          if (response.status === 200) {
            sessionStorage.setItem('role', response.data.role)
            commit('SET_NAME', response.data.username)
            commit('SET_ROLES', response.data.role)
            resolve(response)
          } else {
            return reject('Verification failed, please Login again.')
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        resetRouter()
        commit('RESET_STATE')
        resolve()
      }).catch(error => {
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

