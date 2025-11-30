// 根据分类ID获取名称
export const getCategoryName =(id,categories) => {
  const cat = categories.find(c => c.id === id)
  return cat ? cat.name : '未知'
}