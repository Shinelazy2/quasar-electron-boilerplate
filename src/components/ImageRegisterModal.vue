<script setup lang='ts'>
import { computed, defineProps, defineEmits, onMounted, onUnmounted, ref } from 'vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const imageSrc = ref('https://cdn.quasar.dev/img/chicken-salad.jpg');

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (items) {
    // 'forEach' 메서드를 사용하여 반복
    Array.from(items).forEach((item) => {
      if (item.type.indexOf('image') !== -1) {
        const blob = item.getAsFile();
        if (blob) {
          const reader = new FileReader();
          reader.onload = (e) => {
            imageSrc.value = e.target?.result as string;
          };
          reader.readAsDataURL(blob);
        }
      }
    });
  }
};

onMounted(() => {
  window.addEventListener('paste', handlePaste);
});

onUnmounted(() => {
  window.removeEventListener('paste', handlePaste);
});

const itemName = ref(''); // 아이템명
const effects = ref<string[]>([]); // 효과 리스트

const saveItem = () => {
  console.log('아이템명:', itemName.value);
  console.log('효과:', effects.value);
};

const addEffect = () => {
  effects.value.push('');
};
</script>
<template >
  <q-dialog v-model="isOpen">
    <q-card class="my-card">
      <q-img :src="imageSrc" />

      <q-card-section>
        <q-input v-model="itemName" label="아이템명" outlined class="q-mb-md" />

        <div class="row no-wrap items-center">
          <q-input v-for="(effect, index) in effects" :key="index" v-model="effects[index]" label="효과" outlined
            class="q-mb-md q-mr-sm" />
          <q-btn icon="add" color="primary" @click="addEffect" flat round />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn v-close-popup flat color="primary" label="Save" @click="saveItem" />
        <q-btn v-close-popup flat color="primary" round icon="event" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<style scpoe></style>
