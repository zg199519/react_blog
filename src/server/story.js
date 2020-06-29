import request from './request';

// 获取帖子话题
export function getCategoryList(data = {}) {
  return request({
    url: '/api/topic/list',
    method: 'get',
    params: data,
  });
}
