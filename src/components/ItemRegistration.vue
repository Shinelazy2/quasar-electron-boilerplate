<template>
  <q-dialog v-model="dialog" @paste="handlePaste">
    <q-card>
      <q-card-section>
        <div class="text-h6">아이템 등록</div>
      </q-card-section>

      <q-card-section>
        <q-input v-model="itemName" label="아이템명" />
        <q-img v-if="imageUrl" :src="imageUrl" class="q-mb-md" /> <!-- 이미지 미리보기 -->
        <q-list>
          <q-item v-for="(option, index) in itemOptions" :key="index">
            <q-input v-model="itemOptions[index]" label="아이템 옵션" />
          </q-item>
        </q-list>
        <q-btn icon="add" @click="addOption">옵션 추가</q-btn>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="취소" @click="dialog = false" />
        <q-btn flat label="등록" @click="registerItem" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useItemStore } from '@/stores/useItem.store';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const dialog = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value)
});

const itemName = ref('');
const itemOptions = ref<string[]>(['']);
const imageUrl = ref<string | null>(null); // 미리보기 URL

const store = useItemStore();


watch(itemOptions, (newValue, oldValue) => {
  console.log('itemOptions.value', newValue);
})

const addOption = () => {
  itemOptions.value.push('');
};

const registerItem = async () => {
  if (imageUrl.value) {

    await store.registerItem(itemName.value, JSON.stringify(itemOptions.value), imageUrl.value);
    dialog.value = false;
  }
};

// 클립보드에서 이미지 붙여넣기 처리
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
            imageUrl.value = e.target?.result as string;
          };
          reader.readAsDataURL(blob);
        }
      }
    });
  }
};
</script>
