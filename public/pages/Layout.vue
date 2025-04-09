<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="1">
      <component v-if="route.meta?.keepAlive" :is="Component" :key="route.fullPath" />
    </keep-alive>
    <component v-if="!route.meta?.keepAlive" :is="Component" :key="route.fullPath" />
  </router-view>
</template>

<script>
import { useRoute } from 'vue-router';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayOut',
  setup () {
    const route = useRoute();
    return { route };
  },
});
</script>
