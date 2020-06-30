import request from './request';

// 首页数据列表
export function getList(data = {}) {
  return request({
    url: '/api/home/list',
    method: 'post',
    data,
  });
}

// 首页我的文章列表
export function myArticleList(data = {}) {
  return request({
    url: '/api/home/myArticleList',
    method: 'post',
    data,
  });
}

// 文章详情
export function articleDetail(data = {}) {
  return request({
    url: '/api/home/articleDetail',
    method: 'get',
    params: data,
  });
}

// 新增书籍
export function addBook(data = {}) {
  return request({
    url: '/api/home/addBook',
    method: 'post',
    data,
  });
}

// 新增文章
export function addArticle(data = {}) {
  return request({
    url: '/api/home/addArticle',
    method: 'post',
    data,
  });
}

// 修改小册
export function modifyBook(data = {}) {
  return request({
    url: '/api/home/modifyBook',
    method: 'post',
    data,
  });
}

// 修改文章
export function modifyArticle(data = {}) {
  return request({
    url: '/api/home/modifyArticle',
    method: 'post',
    data,
  });
}
