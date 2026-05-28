<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getAllChatter } from '../composables/useChatter.js'

const router = useRouter()
const articles = computed(() => getAllChatter())

const goTo = (id) => {
  if (id) router.push(`/chatter/${id}`)
}
</script>

<template>
  <div class="w-full max-w-6xl mx-auto mt-24 sm:mt-28 px-4 sm:px-6 lg:px-10 relative z-10 min-h-screen">
    <h1 class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">杂谈</h1>
    <p class="text-slate-600 dark:text-slate-400 mb-8 text-sm">一些随想与记录</p>
    <div v-if="articles.length === 0" class="text-center text-slate-400 py-20">
      <p class="text-lg">暂无杂谈</p>
    </div>
    <div v-else class="space-y-6">
      <div
        v-for="article in articles"
        :key="article.id"
        @click="goTo(article.id)"
        class="rounded-3xl bg-white/40 dark:bg-slate-800/50 backdrop-blur-md border border-white/40 dark:border-white/10 shadow-xl overflow-hidden transition-all duration-500 hover:scale-[1.01] hover:shadow-2xl group cursor-pointer"
      >
        <div class="p-6 md:p-8">
          <div class="flex items-center gap-3 mb-3">
            <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Records</span>
            <span v-if="article.date" class="text-xs text-slate-400 font-mono">{{ article.date }}</span>
          </div>
          <h2 class="text-2xl font-bold text-slate-900 dark:text-white mb-4 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">{{ article.title }}</h2>
          <p class="text-slate-600 dark:text-slate-300 leading-relaxed whitespace-pre-line">{{ article.summary }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
