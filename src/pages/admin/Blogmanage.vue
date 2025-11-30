<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">博客管理</h2>
      <el-button type="primary" @click="$router.push('/admin/blogs/create')">
        <el-icon><Plus /></el-icon> 发布博客
      </el-button>
    </div>

    <!-- 博客表格 -->
    <el-table :data="blogList" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" />
      <el-table-column 
        label="分类" 
        width="120"
        :formatter="(row) => getCategoryName(row.categoryId)"
      />
      <el-table-column 
        label="发布时间" 
        width="180"
        :formatter="(row) => formatDate(row.createdAt)"
      />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button 
            type="text" 
            @click="$router.push(`/admin/blogs/${scope.row.id}/edit`)"
          >
            编辑
          </el-button>
          <el-button 
            type="text" 
            text-color="red" 
            @click="handleDelete(scope.row.id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination
      class="mt-6"
      :current-page="page"
      :page-size="pageSize"
      :total="total"
      @current-change="handlePageChange"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getBlogs, deleteBlog, getCategories } from '@/services/api'
import { formatDate } from '@/utils/date'

// 状态
const blogList = ref([])
const categories = ref([])
const page = ref(1)
const pageSize = ref(10)
const total = ref(0)

// 获取分类名称
const getCategoryName = computed(() => (id) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : '未知'
})

// 获取博客列表
const fetchBlogs = async () => {
  try {
    const data = await getBlogs({
      _page: page.value,
      _limit: pageSize.value
    })
    blogList.value = data.map(item => ({
      id: item.id,
      title: item.title,
      categoryId: item.userId,
      createdAt: new Date().toISOString()
    }))
    total.value = 50
  } catch (err) {
    console.error('获取博客列表失败', err)
  }
}

// 获取分类
const fetchCategories = async () => {
  const data = await getCategories()
  categories.value = data.map((item, index) => ({
    id: index + 1,
    name: item.name || `分类${index + 1}`
  }))
}

// 删除博客
const handleDelete = async (id) => {
  ElMessageBox.confirm('确定要删除这篇博客吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(async () => {
    try {
      await deleteBlog(id)
      ElMessage.success('删除成功')
      fetchBlogs() // 刷新列表
    } catch (err) {
      ElMessage.error('删除失败')
    }
  })
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