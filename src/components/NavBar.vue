<script setup>
import { useRoute } from 'vue-router'

defineProps({ isDark: Boolean })
const emit = defineEmits(['toggleDark'])

const route = useRoute()

const navLinks = [
  { path: '/', label: '首页' },
  { path: '/projects', label: '文章' },
  { path: '/timeline', label: '时间线' },
  { path: '/photowall', label: '照片墙' },
  { path: '/music', label: '音乐' },
  { path: '/tree', label: '灵境' },
  { path: '/chatter', label: '杂谈' },
  { path: '/about', label: '关于' },
]

const isActive = (path) => route.path === path
</script>

<template>
  <header class="hidden md:block w-full fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b bg-white/40 dark:bg-slate-900/50 backdrop-blur-xl border-white/20 dark:border-white/5 shadow-sm">
    <div class="w-[90%] max-w-6xl mx-auto h-16 flex items-center justify-between px-4 sm:px-[30px]">
      <router-link to="/" class="text-xl font-black text-slate-800 dark:text-white tracking-tighter hover:text-indigo-600 dark:hover:text-indigo-400 transition-all duration-300">
        zhuyu<span class="text-indigo-500 mx-1">の</span>宝藏之地
      </router-link>
      <nav class="flex gap-8 text-sm font-bold">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="relative py-1 transition-colors duration-300"
          :class="isActive(link.path) ? 'text-indigo-600 dark:text-indigo-400' : 'text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400'"
        >
          {{ link.label }}
          <span v-if="isActive(link.path)" class="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-indigo-500 rounded-full animate-pulse"></span>
        </router-link>
        <button
          @click="emit('toggleDark')"
          class="relative py-1 transition-colors duration-300 text-sm font-bold text-slate-700 dark:text-slate-200 hover:text-indigo-600 dark:hover:text-indigo-400"
          :title="isDark ? '切换白天模式' : '切换夜间模式'"
        >
          <svg v-if="isDark" class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
        </button>
      </nav>
    </div>
  </header>
</template>
