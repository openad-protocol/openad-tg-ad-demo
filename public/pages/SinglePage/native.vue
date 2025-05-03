<template>
  <div class="singlePage native MFlex">
    <h2>This page is a demo for native mode to load OpenAd ad! </h2>
    <div class="iframe TGURL">
      <iframe :src="iframe.TGURL"></iframe>
    </div>
    <div class="iframe WEBURL">
      <iframe :src="iframe.WEBURL"></iframe>
    </div>
    <van-button @click="go('download.tg')" type="primary"> download TG APP native html file </van-button>
    <van-button @click="go('download.web')" type="primary"> download Web APP native html file </van-button>
    <van-button @click="go('home')" type="primary"> Go Home </van-button>
  </div>
</template>
<script>
import { Button } from 'vant';
import { defineComponent, getCurrentInstance, reactive } from 'vue';
import { useRouter } from 'vue-router';

export default defineComponent({
  name: 'SinglePageNative',
  components: {
    'van-button': Button,
  },
  setup(){
    const router = useRouter();
    const { proxy } = getCurrentInstance();

    const iframe = reactive({
      TGURL: 'https://minnievincent.com/native.tg.html?t='+new Date().valueOf(),
      WEBURL: 'https://minnievincent.com/native.web.html?t='+new Date().valueOf(),
    });

    const go = (type) => {
      if(type === 'home'){
        router.push('/');
      }
      if(type.includes('download')){
        let env = type.split('.')[1];
        let a = document.createElement('a');
        a.href = proxy.$AppEnv.staticURL+`static/tg/html/native.${env}.html?t=`+new Date().valueOf();
        a.download = `native.${env}.html`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    }

    return { go, iframe }
  },
});
</script>

<style scoped lang="less">
@import '@/shared/share.less';
.iframe {
  width:215rem; height:18rem;
  iframe { width:100%; height:100%; border:0;  }
}
</style>
