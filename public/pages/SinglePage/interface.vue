<template>
  <div class="singlePage interface MFlex">
    <h2>This page is a demo for interface mode to load OpenAd ad! </h2>
    <div class="openADJsSDKBanner TGAD" v-if="TGAD.banner.resource_url && TGAD.banner.width && TGAD.banner.height">
      <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(TGAD.adInfo)">
        <img
          :src="TGAD.banner.resource_url"
          style="max-width: 100%;max-height: 100%;object-fit: contain;"
        >
      </a>
    </div>
    <van-button @click="router.push('/')" type="primary">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, onMounted, reactive, nextTick } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageInterface',
  components: {
    'van-button': Button,
  },
  setup(){
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
      },
      banner: {
        'width': null,
        'type': 'banner',
        'height': null,
        'resource_id': null,
        'resource_url': '',
        'resource_text': '',
        'resource_desc': '',
      },
    });

    onMounted( () => {
      // eslint-disable-next-line no-use-before-define
      getTGAD();
    });

    const getTGAD = async () => {
      let res = await window.OpenADTGJsSDK.banner.get({ adInfo: TGAD.adInfo, adParams: TGAD.adParams });
      console.log('getTGAD', JSON.stringify(res));
      if(res.code === 0){
        TGAD.banner = res.data;
        // eslint-disable-next-line no-use-before-define
        await CallBackLogInfo(TGAD.adInfo);
      }
    }


    const CallBackLogInfo = (adInfo) => {
      nextTick(async() => {
        let res = await window.OpenADTGJsSDK.banner.log(adInfo);
        if(res.code === 0){
          console.log(res.msg);
        }else{
          console.log(res.msg);
        }
      });
    }

    const CallBackClickInfo = (adInfo) => {
      window.OpenADTGJsSDK.banner.click(adInfo);
      // SDK will open a new app by the above function;
      // No Callback, if you want to do sth, you should use yourself functions or methods;
    }

    return { router, TGAD, CallBackClickInfo }
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
