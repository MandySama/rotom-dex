<script setup>
import { tabRoutes } from '@/router'
</script>

<template>
  <van-tabbar route>
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
