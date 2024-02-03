import { App } from 'vue';
import ElementPlus, { ID_INJECTION_KEY } from 'element-plus';
// TODO 这里有个大坑，就是打包到node上会找不到这个模块，所以要加个.js的后缀
import zhCn from 'element-plus/dist/locale/zh-cn';
import svgIcon from '>/SvgIcon/index.vue';

let myCom = import.meta.globEager('./components/my/**/*.vue');

/**
 * 处理app
 * @param app
 */
export async function handleApp(app: App<Element>) {
  /** 注册svg组件 */
  app.component('svg-icon', svgIcon);

  //注册全局的my组件
  for (let path in myCom) {
    app.component(
      'my-' +
        path.match(/([a-zA-Z]+)\.vue$/)![1].replace(/[A-Z]/g, (_, index) => {
          if (index == 0) {
            return _.toLowerCase();
          } else {
            return '-' + _.toLowerCase();
          }
        }),
      myCom[path].default,
    );
  }

  //注入elment中的组件
  app.use(ElementPlus, {
    locale: zhCn,
  });

  //TODO 暂时不知道这个有什么用
  app.provide(ID_INJECTION_KEY, {
    prefix: 0,
    current: 0,
  });
}
