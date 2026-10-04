<script setup></script>

<template>
  <router-view v-slot="{ Component }">
    <keep-alive :max="5">
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<style scoped></style>
