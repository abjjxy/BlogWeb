/**
 * 存储Token
 * @param {string} token 
 */
export const setToken = (token) => {
  localStorage.setItem('blog_token', token)
}

/**
 * 获取Token
 * @returns {string|null}
 */
export const getToken = () => {
  return localStorage.getItem('blog_token') || null
}

/**
 * 移除Token
 */
export const removeToken = () => {
  localStorage.removeItem('blog_token')
}

/**
 * 判断是否登录
 * @returns {boolean}
 */
export const isLogin = () => {
  return !!getToken()
}