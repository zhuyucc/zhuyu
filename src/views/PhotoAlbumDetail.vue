<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { albums } from '../data/albums.js'

const route = useRoute()
const router = useRouter()

const album = computed(() => albums.find(a => a.id === route.params.albumId))

const lightboxOpen = ref(false)
const currentPhotoIndex = ref(0)
const scale = ref(1)
const offsetX = ref(0)
const offsetY = ref(0)
const isDragging = ref(false)
const isDragged = ref(false)
const dragStart = { x: 0, y: 0, ox: 0, oy: 0 }

const currentPhotoUrl = computed(() => {
  if (!album.value) return ''
  return album.value.photos[currentPhotoIndex.value]
})

const resetZoom = () => {
  scale.value = 1
  offsetX.value = 0
  offsetY.value = 0
}

const openLightbox = (idx) => {
  currentPhotoIndex.value = idx
  lightboxOpen.value = true
  resetZoom()
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  lightboxOpen.value = false
  document.body.style.overflow = ''
}

const onOverlayClick = () => {
  if (isDragged.value) return
  closeLightbox()
}

const prev = () => {
  if (!album.value) return
  if (currentPhotoIndex.value > 0) {
    currentPhotoIndex.value--
  } else {
    currentPhotoIndex.value = album.value.photos.length - 1
  }
  resetZoom()
}

const next = () => {
  if (!album.value) return
  if (currentPhotoIndex.value < album.value.photos.length - 1) {
    currentPhotoIndex.value++
  } else {
    currentPhotoIndex.value = 0
  }
  resetZoom()
}

const onWheel = (e) => {
  e.preventDefault()
  const delta = e.deltaY > 0 ? -0.1 : 0.1
  scale.value = Math.min(5, Math.max(0.5, scale.value + delta))
}

const onMouseDown = (e) => {
  isDragging.value = true
  isDragged.value = false
  dragStart.x = e.clientX
  dragStart.y = e.clientY
  dragStart.ox = offsetX.value
  dragStart.oy = offsetY.value
}

const onMouseMove = (e) => {
  if (!isDragging.value) return
  const dx = e.clientX - dragStart.x
  const dy = e.clientY - dragStart.y
  if (Math.abs(dx) > 2 || Math.abs(dy) > 2) isDragged.value = true
  offsetX.value = dragStart.ox + dx / scale.value
  offsetY.value = dragStart.oy + dy / scale.value
}

const onMouseUp = () => {
  isDragging.value = false
}

const goBack = () => {
  router.push('/photowall')
}

const handleKeydown = (e) => {
  if (e.key === 'Escape') {
    if (lightboxOpen.value) closeLightbox()
    else goBack()
  }
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
  <div v-if="!album" class="w-full max-w-6xl mx-auto mt-32 px-4 text-center">
    <p class="text-slate-400 dark:text-slate-500">相册不存在</p>
    <button @click="goBack" class="mt-4 text-indigo-500 hover:text-indigo-600 underline text-sm">返回照片墙</button>
  </div>

  <div v-else class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <button @click="goBack" class="flex items-center gap-1 text-slate-500 dark:text-slate-400 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors text-sm mb-6 group">
      <svg class="w-4 h-4 transition-transform group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
      返回照片墙
    </button>

    <div class="mb-10">
      <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">{{ album.title }}</h1>
      <div class="flex items-center gap-3 mt-2 text-sm text-slate-500 dark:text-slate-400">
        <span>{{ album.date }}</span>
        <span class="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-500"></span>
        <span>{{ album.photos.length }} 张照片</span>
      </div>
      <p class="text-slate-600 dark:text-slate-300 mt-3">{{ album.desc }}</p>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="(photo, idx) in album.photos" :key="idx" @click="openLightbox(idx)" class="group cursor-pointer rounded-2xl overflow-hidden bg-white/40 dark:bg-slate-800/40 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl hover:scale-[1.02] transition-all duration-500">
        <div class="relative aspect-[4/3] overflow-hidden">
          <img :src="photo" :alt="`${album.title} ${idx + 1}`" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
          <div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500 flex items-center justify-center">
            <svg class="w-10 h-10 text-white/0 group-hover:text-white/80 transition-all duration-500 drop-shadow-lg" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" /></svg>
          </div>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <Teleport to="body">
      <transition name="fade">
        <div v-if="lightboxOpen" class="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm select-none" @click="onOverlayClick">

          <div
            class="relative z-30 flex flex-col items-center max-w-5xl w-full px-4"
            @wheel.prevent="onWheel"
            @mousedown="onMouseDown"
            @mousemove="onMouseMove"
            @mouseup="onMouseUp"
            @mouseleave="onMouseUp"
          >
            <div
              class="relative w-full flex items-center justify-center overflow-hidden rounded-2xl"
              style="height: 85vh;"
              @click.stop
            >
              <img
                :src="currentPhotoUrl"
                :alt="album.title"
                class="shadow-2xl rounded-2xl"
                :class="[isDragging ? 'cursor-grabbing' : 'cursor-grab']"
                :style="{ transform: `scale(${scale}) translate(${offsetX}px, ${offsetY}px)`, maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }"
                draggable="false"
              />
            </div>
            <div class="mt-4 text-center" @click.stop>
              <p class="text-sm text-white/60">{{ currentPhotoIndex + 1 }} / {{ album.photos.length }} <span class="ml-2 text-indigo-400">{{ Math.round(scale * 100) }}%</span></p>
            </div>
          </div>

          <button @click.stop="closeLightbox" class="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all z-40 backdrop-blur-md border border-white/20">
            <svg class="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>

          <button @click.stop="prev" class="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all z-40 backdrop-blur-md border border-white/20 group">
            <svg class="w-6 h-6 transition-transform group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" /></svg>
          </button>

          <button @click.stop="next" class="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all z-40 backdrop-blur-md border border-white/20 group">
            <svg class="w-6 h-6 transition-transform group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
          </button>

        </div>
      </transition>
    </Teleport>
  </div>
</template>
