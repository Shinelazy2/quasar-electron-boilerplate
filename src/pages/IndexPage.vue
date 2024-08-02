<template>
  <q-page class="row items-center justify-evenly">
    index
    <q-btn label="getTest" @click="getTest()"></q-btn>
    <q-btn label="robotTest" @click="robotTest()"></q-btn>
    <q-btn label="saveClipboardImage" @click="saveClipboardImage()"></q-btn>
    <q-btn label="loadImages" @click="loadImages()"></q-btn>
    <q-btn label="imageRegister" @click="imageRegister()"></q-btn>
    <div id="imageContainer"></div>
    <ImageRegisterModal v-model="openRegisterModal" />
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import ImageRegisterModal from '@/components/ImageRegisterModal.vue'

// TODO: 설정된 Source -> Target -> 차량번호를 유지, 단속일시를 변경
const openRegisterModal = ref<boolean>(false)

const getTest = async () => {
  const getQuery = await window.api.getTest()
  console.log('🚀 ~ getTest ~ getQuery:', getQuery)
}
const robotTest = async () => {
  const getQuery = await window.api.robotTest()
  console.log('🚀 ~ robotTest ~ getQuery:', getQuery)
}

const saveClipboardImage = (): void => {
  window.api.saveClipboardImage()
}

async function loadImages() {
  const images = await window.api.getImages();
  const imageContainer = document.getElementById('imageContainer');

  images.forEach((image: any) => {
    const imgElement = document.createElement('img');
    imgElement.src = `data:image/png;base64,${image.data}`;
    imgElement.alt = `Image ${image.id}`;

    // imgElement.style = 'max-width: 200px; margin: 10px;'; // 스타일 적용
    imageContainer.appendChild(imgElement);
  });
}

const imageRegister = () => {
  // TODO: openpopup
  openRegisterModal.value = true

}

const imageSrc = ref('https://cdn.quasar.dev/img/chicken-salad.jpg');
</script>
