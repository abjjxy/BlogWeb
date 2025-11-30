/**
 * 格式化日期为 YYYY-MM-DD
 * @param {string|Date} date 
 * @returns {string}
 */
export const formatDate = (date) => {
  if (!date) return ''
  const target = new Date(date)
  if (isNaN(target.getTime())) return ''
  const year = target.getFullYear()
  const month = String(target.getMonth() + 1).padStart(2, '0')
  const day = String(target.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}