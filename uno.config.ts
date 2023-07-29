// uno.config.ts
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
  shortcuts: {
    'input': 'h-[2em] rounded-md border-none px-2 bg-[#333333] text-[#F5F3F4]'
  },
  theme: {
    animation: {
      keyframes: {
        'scale-up': '{20% {background-color: #ffff;transform: scaleY(1.5);}40% {transform: scaleY(1);}}'
      },
      durations: {
        'scale-up': '1s'
      },
      timingFns: {
        'scale-up': 'linear'
      },
      counts: {
        'scale-up': 'infinite'
      }
    }
  }
})
