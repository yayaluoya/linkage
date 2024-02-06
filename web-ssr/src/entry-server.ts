import { renderToString } from 'vue/server-renderer';
import { createApp } from './main';
import router from './router';
import { setupStore } from './store';

export async function render(url: string, ssrManifest: string) {
  const { app } = createApp();

  //引入vue全家桶
  app.use(await router);
  setupStore(app);

  await router.push(url);
  await router.isReady();

  // passing SSR context object which will be available via useSSRContext()
  // @vitejs/plugin-vue injects code into a component's setup() that registers
  // itself on ctx.modules. After the render, ctx.modules would contain all the
  // components that have been instantiated during this render call.
  const ctx = {};
  const html = await renderToString(app, ctx);

  return { html };
}
