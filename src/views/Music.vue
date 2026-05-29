<script setup>
import { ref, computed } from 'vue'
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

const searchQuery = ref('')

const filteredPlaylist = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return playlist
  return playlist.filter(s => {
    const title = (s.title || '').toLowerCase()
    const artist = (s.artist || '').toLowerCase()
    return title.includes(q) || artist.includes(q)
  })
})

const progressRef = ref(null)

const handleProgressClick = (e) => {
  if (!state.duration || !progressRef.value) return
  const rect = progressRef.value.getBoundingClientRect()
  const pct = (e.clientX - rect.left) / rect.width
  seek(Math.max(0, Math.min(1, pct)))
}

const startDrag = (e) => {
  handleProgressClick(e)
  const onMove = (ev) => { handleProgressClick(ev) }
  const onUp = () => {
    document.removeEventListener('mousemove', onMove)
    document.removeEventListener('mouseup', onUp)
  }
  document.addEventListener('mousemove', onMove)
  document.addEventListener('mouseup', onUp)
}

function pickSong(song) {
  const idx = playlist.indexOf(song)
  if (idx >= 0) selectSong(idx)
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">音乐</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">谁家玉笛暗飞声，散入春风满洛城。此夜曲中闻折柳，何人不起故园情。 ——李白《春夜洛城闻笛》</p>

    <div class="space-y-6">
      <!-- Lyrics + Playlist -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <!-- Lyrics (main) -->
        <div class="lg:col-span-3">
          <LyricsPanel />
        </div>

        <!-- Playlist (side) -->
        <div class="lg:col-span-2 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-5">
          <div class="flex items-center justify-between mb-3">
            <h2 class="text-base font-bold text-slate-900 dark:text-white">播放列表</h2>
            <span class="text-[11px] text-slate-400">{{ filteredPlaylist.length }} / {{ playlist.length }} 首</span>
          </div>

          <form class="relative group mb-3" @submit.prevent>
            <input type="text" v-model="searchQuery" class="w-full pl-9 pr-3 py-2 bg-white/50 dark:bg-slate-700/50 border border-white/40 dark:border-white/10 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 text-xs transition-all placeholder-slate-400" placeholder="搜索..." autocomplete="off" spellcheck="false" />
            <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg class="w-3.5 h-3.5 text-slate-400" fill="none" stroke="currentColor" stroke-width="2.5" viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
          </form>

          <div v-if="filteredPlaylist.length === 0" class="text-center py-6 text-slate-400 text-xs">未找到匹配的歌曲</div>
          <div v-else class="space-y-0.5 max-h-[340px] overflow-y-auto pr-1">
            <div v-for="song in filteredPlaylist" :key="song.id" @click="pickSong(song)" class="flex items-center gap-2.5 p-2 rounded-xl transition-all duration-200 cursor-pointer border-l-2 border-transparent hover:border-indigo-400 group/song" :class="song === playlist[state.currentIndex] ? 'bg-indigo-50 dark:bg-indigo-900/30 border-indigo-500' : 'hover:bg-indigo-50/60 dark:hover:bg-slate-700/80 hover:pl-3'">
              <div class="flex-1 min-w-0">
                <h4 class="font-semibold text-xs text-slate-900 dark:text-white truncate group-hover/song:text-indigo-600 dark:group-hover/song:text-indigo-400 transition-colors" :class="{ 'text-indigo-600 dark:text-indigo-400': song === playlist[state.currentIndex] }">{{ song.title }}</h4>
                <p class="text-[10px] text-slate-500 dark:text-slate-400 truncate">{{ song.artist }}</p>
              </div>
              <div v-if="song === playlist[state.currentIndex]" class="flex-shrink-0">
                <svg class="w-4 h-4 text-indigo-500" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Compact Player Bar (bottom) -->
      <div class="rounded-2xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl px-5 py-4">
        <div class="flex items-center gap-4">
          <!-- CD thumbnail -->
          <div class="relative w-12 h-12 flex-shrink-0 flex items-center justify-center">
            <div v-if="state.isPlaying" class="ripple-ring !w-16 !h-16"></div>
            <div
              class="w-12 h-12 rounded-full overflow-hidden shadow-lg relative z-10 animate-disc-spin ring-2 ring-white/20"
              :style="{ animationPlayState: state.isPlaying ? 'running' : 'paused' }"
            >
              <img src="/img/music.svg" class="w-full h-full" alt="music">
            </div>
          </div>

          <!-- Song info -->
          <div class="flex-1 min-w-0">
            <h2 class="text-base font-bold text-slate-900 dark:text-white truncate">{{ currentSong.title }}</h2>
            <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ currentSong.artist }}</p>
          </div>

          <!-- Progress -->
          <div class="hidden sm:block w-64">
              <div
                ref="progressRef"
                class="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer group/progress overflow-hidden relative"
                @click="handleProgressClick"
                @mousedown="startDrag"
              >
                <div
                  class="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-200 relative"
                  :style="{ width: progressPercent + '%' }"
                >
                  <div class="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md opacity-0 group-hover/progress:opacity-100 transition-opacity"></div>
                </div>
            </div>
            <div class="flex justify-between mt-0.5 text-[10px] text-slate-400 font-mono">
              <span>{{ formatTime(state.currentTime) }}</span>
              <span>{{ formatTime(state.duration) }}</span>
            </div>
          </div>

          <!-- Controls -->
          <div class="flex items-center gap-2">
            <button @click="prev" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors p-1">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
            </button>
            <button @click="togglePlay" class="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center hover:scale-105 transition-all shadow-md active:scale-95">
              <svg v-if="!state.isPlaying" class="w-5 h-5 ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
            </button>
            <button @click="next" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors p-1">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
            </button>
          </div>

          <!-- Volume -->
          <div class="hidden md:flex items-center gap-2 w-24">
            <button @click="toggleMute" class="text-slate-500 dark:text-slate-400 hover:text-indigo-500 transition-colors flex-shrink-0">
              <svg v-if="!state.isMuted && state.volume > 0" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg>
              <svg v-else class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM16 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z"/></svg>
            </button>
            <input type="range" min="0" max="1" step="0.01" :value="state.volume" @input="setVolume(parseFloat($event.target.value))" class="w-full h-1 appearance-none bg-slate-200 dark:bg-slate-700 rounded-full cursor-pointer accent-indigo-500" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}
input[type='range']::-moz-range-thumb {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: #6366f1;
  cursor: pointer;
  border: none;
}
</style>
