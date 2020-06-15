import request from './request'

// 获取帖子列表
export function storyList(data = {}) {
    return request({
      url: '/api/story/lists',
      method: 'post',
      data
    })
}

// 获取帖子分类
export function getCategoryList(data = {}) {
    return request({
      url: '/api/story/categoryList',
      method: 'get',
      params: data
    })
}