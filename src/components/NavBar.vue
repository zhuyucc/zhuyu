<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

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
      </nav>
    </div>
  </header>
</template>
