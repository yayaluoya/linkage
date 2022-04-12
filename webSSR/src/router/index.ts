import { Env } from '@/_d/Env';
import { createMemoryHistory, createRouter, createWebHistory, Router, RouteRecordRaw } from 'vue-router';
import { addRouteList, filterRoute, handleRouter } from './handleRouter';
import { RouterTool } from './RouterTool';

/**
 * 路由列表
 */
const routeList: RouteRecordRaw[] = [];

/** 视图目录 */
let viewUrl = '../views/';

//view文件夹下的所有vue组件
let coms: {
  path: string,
  com: Promise<Record<string, any>>,
}[] = [];
//
let modules = import.meta.globEager('../views/**/*.vue')
for (let path in modules) {
  //过滤掉一些特殊的组件
  if (filterRoute(path)) {
    coms.push({
      path,
      com: Promise.resolve(modules[path]),
    });
  }
}

/** 一个promise的router */
const router = new Promise<Router>(async (r, e) => {
  //遍历消耗掉所有组件列表
  while (coms.length > 0) {
    //从尾部开始遍历
    let _onCom = coms.pop()!;
    //路径列表
    let dirs = (_onCom.path.replace(/\.vue$/, '')
      .replace(viewUrl, '') || '')
      .split('/')
      .filter(Boolean)
      //大写转小写
      .map((item) => {
        //提取出名字，首字母转小写，其它大写字母转小写并用_连接
        return item.replace(/^[A-Z]/, (_) => _.toLowerCase())
          .replace(/[A-Z]/g, (_) => `_${_.toLowerCase()}`);
      })
      //动态路由转换
      .map((item) => {
        return item.replace(/[&$@]/, '/:');
      });
    //
    if (dirs.length > 0) {
      let onRoutes = routeList;
      let onRoute: RouteRecordRaw;
      let onParentRoute!: RouteRecordRaw;
      for (let [index, dir] of dirs.entries()) {
        //对多余的/符号进行去重
        let path = `${index == 0 ? '/' : ''}${dir}`.replace(/\/{2,}/g, '/');
        onRoute = onRoutes.find((item) => {
          return new RegExp(`^/?${dir}$`, 'i').test(item.path);
        })!;
        //如果是最后一层则表示遇到的是文件
        if (index == dirs.length - 1) {
          let _comOp = {
            component: () => _onCom.com,
            //合并.vue文件中导出的配置
            ... await _onCom.com.then((item) => {
              return item[RouterTool.vueRouteExportRawKey];
            }),
          };
          //如果文件名为index的话则作为父路由的组件
          if (dir == 'index') {
            if (onParentRoute) {
              for (let i in _comOp) {
                (onParentRoute as any)[i] = _comOp[i];
              }
            }
          } else {
            onRoutes.push({
              path: path,
              name: dirs.join('/'),
              ..._comOp,
            });
          }
          break;
        }
        //如果是目录且不存在的话就创建一个空的占位目录
        if (!onRoute) {
          onRoute = {
            path: path,
            //截取前面的dir
            name: [...dirs].splice(0, index + 1).join('/'),
            children: [],
            //这里是作为目录类型的route，所以先不要加component和metap，后面遇到该目录下的index文件再加上去
            component: null as any,
          };
          onRoutes.push(onRoute);
        }
        //
        onParentRoute = onRoute;
        onRoutes = onRoute.children as RouteRecordRaw[];
      }
    }
  }

  //加入其它的路由
  addRouteList(routeList);

  //打印所有路由信息
  Env.ifDev && Env.ifC && console.log('自动生成的路由列表', routeList);

  //创建router的实例
  const router = createRouter({
    history: Env.ifSSR ? createMemoryHistory() : createWebHistory(),
    //路由切换后回到顶部
    scrollBehavior: () => ({ top: 0 }),
    routes: [
      ...routeList,
    ],
  })
  //对路由进行额外的处理
  handleRouter(router);
  //解决
  r(router);
});

export default router;
