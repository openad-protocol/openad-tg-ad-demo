<template>
  <div class="singlePage normal MFlex">
    <h2>This page is a demo for normal mode to load OpenAd ads! </h2>
    <div class="openADJsSDKBanner TGAD" :zoneId="TGAD.adInfo.zoneId" :publisherId="TGAD.adInfo.publisherId" />
    <div class="openADJsSDKBanner WEBAD" :zoneId="WEBAD.adInfo.zoneId" :publisherId="WEBAD.adInfo.publisherId" />
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
    /** If your web application is a TMA (Telegram Mini App), please use the following code. **/
    const TGAD = reactive({
      adInfo: {
        zoneId: 158, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        version: 'v4', //your app version , If there is no data, please leave it blank
        TG: true,
      },
    });
    /** If your web application is not TMA, please use the following code. **/
    const WEBAD = reactive({
      adInfo: {
        zoneId: 158, // int, This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      userInfo: {
        userId: 'userId', // user ID , If there is no data, please leave it blank
        firstName: 'firstName', // firstName or userId , If there is no data, please leave it blank
        lastName: 'lastName', // lastName or userId , If there is no data, please leave it blank
        username: 'username', // username or userId , If there is no data, please leave it blank
      },
      adParams: {
        version: 'v3', //your app version , If there is no data, please leave it blank
      },
    });

    onMounted(() => {
      nextTick(() => {
        window.OpenADTGJsSDK.banner.init({ ...TGAD });
        window.OpenADTGJsSDK.banner.init({ ...WEBAD });
      });
    });

    return { router, WEBAD, TGAD };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
