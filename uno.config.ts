// uno.config.ts
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  presets: [presetUno()],
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


/**
 * 20% {
    background-color: #ffff;
    transform: scaleY(1.5);
  }

  40% {
    transform: scaleY(1);
  }
 */