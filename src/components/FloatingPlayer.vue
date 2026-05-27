<script setup>
import { ref, computed, onMounted, onUnmounted, watch, nextTick } from 'vue'
import { useMusicPlayer } from '../stores/music.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const {
  state,
  currentSong,
  currentLyricLine,
  togglePlay,
  next,
} = useMusicPlayer()

const playerRef = ref(null)
const lyricSpanRef = ref(null)
const lyricOverflows = ref(false)

const checkOverflow = () => {
  nextTick(() => {
    if (lyricSpanRef.value) {
      lyricOverflows.value = lyricSpanRef.value.scrollWidth > lyricSpanRef.value.clientWidth
    }
  })
}

watch(currentLyricLine, checkOverflow)
onMounted(checkOverflow)

let dragging = false
let startX = 0, startY = 0
let offsetX = 0, offsetY = 0

const onPointerDown = (e) => {
  dragging = true
  const rect = playerRef.value.getBoundingClientRect()
  offsetX = e.clientX - rect.left
  offsetY = e.clientY - rect.top
  startX = rect.left
  startY = rect.top
  playerRef.value.style.cursor = 'grabbing'
  playerRef.value.style.transition = 'none'
}

const onPointerMove = (e) => {
  if (!dragging || !playerRef.value) return
  const x = e.clientX - offsetX
  const y = e.clientY - offsetY
  playerRef.value.style.left = x + 'px'
  playerRef.value.style.top = y + 'px'
  playerRef.value.style.right = 'auto'
  playerRef.value.style.bottom = 'auto'
}

const onPointerUp = () => {
  dragging = false
  if (playerRef.value) {
    playerRef.value.style.cursor = 'grab'
    playerRef.value.style.transition = ''
  }
}

onMounted(() => {
  document.addEventListener('pointermove', onPointerMove)
  document.addEventListener('pointerup', onPointerUp)
})

onUnmounted(() => {
  document.removeEventListener('pointermove', onPointerMove)
  document.removeEventListener('pointerup', onPointerUp)
})
</script>

<style scoped>
.marquee-text {
  animation: marquee-scroll 8s linear infinite;
}
@keyframes marquee-scroll {
  0%, 20% { transform: translateX(0); }
  80%, 100% { transform: translateX(calc(-100% + 128px)); }
}
</style>

<template>
  <div
    v-if="!state.isLoading && currentSong"
    :style="isHome ? { pointerEvents: 'none', opacity: 0, transform: 'scale(0.8)' } : {}"
    class="hidden md:block fixed bottom-6 right-6 z-[9999]"
  >
    <div
      ref="playerRef"
      @pointerdown.prevent="onPointerDown"
      class="flex items-center gap-3 bg-white/70 dark:bg-slate-800/80 backdrop-blur-xl border border-white/40 dark:border-white/10 shadow-2xl p-2 pr-4 rounded-full transition-colors duration-700 cursor-grab select-none touch-none"
    >
      <div
        class="w-10 h-10 rounded-full border border-white/50 shadow-sm shrink-0 overflow-hidden relative animate-disc-spin"
        :style="{ animationPlayState: state.isPlaying ? 'running' : 'paused' }"
      >
        <img src="/img/music.svg" alt="" class="w-full h-full">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-white/80 backdrop-blur-sm rounded-full shadow-inner"></div>
      </div>
      <div class="flex flex-col w-32 overflow-hidden pointer-events-none">
        <span class="text-sm font-bold text-slate-900 dark:text-white truncate transition-colors duration-700">{{ currentSong.title }}</span>
        <div class="overflow-hidden whitespace-nowrap">
          <span
            ref="lyricSpanRef"
            class="inline-block text-[10px] text-slate-500 dark:text-slate-400 transition-colors duration-700"
            :class="lyricOverflows ? 'marquee-text' : ''"
          >{{ currentLyricLine || currentSong.artist }}</span>
        </div>
      </div>
      <div class="flex items-center gap-2 ml-[10px]">
        <button
          @click.stop="togglePlay"
          class="w-8 h-8 bg-indigo-500 text-white rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform"
        >
          <svg v-if="!state.isPlaying" class="w-3.5 h-3.5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <svg v-else class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </button>
        <button
          @click.stop="next"
          class="text-slate-600 dark:text-slate-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
        >
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>
    </div>
  </div>
</template>
