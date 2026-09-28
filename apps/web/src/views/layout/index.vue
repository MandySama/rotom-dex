<script setup>
import { Navbar, Tabbar } from './components'
</script>

<template>
  <div class="app-layout">
    <navbar></navbar>
    <router-view></router-view>
    <tabbar></tabbar>
  </div>
</template>

<style scoped></style>
