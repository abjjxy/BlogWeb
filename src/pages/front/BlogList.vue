<template>
  <div class="py-6">
    <h1 class="text-2xl font-bold mb-6">博客列表</h1>

    <!-- 搜索和分类筛选 -->
    <div class="flex flex-col md:flex-row gap-4 mb-6">
      <el-input 
        v-model="searchKey" 
        placeholder="搜索博客标题..." 
        class="w-full md:w-64"
        @keyup.enter="fetchBlogs"
      >
        <template #append><el-icon><Search /></el-icon></template>
      </el-input>
      <el-select 
        v-model="selectedCategory" 
        placeholder="选择分类" 
        class="w-full md:w-48"
        @change="fetchBlogs"
      >
        <el-option label="全部" value="" />
        <el-option 
          v-for="c in categories" 
          :key="c.id" 
          :label="c.name" 
          :value="c.id" 
        />
      </el-select>
    </div>

    <!-- 博客列表 -->
    <div class="grid gap-6">
      <el-card 
        v-for="blog in blogList" 
        :key="blog.id" 
        class="hover:shadow-lg transition-shadow"
      >
        <div class="flex flex-col h-full">
          <h2 class="text-xl font-bold mb-2">
            <router-link :to="`/blog/${blog.id}`" class="hover:text-blue-600">{{ blog.title }}</router-link>
          </h2>
          <div class="text-sm text-gray-500 mb-3">
            <span>分类：{{ getCategoryName(blog.categoryId,categories) }}</span>
            <span class="mx-2">|</span>
            <span>{{ formatDate(blog.createdAt) }}</span>
          </div>
          <p class="text-gray-700 flex-grow line-clamp-3">{{ blog.content.substring(0, 150) }}...</p>
          <router-link 
            :to="`/blog/${blog.id}`" 
            class="text-blue-600 mt-3 self-end"
          >
            阅读全文 <el-icon class="ml-1"><ArrowRight /></el-icon>
          </router-link>
        </div>
      </el-card>
    </div>

    <!-- 空状态 -->
    <div v-if="blogList.length === 0 && !loading" class="text-center py-10 text-gray-500">
      暂无博客数据
    </div>

    <!-- 分页 -->
    <el-pagination
      v-if="total > 0"
      class="mt-8"
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted} from 'vue'
import { Search, ArrowRight } from '@element-plus/icons-vue'
import { getBlogs, getCategories } from '@/services/api'
import { formatDate } from '@/utils/date'
import {getCategoryName} from '@/utils/category'

// 状态
const blogList = ref([])
const categories = ref([])
const total = ref(0)
const page = ref(1)
const pageSize = ref(5)
const searchKey = ref('')
const selectedCategory = ref('')
const loading = ref(false)

// 获取博客列表
const fetchBlogs = async () => {
  try {
    loading.value = true
    const params = {
      _page: page.value,
      _limit: pageSize.value,
      title_like: searchKey.value
    }
    if (selectedCategory.value) params.categoryId = selectedCategory.value
    const data = await getBlogs(params)
    // 模拟数据转换（适配jsonplaceholder）
    blogList.value = data.map(item => ({
      id: item.id,
      title: item.title,
      content: item.body,
      categoryId: item.userId, // 用userId模拟分类ID
      createdAt: new Date().toISOString()
    }))
    total.value = 50 // 模拟总条数
  } catch (err) {
    console.error('获取博客失败', err)
  } finally {
    loading.value = false
  }
}

// 获取分类
const fetchCategories = async () => {
  try {
    const data = await getCategories()
    categories.value = data.map((item, index) => ({
      id: index + 1,
      name: item.name || `分类${index + 1}`
    }))
  } catch (err) {
    console.error('获取分类失败', err)
  }
}

// 分页切换
const handlePageChange = (val) => {
  page.value = val
  fetchBlogs()
}

// 初始化
onMounted(() => {
  fetchCategories()
  fetchBlogs()
})
</script>