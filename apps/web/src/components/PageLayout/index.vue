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
  navbarMoreOptions: {
    type: Array,
    default: () => [],
  },
})

defineEmits(['click-navbar-left', 'select-navbar-more'])
</script>

<template>
  <div class="page-layout">
    <navbar
      v-if="navbar"
      :show-left="navbarLeft"
      :show-right="navbarRight"
      :more-options="navbarMoreOptions"
      @click-left="$emit('click-navbar-left')"
      @select-more="$emit('select-navbar-more')"
    >
      <template v-if="$slots['navbar-right']" #right>
        <slot name="navbar-right" />
      </template>
    </navbar>
    <slot></slot>
    <tabbar></tabbar>
  </div>
</template>

<style scoped></style>
