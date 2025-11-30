# BlogWeb - 博客管理系统

## 项目简介
基于 Vue3 + Element Plus 开发的轻量级博客管理系统，包含前台博客展示和后台内容管理两大核心模块，支持 Markdown 博客编辑、分类管理、响应式布局等功能。

## 技术栈
- 前端框架：Vue 3 (Composition API)
- UI 组件库：Element Plus
- 路由管理：Vue Router 4
- 样式：Tailwind CSS
- HTTP 请求：Axios
- 构建工具：Vite
- Markdown 处理：marked + highlight.js

## 快速启动
1. 克隆仓库
```bash
git clone https://github.com/abjjxy/BlogWeb.git
cd BlogWeb
2. 安装依赖
npm install
npm run dev
npm run build

##核心功能
前台:
博客列表 / 详情展示（Markdown 渲染）
分类筛选、关键词搜索
响应式适配多设备
后台:
管理员登录 / 鉴权
博客发布 / 编辑 / 删除
博客分类管理
备注:
默认后台账号：admin / 123456