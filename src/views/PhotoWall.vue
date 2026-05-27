<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const albums = [
  {
    title: '南昌五一摄影', date: '2026-05-07', desc: '随便拍拍',
    photos: [
      'https://bu.dusays.com/2026/05/07/69fc46808a782.jpg',
      'https://bu.dusays.com/2026/05/07/69fc46e27843d.jpg',
    ],
  },
  {
    title: '板栗猫猫', date: '2026-04-21', desc: '带猫猫去玩咯',
    photos: [
      'https://bu.dusays.com/2026/04/21/69e7119340b81.jpg',
      'https://bu.dusays.com/2026/04/21/69e711dd94bba.jpg',
      'https://bu.dusays.com/2026/04/21/69e7121bd2270.jpg',
    ],
  },
  {
    title: '泰拉大陆纪行', date: '2026.01', desc: '关于源石、孤星与前文明的视觉记录',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c24230de927.jpg',
      'https://bu.dusays.com/2026/03/24/69c24230d661d.jpg',
    ],
  },
  {
    title: '唐宋历史巡游', date: '2025.10', desc: '寻访千年前的长安与汴梁遗迹',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c24230a4efe.jpg',
      'https://bu.dusays.com/2026/03/24/69c24230d661d.jpg',
      'https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg',
    ],
  },
  {
    title: '春日随拍', date: '2026-04-24', desc: '春天的气息',
    photos: [
      'https://bu.dusays.com/2026/04/24/69eb2a5a6e185.jpg',
    ],
  },
  {
    title: '日常记录', date: '2026-03-24', desc: '生活中的美好瞬间',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg',
      'https://bu.dusays.com/2026/03/24/69c1e38b4c370.jpg',
    ],
  },
  {
    title: '星空', date: '2026-03-24', desc: '夜晚的星空',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c1e38ac1846.jpg',
    ],
  },
  {
    title: '城市风光', date: '2026-02-15', desc: '城市天际线',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c26fe4acdb5.jpg',
      'https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg',
    ],
  },
  {
    title: '街角', date: '2026-02-10', desc: '午后的街角',
    photos: [
      'https://bu.dusays.com/2026/03/24/69c26fe4d9486.jpg',
    ],
  },
]

const searchQuery = ref('')

const filteredAlbums = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return albums
  return albums.filter(a => a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q))
})

const lightboxOpen = ref(false)
const currentAlbumIndex = ref(0)
const currentPhotoIndex = ref(0)

const currentAlbum = computed(() => filteredAlbums.value[currentAlbumIndex.value])
const currentPhotoUrl = computed(() => {
  if (!currentAlbum.value) return ''
  return currentAlbum.value.photos[currentPhotoIndex.value]
})

const openLightbox = (albumIdx, photoIdx) => {
  currentAlbumIndex.value = albumIdx
  currentPhotoIndex.value = photoIdx
  lightboxOpen.value = true
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const prev = () => {
  const album = currentAlbum.value
  if (!album) return
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  } else {
    currentAlbumIndex.value = (currentAlbumIndex.value - 1 + filteredAlbums.value.length) % filteredAlbums.value.length
    currentPhotoIndex.value = filteredAlbums.value[currentAlbumIndex.value].photos.length - 1
  }
}

const next = () => {
  const album = currentAlbum.value
  if (!album) return
  if (currentPhotoIndex.value < album.photos.length - 1) {
    currentPhotoIndex.value++
  } else {
    currentAlbumIndex.value = (currentAlbumIndex.value + 1) % filteredAlbums.value.length
    currentPhotoIndex.value = 0
  }
}

const handleKeydown = (e) => {
  if (!lightboxOpen.value) return
  if (e.key === 'Escape') closeLightbox()
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => window.addEventListener('keydown', handleKeydown))
onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
  document.body.style.overflow = ''
})
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-6">
      <div>
        <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">照片墙</h1>
        <p class="text-slate-600 dark:text-slate-400 text-sm">用镜头记录生活</p>
      </div>
      <div class="relative w-full sm:w-64">
        <svg class="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索相册名或描述..."
          class="w-full pl-10 pr-4 py-2.5 rounded-2xl bg-white/50 dark:bg-slate-800/50 border border-white/40 dark:border-white/10 shadow-sm text-sm text-slate-800 dark:text-slate-200 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-400/50 focus:border-indigo-400/50 transition-all backdrop-blur-md"
        />
      </div>
    </div>

    <p v-if="!filteredAlbums.length" class="text-center text-slate-400 dark:text-slate-500 py-16 text-sm">未找到相关相册</p>

    <div class="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
      <div v-for="(album, aidx) in filteredAlbums" :key="aidx" class="break-inside-avoid rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden group transition-all duration-500 hover:scale-[1.02]">
        <div class="relative">
          <img :src="album.photos[0]" :alt="album.title" class="w-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-[10px] font-bold border border-white/20">{{ album.photos.length }} 张照片</div>
        </div>
        <div class="p-4 cursor-pointer" @click="openLightbox(aidx, 0)">
          <h3 class="font-bold text-slate-900 dark:text-white text-sm">{{ album.title }}</h3>
          <p class="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{{ album.date }}</p>
          <p class="text-xs text-slate-500 dark:text-slate-400 mt-1.5 line-clamp-2">{{ album.desc }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm" @click.self="closeLightbox">
          <button @click="closeLightbox" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all z-10 backdrop-blur-md border border-white/20">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button @click="prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 group">
            <svg class="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button @click="next" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all backdrop-blur-md border border-white/20 group">
            <svg class="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="right" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div class="flex flex-col items-center max-w-4xl w-full px-4">
            <img :src="currentPhotoUrl" :alt="currentAlbum?.title" class="max-h-[80vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl" />
            <div class="mt-4 text-center">
              <h3 class="text-lg font-bold text-white">{{ currentAlbum?.title }}</h3>
              <p class="text-sm text-white/70 mt-1">{{ currentAlbum?.desc }}</p>
              <p class="text-xs text-white/40 mt-2">{{ currentPhotoIndex + 1 }} / {{ currentAlbum?.photos.length }} · {{ currentAlbumIndex + 1 }} / {{ filteredAlbums.length }}</p>
            </div>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>