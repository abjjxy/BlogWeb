<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <el-card class="w-full max-w-md p-6">
      <h2 class="text-2xl font-bold mb-6 text-center">博客管理系统</h2>
      <el-form 
        ref="formRef" 
        :model="form" 
        :rules="rules" 
        label-width="80px"
      >
        <el-form-item label="账号" prop="username">
          <el-input v-model="form.username" placeholder="请输入账号" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" placeholder="请输入密码" />
        </el-form-item>
        <el-form-item>
          <el-button 
            type="primary" 
            class="w-full" 
            @click="handleLogin"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { setToken } from '@/utils/auth'

const router = useRouter()
const formRef = ref(null)
const form = reactive({
  username: 'admin',
  password: '123456'
})
const rules = {
  username: [{ required: true, message: '请输入账号', trigger: 'blur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
}

// 登录处理
const handleLogin = async () => {
  await formRef.value.validate()
  // 模拟验证（实际需调用接口）
  if (form.username === 'admin' && form.password === '123456') {
    setToken('mock-token-123')
    ElMessage.success('登录成功')
    router.push('/admin')
  } else {
    ElMessage.error('账号或密码错误')
  }
}
</script>