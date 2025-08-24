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
  return new Promise((resolve, reject) => {
    if (window.TradingView) return resolve();

    const src = '/api/tv.js';

    const exist = document.querySelector(`script[src="${src}"]`);
    if (exist) {
      exist.addEventListener('load', resolve, { once: true });
      exist.addEventListener('error', reject, { once: true });
      return;
    }

    const s = document.createElement('script');
    s.src = src;
    s.async = true;
    s.crossOrigin = 'anonymous';
    s.onload = resolve;
    s.onerror = reject;
    document.head.appendChild(s);
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
  