<template>
  <div class="p-6 container mx-auto">
    <div class="bg-white p-4 rounded-xl">
      <div class="mb-6">
        <div
            v-if="currency"
            class="flex items-center justify-between"
        >
          <h2 class="text-2xl font-bold text-gray-800 mb-2">
            {{ baseCode }}/{{ quote?.code || 'AUD' }}
          </h2>

          <CurrencyPicker
            v-model="quote"
            :items="secondaryList"
          />
        </div>

        <div v-else-if="!marketStore.loading">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Currency Not Found</h2>
          <p class="text-gray-600">The requested currency could not be found</p>
        </div>
      </div>

      <div v-if="marketStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading currency data...</span>
      </div>

      <div v-else-if="currency" class="space-y-6">
        <div class="bg-white rounded-xl shadow-lg p-2">
          <TradingViewWidget
            :symbol="chartSymbol"
            interval="60"
            theme="light"
            locale="en"
            :autosize="true"
          />
        </div>
      </div>

      <div v-else class="text-center py-8">
        <p class="text-gray-500">Currency not found</p>
        <p class="text-sm text-gray-400 mt-2">ID: {{ id }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed, onMounted, ref, watch } from 'vue'
import TradingViewWidget from '@/components/TradingViewWidget.vue'
import CurrencyPicker from '../components/Currency-picker.vue'
import { useMarketStore } from '@/stores/marketsStores'
import { useCurrencyStore } from '@/stores/currencyStores'

const route = useRoute()
const id = route.params.id

const marketStore = useMarketStore()
const currencyStore = useCurrencyStore()

const currency = computed(() => marketStore.getCurrencyData(id))
const baseCode = computed(() =>
  (currency.value?.ticker || currency.value?.pair?.primary || id || '').toUpperCase()
)

const secondaryList = computed(() =>
  currencyStore.currencies.filter(c => c.type?.toLowerCase() === 'secondary')
)

const quote = ref(null)

const chartSymbol = computed(() =>
  (baseCode.value && quote.value)
    ? `${baseCode.value}${quote.value.code.toUpperCase()}`
    : 'BTCUSDT'
)

onMounted(async () => {
  if (!marketStore.mergedMarkets.length) {
    await marketStore.fetchMarketData()
  }
  if (!currencyStore.currencies.length) {
    await currencyStore.fetchCurrencies()
  }

  quote.value =
    secondaryList.value.find(x => x.code?.toLowerCase() === 'aud') ||
    secondaryList.value[0] ||
    null
})

watch(() => route.params.id, async (newId) => {
  if (newId && !marketStore.mergedMarkets.length) {
    await marketStore.fetchMarketData()
  }
})
</script>
