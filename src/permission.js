import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // 加载条
import 'nprogress/nprogress.css' // 加载样式
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  console.log('访问页面：', to.path)
  // 开始页面进度条
  NProgress.start()

  // 获取页面标题
  document.title = getPageTitle(to.meta.title)

  const role = sessionStorage.getItem('role')// 获取存储的角色信息
  const hasRole = role !== null

  if (hasRole) {
    if (to.path === '/login') {
      console.log('角色名：', role)
      // 登录后重定向到首页
      next({ path: '/' })
      NProgress.done()
    } else {
      const hasRoutes = store.getters.addedRoutes
      if (hasRoutes) {
        console.log('hasRoutes')
        next()
      } else {
        try {
          console.log('获取路由:', role)
          // 依据角色获取路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            role
          )
          // 添加动态路由
          router.addRoutes(accessRoutes)
          // 标记路由已添加
          store.commit('permission/SET_ADDED_ROUTES', true)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          // // 移除无效的 role
          sessionStorage.removeItem('role')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* 没有角色信息*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
