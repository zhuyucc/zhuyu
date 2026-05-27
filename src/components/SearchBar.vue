<script setup>
import { ref } from 'vue'

const query = ref('')
</script>

<template>
  <form class="relative group" @submit.prevent>
    <input
      type="text"
      v-model="query"
      class="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 transition-all placeholder-slate-500 dark:placeholder-slate-400 font-medium text-lg relative z-0"
      placeholder="搜寻标题、描述或标签..."
      autocomplete="off"
      spellcheck="false"
    />
    <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none select-none z-10">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors drop-shadow-sm">
        <circle cx="11" cy="11" r="8"></circle>
        <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
      </svg>
    </div>
  </form>
</template>
