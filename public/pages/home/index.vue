<template>
  <!---->
  <div class="Home MFlex">
    <ul>
      <li v-for="(item,index) in paths" :key="index">
        <van-button type="primary" @click="router.push(item.path)">
          {{ item.desc }}
        </van-button>
      </li>
    </ul>
  </div>
  <!---->
</template>

<script>
import { defineComponent, ref } from 'vue';
import { Button } from 'vant';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'HomeIndex',
  components: {
    'van-button': Button,
  },
  setup(){
    const paths = ref([
      { path: '/SinglePage/normal', desc: 'load ads with normal mode...' },
      { path: '/SinglePage/interface', desc: 'loads ad with interface mode...' },
      { path: '/SinglePage/native', desc: 'load ads with native mode...' },
      { path: '/SinglePage/interactive', desc: 'load ads with interactive mode...' },
      { path: '/SinglePage/web3Provider', desc: 'load banner ad with web3 provider...' },
      { path: '/SinglePage/web3Api', desc: 'load banner ad with web3 api...' },
      { path: '/SinglePage/webApi', desc: 'load banner ad with web api...' },
    ]);

    const router = useRouter();

    return { router, paths };
  },
});
</script>
<style scoped lang="less">
@import "index.less";
</style>
