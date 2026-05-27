<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  isDark: Boolean,
})

const currentBg = ref(0)
let interval = null

const bgImages = [
  'https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg',
  'https://bu.dusays.com/2026/03/24/69c26fe4acdb5.jpg',
  'https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg',
  'https://bu.dusays.com/2026/03/24/69c26fe4d55b6.jpg',
  'https://bu.dusays.com/2026/03/24/69c26fe50cf3f.jpg',
  'https://bu.dusays.com/2026/03/26/69c542954a80d.jpg',
  'https://bu.dusays.com/2026/03/26/69c542fd70279.jpg',
]

onMounted(() => {
  interval = setInterval(() => {
    currentBg.value = (currentBg.value + 1) % bgImages.length
  }, 5000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
    <div class="absolute inset-0 z-[-10] overflow-hidden">
      <div
        v-for="(img, idx) in bgImages"
        :key="idx"
        class="absolute inset-0 transition-all duration-[2000ms] ease-in-out"
        :class="idx === currentBg ? 'opacity-100 visible' : 'opacity-0 invisible'"
        :style="{ backgroundImage: 'url(' + img + ')', backgroundSize: 'cover', backgroundPosition: 'center' }"
      ></div>
    </div>
    <div class="absolute inset-0 z-[-9] transition-colors duration-1000" :class="isDark ? 'bg-slate-900/40' : 'bg-white/30'" style="backdrop-filter: blur(16px);"></div>
    <div
      class="absolute inset-0 z-[-8] opacity-60 dark:opacity-20 mix-blend-color transition-opacity duration-1000"
      :style="{ background: 'linear-gradient(-45deg, #a18cd1, #fbc2eb, #a1c4fd, #c2e9fb)', backgroundSize: '400% 400%', animation: 'gradientMove 15s ease infinite' }"
    ></div>
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-white/40 dark:bg-indigo-900/20 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/30 dark:bg-purple-900/30 blur-[100px] rounded-full z-[-7] md:mix-blend-overlay"></div>

    <!-- Fireflies (desktop only) -->
    <div class="hidden md:block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden" :class="isDark ? 'mix-blend-screen' : 'mix-blend-screen'">
      <div
        v-for="i in 12"
        :key="'firefly-' + i"
        class="absolute w-1.5 h-1.5 rounded-full bg-green-300"
        :style="{
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animation: 'fireflyBreathe ' + (2 + Math.random() * 3) + 's ease-in-out infinite',
          animationDelay: Math.random() * 5 + 's',
          '--float': 'float' + ((i % 4) + 1),
          animationName: 'fireflyBreathe, float' + ((i % 4) + 1),
          animationDuration: (2 + Math.random() * 3) + 's, ' + (8 + Math.random() * 12) + 's',
          animationDelay: Math.random() * 5 + 's, 0s',
          animationTimingFunction: 'ease-in-out, ease-in-out',
          animationIterationCount: 'infinite, infinite',
        }"
      ></div>
    </div>

    <!-- Bottom grass -->
    <div class="fixed bottom-0 left-0 w-full h-32 pointer-events-none z-10 overflow-hidden">
      <svg viewBox="0 0 1440 128" class="w-full h-full" preserveAspectRatio="none">
        <path d="M0,64 C240,0 480,128 720,64 C960,0 1200,128 1440,64 L1440,128 L0,128 Z" fill="rgba(100,116,139,0.08)" />
      </svg>
    </div>
  </div>
</template>
