import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    {
      path: '/',
      component: '@/pages/app',
      routes: [
        // 负责跳转
        {
          path: '/',
          redirect: '/home',
        },
        // 编辑器
        {
          path: '/editor',
          name: '写文章',
          component: '@/pages/editor/index',
          headerShow: false,
          title: '写文章',
        },
        // 写小册
        {
          path: '/editor_book/:bookId?/:articleId?',
          name: '写小册',
          component: '@/pages/editor/book',
          headerShow: false,
          title: '写小册',
        },
        {
          path: '/home/:category?/:tag?',
          name: '首页',
          component: '@/pages/home/index',
          title: '首页',
        },
        {
          path: '/tutorial/:category?',
          name: '教程',
          component: '@/pages/tutorial/index',
          title: '教程',
        },
        {
          path: '/story/:topicId?',
          name: '帖子',
          component: '@/pages/story/index',
          title: '帖子',
        },
        {
          path: '/activity',
          name: '活动',
          component: '@/pages/activity/index',
          title: '活动',
        },
      ],
    },
  ],
  //全局环境配置
  define: {
    API_BASE_URL:
      process.env.NODE_ENV === 'development' ? '/api' : 'http://127.0.0.1:7001',
  },
  // 代理配置
  proxy: {
    '/api': {
      target: 'http://127.0.0.1:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
});
