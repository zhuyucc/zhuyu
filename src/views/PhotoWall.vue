<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { albums } from '../data/albums.js'

const router = useRouter()
const searchQuery = ref('')

const filteredAlbums = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return albums
  return albums.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
})

const openAlbum = (id) => {
  router.push({ name: 'PhotoAlbum', params: { albumId: id } })
}
</script>

<template>
  <div class="w-full max-w-7xl mx-auto mt-24 sm:mt-28 px-4 sm:px-10 relative z-10 min-h-screen">
    <div class="flex flex-col md:flex-row justify-between items-center mb-16 gap-6">
      <div>
        <h1 class="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-widest mb-2">光影画廊</h1>
        <p class="text-slate-600 dark:text-slate-400 font-medium tracking-wider">定格时间，封存泰拉与现实的每一次心跳</p>
      </div>
      <div class="relative w-full md:w-80 group">
        <svg class="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none text-slate-500 dark:text-slate-400 group-focus-within:text-indigo-500 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索相册名或照片描述..."
          class="w-full h-12 pl-12 pr-4 bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/50 dark:border-white/10 rounded-full text-sm text-slate-800 dark:text-white placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-all"
        />
      </div>
    </div>

    <p v-if="!filteredAlbums.length" class="text-center text-slate-400 dark:text-slate-500 py-20 text-sm">未找到相关相册</p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20 mt-10">
      <div v-for="album in filteredAlbums" :key="album.id" @click="openAlbum(album.id)" class="group cursor-pointer flex flex-col items-center">
        <div class="relative w-[85%] aspect-[4/3] mb-8">
          <div v-if="album.photos[2]" class="absolute inset-0 bg-slate-300 dark:bg-slate-700 rounded-[4px] shadow-md transform rotate-6 translate-x-4 translate-y-2 group-hover:rotate-12 group-hover:translate-x-8 transition-all duration-500 border-[6px] border-white dark:border-slate-200 overflow-hidden opacity-60">
            <img :src="album.photos[2]" alt="" class="w-full h-full object-cover grayscale blur-[2px]" />
          </div>
          <div v-if="album.photos[1]" class="absolute inset-0 bg-slate-200 dark:bg-slate-600 rounded-[4px] shadow-lg transform -rotate-3 -translate-x-2 -translate-y-1 group-hover:-rotate-6 group-hover:-translate-x-6 transition-all duration-500 border-[6px] border-white dark:border-slate-200 overflow-hidden opacity-80 z-10">
            <img :src="album.photos[1]" alt="" class="w-full h-full object-cover grayscale-[50%]" />
          </div>
          <div class="absolute inset-0 bg-white dark:bg-slate-200 rounded-[4px] shadow-2xl border-[6px] border-white dark:border-slate-200 overflow-hidden z-20 transform group-hover:-translate-y-2 group-hover:scale-105 transition-all duration-500">
            <img :src="album.photos[0]" :alt="album.title" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-5">
              <span class="text-white font-bold text-lg drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{{ album.photos.length }} 张照片</span>
              <span class="text-indigo-300 font-medium text-xs mt-1 drop-shadow-md translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-75">Click to Open</span>
            </div>
          </div>
        </div>
        <div class="text-center px-4 w-full">
          <div class="flex items-center justify-center gap-2 mb-1">
            <h2 class="text-xl font-bold text-slate-900 dark:text-white transition-colors group-hover:text-indigo-600 dark:group-hover:text-indigo-400">{{ album.title }}</h2>
            <span class="text-[10px] font-black text-slate-500 dark:text-slate-400 bg-white/60 dark:bg-black/30 backdrop-blur-sm px-2 py-0.5 rounded-sm uppercase tracking-wider">{{ album.date }}</span>
          </div>
          <p class="text-sm text-slate-600 dark:text-slate-400 line-clamp-1">{{ album.desc }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
