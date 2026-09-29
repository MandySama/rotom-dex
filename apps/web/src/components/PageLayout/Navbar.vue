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
  moreActions: {
    type: Array,
    default: () => [
      { text: '高级查询' },
      { text: '地区图鉴' },
      { text: '第一世代' },
      { text: '第二世代' },
      { text: '第三世代' },
      { text: '第四世代' },
      { text: '第五世代' },
      { text: '第六世代' },
      { text: '第七世代' },
      { text: '第八世代' },
      { text: '第九世代' },
      { text: '第十世代' },
      { text: '传说宝可梦' },
      { text: '幻之宝可梦' },
      { text: '究极异兽' },
      { text: '超级进化' },
      { text: '超极巨化' },
    ],
  },
})

defineEmits(['click-left'])

const route = useRoute()

const title = computed(() => {
  return route.meta.title
})

const showMore = ref(false)
</script>

<template>
  <van-nav-bar :title @click-left="$emit('click-left')" @click-right="showMore = true">
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
  <van-popup
    v-model:show="showMore"
    class="top-2! right-0.5! left-auto! max-h-[calc(100dvh-16px)]! w-40! transform-none! shadow-[0_4px_12px_0_rgb(0_0_0/16%)]"
    overlay-class="bg-transparent!"
    :duration="0"
    round
  >
    <van-cell-group>
      <van-cell
        v-for="item in moreActions"
        :key="item.text"
        :title="item.text"
        :border="false"
        clickable
      ></van-cell>
    </van-cell-group>
  </van-popup>
</template>

<style scoped></style>
