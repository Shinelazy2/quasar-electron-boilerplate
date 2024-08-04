<template>
  <div @paste="handlePaste">
    <canvas ref="canvas" style="border:1px solid #000000;"></canvas>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const canvas = ref<HTMLCanvasElement | null>(null);
const screenshotBuffer = ref<Buffer | null>(null);

const handlePaste = (event: ClipboardEvent) => {
  const items = event.clipboardData?.items;
  if (items) {
    const item = Array.from(items).find(i => i.type.startsWith('image'));
    if (item) {
      const blob = item.getAsFile();
      if (blob) {
        const reader = new FileReader();
        reader.onload = () => {
          screenshotBuffer.value = Buffer.from(new Uint8Array(reader.result as ArrayBuffer));
          const img = new Image();
          img.onload = () => {
            const ctx = canvas.value?.getContext('2d');
            if (ctx) {
              ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
              canvas.value.width = img.width;
              canvas.value.height = img.height;
              ctx.drawImage(img, 0, 0);
            }
          };
          img.src = URL.createObjectURL(blob);
        };
        reader.readAsArrayBuffer(blob);
      }
    }
  }
};
</script>
