import request from './request';

// 活动数据列表
export function getActivityList(data = {}) {
  return request({
    url: '/api/activity/list',
    method: 'get',
    params: data,
  });
}
