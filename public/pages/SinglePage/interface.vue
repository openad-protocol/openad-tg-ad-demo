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
    <div class="openADJsSDKBanner WEBAD" v-if="WEBAD.banner.resource_url && WEBAD.banner.width && WEBAD.banner.height">
      <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(WEBAD.adInfo)">
        <img
          :src="WEBAD.banner.resource_url"
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
    /** If your web application is a TMA (Telegram Mini App), please use the following code. **/
    const TGAD = reactive({
      adInfo: {
        zoneId: 114, // int,  This is an example zoneId, please get your own code parameters
        publisherId: 91, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        version: 'v4', //your app version , If there is no data, please leave it blank
        TG: true,
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
        version: 'v4', //your app version , If there is no data, please leave it blank
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
      // eslint-disable-next-line no-use-before-define
      getWEBAD();
    });

    const getTGAD = async () => {
      let res = await window.OpenADTGJsSDK.banner.get({ adInfo: TGAD.adInfo, adParams: TGAD.adParams });
      console.log('getTGAD', JSON.stringify(res));
      if(res.code === 0){
        TGAD.banner = res.data;
        // eslint-disable-next-line no-use-before-define
        await CallBackLogInfo(TGAD.adInfo);
      }
      /**
       * code: 0, data: {  } // openAD.banner object and values
       * code: -1, msg: 'load extend js error!'
       * code: -2, msg: 'get openAD ads error!'
       * code: -3, msg: 'Ajax Request 404 !'
       * code: -4, msg: 'Ajax Request Timeout !'
       * code: -5, msg: 'Ajax Request Error !'
       **/
    }

    const getWEBAD = async () => {
      let res = await window.OpenADTGJsSDK.banner.get({ adInfo: WEBAD.adInfo, adParams: WEBAD.adParams, userInfo: WEBAD.userInfo });
      console.log('getWEBAD', JSON.stringify(res));
      if(res.code === 0){
        WEBAD.banner = res.data;
        // eslint-disable-next-line no-use-before-define
        await CallBackLogInfo(WEBAD.adInfo);
      }
      /**
       * code: 0, data: {  } // openAD.banner object and values
       * code: -1, msg: 'load extend js error!'
       * code: -2, msg: 'get openAD ads error!'
       * code: -3, msg: 'Ajax Request 404 !'
       * code: -4, msg: 'Ajax Request Timeout !'
       * code: -5, msg: 'Ajax Request Error !'
       **/
    }

    const CallBackLogInfo = (adInfo) => {
      nextTick(async() => {
        let res = await window.OpenADTGJsSDK.banner.log(adInfo);
        if(res.code === 0){
          console.log(res.msg);
        }else{
          console.log(res.msg);
        }
        /**
         * code: 0, msg: 'send log info successfully'
         * code: -1, msg: 'can not find resource'
         * code: -2, msg: 'send log info failed'
         * code: -3, msg: 'Ajax Request 404 !'
         * code: -4, msg: 'Ajax Request Timeout !'
         * code: -5, msg: 'Ajax Request Error !'
         **/
      });
    }

    const CallBackClickInfo = (adInfo) => {
      window.OpenADTGJsSDK.banner.click(adInfo);
      // SDK will open a new app by the above function;
      // No Callback, if you want to do sth, you should use yourself functions or methods;
    }

    return { router, TGAD, WEBAD, CallBackClickInfo }
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
