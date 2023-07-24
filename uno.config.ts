// uno.config.ts
import { defineConfig, presetUno } from 'unocss'

export default defineConfig({
  shortcuts: {
    TindogsBg: '[background:radial-gradient(circle_at_50%_0,#134a81_0%,#050505_50rem)]',
    LoginBg: '[background:radial-gradient(circle_at_50%_0,#811313_0%,#050505_50rem)]',
    RegisterBg: '[background:radial-gradient(circle_at_50%_0,#301381_0%,#050505_50rem)]',
  },
  presets: [presetUno()],
})
