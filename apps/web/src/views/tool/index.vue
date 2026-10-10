<script setup lang="jsx">
import { useDraggable } from 'vue-draggable-plus'
import { useStorage } from '@vueuse/core'
import { onMounted } from 'vue'

const sortedToolList = useStorage('toolList', [])

const toolList = ref([
  {
    icon: () => <i-svg-overdose />,
    text: '特性列表',
  },
  {
    icon: () => <i-svg-action />,
    text: '性格列表',
  },
  {
    icon: () => <i-svg-egg />,
    text: '蛋群列表',
  },
  {
    icon: () => <i-svg-fighting />,
    text: '属性克制',
  },
  {
    icon: () => <i-svg-blue />,
    text: '攻略列表',
  },
  {
    icon: () => <i-svg-yellow />,
    text: '我的队伍',
  },
  {
    icon: () => <i-svg-restore />,
    text: '打击盲点',
  },
  {
    icon: () => <i-svg-restore--2 />,
    text: '联防盲点',
  },
  {
    icon: () => <i-svg-challenge />,
    text: '能力计算器',
  },
  {
    icon: () => <i-svg-fighting--2 />,
    text: '伤害计算器',
  },
  {
    icon: () => <i-svg-lucky />,
    text: '个体计算器',
  },
  {
    icon: () => <i-svg-charm />,
    text: '觉醒计算器',
  },
  {
    icon: () => <i-svg-caterpie />,
    text: '宝可梦合体',
  },
  {
    icon: () => <i-svg-phone />,
    text: '图片壁纸',
  },
  {
    icon: () => <i-svg-camera />,
    text: '动画视频',
  },
  {
    icon: () => <i-svg-restore--3 />,
    text: '异常状态',
    class: 'col-start-1',
  },
  {
    icon: () => <i-svg-tornado />,
    text: '天气场地',
  },
  {
    icon: () => <i-svg-compass />,
    text: '使用率排名',
  },
  {
    icon: () => <i-svg-revive />,
    text: '队伍租用',
  },
  {
    icon: () => <i-svg-up />,
    text: '宝可梦对比',
  },
  {
    icon: () => <i-svg-box />,
    text: '多技能检索',
  },
  {
    icon: () => <i-svg-pidgey />,
    text: '宝可梦肉鸽',
  },
  {
    icon: () => <i-svg-candy />,
    text: '对战平台',
  },
  {
    icon: () => <i-svg-star />,
    text: '我的收藏',
  },
  {
    icon: () => <i-svg-egg--2 />,
    text: '相关术语',
  },
  {
    icon: () => <i-svg-courage />,
    text: '图鉴收集',
    class: 'col-start-4',
  },
  {
    icon: () => <i-svg-friendship />,
    text: '最新咨询',
  },
  {
    icon: () => <i-svg-psyduck />,
    text: '你知道吗',
  },
  {
    icon: () => <i-svg-palm />,
    text: '刷闪计数器',
    class: 'col-start-4',
  },
  {
    icon: () => <i-svg-map />,
    text: '地区地图',
  },
  {
    icon: () => <i-svg-pikachu />,
    text: '猜猜宝可梦',
    class: 'col-start-4',
  },
  {
    icon: () => <i-svg-badge--2 />,
    text: '徽章列表',
  },
  {
    icon: () => <i-svg-location />,
    text: '地点列表',
  },
  {
    icon: () => <i-svg-champion />,
    text: '游戏列表',
  },
  {
    icon: () => <i-svg-player />,
    text: '人物列表',
  },
])

const gridRef = ref(null)

const scrollTop = ref(0)

const onScroll = (event) => {
  scrollTop.value = event.currentTarget.scrollTop
}

onActivated(() => {
  gridRef.value.$el.scrollTop = scrollTop.value
})

useDraggable(gridRef, toolList, {
  animation: 180,
  delay: 300,
  delayOnTouchOnly: true,
  onEnd() {
    sortedToolList.value = toolList.value.map((tool) => tool.text)
  },
})

onMounted(() => {
  const sortedMap = new Map(sortedToolList.value.map((text, index) => [text, index]))
  toolList.value.sort((a, b) => sortedMap.get(a.text) - sortedMap.get(b.text))
})
</script>

<template>
  <page-layout :navbar-left="false" :navbar-right="false">
    <van-search
      placeholder="输入名称搜索宝可梦、道具、招式、特性"
      :clearable="false"
      left-icon=""
    ></van-search>
    <van-grid
      ref="gridRef"
      @scroll="onScroll"
      class="grid! flex-1 scrollbar-none grid-cols-4 gap-1 overflow-y-auto px-2 pb-1.5"
      :border="false"
      clickable
    >
      <van-grid-item
        v-for="tool in toolList"
        :key="tool.text"
        class="h-21 select-none"
        :class="tool.class"
      >
        <template #icon>
          <component class="size-6" :is="tool.icon"></component>
        </template>
        <template #text>
          <span class="text-foreground text-[10px] leading-3 opacity-75">{{ tool.text }}</span>
        </template>
      </van-grid-item>
    </van-grid>
  </page-layout>
</template>

<style scoped lang="scss">
.van-grid-item {
  :deep(.van-grid-item__content) {
    row-gap: 8px;
  }
}
</style>
