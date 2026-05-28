<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllPosts } from '../composables/usePosts.js'

const router = useRouter()
const searchQuery = ref('')

const allPosts = computed(() => getAllPosts())

const filteredPosts = computed(() => {
  const q = searchQuery.value.trim().toLowerCase()
  if (!q) return allPosts.value
  return allPosts.value.filter(p => {
    const title = (p.title || '').toLowerCase()
    const desc = (p.description || '').toLowerCase()
    const tags = (p.tags || []).join(' ').toLowerCase()
    return title.includes(q) || desc.includes(q) || tags.includes(q)
  })
})

const goTo = (id) => router.push(`/posts/${id}`)

function formatDate(raw) {
  if (!raw) return ''
  const m = raw.match(/(\d{4}-\d{2}-\d{2})/)
  return m ? m[1] : raw
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">文章</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-6 text-sm">文章与记录</p>

    <form class="relative group mb-8 max-w-xl" @submit.prevent>
      <input
        type="text"
        v-model="searchQuery"
        class="w-full pl-14 pr-6 py-4 bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/40 dark:border-white/10 rounded-3xl shadow-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 text-slate-800 dark:text-slate-200 transition-all placeholder-slate-500 dark:placeholder-slate-400 font-medium relative z-0"
        placeholder="搜索文章标题或标签..."
        autocomplete="off"
        spellcheck="false"
      />
      <div class="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none select-none z-10">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>
    </form>

    <div v-if="filteredPosts.length === 0" class="text-center text-slate-400 py-20">
      <p class="text-lg">暂无文章</p>
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      <div
        v-for="post in filteredPosts"
        :key="post.id"
        @click="goTo(post.id)"
        class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl group cursor-pointer"
      >
        <div class="aspect-[16/9] overflow-hidden bg-slate-200 dark:bg-slate-700">
          <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-indigo-400 to-purple-500">
            <span class="text-5xl font-black text-white/70">{{ (post.title || '?')[0] }}</span>
          </div>
        </div>
        <div class="p-5">
          <div class="flex items-center gap-3 mb-2">
            <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Article</span>
            <span v-if="post.date" class="text-xs text-slate-400 font-mono">{{ formatDate(post.date) }}</span>
          </div>
          <h2 class="text-lg font-bold text-slate-900 dark:text-white mb-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors line-clamp-2">{{ post.title }}</h2>
          <p v-if="post.description" class="text-sm text-slate-600 dark:text-slate-300 line-clamp-3">{{ post.description }}</p>
          <div v-if="post.tags && post.tags.length" class="flex flex-wrap gap-2 mt-3">
            <span v-for="tag in post.tags" :key="tag" class="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-300 text-xs font-bold rounded-full">{{ tag }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
