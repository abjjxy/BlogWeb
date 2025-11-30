<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- 侧边栏 -->
    <aside class="w-64 bg-white shadow-md">
      <div class="p-4 border-b">
        <h2 class="font-bold text-lg">管理中心</h2>
      </div>
      <nav class="p-2">
        <ul>
          <li class="mb-1">
            <router-link 
              to="/admin" 
              class="block p-2 rounded hover:bg-gray-100"
            >
              <el-icon class="mr-2"><HomeFilled /></el-icon>首页
            </router-link>
          </li>
          <li class="mb-1">
            <router-link 
              to="/admin/blogs" 
              class="block p-2 rounded hover:bg-gray-100"
            >
              <el-icon class="mr-2"><Document /></el-icon>博客管理
            </router-link>
          </li>
          <li class="mb-1">
            <router-link 
              to="/admin/categories" 
              class="block p-2 rounded hover:bg-gray-100"
            >
              <el-icon class="mr-2"><Folder /></el-icon>分类管理
            </router-link>
          </li>
        </ul>
      </nav>
    </aside>

    <!-- 主内容 -->
    <main class="flex-1 p-6 overflow-auto">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { HomeFilled, Document, Folder } from '@element-plus/icons-vue'
</script>