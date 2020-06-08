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
});
