import request from './request';

// 获取小册列表
export function getList(data = {}) {
  return request({
    url: '/api/home/bookList',
    method: 'post',
    data,
  });
}
