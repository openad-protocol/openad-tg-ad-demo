<template>
  <!---->
  <header class="LFlex">
    <div class="logo Flex" @click="router.push('/')">
      <img :src="proxy.$AppEnv.staticURL+'static/images/logo.png'" />
      {{ proxy.$AppEnv.title }}
    </div>
  </header>
  <!---->
  <router-view />
</template>
<script>
import { defineComponent, getCurrentInstance } from 'vue';
import { useRouter } from 'vue-router';
export default defineComponent({
  name: 'App',
  setup () {
    const { proxy } = getCurrentInstance();
    const router = useRouter();

    return { proxy, router };
  },
});
</script>
<style scoped lang="less">
header {
  padding:0 22% 0 8.3%; height:20rem; position:relative; z-index:2;
  .logo {
    height:100%; font-size:5rem; cursor:pointer;
    img { height:10rem; margin:0 3rem 0 0; }
  }
  nav {
    height:100%;
    li {
      height:100%; position:relative; margin:0 0 0 6rem; font-size:2.8rem; cursor: pointer;
      &:hover, &.select { font-weight:bold; }
      &:hover:before, &.select:before { position:absolute; left:50%; bottom:6.6rem; height:1rem; width:2.6rem; background:#32c5ff; content:''; margin:0 0 0 -1.3rem; }
    }
  }
}
@media screen and (max-width: 1200px) {
  header { padding:0 0 0 5%; }
}
@media screen and (max-width: 1000px) {
  header {
    padding:0 0 0 3%;
    .logo {
      font-size:6rem;
      img { height:12rem; margin:0 3rem 0 0; }
    }
  }
}
@media screen and (max-width: 640px) {
  header {
    padding:0 0 0 20px; height:50px;
    .logo {
      font-size:20px;
      img { height:30px; margin:0 10px 0 0; }
    }
  }
}
</style>
