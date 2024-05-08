<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-bar class="q-electron-drag row items-center">
        <q-btn @click="openSettingModal()" dense flat icon="settings" color="gray" />
        <q-space />

        <q-btn @click="minimize()" dense flat icon="lens" color="yellow" />
        <q-btn @click="toggleMaximize()" dense flat icon="lens" color="green" />
        <q-btn @click="close()" dense flat icon="lens" color="red" />
      </q-bar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>

  <SettingModal v-model="isOpenSettingModal" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import SettingModal from '@/components/SettingModal.vue';
// const leftDrawerOpen = ref(false)
const drawer = ref(false)
const isOpenSettingModal = ref(false)
// function toggleLeftDrawer() {
//   leftDrawerOpen.value = !leftDrawerOpen.value
// }

const minimize = (): void => {
  if (window.api.minimizeWindow) {
    window.api?.minimizeWindow()
  }
}
const toggleMaximize = (): void => {
  if (window.api.toggleMaxmizeWindow) {
    window.api.toggleMaxmizeWindow()
  }
}
const close = (): void => {
  if (window.api.closeWindow) {
    window.api.closeWindow()
  }
}

const openSettingModal = (): void => {
  isOpenSettingModal.value = true
}
</script>
