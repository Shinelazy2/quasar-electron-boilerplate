<script setup lang='ts'>
import { onMounted, Ref, ref } from 'vue';

const medium = ref<boolean>(false)
const sourceDirPath = ref<string>('')
const targetDirPath = ref<string>('')

onMounted(async () => {
  // get Settings
  const pathCommonCode = await window.api.getCommonCode(1000)
  console.log('🚀 ~ onMounted ~ pathCommonCode:', pathCommonCode)

})

const saveDirPath = async (type: string) => {
  //
  console.log('🚀 ~ saveDirPath ~ window.api:', window.api)

  const path = await window.api.getDirPath()


  if (type === 'source') {
    sourceDirPath.value = path
  }

  if (type === 'target') {
    targetDirPath.value = path
  }
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
            <div class="text-subtitle2">{{ sourceDirPath }}</div>
          </q-card-section>
          <hr />
          <q-card-section class="setting-section" @click="saveDirPath('target')">
            <div class="text-h6">Target Path</div>
            <div class="text-subtitle2" :value="targetDirPath">{{ targetDirPath }}</div>
          </q-card-section>
          <hr />
        </q-card>
      </q-card-section>

      <q-card-actions align="right" class="bg-white text-teal">
        <q-btn flat label="Cancle" v-close-popup />
        <q-btn flat label="Save" v-close-popup />

      </q-card-actions>

    </q-card>
  </q-dialog>


</template>
<style scpoe>
.setting-section {
  height: 100px;
}
</style>
