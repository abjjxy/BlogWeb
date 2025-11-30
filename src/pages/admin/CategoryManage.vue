<template>
  <div class="bg-white p-6 rounded-lg shadow-sm">
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-xl font-bold">分类管理</h2>
      <el-button type="primary" @click="openAddDialog">
        <el-icon><Plus /></el-icon> 添加分类
      </el-button>
    </div>

    <!-- 分类表格 -->
    <el-table :data="categories" border>
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="name" label="分类名称" />
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button 
            type="text" 
            @click="handleEdit(scope.row)"
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

    <!-- 添加/编辑分类对话框 -->
    <el-dialog 
      :title="isEditDialog ? '编辑分类' : '添加分类'" 
      v-model="showAddDialog"
    >
      <el-form 
        ref="categoryFormRef" 
        :model="categoryForm" 
        :rules="categoryRules"
        label-width="80px"
      >
        <el-form-item label="分类名称" prop="name">
          <el-input v-model="categoryForm.name" placeholder="请输入分类名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showAddDialog = false">取消</el-button>
        <el-button type="primary" @click="handleCategorySubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { Plus } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCategories } from '@/services/api' // 实际需补充分类CRUD接口

// 状态
const categories = ref([])
const showAddDialog = ref(false)
const isEditDialog = ref(false)
const currentCategoryId = ref(null)

// 分类表单
const categoryForm = reactive({
  name: ''
})
const categoryRules = {
  name: [{ required: true, message: '请输入分类名称', trigger: 'blur' }]
}
const categoryFormRef = ref(null)

// 获取分类列表
const fetchCategories = async () => {
  const data = await getCategories()
  categories.value = data.map((item, index) => ({
    id: index + 1,
    name: item.name || `分类${index + 1}`
  }))
}

// 打开添加对话框
const openAddDialog = () => {
  isEditDialog.value = false
  currentCategoryId.value = null
  categoryForm.name = ''
  showAddDialog.value = true
}

// 打开编辑对话框
const handleEdit = (row) => {
  isEditDialog.value = true
  currentCategoryId.value = row.id
  categoryForm.name = row.name
  showAddDialog.value = true
}

// 提交分类表单（模拟）
const handleCategorySubmit = async () => {
  await categoryFormRef.value.validate()
  try {
    if (isEditDialog.value) {
      // 模拟更新
      const index = categories.value.findIndex(c => c.id === currentCategoryId.value)
      categories.value[index].name = categoryForm.name
      ElMessage.success('更新成功')
    } else {
      // 模拟新增
      const newId = categories.value.length + 1
      categories.value.push({ id: newId, name: categoryForm.name })
      ElMessage.success('添加成功')
    }
    showAddDialog.value = false
  } catch (err) {
    ElMessage.error('操作失败')
  }
}

// 删除分类（模拟）
const handleDelete = (id) => {
  ElMessageBox.confirm('确定要删除该分类吗？', '提示', {
    type: 'warning'
  }).then(() => {
    categories.value = categories.value.filter(c => c.id !== id)
    ElMessage.success('删除成功')
  })
}

// 初始化
onMounted(() => {
  fetchCategories()
})
</script>