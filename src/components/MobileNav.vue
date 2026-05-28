<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const isOpen = ref(false)

const navLinks = [
  { path: '/', label: '首页', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
  { path: '/projects', label: '文章', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2' },
  { path: '/timeline', label: '时间线', icon: 'M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { path: '/photowall', label: '照片墙', icon: 'M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' },
  { path: '/music', label: '音乐', icon: 'M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2z' },
  { path: '/tree', label: '灵境', icon: 'M13 10V3L4 14h7v7l9-11h-7z' },
  { path: '/chatter', label: '杂谈', icon: 'M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z' },
  { path: '/about', label: '关于', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
]

const toggle = () => {
  isOpen.value = !isOpen.value
}

const goTo = (path) => {
  router.push(path)
  isOpen.value = false
}
</script>

<template>
  <div class="md:hidden">
    <button
      class="fixed top-1/2 right-0 -translate-y-1/2 w-12 h-28 bg-indigo-500/80 backdrop-blur-xl rounded-l-full shadow-[-5px_0_20px_rgba(99,102,241,0.4)] z-[60] flex items-center justify-center transition-all duration-500 border-y border-l border-white/30 touch-none"
      :class="isOpen ? 'translate-x-0 opacity-100' : 'translate-x-0 opacity-100'"
      draggable="false"
      @click="toggle"
    >
      <div class="flex flex-col gap-1.5 items-center justify-center mr-2">
        <div class="w-1.5 h-1.5 bg-white/90 rounded-full"></div>
        <div class="w-1.5 h-1.5 bg-white/90 rounded-full"></div>
        <div class="w-1.5 h-1.5 bg-white/90 rounded-full"></div>
      </div>
    </button>

    <Teleport to="body">
      <transition name="fade">
        <div v-if="isOpen" class="fixed inset-0 z-[70] bg-black/50 backdrop-blur-sm" @click="isOpen = false"></div>
      </transition>
      <transition name="slide-up">
        <div v-if="isOpen" class="fixed bottom-0 left-0 right-0 z-[80] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-t-3xl max-h-[70vh] overflow-y-auto p-6 border-t border-white/20 dark:border-white/10">
          <div class="flex justify-center mb-4">
            <div class="w-10 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          </div>
          <div class="grid grid-cols-4 gap-4">
            <button
              v-for="link in navLinks"
              :key="link.path"
              @click="goTo(link.path)"
              class="flex flex-col items-center gap-2 py-3 px-2 rounded-2xl hover:bg-indigo-50 dark:hover:bg-slate-800 transition-colors"
            >
              <div class="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-slate-800 flex items-center justify-center">
                <svg class="w-5 h-5 text-indigo-600 dark:text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" :d="link.icon" />
                </svg>
              </div>
              <span class="text-xs font-bold text-slate-700 dark:text-slate-300">{{ link.label }}</span>
            </button>
          </div>
        </div>
      </transition>
    </Teleport>
  </div>
</template>
