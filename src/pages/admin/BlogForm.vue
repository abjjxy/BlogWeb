<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <h2 class="text-xl font-bold mb-6">{{ isEdit ? '编辑博客' : '发布博客' }}</h2>
    
    <el-form 
      ref="formRef" 
      :model="form" 
      :rules="rules" 
      label-width="80px"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="分类" prop="categoryId">
        <el-select v-model="form.categoryId" placeholder="请选择分类">
          <el-option 
            v-for="c in categories" 
            :key="c.id" 
            :label="c.name" 
            :value="c.id" 
          />
        </el-select>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input 
          v-model="form.content" 
          type="textarea" 
          rows="15" 
          placeholder="请输入Markdown内容"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">保存</el-button>
        <el-button @click="$router.back()">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCategories, createBlog, updateBlog, getBlogById } from '@/services/api'

const route = useRoute()
const router = useRouter()
const formRef = ref(null)
const blogId = route.params.id
const isEdit = !!blogId

// 表单数据
const form = reactive({
  title: '',
  content: '',
  categoryId: ''
})

// 验证规则
const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  categoryId: [{ required: true, message: '请选择分类', trigger: 'change' }],
  content: [{ required: true, message: '请输入内容', trigger: 'blur' }]
}

// 分类列表
const categories = ref([])

// 获取分类
const fetchCategories = async () => {
  const data = await getCategories()
  categories.value = data.map((item, index) => ({
    id: index + 1,
    name: item.name || `分类${index + 1}`
  }))
}

// 获取博客详情（编辑时） 
const fetchBlog = async () => {
  const data = await getBlogById(blogId)
  form.title = data.title
  form.content = data.body
  form.categoryId = data.userId // 模拟分类ID
}

// 提交表单
const handleSubmit = async () => {
  await formRef.value.validate()
  try {
    if (isEdit) {
      await updateBlog(blogId, {
        title: form.title,
        body: form.content,
        userId: form.categoryId
      })
      ElMessage.success('更新成功')
    } else {
      await createBlog({
        title: form.title,
        body: form.content,
        userId: form.categoryId
      })
      ElMessage.success('发布成功')
    }
    router.push('/admin/blogs')
  } catch (err) {
    ElMessage.error('操作失败')
  }
}

// 初始化
onMounted(() => {
  fetchCategories()
  if (isEdit) fetchBlog()
})
</script>