import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import { AppEnv } from '@utils/AppEnv';

String.prototype.replaceAll = function (s1, s2) {
  return this.replace(new RegExp(s1, 'gm'), s2);
};
const app = createApp(App);
app.config.globalProperties.$AppEnv = AppEnv;
app.use(router);
app.mount('#app');
