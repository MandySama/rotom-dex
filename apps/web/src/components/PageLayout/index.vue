<script setup>
import Navbar from './Navbar.vue'
import Tabbar from './Tabbar.vue'
</script>

<template>
  <div class="app-layout">
    <navbar></navbar>
    <slot></slot>
    <tabbar></tabbar>
  </div>
</template>

<style scoped></style>
