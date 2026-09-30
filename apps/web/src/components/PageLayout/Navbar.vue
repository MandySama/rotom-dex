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

const title = route.meta.title

const showMore = ref(false)

const activeScopes = ref([])

const activeFilters = ref([])

const activeSort = ref('')

const onClickRight = () => {
  if (!slots.right && props.moreOptions.length) {
    showMore.value = true
  }
}

const isActiveOption = (item) => {
  switch (item.type) {
    case 'scope':
      return activeScopes.value.includes(item.value)
    case 'filter':
      return activeFilters.value.includes(item.value)
    case 'sort':
      return activeSort.value === item.value
  }
}

const onSelectMore = (item) => {
  switch (item.type) {
    case 'scope':
      activeScopes.value = activeScopes.value.includes(item.value)
        ? activeScopes.value.filter((value) => value !== item.value)
        : [...activeScopes.value, item.value]
      break
    case 'filter':
      activeFilters.value = activeFilters.value.includes(item.value)
        ? activeFilters.value.filter((value) => value !== item.value)
        : [...activeFilters.value, item.value]
      break
    case 'sort':
      activeSort.value = activeSort.value === item.value ? '' : item.value
      break
  }
  showMore.value = false
  emits('select-more', {
    scopes: [...activeScopes.value],
    filters: [...activeFilters.value],
    sort: activeSort.value,
  })
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
  <teleport to="body">
    <div v-if="showMore" class="fixed inset-0 z-999 bg-transparent" @click="showMore = false">
      <div
        class="fixed top-0 right-0 z-1001 max-h-dvh w-40 overflow-y-auto rounded-lg shadow-[0_4px_12px_0_rgb(0_0_0/16%)]"
      >
        <van-cell-group>
          <van-cell
            v-for="item in moreOptions"
            :key="item.text"
            :class="isActiveOption(item) && 'text-primary!'"
            :title="item.text"
            :border="false"
            clickable
            @click="onSelectMore(item)"
          >
            <template v-if="isActiveOption(item)" #right-icon>
              <i-lucide-check class="size-4" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </teleport>
</template>

<style scoped></style>
