<script setup>
import { useMusicPlayer } from '../stores/music.js'
import LyricsPanel from '../components/LyricsPanel.vue'

const {
  playlist,
  state,
  currentSong,
  progressPercent,
  formatTime,
  togglePlay,
  prev,
  next,
  selectSong,
  seek,
  toggleMute,
  setVolume,
} = useMusicPlayer()
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">音乐</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">按下空格键播�?暂停</p>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Player -->
      <div class="lg:col-span-1 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 flex flex-col items-center">
        <div class="w-44 h-44 rounded-2xl overflow-hidden shadow-xl mb-6 flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
          <svg class="w-20 h-20 text-white/80" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
          </svg>
        </div>

        <div class="text-center mb-6 w-full">
          <h3 class="text-xl font-bold text-slate-900 dark:text-white truncate">{{ currentSong.title }}</h3>
          <p class="text-sm text-slate-500 dark:text-slate-400 mt-1">{{ currentSong.artist }}</p>
        </div>

        <!-- Progress Bar -->
        <div class="w-full mb-4">
          <div
            class="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer group/progress overflow-hidden"
            @click="seek(($event.offsetX / $event.currentTarget.offsetWidth))"
          >
            <div
              class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-200 relative"
              :style="{ width: progressPercent + '%' }"
            >
              <div class="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div class="flex justify-between mt-1 text-xs text-slate-400 font-mono">
            <span>{{ formatTime(state.currentTime) }}</span>
            <span>{{ formatTime(state.duration) }}</span>
          </div>
        </div>

        <!-- Controls -->
        <div class="flex items-center gap-6">
          <button @click="prev" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
          </button>
          <button
            @click="togglePlay"
            class="w-14 h-14 rounded-full bg-indigo-500 text-white flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg hover:shadow-xl active:scale-95"
          >
            <svg v-if="!state.isPlaying" class="w-6 h-6 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            <svg v-else class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
          </button>
          <button @click="next" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
          </button>
        </div>

        <!-- Volume -->
        <div class="flex items-center gap-3 mt-6 w-full max-w-[200px]">
          <button @click="toggleMute" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors flex-shrink-0">
            <svg v-if="!state.isMuted && state.volume > 0" class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            :value="state.volume"
            @input="setVolume(parseFloat($event.target.value))"
            class="w-full h-1.5 appearance-none bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer accent-indigo-500"
          />
        </div>
      </div>

      <!-- Playlist -->
      <div class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900 dark:text-white">播放列表</h2>
          <span class="text-xs text-slate-400">{{ playlist.length }} 首</span>
        </div>
        <div class="space-y-2">
          <div
            v-for="(song, idx) in playlist"
            :key="song.id"
            @click="selectSong(idx)"
            class="flex items-center gap-4 p-3 rounded-2xl transition-colors cursor-pointer group/song"
            :class="idx === state.currentIndex ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-white/50 dark:hover:bg-slate-700/50'"
          >
            <div
              class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-indigo-400 to-purple-500 text-white relative overflow-hidden"
            >
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z"/></svg>
              <div v-if="idx === state.currentIndex && state.isPlaying" class="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div class="flex gap-0.5 items-end h-4">
                  <span class="w-0.5 bg-white rounded-full animate-equalizer" style="height:60%"></span>
                  <span class="w-0.5 bg-white rounded-full animate-equalizer" style="height:100%;animation-delay:0.2s"></span>
                  <span class="w-0.5 bg-white rounded-full animate-equalizer" style="height:40%;animation-delay:0.4s"></span>
                </div>
              </div>
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-bold text-sm text-slate-900 dark:text-white truncate" :class="{ 'text-indigo-600 dark:text-indigo-400': idx === state.currentIndex }">
                {{ song.title }}
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ song.artist }}</p>
            </div>
            <div v-if="idx === state.currentIndex" class="flex-shrink-0">
              <svg class="w-5 h-5 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
            </div>
          </div>
        </div>
      </div>

      <!-- Lyrics -->
      <div class="lg:col-span-2">
        <LyricsPanel />
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes equalizer {
  0%, 100% { height: 20%; }
  50% { height: 100%; }
}
.animate-equalizer {
  animation: equalizer 0.8s ease-in-out infinite;
}
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
input[type='range']::-moz-range-thumb {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: none;
}
</style>
