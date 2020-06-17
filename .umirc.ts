import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { 
      path: '/', 
      component: '@/pages/app' ,
      routes: [
        // 负责跳转
        {
          path: '/',
          redirect: '/home',
        },
        {
          path: '/home/:category?/:tag?',
          name: '首页',
          component: '@/pages/home/index',
          meta: {
            title: '首页',
          },
        },
        {
          path: '/tutorial/:category?',
          name: '教程',
          component: '@/pages/tutorial/index',
          meta: {
            title: '教程',
          },
        },
        {
          path: '/story/:category?',
          name: '帖子',
          component: '@/pages/story/index',
          meta: {
            title: '帖子',
          },
        },
        {
          path: '/activity',
          name: '活动',
          component: '@/pages/activity/index',
          meta: {
            title: '活动',
          },
        },

      ]
  
  
    },
  ],
  //全局环境配置
  define: {
    API_BASE_URL: (process.env.NODE_ENV === 'development')?'/api':'http://192.168.71.97:8000',
  },
  // 代理配置
  proxy: {
    '/api': {
      'target': 'http://192.168.71.97:8000',
      'changeOrigin': true,
      'pathRewrite': { '^/api' : '' },
    },
  },


});
