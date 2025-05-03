<template>
  <div class="singlePage normal MFlex">
    <h2>This page is a demo for normal mode to load OpenAd ads! </h2>
    <div class="openADJsSDKBanner TGAD" :zoneId="TGAD.adInfo.zoneId" :publisherId="TGAD.adInfo.publisherId" />
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
  name: 'SinglePageNormal',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    /** If your web application is a TMA (Telegram Mini App), please use the following codes. **/
    const TGAD = reactive({
      adInfo: {
        zoneId: 158, // int, This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        TG: {
          type: 'TMA', // TMA, WEB, WEB3
        },
        wallet: { // If you have a web3 wallet components, Optional
          type: '', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: null, // here is a provider object after wallet initialization.
          components: '', // web3 wallet components name
        },
      },
    });

    onMounted(() => {
      nextTick(() => {
        window.OpenADTGJsSDK.banner.init({ ...TGAD });
      });
    });

    return { router, TGAD };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
