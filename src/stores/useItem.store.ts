import { defineStore } from 'pinia';
import { ref } from 'vue';
import { ItemEntity } from '@/entities/item.entity';

export const useItemStore = defineStore('itemStore', () => {
  const items = ref<ItemEntity[]>([]);

  const registerItem = async (name: string, option: string, image: string) => {
    console.log('🚀 ~ registerItem ~ image:', image);
    console.log('🚀 ~ registerItem ~ options:', option);
    console.log('🚀 ~ registerItem ~ name:', name);
    const options = JSON.parse(option) as string[];
    await window.api.registerItemService(name, option, image);
    items.value.push({ name, options, image });
  };

  return { items, registerItem };
});
