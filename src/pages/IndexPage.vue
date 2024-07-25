<template>
  <q-page class="row items-center justify-evenly">
    index
    <q-btn label="getTest" @click="getTest()"></q-btn>
    <q-btn label="robotTest" @click="robotTest()"></q-btn>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
// TODO: 설정된 Source -> Target -> 차량번호를 유지, 단속일시를 변경

const getTest = async () => {
  const getQuery = await window.api.getTest()
  console.log('🚀 ~ getTest ~ getQuery:', getQuery)
}
const robotTest = async () => {
  const getQuery = await window.api.robotTest()
  console.log('🚀 ~ robotTest ~ getQuery:', getQuery)
}

</script>
