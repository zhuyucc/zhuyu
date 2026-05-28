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

function pickSong(song) {
  const idx = playlist.indexOf(song)
  if (idx >= 0) selectSong(idx)
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">音乐</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">谁家玉笛暗飞声，散入春风满洛城。此夜曲中闻折柳，何人不起故园情。 ——李白《春夜洛城闻笛》</p>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-6">
      <!-- Player -->
      <div class="lg:col-span-1 rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl p-8 flex flex-col items-center">
        <div class="relative w-44 h-44 flex items-center justify-center mb-6">
          <!-- Water ripple rings -->
          <div v-if="state.isPlaying" class="ripple-ring !border-[3px]"></div>
          <div v-if="state.isPlaying" class="ripple-ring !border-[3px]"></div>
          <div v-if="state.isPlaying" class="ripple-ring !border-[3px]"></div>
          <!-- CD disc -->
          <div
            class="w-44 h-44 rounded-full overflow-hidden shadow-xl relative z-10 animate-disc-spin"
            :style="{ animationPlayState: state.isPlaying ? 'running' : 'paused' }"
          >
              <img src="/img/music.svg" class="w-full h-full" alt="music">
          </div>
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
          <span class="text-xs text-slate-400">{{ filteredPlaylist.length }} / {{ playlist.length }} 首</span>
        </div>

        <form class="relative group mb-4" @submit.prevent>
          <input
            type="text"
            v-model="searchQuery"
            class="w-full pl-10 pr-4 py-2.5 bg-white/50 dark:bg-slate-700/50 border border-white/40 dark:border-white/10 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 text-sm transition-all placeholder-slate-400"
            placeholder="搜索歌曲或歌手..."
            autocomplete="off"
            spellcheck="false"
          />
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
        </form>

        <div v-if="filteredPlaylist.length === 0" class="text-center py-8 text-slate-400 text-sm">未找到匹配的歌曲</div>
        <div v-else class="space-y-1">
          <div
            v-for="song in filteredPlaylist"
            :key="song.id"
            @click="pickSong(song)"
            class="flex items-center gap-3 p-2.5 rounded-xl transition-colors cursor-pointer group/song"
            :class="song === playlist[state.currentIndex] ? 'bg-indigo-50 dark:bg-indigo-900/30' : 'hover:bg-white/50 dark:hover:bg-slate-700/50'"
          >
            <div
              class="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 relative"
              :class="song === playlist[state.currentIndex] ? 'animate-disc-spin' : ''"
              :style="song === playlist[state.currentIndex] ? { animationPlayState: state.isPlaying ? 'running' : 'paused' } : {}"
            >
              <img src="/img/mp3.svg" class="w-full h-full" alt="mp3">
            </div>
            <div class="flex-1 min-w-0">
              <h4 class="font-semibold text-sm text-slate-900 dark:text-white truncate" :class="{ 'text-indigo-600 dark:text-indigo-400': song === playlist[state.currentIndex] }">
                {{ song.title }}
              </h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 truncate">{{ song.artist }}</p>
            </div>
            <div v-if="song === playlist[state.currentIndex]" class="flex-shrink-0">
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
