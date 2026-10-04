<script setup>
const props = defineProps({
  showLeft: {
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

const selectedScopes = ref([])
const selectedFilters = ref([])
const selectedSort = ref('')

const onClickRight = () => {
  if (!slots.right && props.moreOptions.length) {
    showMore.value = true
  }
}

const isSelectedOption = (item) => {
  switch (item.type) {
    case 'scope':
      return selectedScopes.value.includes(item.value)
    case 'filter':
      return selectedFilters.value.includes(item.value)
    case 'sort':
      return selectedSort.value === item.value
  }
}

const onSelectMore = (item) => {
  switch (item.type) {
    case 'scope':
      selectedScopes.value = selectedScopes.value.includes(item.value)
        ? selectedScopes.value.filter((value) => value !== item.value)
        : [...selectedScopes.value, item.value]
      break
    case 'filter':
      selectedFilters.value = selectedFilters.value.includes(item.value)
        ? selectedFilters.value.filter((value) => value !== item.value)
        : [...selectedFilters.value, item.value]
      break
    case 'sort':
      selectedSort.value = selectedSort.value === item.value ? '' : item.value
      break
  }
  showMore.value = false
  emits('select-more', {
    scopes: selectedScopes.value,
    filters: selectedFilters.value,
    sort: selectedSort.value,
  })
}
</script>

<template>
  <van-nav-bar :title @click-left="$emit('click-left')" @click-right="onClickRight">
    <template v-if="showLeft" #left>
      <i-lucide-arrow-up-down class="size-5" />
    </template>
    <template #right>
      <slot name="right">
        <i-lucide-ellipsis class="size-5" />
      </slot>
    </template>
  </van-nav-bar>
  <teleport to="body">
    <div v-if="showMore" class="fixed inset-0 z-999 bg-transparent" @click="showMore = false">
      <div
        class="fixed top-0 right-0.5 z-1001 max-h-[calc(100dvh-2px)] w-40 overflow-y-auto rounded-lg shadow-[0_4px_12px_0_rgb(0_0_0/16%)]"
      >
        <van-cell-group>
          <van-cell
            v-for="option in moreOptions"
            :key="option.text"
            :class="isSelectedOption(option) && 'text-primary!'"
            :title="option.text"
            clickable
            @click="onSelectMore(option)"
          >
            <template v-if="isSelectedOption(option)" #right-icon>
              <i-lucide-check class="size-4" />
            </template>
          </van-cell>
        </van-cell-group>
      </div>
    </div>
  </teleport>
</template>

<style scoped></style>
