import request from './request'

// 获取会员个人信息
export function getUserInfo(data = {}) {
    return request({
      url: '/api/user/info',
      method: 'get',
      params: data
    })
}

// 获取会员统计信息
export function getUserStatistical(data = {}) {
  return request({
    url: '/api/user/statistical',
    method: 'get',
    params: data
  })
}

// 获取作者排行榜
export function getAuthorList(data = {}) {
  return request({
    url: '/api/author/lists',
    method: 'get',
    params: data
  })
}