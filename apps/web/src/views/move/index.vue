<script setup>
import request from '@/utils/request'
import { useVirtualList } from '@vueuse/core'

const moreOptions = [
  { text: '第一世代引入', type: 'scope', value: '第一世代引入' },
  { text: '第二世代引入', type: 'scope', value: '第二世代引入' },
  { text: '第三世代引入', type: 'scope', value: '第三世代引入' },
  { text: '第四世代引入', type: 'scope', value: '第四世代引入' },
  { text: '第五世代引入', type: 'scope', value: '第五世代引入' },
  { text: '第六世代引入', type: 'scope', value: '第六世代引入' },
  { text: '第七世代引入', type: 'scope', value: '第七世代引入' },
  { text: '第八世代引入', type: 'scope', value: '第八世代引入' },
  { text: '第九世代引入', type: 'scope', value: '第九世代引入' },
  { text: '物理招式', type: 'filter', value: '物理招式' },
  { text: '特殊招式', type: 'filter', value: '特殊招式' },
  { text: '变化招式', type: 'filter', value: '变化招式' },
  { text: 'Z招式', type: 'filter', value: 'Z招式' },
  { text: '超极巨招式', type: 'filter', value: '超极巨招式' },
  { text: '优先度+5', type: 'filter', value: '优先度+5' },
  { text: '优先度+4', type: 'filter', value: '优先度+4' },
  { text: '优先度+3', type: 'filter', value: '优先度+3' },
  { text: '优先度+2', type: 'filter', value: '优先度+2' },
  { text: '优先度+1', type: 'filter', value: '优先度+1' },
  { text: '优先度0', type: 'filter', value: '优先度0' },
  { text: '优先度-1', type: 'filter', value: '优先度-1' },
  { text: '优先度-2', type: 'filter', value: '优先度-2' },
  { text: '优先度-3', type: 'filter', value: '优先度-3' },
  { text: '优先度-4', type: 'filter', value: '优先度-4' },
  { text: '优先度-5', type: 'filter', value: '优先度-5' },
  { text: '优先度-6', type: 'filter', value: '优先度-6' },
  { text: '优先度-7', type: 'filter', value: '优先度-7' },
  { text: '啃咬类的招式', type: 'filter', value: '啃咬类招式' },
  { text: '切割类的招式', type: 'filter', value: '切割类招式' },
  { text: '波动波导招式', type: 'filter', value: '波动波导招式' },
  { text: '连续相关招式', type: 'filter', value: '连续相关招式' },
  { text: '击中要害相关', type: 'filter', value: '击中要害相关' },
  { text: '必定击中要害', type: 'filter', value: '必定击中要害' },
  { text: '一击濒死招式', type: 'filter', value: '一击濒死招式' },
  { text: '陷入畏缩状态', type: 'filter', value: '陷入畏缩状态' },
  { text: '陷入混乱状态', type: 'filter', value: '陷入混乱状态' },
  { text: '陷入灼伤状态', type: 'filter', value: '陷入灼伤状态' },
  { text: '陷入中毒状态', type: 'filter', value: '陷入中毒状态' },
  { text: '陷入剧毒状态', type: 'filter', value: '陷入剧毒状态' },
  { text: '陷入麻痹状态', type: 'filter', value: '陷入麻痹状态' },
  { text: '陷入冰冻状态', type: 'filter', value: '陷入冰冻状态' },
  { text: '陷入睡眠状态', type: 'filter', value: '陷入睡眠状态' },
  { text: '威力排序', type: 'sort', value: '威力排序' },
  { text: '命中排序', type: 'sort', value: '命中排序' },
  { text: 'PP排序', type: 'sort', value: 'PP排序' },
]

const propertyColors = {
  一般: '#bbbbaa',
  格斗: '#bb5544',
  飞行: '#a890ee',
  毒: '#aa5599',
  地面: '#e0c069',
  岩石: '#b7a038',
  虫: '#aabb22',
  幽灵: '#715899',
  钢: '#aaaabb',
  火: '#ff4422',
  水: '#3399ff',
  草: '#77cc55',
  电: '#f8d030',
  超能力: '#f95989',
  冰: '#97d7d7',
  龙: '#723bf9',
  恶: '#705949',
  妖精: '#ef9aad',
}

const typeColors = {
  物理: '#ff4400',
  特殊: '#2266cc',
  变化: '#999999',
  极巨: '#ac379e',
  超极巨: '#ac379e',
}

const selectedScopes = ref([])
const selectedFilters = ref([])
const selectedSort = ref(undefined)

const keyword = ref('')

const moveList = ref([])
const searchResults = ref([])

const { containerProps, wrapperProps, list, scrollTo } = useVirtualList(searchResults, {
  itemHeight: 66,
  overscan: 6,
})

const scrollTop = ref(0)

const onClickLeft = () => {
  searchResults.value = searchResults.value.reverse()
  scrollTo(0)
}

const onScroll = (event) => {
  scrollTop.value = event.currentTarget.scrollTop
}

onMounted(async () => {
  moveList.value = await request.get('/move')
  searchResults.value = [...moveList.value]
})
</script>

<template>
  <page-layout :navbar-more-options="moreOptions" @click-navbar-left="onClickLeft">
    <van-search
      v-model="keyword"
      placeholder="输入招式名称/属性"
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
          v-for="{ data: move, index } in list"
          :key="index"
          class="border-border bg-background text-foreground flex h-15 cursor-pointer items-center gap-2.5 overflow-hidden rounded-md border pr-1 pl-2.5 text-sm"
        >
          <span class="w-10 text-center">{{ move.id }}</span>
          <div class="flex flex-1 flex-col items-center gap-y-1">
            <span>{{ move.cname }}</span>
            <div class="flex justify-center gap-x-2 text-[10px] leading-3 opacity-60">
              <span>威力:{{ move.power }}</span>
              <span>命中:{{ move.hit }}</span>
              <span>PP:{{ move.PP }}</span>
              <span>优先:{{ move.priority }}</span>
            </div>
          </div>
          <div class="flex gap-x-1 text-[11px] leading-3.5 text-white">
            <div
              class="flex h-5 w-13 items-center justify-center rounded-sm"
              :style="{ backgroundColor: propertyColors[move.property] }"
            >
              {{ move.property }}
            </div>
            <div
              class="flex h-5 w-13 items-center justify-center rounded-sm"
              :style="{ backgroundColor: typeColors[move.type] }"
            >
              {{ move.type }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </page-layout>
</template>

<style scoped></style>
