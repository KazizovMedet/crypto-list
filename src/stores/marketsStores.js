import { defineStore } from "pinia";
import axios from "axios";
import { useCurrencyStore } from "./currencyStores";

export const useMarketStore = defineStore("market", {
  state: () => ({
    markets: [],
    loading: false,
    error: null,
  }),
  getters: {
    mergedMarkets: (state) => {
      const currencyStore = useCurrencyStore();
      return state.markets.map((market) => {
        const currency = currencyStore.currencies.find(
          (el) => el.code.toLowerCase() === market.pair.primary.toLowerCase()
        );
        return {
          ...market,
          icon: currency?.icon || null,
          ticker: currency?.ticker || market.pair.primary,
          sort_order: currency?.sort_order || 9999,
        };
      });
    },
    getCurrencyData: (state) => (code) => {
        if (!code) return null
        return state.mergedMarkets.find(item => 
          item.pair.primary.toLowerCase() === code.toLowerCase()
        )
      },
  },
  actions: {
    async fetchMarketData() {
        this.loading = true
        this.error = null
        try {
          const response = await axios.get('/api/market')
          this.markets = response.data
        } catch (err) {
          console.error('Error fetching market data:', err)
          this.error = err.response?.data?.message || err.message || 'Failed to fetch market data'
        } finally {
          this.loading = false
        }
      },
  },
});
