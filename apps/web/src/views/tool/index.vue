<script setup lang="jsx">
const toolList = [
  {
    icon: () => <i-svg-potion />,
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
]
</script>

<template>
  <page-layout :navbar-left="false" :navbar-right="false">
    <van-search
      placeholder="输入名称搜索宝可梦、道具、招式、特性"
      :clearable="false"
      left-icon=""
    ></van-search>
    <van-grid :border="false" clickable>
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
.van-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 4px;
  padding-inline: 8px;
  margin-bottom: 6px;
}

.van-grid-item {
  :deep(.van-grid-item__content) {
    row-gap: 8px;
  }
}
</style>
