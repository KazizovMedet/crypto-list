<template>
  <div class="p-6 container mx-auto">
    <ul class="space-y-3">
      <li
        v-for="item in mergedData"
        :key="item.pair.primary"
        class="flex items-center bg-white p-4 gap-3 rounded-xl shadow cursor-pointer"
      >
        <router-link
          :to="`/details/${item.pair.primary.toLowerCase()}`"
          class="flex items-center w-full gap-3"
        >
          <my-image :item="item"></my-image>
          <div class="flex flex-col">
            <span class="font-bold text-black">{{ item.ticker }}</span>
            <span class="text-gray-500 text-sm">
              Volume: {{ item.volume.primary }}
            </span>
          </div>
          <span
            class="ml-auto font-semibold"
            :class="item.price?.change?.direction?.toLowerCase() === 'up' ? 'text-green-600' : 'text-red-600'"
          >
            {{ item.price.last }} AUD
          </span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useMarketStore } from "../stores/marketsStores";
import MyImage from "@components/UI/My-image.vue";

const marketStore = useMarketStore();
const mergedData = computed(() => marketStore.mergedMarkets);
</script>
