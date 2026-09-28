<script setup>
const route = useRoute()

const title = computed(() => {
  return route.meta.title
})
</script>

<template>
  <van-nav-bar :title>
    <template #left>
      <i-lucide-arrow-up-down />
    </template>
    <template #right>
      <i-lucide-ellipsis />
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
