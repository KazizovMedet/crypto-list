/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: "class", // Включаем темную тему
  theme: {
    extend: {
      colors: {
        // Темная цветовая палитра
        dark: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b",
          900: "#0f172a",
          950: "#020617",
        },
        // Крипто цвета
        crypto: {
          primary: "#00d4aa", // Зеленый (как Bitcoin)
          secondary: "#ff6b35", // Оранжевый
          accent: "#6366f1", // Индиго
          success: "#10b981", // Изумрудный
          warning: "#f59e0b", // Янтарный
          danger: "#ef4444", // Красный
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
    },
  },
  plugins: [],
};
