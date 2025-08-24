import { defineStore } from "pinia";
import { http } from "../lib/customAxios.js";
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
        (c) => c.code.toLowerCase() === String(code).toLowerCase()
      );
    },

    currenciesWithoutMarket: (state) => {
      const marketStore = useMarketStore(); // можно вызывать другие сторы в геттерах
      return state.currencies.filter(
        (c) => !marketStore.marketCodes.has(c.code.toLowerCase())
      );
    },
  },

  actions: {
    async fetchCurrencies({ force = false } = {}) {
      if (this.loading) return;
      if (!force && this.lastFetched && Date.now() - this.lastFetched < 60_000) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.get("/currency");
        this.currencies = Array.isArray(data) ? data : [];
        this.lastFetched = Date.now();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
