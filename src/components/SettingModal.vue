<script setup lang='ts'>
import { CommonCode } from '@/types/commonCode.type';
import { onMounted, Ref, ref } from 'vue';
import dayjs from 'dayjs';
import { useCounterStore } from '@/stores/example-store';

const medium = ref<boolean>(false)

const store = useCounterStore()

onMounted(async () => {
  await store.setGlobalDirPath()
})

const saveDirPath = async (type: string) => {

  const path = await window.api.getDirPath()
  if (type === 'source') {
    store.sourceDirPath = path
  }

  if (type === 'target') {
    store.targetDirPath = path
  }
  if (!path) throw Error('경로가 지정되지 않음')
  await window.api.setCommonCode(1000, type, path)
}

const saveTransferSpeed = async () => {
  await window.api.setCommonCode(1000, 'speed', store.transferSpeed.toString())
}
</script>
<template>
  <q-dialog v-model="medium" persistent>
    <q-card style="width: 700px; max-width: 80vw;">
      <q-card-section>
        <div class="text-h4">Settings</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-card class="my-card">
          <q-card-section class="setting-section" @click="saveDirPath('source')">
            <div class="text-h6">Source Path</div>
            <div class="text-subtitle2">{{ store.sourceDirPath }}</div>
          </q-card-section>
          <hr />
          <q-card-section class="setting-section" @click="saveDirPath('target')">
            <div class="text-h6">Target Path</div>
            <div class="text-subtitle2">{{ store.targetDirPath }}</div>
          </q-card-section>
          <hr />
          <q-card-section class="setting-section">
            <div class="text-h6">Transfer Speed</div>
            <!-- <div class="text-subtitle2">{{ store.transferSpeed }}</div> -->

            <q-input class="text-subtitle2" v-model.number="store.transferSpeed" type="number" dense filled
              style="max-width: 200px" @focusout="saveTransferSpeed()" />

          </q-card-section>
        </q-card>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="OK" v-close-popup @click="store.startTransferImage()" />

      </q-card-actions>

    </q-card>
  </q-dialog>


</template>
<style scpoe>
.setting-section {
  height: 100px;
}
</style>
