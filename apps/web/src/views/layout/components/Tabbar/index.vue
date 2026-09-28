<script setup lang="jsx">
const activeTab = ref('图鉴')

const tabList = [
  {
    title: '图鉴',
    icon: () => <i-svg-pokeball />,
    path: '/pokemon',
  },
  {
    title: '道具',
    icon: () => <i-svg-bag />,
    path: '/item',
  },
  {
    title: '功能',
    icon: () => <i-svg-badge />,
    path: '/tool',
  },
  {
    title: '招式',
    icon: () => <i-svg-power />,
    path: '/move',
  },
  {
    title: '关于',
    icon: () => <i-svg-settings />,
    path: '/about',
  },
]
</script>

<template>
  <van-tabbar v-model="activeTab">
    <van-tabbar-item v-for="item in tabList" :key="item.title" :name="item.title" :to="item.path">
      <template #icon>
        <component class="size-6" :is="item.icon" />
      </template>
      <span>{{ item.title }}</span>
    </van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
