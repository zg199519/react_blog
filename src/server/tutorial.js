import request from './request'

// 获取小册列表
export function getList(data = {}) {
    return request({
      url: '/api/tutorial/getLists',
      method: 'post',
      data
    })
}