<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '新 生 报 道 系 统',
      logo: 'https://hgylyc.oss-cn-beijing.aliyuncs.com/logo.png'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #2b2f3a;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    & .sidebar-logo {
      width: 32px;
      height: 32px;
      margin: 0 6px;
    }

    & .sidebar-title {
      flex: 1;
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      line-height: 50px;
      font-size: 17px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin: 0px;
    }
  }
}

.mobile {
  .sidebarLogoFade-enter-active {
    transition: none;
  }

  .sidebar-logo-container {
    .sidebar-logo {
      margin: 0 !important;
    }
    .sidebar-title {
      display: none;
    }
  }
}
</style>
