import { createApp } from 'vue'
import App from './App.vue'

import router from './router'// 导入路由实例

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'// 导入UI组件的样式
import * as ElementPlusIconsVue from '@element-plus/icons-vue'//导入所有图标

import './assets/index.css' // Tailwind 样式入口

const app = createApp(App)//创建应用实例


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}//全局注册 Element Plus 图标

app.use(router)// 安装 Vue Router
app.use(ElementPlus)// 安装 ElementPlus 
app.mount('#app')// 挂载应用到 DOM