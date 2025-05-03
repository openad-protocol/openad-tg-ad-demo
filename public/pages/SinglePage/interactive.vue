<template>
  <div class="singlePage interactive MFlex">
    <h2>This page is a demo for interactive mode to load OpenAd ads! </h2>
    <van-button @click="Render" type="primary" v-if="openADInteractive.hasAD">
      Render
    </van-button>
    <van-button @click="router.push('/')" type="primary">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, onMounted, nextTick } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageInteractive',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    /** If your web application is a TMA (Telegram Mini App), please use the following codeS. **/
    const openADInteractive = reactive({
      adInfo: {
        zoneId: 159, // int, This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        TG: {
          type: 'TMA', // TMA, WEB, WEB3
          isFullscreen: false, // true: If your TMA is in fullscreen mode
        },
      },
      hasAD: false,
    });

    onMounted(() => {
      nextTick(() => {
        window.OpenADTGJsSDK.interactive.init({ ...openADInteractive }).then(res => {
          openADInteractive.hasAD = res.code === 0;
          console.log('res', res);
          if(res.code === 0){
            // eslint-disable-next-line no-use-before-define
            Render();
          }
          // hasAD = true, you can callback Render function, user can load an interactive ad;
          // hasAD = false, you can't callback Render function, user can't load an interactive ad;
        });
      });
    });

    const cb = {
      // indicates load ad resource from OpenAD platform, false will be returned if there is no resource to be loaded for the publisher slot/zone
      onAdResourceLoad: (e) => {
        console.log('onAdResourceLoad', e);  // e = true / false
      },
      // indicates the interactive ad is opening
      onAdOpening: (e) => {
        console.log('onAdOpening', e); // e = true / false
      },
      // indicates the interactive ad is opened,
      onAdOpened: (e) => {
        console.log('onAdOpened', e);  // e = true / false
      },
      // indicates the interactive ad task is finished, the task is defined by advertiser, return task status
      // judgment of issuing rewards, use this to return
      onAdTaskFinished: (e) => {
        console.log('onAdTaskFinished', e);  // e = true / false
      },
      // indicates the interactive ad is closing
      onAdClosing: (e) => {
        console.log('onAdClosing', e);  // e = true / false
      },
      // indicates the interactive ad is closed
      onAdClosed: (e) => {
        console.log('onAdClosed', e);  // e = view / click / close
        // view: viewed Ad completed, not clicked, not manually closed ads; client side needs to issue rewards level 1.
        // click: click Ad completed, include viewed Ad, not manually closed ads; client side needs to issue rewards level 2.
        // close: user manually closed ads. client side can not get any rewards.
        // If you want to perform different steps based on different shutdown states, please write the code here.
      },
      // indicates clicked and jumps
      onAdClick: (e) => {
        console.log('onAdClick', e);  // e = true / false
      },
    };

    const Render = () => {
      window.OpenADTGJsSDK.interactive.getRender({ adInfo: openADInteractive.adInfo, cb });
    }

    return { router, Render, openADInteractive };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
