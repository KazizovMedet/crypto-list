import { defineStore } from "pinia";
import { http } from "../lib/customAxios.js";
import { useCurrencyStore } from "./currencyStores";

export const useMarketStore = defineStore("market", {
  state: () => ({
    markets: [],
    loading: false,
    error: null,
    lastFetched: null,
  }),

  getters: {
    marketCodes: (state) => {
      return new Set(state.markets.map((m) => m.pair.primary.toLowerCase()));
    },

    mergedMarkets: (state) => {
      const currencyStore = useCurrencyStore();
      return state.markets.map((m) => {
        const code = m.pair.primary.toLowerCase();
        const cur = currencyStore.currencies.find(
          (c) => c.code.toLowerCase() === code
        );
        return {
          ...m,
          icon: cur?.icon || null,
          ticker: cur?.ticker || m.pair.primary,
          sort_order: cur?.sort_order ?? 9999,
        };
      });
    },

    getCurrencyData: (state) => (code) => {
      if (!code) return null;
      const curr = state.markets.find(
        (m) => m.pair.primary.toLowerCase() === String(code).toLowerCase()
      );
      if (!curr) return null;

      const currencyStore = useCurrencyStore();
      const meta = currencyStore.currencies.find(
        (c) => c.code.toLowerCase() === String(code).toLowerCase()
      );

      return {
        ...curr,
        icon: meta?.icon || null,
        ticker: meta?.ticker || curr.pair.primary,
        sort_order: meta?.sort_order ?? 9999,
      };
    },
  },

  actions: {
    async fetchMarketData({ force = false } = {}) {
      if (this.loading) return;
      if (!force && this.lastFetched && Date.now() - this.lastFetched < 30_000) {
        return;
      }
      this.loading = true;
      this.error = null;
      try {
        const { data } = await http.get("/market");
        this.markets = Array.isArray(data) ? data : [];
        this.lastFetched = Date.now();
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
  },
});
