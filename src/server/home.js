import request from './request'

// 首页数据列表
export function getList(data = {}) {
    return request({
      url: '/api/home/list',
      method: 'post',
      data
    })
}