
import { AppEnv } from '@utils/AppEnv';

const pathList = [{
  path: '/',
  name: 'LayOut',
  meta: { title: AppEnv.title, keepAlive: false },
  component: () => import(/* webpackChunkName: "LayOut" */'@/pages/Layout.vue'),
  // eslint-disable-next-line array-bracket-newline
  children: [
    {
      path: '/home/index',
      name: 'HomeIndex',
      meta: { title: 'home', keepAlive: false },
      component: () => import(/* webpackChunkName: "HomeIndex" */'@/pages/home/index.vue'),
    },
    {
      path: '/SinglePage/normal',
      name: 'SinglePageNormal',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageNormal" */'@/pages/SinglePage/normal.vue'),
    },
    {
      path: '/SinglePage/interface',
      name: 'SinglePageInterface',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageInterface" */'@/pages/SinglePage/interface.vue'),
    },
    {
      path: '/SinglePage/native',
      name: 'SinglePageNative',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageNative" */'@/pages/SinglePage/native.vue'),
    },
    {
      path: '/SinglePage/interactive',
      name: 'SinglePageInteractive',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageInteractive" */'@/pages/SinglePage/interactive.vue'),
    },
    {
      path: '/SinglePage/web3Provider',
      name: 'SinglePageWeb3Provider',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWeb3Provider" */'@/pages/SinglePage/web3Provider.vue'),
    },
    {
      path: '/SinglePage/web3Api',
      name: 'SinglePageWeb3Api',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWeb3Api" */'@/pages/SinglePage/web3Api.vue'),
    },
    {
      path: '/SinglePage/webApi',
      name: 'SinglePageWebApi',
      meta: { title: '', keepAlive: false },
      component: () => import(/* webpackChunkName: "SinglePageWebApi" */'@/pages/SinglePage/webApi.vue'),
    },
  ],
}];
export default pathList;
