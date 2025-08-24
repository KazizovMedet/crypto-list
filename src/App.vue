<template>
  <div class="min-h-screen bg-dark-950 text-dark-100">
    <header-ui></header-ui>
    <router-view />
  </div>
</template>

<script>
import { onMounted } from "vue";
import HeaderUi from "./components/Header-ui.vue";
import { useCurrencyStore } from "@/stores/currencyStores.js";
import { useMarketStore } from "@/stores/marketsStores.js";

export default {
  components: { HeaderUi },
  setup() {
    const currencyStore = useCurrencyStore();
    const marketStore = useMarketStore()

    onMounted(() => {
      marketStore.fetchMarketData()
      currencyStore.fetchCurrencies();
    });

    return {
      currencyStore,
    };
  },
};
</script>

<style scoped>
</style>
