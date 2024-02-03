import { Env } from '@/_d/Env';
import {
  createMemoryHistory,
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from 'vue-router';
import { handleRouter } from './handleRouter';

/**
 * 路由列表
 */
const routeList: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main',
  },
  {
    path: '/index.html',
    redirect: '/main',
  },
  {
    path: '/main',
    component: () => import('@/views/main/index.vue'),
  },
  {
    path: '/public',
    component: () => import('@/views/public/index.vue'),
    redirect: '/public/null',
    children: [
      {
        path: 'test',
        component: () => import('@/views/public/Test.vue'),
      },
      {
        path: 'null',
        component: () => import('@/views/public/Null.vue'),
      },
    ],
  },
  {
    path: '/:_(.*)*',
    redirect: '/public/null',
  },
];

//打印所有路由信息
Env.ifDev && console.log('路由列表', routeList);

//创建router的实例
const router = createRouter({
  history: createWebHistory(),
  //路由切换后回到顶部
  scrollBehavior: () => ({ top: 0 }),
  routes: routeList,
});

//对路由进行额外的处理
handleRouter(router);

export default router;
