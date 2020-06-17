// 封装本地存储相关操作

const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(key, value)
}

const getItem = key => {
  const data = window.localStorage.getItem(key)
  try {
    return JSON.parse(data)
  } catch (err) {
    return data
  }
}

const removeItem = key => {
  window.localStorage.removeItem(key)
}

module.exports = { setItem, getItem, removeItem }
