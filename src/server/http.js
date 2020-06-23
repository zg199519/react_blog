import request from './request'

// 获取分类列表
export function categoryList(data = {}) {
    return request({
      url: '/api/category/list',
      method: 'post',
      data
    })
}

// 获取分类二级标签列表
export function tagList(data = {}) {
  return request({
    url: '/api/tags/lists',
    method: 'get',
    params: data
  })
}

// 广告
export function advertising(data = {}) {
  return request({
    url: '/api/advertising',
    method: 'get',
    params: data
  })
}