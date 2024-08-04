<template>
  <q-page class="row">
    <div class="col-3">
      <q-list bordered padding>
        <q-btn label="아이템 등록" @click="openDialog" color="primary" />
        <ItemCard v-for="item in items" :key="item.id" :item="item" />
      </q-list>
    </div>
    <div class="col-9">
      <ScreenshotDisplay />
    </div>

    <!-- 아이템 등록 다이얼로그 -->
    <ItemRegistration v-model="dialog" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { computed } from 'vue';
import { useItemStore } from '@/stores/useItem.store';
import ItemCard from '../components/ItemCard.vue';
import ScreenshotDisplay from '../components/ScreenshotDisplay.vue';
import ItemRegistration from '../components/ItemRegistration.vue';

const store = useItemStore();
const items = computed(() => store.items);
const dialog = ref(false);

const openDialog = () => {
  dialog.value = true;
};
</script>
