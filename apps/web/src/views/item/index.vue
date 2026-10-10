<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const selectedFilters = ref([])

const keyword = ref('')

const itemList = ref([])
const searchResults = ref([])

const moreOptions = [
  { text: '精灵球', type: 'filter', value: '精灵球' },
  { text: '回复道具', type: 'filter', value: '回复道具' },
  { text: '战斗道具', type: 'filter', value: '战斗道具' },
  { text: '可交换道具', type: 'filter', value: '可交换道具' },
  { text: '进化道具', type: 'filter', value: '进化道具' },
  { text: '一般道具', type: 'filter', value: '一般道具' },
  { text: '信封', type: 'filter', value: '信封' },
  { text: '树果', type: 'filter', value: '树果' },
  { text: '携带道具', type: 'filter', value: '携带道具' },
  { text: '技能机', type: 'filter', value: '技能机' },
  { text: '秘传学习器', type: 'filter', value: '秘传学习器' },
  { text: '重要物品', type: 'filter', value: '重要物品' },
  { text: 'Mega石', type: 'filter', value: 'Mega石' },
  { text: 'Z招式', type: 'filter', value: 'Z招式' },
  { text: 'Z纯晶', type: 'filter', value: 'Z纯晶' },
  { text: '洛托姆之力', type: 'filter', value: '洛托姆之力' },
  { text: '食材', type: 'filter', value: '食材' },
  { text: '工艺制作', type: 'filter', value: '工艺制作' },
  { text: '太晶碎块', type: 'filter', value: '太晶碎块' },
  { text: '粘糕', type: 'filter', value: '粘糕' },
]

const activeItem = ref('')

const observedItems = new Map()
const itemHeights = reactive(new Map())

const { containerProps, wrapperProps, list, scrollTo } = useVirtualList(searchResults, {
  itemHeight: (index) => {
    const item = searchResults.value[index]
    const key = getItemKey(item)
    return (itemHeights.get(key) ?? 72) + 6
  },
  overscan: 8,
})

const scrollTop = ref(0)

const handleSearch = () => {
  activeItem.value = ''
  const query = keyword.value.trim().replace(/\s+/, ' ').toLowerCase()
  searchResults.value = itemList.value.filter((item) => {
    if (selectedFilters.value.length && !selectedFilters.value.includes(item.type)) return false
    if (
      query &&
      !item.cname.normalize('NFKC').toLowerCase().includes(query) &&
      !item.ename.toLowerCase().includes(query)
    ) {
      return false
    }
    return true
  })
  scrollTo(0)
}

const onSelectMore = ({ filters }) => {
  selectedFilters.value = filters
  handleSearch()
}

const onScroll = (event) => {
  scrollTop.value = event.currentTarget.scrollTop
}

const setItemRef = (item, component) => {
  const key = getItemKey(item)
  const el = component?.$el
  const previous = observedItems.get(key)
  if (previous?.el === el) return
  previous?.observer.disconnect()
  observedItems.delete(key)
  if (!el) return
  const setItemHeight = () => {
    const height = el.getBoundingClientRect().height
    if (height > 0) itemHeights.set(key, height)
  }
  const observer = new ResizeObserver(setItemHeight)
  observer.observe(el)
  observedItems.set(key, { el, observer })
  setItemHeight()
}

const getItemKey = (item) => `${item?.id}:${item?.cname}`

const getImage = (item) => {
  return item.img && !item.error ? `/images/item/${item.img}.png` : '/images/item/unknown.png'
}

onMounted(async () => {
  itemList.value = await request.get('/item')
  searchResults.value = [...itemList.value]
})

onActivated(() => {
  containerProps.ref.value.scrollTop = scrollTop.value
})
</script>

<template>
  <page-layout
    :navbar-left="false"
    :navbar-more-options="moreOptions"
    @select-navbar-more="onSelectMore"
  >
    <van-search
      v-model="keyword"
      shape="round"
      placeholder="输入道具名称/英文名称"
      :clearable="false"
      left-icon=""
      @update:model-value="handleSearch"
    ></van-search>
    <div
      v-bind="containerProps"
      @scroll="onScroll"
      class="flex-1 scrollbar-none overflow-y-auto px-2 font-['Noto_Sans_SC','Microsoft_YaHei',sans-serif] [overflow-anchor:none]"
    >
      <van-collapse
        v-bind="wrapperProps"
        v-model="activeItem"
        :key="JSON.stringify([keyword, selectedFilters])"
        class="flex flex-col gap-y-1.5"
        accordion
        :border="false"
      >
        <van-collapse-item
          v-for="{ data: item, index } in list"
          :ref="(component) => setItemRef(item, component)"
          :key="index"
          class="bg-background cursor-pointer rounded-md shadow-[inset_0_0_0_1px_var(--border)]"
          :name="getItemKey(item)"
          :border="false"
          :is-link="false"
        >
          <template #title>
            <div
              class="text-foreground flex h-18 items-center justify-between px-2.5 text-[13px] leading-4.5"
            >
              <div class="flex items-center gap-2.5">
                <van-image
                  class="size-11"
                  :src="getImage(item)"
                  @error="item.error = true"
                ></van-image>
                <div class="flex flex-col gap-y-0.5">
                  <div>{{ item.cname }}</div>
                  <div>{{ item.ename }}</div>
                  <div v-if="item.jname">{{ item.jname }}</div>
                </div>
              </div>
              <div>{{ item.type }}</div>
            </div>
          </template>
          <div
            class="mb-2 flex flex-col gap-0.5 pr-2.5 pl-16 text-[13px] leading-4.5"
            @click.stop="activeItem = ''"
          >
            <div class="flex gap-x-2">
              <span class="text-primary">价格:</span>
              <span class="text-foreground">￥{{ item.price }}</span>
            </div>
            <div class="flex gap-x-2">
              <span class="text-primary shrink-0">说明:</span>
              <span class="text-foreground">{{ item.explain }}</span>
            </div>
            <div v-if="item.ceffect" class="flex gap-x-2">
              <span class="text-primary shrink-0">效果:</span>
              <span class="text-foreground whitespace-pre-line">{{ item.ceffect }}</span>
            </div>
          </div>
        </van-collapse-item>
      </van-collapse>
    </div>
  </page-layout>
</template>

<style scoped lang="scss">
.van-collapse-item {
  :deep(.van-cell),
  :deep(.van-collapse-item__content) {
    padding: 0;
    background: transparent;
  }
}
</style>
