<script setup>
defineProps({
  showLeft: {
    type: Boolean,
    default: true,
  },
  showRight: {
    type: Boolean,
    default: true,
  },
})

const route = useRoute()

const title = computed(() => {
  return route.meta.title
})
</script>

<template>
  <van-nav-bar :title>
    <template v-if="showLeft" #left>
      <slot name="left">
        <i-lucide-arrow-up-down class="size-5" />
      </slot>
    </template>
    <template v-if="showRight" #right>
      <slot name="right">
        <i-lucide-ellipsis class="size-5" />
      </slot>
    </template>
  </van-nav-bar>
</template>

<style scoped></style>
