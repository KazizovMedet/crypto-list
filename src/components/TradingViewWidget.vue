<template>
  <div
      :id="containerId"
      class="w-full"
      :style="{ height: height + 'px', mihHeight: '500px' }"
  ></div>
</template>

<script setup>
import {onMounted, onBeforeUnmount, watch, ref} from "vue";

const props = defineProps({
  symbol: {type: String, required: true},
  interval: {type: String, default: "60"},
  theme: {type: String, default: "light"},
  locale: {type: String, default: "en"},
  autosize: {type: Boolean, default: true},
  height: {type: Number, default: 500},
});

const containerId = `tv_${Math.random().toString(36).slice(2)}`;
let scriptEl = null;

function loadScript() {
  return new Promise((resolve) => {
    if (window.TradingView) {
      resolve();
      return;
    }
    scriptEl = document.createElement("script");
    scriptEl.src = "https://s3.tradingview.com/tv.js";
    scriptEl.async = true;
    scriptEl.onload = () => resolve();
    document.head.appendChild(scriptEl);
  });
}

function renderWidget() {
  if (!window.TradingView) return;
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = "";

  // eslint-disable-next-line no-new
  new window.TradingView.widget({
    symbol: props.symbol,
    interval: props.interval,
    theme: props.theme,
    style: "1",
    locale: props.locale,
    hide_side_toolbar: false,
    allow_symbol_change: false,
    container_id: containerId,
    autosize: props.autosize,
  });
}

onMounted(async () => {
  await loadScript();
  renderWidget();
});

watch(
    () => props.symbol,
    () => {
      renderWidget();
    }
);

</script>
  