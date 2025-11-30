import request from '@/utils/request'

// 前台API
export const getBlogs = (params) => request.get('/posts', { params })
export const getBlogById = (id) => request.get(`/posts/${id}`)
export const getCategories = () => request.get('/users') // 用users模拟分类

// 后台API（模拟）
export const createBlog = (data) => request.post('/posts', data)
export const updateBlog = (id, data) => request.put(`/posts/${id}`, data)
export const deleteBlog = (id) => request.delete(`/posts/${id}`)