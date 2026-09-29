<script setup>
import Navbar from './Navbar.vue'
import Tabbar from './Tabbar.vue'

defineProps({
  navbar: {
    type: Boolean,
    default: true,
  },
  navbarLeft: {
    type: Boolean,
    default: true,
  },
  navbarRight: {
    type: Boolean,
    default: true,
  },
})
</script>

<template>
  <div class="page-layout">
    <navbar v-if="navbar" :show-left="navbarLeft" :show-right="navbarRight">
      <template v-if="$slots['navbar-left']" #left>
        <slot name="navbar-left" />
      </template>
      <template v-if="$slots['navbar-right']" #right>
        <slot name="navbar-right" />
      </template>
    </navbar>
    <slot></slot>
    <tabbar></tabbar>
  </div>
</template>

<style scoped></style>
