import router from '.';
import { EPage } from './EPage';

/**
 * 页面工具
 */
export class PageTool {
  /**
   * 去一个会回退的页面
   * @param path
   * @param query
   */
  static async toBackPage(path: EPage, query: any = {}) {
    let _router = await router;
    await _router.push({
      path,
      query: {
        back:
          _router.currentRoute.value.query.back || _router.currentRoute.value.fullPath,
        ...query,
      },
    });
  }

  /**
   * 页面回退
   */
  static async pageBack(path: EPage = EPage.Main, query: any = {}) {
    let _router = await router;
    await _router.push({
      path: (_router.currentRoute.value.query.back as string) || path,
      query,
    });
  }
}
