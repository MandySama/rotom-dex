<script setup>
import request from '@/utils/request.js'

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
  { text: '物攻招式', type: 'filter', value: '物攻招式' },
  { text: '特攻招式', type: 'filter', value: '特攻招式' },
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
  { text: '陷入畏缩状态', type: 'filter', value: '陷入畏缩状态' },
  { text: '陷入混乱状态', type: 'filter', value: '陷入混乱状态' },
  { text: '陷入灼伤状态', type: 'filter', value: '陷入灼伤状态' },
  { text: '陷入中毒状态', type: 'filter', value: '陷入中毒状态' },
  { text: '陷入剧毒状态', type: 'filter', value: '陷入剧毒状态' },
  { text: '陷入麻痹状态', type: 'filter', value: '陷入麻痹状态' },
  { text: '陷入冰冻状态', type: 'filter', value: '陷入冰冻状态' },
  { text: '陷入睡眠状态', type: 'filter', value: '陷入睡眠状态' },
  { text: '击中要害相关', type: 'filter', value: '击中要害相关' },
  { text: '必定击中要害', type: 'filter', value: '必定击中要害' },
  { text: '一击濒死招式', type: 'filter', value: '一击濒死招式' },
  { text: '啃咬类的招式', type: 'filter', value: '啃咬类招式' },
  { text: '切割类的招式', type: 'filter', value: '切割类招式' },
  { text: '连续相关招式', type: 'filter', value: '连续相关招式' },
  { text: '波动波导招式', type: 'filter', value: '波动波导招式' },
  { text: '威力排序', type: 'sort', value: '威力排序' },
  { text: '命中排序', type: 'sort', value: '命中排序' },
  { text: 'PP排序', type: 'sort', value: 'PP排序' },
]

const moveList = ref([])
const searchResults = ref([])

onMounted(async () => {
  moveList.value = await request.get('/move')
  searchResults.value = [...moveList.value]
  console.log(moveList.value)
})
</script>

<template>
  <page-layout :navbar-more-options="moreOptions"></page-layout>
</template>

<style scoped></style>
