<template>
  <q-page class="column ">
    <div class="log-container" ref="logContainer">
      <q-infinite-scroll :offset="250">
        <div v-for="(log, index) in store.logs" :key="index" class="caption">
          <p class="content">{{ log }}</p>
        </div>
      </q-infinite-scroll>

    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCounterStore } from '@/stores/example-store';
import dayjs from 'dayjs';
import { onMounted, ref, watchEffect } from 'vue';


const store = useCounterStore()
const logContainer = ref<HTMLElement | null>(null);
const logs = ref<string[]>([])
onMounted(async () => {
  await store.setSettings()
  // await localTransfer()
  await store.startTransferImage()
})

watchEffect(() => {
  if (logContainer.value) {
    console.log('logContainer.value', logContainer.value)
    console.log('logContainer.value.scrollTop', logContainer.value.scrollTop)
    logContainer.value.scrollTop = logContainer.value.scrollHeight;
  }
});




</script>
<style scoped>
.log-container {
  max-height: 630px;
  min-width: 800px;
  overflow-y: auto;
  display: flex;

  flex-direction: column-reverse;
}



.content {
  padding: 0px;
  margin: 0px;
}
</style>
