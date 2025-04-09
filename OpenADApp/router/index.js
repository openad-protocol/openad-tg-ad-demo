import { createRouter, createWebHashHistory } from 'vue-router';
import pathList from './pathList';

const router = createRouter({
  history: createWebHashHistory(),
  routes: pathList,
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

router.beforeEach(async (to, from, next) => {
  if(to.path === '/'){
    return next('/home/index');
  }
  next();
});

router.onError(error => {
  console.warn('router error', error.message);
});

router.afterEach(() => {
});


export default router;

