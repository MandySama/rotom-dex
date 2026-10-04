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
      v-for="route in tabRoutes"
      :key="route.meta.name"
      :name="route.meta.name"
      :to="route.path"
    >
      <template #icon>
        <component class="size-6" :is="route.meta.icon" />
      </template>
      <span>{{ route.meta.name }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
