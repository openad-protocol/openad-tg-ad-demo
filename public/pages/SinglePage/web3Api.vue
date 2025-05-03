<template>
  <div class="singlePage Web3Api MFlex">
    <h2>This page is a demo for web3 Api mode to load OpenAd banner ad! </h2>
    <div v-if="TGAD.banner.resource_url && TGAD.banner.width && TGAD.banner.height" class="openADJsSDKBanner TGAD">
      <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(TGAD.adInfo)">
        <img
          :src="TGAD.banner.resource_url"
          style="max-width: 100%;max-height: 100%;object-fit: contain;"
        >
      </a>
    </div>
    <van-button v-else type="primary" @click="handleAction('GetTGAD')">
      Get TG AD
    </van-button>
    <van-button type="primary" @click="router.push('/')">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, nextTick, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageWeb3Api',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    const { proxy } = getCurrentInstance();
    /** If your web application is a web3 app and wallet was created by backend, please use the following codes. **/
    const TGAD = reactive({
      adInfo: {
        zoneId: 158, // int, This is an example zoneId, please get your own code parameters
        publisherId: 49, // int, This is an example publisherId, please get your own code parameters
      },
      adParams: {
        TG: {
          type: 'WEB3',
        },
        wallet: { // TG.type = 'WEB3', wallet is required
          type: 'api', //
          method: 'get', // GET / POST,  method is required
          chainType: 'eth', // eth / ton / kaia. chainType is required
          api: window.location.origin+window.location.pathname+proxy.$AppEnv.staticURL+'static/json/wallet.json', // here is the required API. We will call this API to get user's wallet.
        },
      },
      userInfo: { // TG.type = 'WEB3', userInfo is required
        userId: 'vincent', // user ID, is required
        firstName: 'firstName', // firstName or userId, is required
        lastName: 'lastName', // lastName or userId, is required
        username: 'username', // username or userId, is required
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

    const handleAction = async(type) => {
      if(type === 'GetTGAD'){
        let res = await window.OpenADTGJsSDK.banner.get({ adInfo: TGAD.adInfo, adParams: TGAD.adParams, userInfo: TGAD.userInfo });
        console.log('GetTGAD', JSON.stringify(res));
        if(res.code === 0){
          TGAD.banner = res.data;
          // eslint-disable-next-line no-use-before-define
          await CallBackLogInfo(TGAD.adInfo);
        }
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

    return { router, TGAD, CallBackClickInfo, handleAction };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
