import request from '@/utils/request'

// 获取联想建议
export const getSearchSuggestions = searchValue => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: searchValue
    }
  })
}
