import { createRouter, createWebHistory } from 'vue-router';
import { handleRouter } from './handleRouter';
import { RouterTool } from './RouterTool';
import { CustomizeRouterType } from './RouterType';

/**
 * 路由列表
 */
const routeList: CustomizeRouterType[] = [];

//动态注入路由
let modules = import.meta.globEager('../views/*.vue');
for (let path in modules) {
  //提取出名字
  let name = (path.match(/([a-zA-Z]+)\.vue$/)?.[1] || '').toLowerCase();
  if (name) {
    //
    routeList.push({
      path: `/${name}`,
      name: '',
      component: () => Promise.resolve(modules[path]),
      //从vue文件配置中获取获取meta的配置
      metaP: Promise.resolve(modules[path]).then((item) => {
        return item[RouterTool.vueMetaKey] || null;
      }),
    });
  }
}

const router = createRouter({
  history: createWebHistory(''),
  routes: [
    ...routeList,
  ],
})

//对路由进行额外的处理
handleRouter(router);

export default router;
