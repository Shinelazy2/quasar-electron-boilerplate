<template>
  <q-card>
    <q-img :src="imageSrc" />
    <q-card-section>
      <div class="text-h6">{{ item.name }}</div>
      <div v-for="option in item.options" :key="option">{{ option }}</div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{ item: { name: string; options: string[]; image: string | Buffer } }>();

const imageSrc = computed(() => {
  console.log('item-image', props.item.image);

  return `${props.item.image}`;
});
</script>
