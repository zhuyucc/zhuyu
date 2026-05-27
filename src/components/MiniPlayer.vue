<script setup>
import { useMusicPlayer } from '../stores/music.js'

import { ref } from 'vue'

const {
  state,
  currentSong,
  formatTime,
  currentLyricLine,
  showLyrics,
  lyricsData,
  togglePlay,
  prev,
  next,
  seek,
} = useMusicPlayer()

const progressRef = ref(null)
const isDragging = ref(false)

const handleProgressClick = (e) => {
  if (!state.duration || !progressRef.value) return
  const rect = progressRef.value.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  seek(Math.max(0, Math.min(1, pct)))
}

const startDrag = (e) => {
  isDragging.value = true
  handleProgressClick(e)
  const onMove = (ev) => { handleProgressClick(ev) }
  const onUp = () => {
    isDragging.value = false
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}
</script>

<template>
  <div class="h-full w-full rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 flex flex-col items-center justify-center transition-colors duration-700">
    <div v-if="!state.duration && !state.isPlaying" class="flex flex-col items-center justify-center gap-4">
      <div class="w-10 h-10 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
      <span class="text-slate-800 dark:text-white font-bold tracking-widest animate-pulse text-sm">CONNECTING...</span>
      <div class="text-sm md:text-base text-center text-slate-600 dark:text-slate-300 italic leading-none flex items-center justify-center w-full h-7 md:h-8">
        <span class="truncate">{{ lyricsData.length ? lyricsData[0].text : '' }}</span>
      </div>
    </div>
    <template v-else>
      <div class="flex items-center gap-5 w-full mb-8">
        <div class="relative shrink-0 w-16 h-16 flex items-center justify-center">
          <!-- Water ripple rings -->
          <div v-if="state.isPlaying" class="ripple-ring"></div>
          <div v-if="state.isPlaying" class="ripple-ring"></div>
          <div v-if="state.isPlaying" class="ripple-ring"></div>
          <!-- CD disc -->
          <div
            class="w-16 h-16 rounded-full overflow-hidden shadow-lg relative z-10 animate-disc-spin"
            :style="{ animationPlayState: state.isPlaying ? 'running' : 'paused' }"
          >
            <img src="/img/music.svg" class="w-full h-full" alt="music">
          </div>
        </div>
        <div class="flex-1 min-w-0">
          <p class="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">NOW PLAYING</p>
          <h3 class="text-base font-bold text-slate-900 dark:text-white truncate">{{ currentSong.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 truncate">{{ currentSong.artist }}</p>
        </div>
      </div>

      <div class="w-full px-4 mb-1">
        <div
          ref="progressRef"
          class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer group/progress overflow-hidden relative"
          @click="handleProgressClick"
          @mousedown="startDrag"
        >
          <div
            class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-300 relative"
            :style="{ width: state.duration ? ((state.currentTime / state.duration) * 100) + '%' : '0%' }"
          >
            <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
          </div>
        </div>
        <div class="flex justify-between mt-1 text-[10px] text-slate-400 font-mono">
          <span>{{ formatTime(state.currentTime) }}</span>
          <span>{{ formatTime(state.duration) }}</span>
        </div>
      </div>

      <div class="text-sm md:text-base text-center text-slate-600 dark:text-slate-300 italic mb-3 px-2 h-7 md:h-8 leading-none flex items-center justify-center">
        <span class="truncate">{{ showLyrics && currentLyricLine ? currentLyricLine : '' }}</span>
      </div>

      <div class="flex items-center gap-5">
        <button @click="prev" class="text-slate-400 hover:text-indigo-500 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
        </button>
        <button
          @click="togglePlay"
          class="w-12 h-12 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-md active:scale-95"
        >
          <svg v-if="!state.isPlaying" class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
        </button>
        <button @click="next" class="text-slate-400 hover:text-indigo-500 transition-colors">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
        </button>
      </div>
    </template>
  </div>
</template>
