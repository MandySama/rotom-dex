<script setup>
const props = defineProps({
  showLeft: {
    type: Boolean,
    default: true,
  },
  showRight: {
    type: Boolean,
    default: true,
  },
  moreOptions: {
    type: Array,
    default: () => [],
  },
})

const slots = useSlots()

const emits = defineEmits(['click-left', 'select-more'])

const route = useRoute()

const title = computed(() => {
  return route.meta.title
})

const showMore = ref(false)

const onClickRight = () => {
  if (!slots.right && props.moreOptions.length) {
    showMore.value = true
  }
}

const onSelectMore = () => {
  showMore.value = false
  emits('select-more')
}
</script>

<template>
  <van-nav-bar :title @click-left="$emit('click-left')" @click-right="onClickRight">
    <template v-if="showLeft" #left>
      <i-lucide-arrow-up-down class="size-5" />
    </template>
    <template v-if="showRight" #right>
      <slot name="right">
        <i-lucide-ellipsis class="size-5" />
      </slot>
    </template>
  </van-nav-bar>
  <van-popup
    v-model:show="showMore"
    class="top-0! left-auto! max-h-dvh! w-40! transform-none! shadow-[0_4px_12px_0_rgb(0_0_0/16%)]"
    overlay-class="bg-transparent!"
    :duration="0"
    round
    destroy-on-close
  >
    <van-cell-group>
      <van-cell
        v-for="item in moreOptions"
        :key="item.text"
        :title="item.text"
        :border="false"
        clickable
        @click="onSelectMore"
      ></van-cell>
    </van-cell-group>
  </van-popup>
</template>

<style scoped></style>
