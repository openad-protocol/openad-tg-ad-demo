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
    ]);

    const router = useRouter();

    return { router, paths };
  },
});
</script>
<style scoped lang="less">
@import "index.less";
</style>
