import { defineStore } from "pinia";
import axios from "axios";
import { useMarketStore } from "./marketsStores";

export const useCurrencyStore = defineStore("currency", {
  state: () => ({
    currencies: [],
    loading: false,
    error: null,
    lastFetched: null,
  }),
  getters: {
    getCurrencyByCode: (state) => (code) => {
        if (!code) return null;
        return state.currencies.find(
          (c) => c.code.toLowerCase() === code.toLowerCase()
        );
      },
    
      currenciesWithoutMarket: (state) => {
        const marketStore = useMarketStore();
        const marketCodes = marketStore.markets.map((m) =>
          m.pair.primary.toLowerCase()
        );
        return state.currencies.filter(
          (currency) => !marketCodes.includes(currency.code.toLowerCase())
        );
      },
  },
  actions: {
    async fetchCurrencies() {
      this.loading = true;
      this.error = null;
      try {
        const response = await axios.get("/api/currency");
        this.currencies = response.data;
        this.lastFetched = new Date();
      } catch (err) {
        console.error("Error fetching currencies:", err);
        this.error =
          err.response?.data?.message ||
          err.message ||
          "Failed to fetch currencies";
      } finally {
        this.loading = false;
      }
    },
  },
});
