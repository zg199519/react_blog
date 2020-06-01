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
        {
          path: '/',
          name: '首页',
          component: '@/pages/home/index',
          meta: {
            title: '首页',
          },
        },
        {
          path: '/tutorial',
          name: '教程',
          component: '@/pages/tutorial/index',
          meta: {
            title: '教程',
          },
        },
        {
          path: '/story',
          name: '故事',
          component: '@/pages/story/index',
          meta: {
            title: '故事',
          },
        },
        {
          path: '/message',
          name: '留言',
          component: '@/pages/message/index',
          meta: {
            title: '留言',
          },
        },

      ]
  
  
    },
  ],
});
