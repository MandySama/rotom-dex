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
      :more-options="navbarMoreOptions"
      @click-left="$emit('click-navbar-left')"
      @select-more="$emit('select-navbar-more', $event)"
    >
      <template v-if="$slots['navbar-right']" #right>
        <slot name="navbar-right" />
      </template>
    </navbar>
    <div class="bg-muted min-h-0 flex-1 overflow-y-auto pb-14">
      <slot></slot>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<style scoped>
.page-layout {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}
</style>
