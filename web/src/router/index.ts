import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Test from '@/views/Test.vue';
import Null from '@/views/Null.vue';
import { handleRouter } from './handleRouter';

/**
 * 路由mata数据类型
 */
export interface IRouterMata {
  /** 是否显示到路由列表中 */
  ifShow: boolean;
  /** 导航名字 */
  navName: string;
}

/**
 * 页面枚举
 */
export enum EPage {
  Home = '/',
  Null = '/Null',
}

/** 空页面路由 */
export const NullRoute: RouteRecordRaw = {
  path: EPage.Null,
  name: 'Null',
  meta: {
    ifShow: false,
    navName: '空页面',
  },
  component: Null,
};

/**
 * 路由列表
 */
const routeList: Array<RouteRecordRaw> = []

/** 其他路由列表 */
const otherRouters: RouteRecordRaw[] = [
  {
    path: '/test',
    name: 'test',
    component: Test,
    meta: {
      ifShow: false,
      navName: '测试页面',
    },
  },
];

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    NullRoute,
    ...otherRouters,
    ...routeList,
  ],
})

//对路由进行额外的处理
handleRouter(router);

export default router
