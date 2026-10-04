<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const moreOptions = [
  { text: '精灵球', type: 'filter', value: '精灵球' },
  { text: '重要物品', type: 'filter', value: '重要物品' },
  { text: '进化道具', type: 'filter', value: '进化道具' },
  { text: '回复道具', type: 'filter', value: '回复道具' },
  { text: '携带道具', type: 'filter', value: '携带道具' },
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
  itemHeight: 102,
  overscan: 6,
})

const scrollTop = ref(0)

const onScroll = (event) => {
  scrollTop.value = event.currentTarget.scrollTop
}

onMounted(async () => {
  itemList.value = await request.get('/pokemon')
  searchResults.value = [...itemList.value]
})

onActivated(() => {
  containerProps.ref.value.scrollTop = scrollTop.value
})
</script>

<template>
  <page-layout :navbar-left="false" :navbar-more-options="moreOptions">
    <van-search
      v-model="keyword"
      placeholder="输入道具名称/英文名称"
      :clearable="false"
      left-icon=""
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
          class="border-border bg-background flex h-18 cursor-pointer items-center gap-2 rounded-md border pl-1"
        ></div>
      </div>
    </div>
  </page-layout>
</template>

<style scoped></style>
