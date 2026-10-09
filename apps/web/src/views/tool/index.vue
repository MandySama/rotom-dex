<script setup lang="jsx">
const toolList = [
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
]
</script>

<template>
  <page-layout :navbar-left="false" :navbar-right="false">
    <van-search
      placeholder="输入名称搜索宝可梦、道具、招式、特性"
      :clearable="false"
      left-icon=""
    ></van-search>
    <van-grid
      class="grid! max-h-[calc(100dvh-148px)] scrollbar-none grid-cols-4 gap-1 overflow-y-auto px-2 pb-1.5"
      :border="false"
      clickable
    >
      <van-grid-item v-for="tool in toolList" :key="tool.text" class="h-21">
        <template #icon>
          <component class="size-6" :is="tool.icon"></component>
        </template>
        <template #text>
          <span class="text-foreground text-[10px] leading-[12px] opacity-75">{{ tool.text }}</span>
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
