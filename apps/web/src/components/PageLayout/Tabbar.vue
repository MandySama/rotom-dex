<script setup>
import { tabRoutes } from '@/router'

const activeTab = ref('')

const route = useRoute()

onMounted(() => {
  activeTab.value = tabRoutes.find((item) => item.path === route.path).meta.name
})
</script>

<template>
  <van-tabbar v-model="activeTab">
    <van-tabbar-item
      v-for="item in tabRoutes"
      :key="item.meta.name"
      :name="item.meta.name"
      :to="item.path"
    >
      <template #icon>
        <component class="size-6" :is="item.meta.icon" />
      </template>
      <span>{{ item.meta.name }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
