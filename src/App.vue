<template>
  <div id="app" class="min-h-screen flex flex-col">
    <!-- 导航栏 -->
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4">
        <div class="flex justify-between items-center h-16">
          <router-link to="/" class="text-xl font-bold text-blue-600">我的博客</router-link>

          <!-- 前台导航 -->
          <nav v-if="!isAdminRoute">
            <ul class="flex space-x-6">
              <li><router-link to="/" class="hover:text-blue-600">首页</router-link></li>
              <li><router-link to="/admin/login" class="hover:text-blue-600">管理后台</router-link></li>
            </ul>
          </nav>

          <!-- 后台导航 -->
          <nav v-else>
              <button @click="handleLogout" class="hover:text-red-600">退出登录</button>
          </nav>
        </div>
      </div>
    </header>

    <!-- 主内容区 -->
    <main class="flex-grow">
      <router-view />
    </main>

    <!-- 页脚 -->
    <footer class="bg-gray-100 py-6 mt-10">
      <div class="container mx-auto px-4 text-center text-gray-600">
        <p>© {{ new Date().getFullYear() }} 我的博客 | 基于 Vue3 + Element Plus 构建</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { computed } from 'vue'
import { removeToken } from '@/utils/auth'

const router = useRouter()
const route = useRoute()

// 判断是否为后台路由（不含登录页）
const isAdminRoute = computed(() => {
  return route.path.startsWith('/admin') && route.path !== '/admin/login'
})

// 退出登录
const handleLogout = () => {
  removeToken()
  ElMessage.success('已退出登录')
  router.push('/admin/login')
}
</script>

<style scoped>
#app {
  font-family: system-ui, -apple-system, sans-serif;
}
.router-link-exact-active {
  @apply text-blue-600 font-medium;
}
</style>