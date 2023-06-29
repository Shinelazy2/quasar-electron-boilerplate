<template>
  <q-layout view="hHh Lpr lFf">
    <q-header elevated>
      <q-bar class="q-electron-drag">
        <q-space />
        <q-btn @click="minimize()" dense flat icon="lens" color="yellow" />
        <q-btn @click="toggleMaximize()" dense flat icon="lens" color="green" />
        <q-btn @click="close()" dense flat icon="lens" color="red" />
      </q-bar>
    </q-header>

    <!-- <q-drawer v-model="drawer" show-if-above :width="150" :breakpoint="500" class="bg-green-2">
      <q-scroll-area class="fit">
        <q-list padding class="menu-list">
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section>
              Inbox
            </q-item-section>
          </q-item>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section>
              Star
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="send" />
            </q-item-section>

            <q-item-section>
              Send
            </q-item-section>
          </q-item>

          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="drafts" />
            </q-item-section>

            <q-item-section>
              Drafts
            </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>
    </q-drawer> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// const leftDrawerOpen = ref(false)
const drawer = ref(false)

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
</script>
