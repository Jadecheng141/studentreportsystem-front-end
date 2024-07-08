# Student Report System

> 基于 iimeepo 的 [vue-admin-template](https://github.com/iimeepo/vue-admin-template) 改造的 vue admin 管理后台。

## Demo

线上预览: [http://vue-admin.findfuture.cn/](http://vue-admin.findfuture.cn/)  
完整版本: [http://admin.qutaoyun.com/](http://admin.qutaoyun.com/) (账号：test 密码：123456) 正在开发中...

## 架构

vue2 <https://v2.cn.vuejs.org/>
Element-Ui <https://element.eleme.cn/#/zh-CN>
ECharts <https://echarts.apache.org/zh/index.html>
Axios <http://www.axios-js.com/zh-cn/docs/>
Nprogress <https://github.com/rstacruz/nprogress> //加载虚假进度条
vue-router3 <https://v3.router.vuejs.org/zh/> //路由管理

## 构建

```bash

# 克隆项目(GitHub)
git clone https://github.com/Jadecheng141/studentreportsystem-front-end.git

# 进入项目目录
cd studentreportsystem-front-end

# 安装依赖
npm install

# 解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```

## License

[MIT](https://gitee.com/iimeepo/vue-admin-template/blob/master/LICENSE) license.
