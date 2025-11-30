<template>
  <div class="py-6 max-w-4xl mx-auto">
    <el-card v-loading="loading">
      <div class="mb-6">
        <h1 class="text-3xl font-bold mb-4">{{ blog.title }}</h1>
        <div class="text-gray-500 mb-6">
          <span>分类：{{ getCategoryName(blog.value.categoryId,categories) }}</span>
          <span class="mx-2">|</span>
          <span>{{ formatDate(blog.createdAt) }}</span>
        </div>
        <div class="prose max-w-none" v-html="renderedContent"></div>
      </div>
      <el-button @click="$router.push('/')">返回列表</el-button>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { getBlogById, getCategories } from '@/services/api'
import { mdToHtml } from '@/utils/markdown'
import { formatDate } from '@/utils/date'
import {getCategoryName} from '@/utils/category'

// 路由参数
const route = useRoute()
const blogId = route.params.id

// 状态
const blog = ref({})
const categories = ref([])
const loading = ref(true)

// 渲染Markdown
const renderedContent = computed(() => mdToHtml(blog.value.content || ''))

// 获取博客详情
const fetchBlog = async () => {
  try {
    loading.value = true
    const data = await getBlogById(blogId)
    blog.value = {
      id: data.id,
      title: data.title,
      content: data.body,
      categoryId: data.userId, // 模拟分类ID
      createdAt: new Date().toISOString()
    }
  } catch (err) {
    console.error('获取博客详情失败', err)
  } finally {
    loading.value = false
  }
}

// 初始化
onMounted(() => {
  getCategories().then(data => {
    categories.value = data.map((item, index) => ({
      id: index + 1,
      name: item.name || `分类${index + 1}`
    }))
  })
  fetchBlog()
})
</script>