<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const moreOptions = [
  { text: '精灵球', type: 'filter', value: '精灵球' },
  { text: '重要物品', type: 'filter', value: '重要物品' },
  { text: '进化道具', type: 'filter', value: '进化道具' },
  { text: '回复道具', type: 'filter', value: '回复道具' },
  { text: '携带道具', type: 'filter', value: '携带道具' },
  { text: '战斗道具', type: 'filter', value: '战斗道具' },
  { text: '一般道具', type: 'filter', value: '一般道具' },
  { text: '技能机', type: 'filter', value: '技能机' },
  { text: '秘传学习器', type: 'filter', value: '秘传学习器' },
  { text: '树果', type: 'filter', value: '树果' },
  { text: '信封', type: 'filter', value: '信封' },
  { text: '食材', type: 'filter', value: '食材' },
  { text: 'Mega石', type: 'filter', value: 'Mega石' },
  { text: 'Z招式', type: 'filter', value: 'Z招式' },
  { text: 'Z纯晶', type: 'filter', value: 'Z纯晶' },
  { text: '洛托姆之力', type: 'filter', value: '洛托姆之力' },
  { text: '工艺制作', type: 'filter', value: '工艺制作' },
  { text: '可交换道具', type: 'filter', value: '可交换道具' },
  { text: '太晶碎块', type: 'filter', value: '太晶碎块' },
  { text: '粘糕', type: 'filter', value: '粘糕' },
]

const selectedFilters = ref([])

const keyword = ref('')

const itemList = ref([])
const searchResults = ref([])

const { containerProps, wrapperProps, list, scrollTo } = useVirtualList(searchResults, {
  itemHeight: 78,
  overscan: 6,
})

const scrollTop = ref(0)

const handleSearch = () => {
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
      placeholder="输入道具名称/英文名称"
      :clearable="false"
      left-icon=""
      @update:model-value="handleSearch"
    ></van-search>
    <div
      v-bind="containerProps"
      @scroll="onScroll"
      class="h-[calc(100dvh-148px)] scrollbar-none overflow-y-auto px-2 font-['Noto_Sans_SC','Microsoft_YaHei',sans-serif]"
    >
      <div v-bind="wrapperProps" class="flex flex-col gap-y-1.5">
        <div
          v-for="{ data: item, index } in list"
          :key="index"
          class="border-border bg-background text-foreground flex h-18 cursor-pointer items-center justify-between rounded-md border px-2.5 text-[13px] leading-4.5"
        >
          <div class="flex items-center gap-2">
            <van-image class="size-11" :src="getImage(item)" @error="item.error = true"></van-image>
            <div class="flex flex-col gap-y-0.5">
              <div>{{ item.cname }}</div>
              <div>{{ item.ename }}</div>
              <div>{{ item.jname }}</div>
            </div>
          </div>
          <div>{{ item.type }}</div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style scoped></style>
