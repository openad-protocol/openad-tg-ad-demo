<template>
  <div class="singlePage normal MFlex">
    <h2>This page is a demo for web3 provider mode to load OpenAd banner ad! </h2>
    <template v-if="tonConnectUI.connected">
      <div v-if="TGAD.banner.resource_url && TGAD.banner.width && TGAD.banner.height" class="openADJsSDKBanner TGAD">
        <a href="javascript:void(0)" class="Flex" rel="noopener nofollow" @click="CallBackClickInfo(TGAD.adInfo)">
          <img
            :src="TGAD.banner.resource_url"
            style="max-width: 100%;max-height: 100%;object-fit: contain;"
          >
        </a>
      </div>
      <van-button type="primary" @click="handleAction('GetTGAD')" v-else>
        Get TG AD
      </van-button>
    </template>
    <template v-else>
      <van-button type="primary" @click="open">
        Connect Ton Wallet
      </van-button>
    </template>
    <van-button type="primary" @click="router.push('/')">
      Go Home
    </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, reactive, nextTick, watch } from 'vue';
import { useRouter } from 'vue-router';
/** @townsquarelabs/ui-vue components codes **/
import { useTonAddress, useTonConnectModal, useTonConnectUI } from '@townsquarelabs/ui-vue';

export default defineComponent({
  name: 'SinglePageWeb3Provider',
  components: {
    'van-button': Button,
  },
  setup() {
    const router = useRouter();
    const walletInfo = reactive({
      address: '', //
    });
    const { tonConnectUI } = useTonConnectUI();
    console.log('tonConnectUI', tonConnectUI);
    const userFriendlyAddress = useTonAddress();
    //console.log('userFriendlyAddress', useTonAddress);
    const { open } = useTonConnectModal();
    watch(userFriendlyAddress, async (newVal) => {
      console.log('userFriendlyAddress', newVal);
    });
    /** If your web application is a web3 app and has a wallet provider, please use the following codes. **/
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
          type: 'ton', // eth: eth wallet, kaia: line wallet, ton: ton wallet;
          provider: {
            ...tonConnectUI.account,
            userFriendlyAddress,
          }, // this is a demo to use @townsquarelabs/ui-vue, Modal is the wallet provider
          components: '@townsquarelabs/ui-vue', // web3 wallet components name
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
      if(type === 'connect'){
        //Modal.open();
      }
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

    return { router, TGAD, CallBackClickInfo, walletInfo, handleAction, tonConnectUI, open };
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
</style>
