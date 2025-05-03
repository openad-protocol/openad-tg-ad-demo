import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'vant/es/toast/style';
import 'vant/es/dialog/style';
import 'vant/es/notify/style';
import { AppEnv } from '@utils/AppEnv';
import { TonConnectUIPlugin, THEME } from '@townsquarelabs/ui-vue';

const options = {
  manifestUrl: 'https://bf2055756e.node.openad.network/static/json/tonconnect-manifest.json',
  uiPreferences: { theme: THEME.DARK },
  walletsListConfiguration: {
    includeWallets: [{
      appName: 'safepalwallet',
      name: 'SafePal',
      imageUrl: 'https://s.pvcliping.com/web/public_image/SafePal_x288.png',
      tondns: '',
      aboutUrl: 'https://www.safepal.com',
      universalLink: 'https://link.safepal.io/ton-connect',
      jsBridgeKey: 'safepalwallet',
      bridgeUrl: 'https://ton-bridge.safepal.com/tonbridge/v1/bridge',
      platforms: ['ios', 'android', 'chrome', 'firefox'],
    },
    {
      appName: 'tonwallet',
      name: 'TON Wallet',
      imageUrl: 'https://wallet.ton.org/assets/ui/qr-logo.png',
      aboutUrl: 'https://chrome.google.com/webstore/detail/ton-wallet/nphplpgoakhhjchkkhmiggakijnkhfnd',
      universalLink: 'https://wallet.ton.org/ton-connect',
      jsBridgeKey: 'tonwallet',
      bridgeUrl: 'https://bridge.tonapi.io/bridge',
      platforms: ['chrome', 'android'],
    }],
  },
  actionsConfiguration: {
    twaReturnUrl: 'https://t.me/OpenADProtocolBot/bf20',
  },
};

const app = createApp(App);
app.config.globalProperties.$AppEnv = AppEnv;
app.use(router);
app.use(TonConnectUIPlugin , options);
app.mount('#app');
